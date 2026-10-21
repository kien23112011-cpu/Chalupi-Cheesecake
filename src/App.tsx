import React, { useState } from 'react';
import { CHEESECAKE_PRODUCTS } from './data/products';
import { CheesecakeProduct, CartItem } from './types';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { ProductCard } from './components/ProductCard';
import { ProductModal } from './components/ProductModal';
import { TastingFlightBuilder } from './components/TastingFlightBuilder';
import { BakeCraftSection } from './components/BakeCraftSection';
import { ReviewsSection } from './components/ReviewsSection';
import { BakehouseSection } from './components/BakehouseSection';
import { CartDrawer } from './components/CartDrawer';
import { CheckoutModal } from './components/CheckoutModal';
import { FounderSection } from './components/FounderSection';
import { Footer } from './components/Footer';
import { Sparkles, ShoppingBag } from 'lucide-react';

export default function App() {
  const [products] = useState<CheesecakeProduct[]>(CHEESECAKE_PRODUCTS);
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  
  // Cart state
  const [cart, setCart] = useState<CartItem[]>([
    {
      cartItemId: 'seed-item-1',
      productId: CHEESECAKE_PRODUCTS[0].id,
      productName: CHEESECAKE_PRODUCTS[0].name,
      productSlug: CHEESECAKE_PRODUCTS[0].slug,
      sizeId: 'whole-8',
      sizeName: '8" Whole Cake',
      price: CHEESECAKE_PRODUCTS[0].sizes[0].price,
      quantity: 1,
      accentColor: CHEESECAKE_PRODUCTS[0].palette.accent,
    },
  ]);

  // Modal states
  const [selectedProductForModal, setSelectedProductForModal] = useState<CheesecakeProduct | null>(null);
  const [isTastingBuilderOpen, setIsTastingBuilderOpen] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [checkoutDiscount, setCheckoutDiscount] = useState(0);
  const [checkoutPromoCode, setCheckoutPromoCode] = useState('');
  const [checkoutFulfillment, setCheckoutFulfillment] = useState<'delivery' | 'pickup'>('delivery');

  // Filter products
  const filteredProducts = products.filter((p) => {
    if (selectedCategory === 'all') return true;
    if (selectedCategory === 'basque') return p.category === 'basque';
    if (selectedCategory === 'classic') return p.category === 'classic';
    if (selectedCategory === 'fruit') return p.category === 'fruit';
    if (selectedCategory === 'chocolate-nut') return p.category === 'chocolate-nut';
    return true;
  });

  // Cart operations
  const handleAddToCart = (newItem: Omit<CartItem, 'cartItemId'>) => {
    const existingIndex = cart.findIndex(
      (item) =>
        item.productId === newItem.productId &&
        item.sizeId === newItem.sizeId &&
        item.giftMessage === newItem.giftMessage
    );

    if (existingIndex > -1) {
      const updated = [...cart];
      updated[existingIndex].quantity += newItem.quantity;
      setCart(updated);
    } else {
      const cartItemId = `cart-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
      setCart([...cart, { ...newItem, cartItemId }]);
    }
  };

  const handleUpdateQuantity = (cartItemId: string, delta: number) => {
    setCart((prev) =>
      prev
        .map((item) => {
          if (item.cartItemId === cartItemId) {
            const newQty = item.quantity + delta;
            return newQty > 0 ? { ...item, quantity: newQty } : null;
          }
          return item;
        })
        .filter(Boolean) as CartItem[]
    );
  };

  const handleRemoveItem = (cartItemId: string) => {
    setCart((prev) => prev.filter((item) => item.cartItemId !== cartItemId));
  };

  const handleProceedToCheckout = (discountAmount: number, promo: string, fulfillment: 'delivery' | 'pickup') => {
    setCheckoutDiscount(discountAmount);
    setCheckoutPromoCode(promo);
    setCheckoutFulfillment(fulfillment);
    setIsCartOpen(false);
    setIsCheckoutOpen(true);
  };

  const handleOrderCompleted = () => {
    // Empty cart upon successful order
    setCart([]);
  };

  const totalCartCount = cart.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <div className="min-h-screen flex flex-col bg-[#FAF7F2] text-[#1E1511]">
      {/* Top Bar */}
      <Navbar
        cart={cart}
        onOpenCart={() => setIsCartOpen(true)}
        onOpenTastingBuilder={() => setIsTastingBuilderOpen(true)}
      />

      {/* Hero Section */}
      <main className="flex-1">
        <Hero
          featuredProduct={products[0]}
          onExploreMenu={() => {
            document.getElementById('bakes')?.scrollIntoView({ behavior: 'smooth' });
          }}
          onOpenTastingBuilder={() => setIsTastingBuilderOpen(true)}
          onQuickView={(p) => setSelectedProductForModal(p)}
        />

        {/* The Signature Collection (Product Catalog) */}
        <section id="bakes" className="py-16 md:py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Section Heading & Filter Bar */}
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10 pb-6 border-b border-[#EAE0D2]">
            <div>
              <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-widest text-[#B5761E] mb-2">
                <span>The Signature Collection</span>
                <span aria-hidden="true">·</span>
                <span>Small Batch Steam Bakes</span>
              </div>
              <h2 className="font-serif text-3xl sm:text-4xl font-bold text-[#1E1511]">
                Handcrafted Bakes of the Day
              </h2>
            </div>

            {/* Interactive Filter Tabs (Functional segmented buttons) */}
            <div className="flex items-center gap-1 p-1 bg-[#F1E6D6] rounded-xl overflow-x-auto max-w-full">
              {[
                { id: 'all', label: 'All Bakes' },
                { id: 'basque', label: 'Burnt Basque' },
                { id: 'classic', label: 'Classic Vanilla' },
                { id: 'chocolate-nut', label: 'Truffle & Nut' },
                { id: 'fruit', label: 'Fruit Silk' },
              ].map((tab) => (
                <button
                  key={tab.id}
                  type="button"
                  onClick={() => setSelectedCategory(tab.id)}
                  className={`px-3.5 py-1.5 text-xs font-semibold rounded-lg transition-all whitespace-nowrap cursor-pointer shrink-0 ${
                    selectedCategory === tab.id
                      ? 'bg-[#1E1511] text-[#FAF7F2] shadow-xs'
                      : 'text-[#685343] hover:text-[#1E1511]'
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>
          </div>

          {/* 3-Column Product Grid with generous whitespace */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
            {filteredProducts.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                onAddToCart={handleAddToCart}
                onQuickView={(p) => setSelectedProductForModal(p)}
              />
            ))}
          </div>

          {/* Tasting Flight Banner Callout in Catalog */}
          <div className="mt-14 p-6 sm:p-10 rounded-2xl bg-gradient-to-r from-[#2B1B15] to-[#1E1511] text-[#FAF7F2] border border-[#3E291F] flex flex-col sm:flex-row items-center justify-between gap-6 shadow-xl">
            <div className="space-y-2 text-center sm:text-left">
              <div className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#E5A738] uppercase tracking-wider">
                <Sparkles className="w-3.5 h-3.5" />
                <span>Can’t Decide on One Flavor?</span>
              </div>
              <h3 className="font-serif text-2xl sm:text-3xl font-bold">
                Build a Custom 4-Slice Tasting Flight Box
              </h3>
              <p className="text-xs sm:text-sm text-[#C9BAAD] max-w-lg leading-relaxed">
                Mix and match any four individual slices, wrapped in luxury satin ribbon with an embossed gift inscription.
              </p>
            </div>

            <button
              type="button"
              onClick={() => setIsTastingBuilderOpen(true)}
              className="px-6 py-3.5 text-xs font-bold uppercase tracking-wider text-[#1E1511] bg-[#E5A738] hover:bg-[#F0B84D] rounded-lg transition-colors whitespace-nowrap shrink-0 shadow-md cursor-pointer"
            >
              Curate Flight · $34
            </button>
          </div>
        </section>

        {/* Meet the Founder: Mohamad Mneimneh */}
        <FounderSection
          onExploreBakes={() => {
            document.getElementById('bakes')?.scrollIntoView({ behavior: 'smooth' });
          }}
          onOpenTastingBuilder={() => setIsTastingBuilderOpen(true)}
        />

        {/* The Best Bake Craft & Science Section */}
        <BakeCraftSection />

        {/* Customer Reviews Section */}
        <ReviewsSection />

        {/* Bakehouse, Shipping & FAQ Section */}
        <BakehouseSection />
      </main>

      {/* Footer */}
      <Footer />

      {/* Quick View Product Modal */}
      <ProductModal
        product={selectedProductForModal}
        onClose={() => setSelectedProductForModal(null)}
        onAddToCart={handleAddToCart}
      />

      {/* Tasting Flight Customizer Modal */}
      <TastingFlightBuilder
        products={products}
        isOpen={isTastingBuilderOpen}
        onClose={() => setIsTastingBuilderOpen(false)}
        onAddToCart={handleAddToCart}
      />

      {/* Slide-out Cart Drawer */}
      <CartDrawer
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        cart={cart}
        onUpdateQuantity={handleUpdateQuantity}
        onRemoveItem={handleRemoveItem}
        onProceedToCheckout={handleProceedToCheckout}
      />

      {/* Checkout & Order Confirmation Modal */}
      <CheckoutModal
        isOpen={isCheckoutOpen}
        onClose={() => setIsCheckoutOpen(false)}
        cart={cart}
        discount={checkoutDiscount}
        promoCode={checkoutPromoCode}
        initialFulfillment={checkoutFulfillment}
        onOrderCompleted={handleOrderCompleted}
      />

      {/* Floating Bag Shortcut on bottom right if cart has items */}
      {totalCartCount > 0 && !isCartOpen && !isCheckoutOpen && (
        <button
          type="button"
          onClick={() => setIsCartOpen(true)}
          aria-label="Open Cart Bag"
          className="fixed bottom-6 right-6 z-30 flex items-center gap-2.5 px-4 py-3 bg-[#1E1511] text-[#FAF7F2] rounded-full shadow-2xl border border-[#3E291F] hover:bg-[#34241C] transition-all hover:scale-105 cursor-pointer"
        >
          <ShoppingBag className="w-4 h-4 text-[#E5A738]" />
          <span className="text-xs font-semibold">Tasting Bag</span>
          <span className="px-2 py-0.5 text-xs font-bold bg-[#E5A738] text-[#1E1511] rounded-full tabular-nums">
            {totalCartCount}
          </span>
        </button>
      )}
    </div>
  );
}
