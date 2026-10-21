import React, { useState } from 'react';
import { X, Trash2, Plus, Minus, ArrowRight, ShoppingBag, Tag, Check, Truck, Store } from 'lucide-react';
import { CartItem } from '../types';

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  cart: CartItem[];
  onUpdateQuantity: (cartItemId: string, delta: number) => void;
  onRemoveItem: (cartItemId: string) => void;
  onProceedToCheckout: (discountAmount: number, promoCode: string, fulfillment: 'delivery' | 'pickup') => void;
}

export const CartDrawer: React.FC<CartDrawerProps> = ({
  isOpen,
  onClose,
  cart,
  onUpdateQuantity,
  onRemoveItem,
  onProceedToCheckout,
}) => {
  const [promoCodeInput, setPromoCodeInput] = useState('');
  const [appliedPromo, setAppliedPromo] = useState<string | null>(null);
  const [promoError, setPromoError] = useState('');
  const [fulfillment, setFulfillment] = useState<'delivery' | 'pickup'>('delivery');

  if (!isOpen) return null;

  const subtotal = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  // Discount calculation
  let discount = 0;
  if (appliedPromo === 'BESTBAKE10') {
    discount = Math.round(subtotal * 0.1);
  } else if (appliedPromo === 'CHALUPI5') {
    discount = Math.min(5, subtotal);
  }

  const FREE_SHIPPING_THRESHOLD = 65;
  const standardShipping = fulfillment === 'pickup' ? 0 : subtotal >= FREE_SHIPPING_THRESHOLD || subtotal === 0 ? 0 : 12;
  const estimatedTax = Math.round((subtotal - discount) * 0.05 * 100) / 100;
  const total = Math.max(0, subtotal - discount + standardShipping + estimatedTax);

  const handleApplyPromo = (e: React.FormEvent) => {
    e.preventDefault();
    const code = promoCodeInput.trim().toUpperCase();
    if (code === 'BESTBAKE10' || code === 'CHALUPI5') {
      setAppliedPromo(code);
      setPromoError('');
    } else {
      setPromoError('Invalid code. Try "BESTBAKE10" for 10% off.');
    }
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/50 backdrop-blur-xs transition-opacity"
        onClick={onClose}
      />

      <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-[#FAF7F2] shadow-2xl border-l border-[#DECBB4] flex flex-col justify-between">
          {/* Drawer Header */}
          <div className="p-6 border-b border-[#EAE0D2] flex items-center justify-between bg-[#F4ECDF]">
            <div className="flex items-center gap-2">
              <ShoppingBag className="w-5 h-5 text-[#C68A29]" />
              <h2 className="font-serif text-xl font-bold text-[#1E1511]">
                Your Tasting Bag
              </h2>
              <span className="text-xs font-semibold px-2 py-0.5 bg-[#1E1511] text-white rounded-full tabular-nums">
                {cart.reduce((sum, i) => sum + i.quantity, 0)}
              </span>
            </div>

            <button
              type="button"
              onClick={onClose}
              aria-label="Close Bag"
              className="p-1.5 text-[#5B4738] hover:text-[#1E1511] rounded-lg transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Free Shipping Progress Indicator (if delivery) */}
          {fulfillment === 'delivery' && (
            <div className="px-6 py-2.5 bg-[#FAF3E8] border-b border-[#EAE0D2] text-xs text-[#705645]">
              {subtotal >= FREE_SHIPPING_THRESHOLD ? (
                <div className="flex items-center gap-1.5 text-[#2E5E32] font-semibold">
                  <Check className="w-4 h-4" />
                  <span>Complimentary Nationwide Chilled Delivery Unlocked!</span>
                </div>
              ) : (
                <div>
                  Add <span className="font-bold text-[#1E1511] font-mono">${FREE_SHIPPING_THRESHOLD - subtotal}</span> more for free nationwide chilled shipping!
                  <div className="w-full h-1.5 bg-[#E8DAC9] rounded-full mt-1.5 overflow-hidden">
                    <div
                      className="h-full bg-[#C68A29] rounded-full transition-all duration-300"
                      style={{ width: `${Math.min(100, (subtotal / FREE_SHIPPING_THRESHOLD) * 100)}%` }}
                    />
                  </div>
                </div>
              )}
            </div>
          )}

          {/* Fulfillment Method Selector */}
          <div className="p-4 bg-[#FAF7F2] border-b border-[#EAE0D2]">
            <div className="grid grid-cols-2 gap-2 text-xs font-medium">
              <button
                type="button"
                onClick={() => setFulfillment('delivery')}
                className={`py-2 px-3 rounded-lg border flex items-center justify-center gap-2 transition-all cursor-pointer ${
                  fulfillment === 'delivery'
                    ? 'border-[#1E1511] bg-[#1E1511] text-white'
                    : 'border-[#DECBB4] bg-white text-[#5B4738] hover:border-[#B5761E]'
                }`}
              >
                <Truck className="w-3.5 h-3.5" />
                <span>Express Courier</span>
              </button>
              <button
                type="button"
                onClick={() => setFulfillment('pickup')}
                className={`py-2 px-3 rounded-lg border flex items-center justify-center gap-2 transition-all cursor-pointer ${
                  fulfillment === 'pickup'
                    ? 'border-[#1E1511] bg-[#1E1511] text-white'
                    : 'border-[#DECBB4] bg-white text-[#5B4738] hover:border-[#B5761E]'
                }`}
              >
                <Store className="w-3.5 h-3.5" />
                <span>Bakehouse Pickup</span>
              </button>
            </div>
          </div>

          {/* Cart Itemized List */}
          <div className="flex-1 overflow-y-auto p-6 divide-y divide-[#EAE0D2]">
            {cart.length === 0 ? (
              <div className="py-16 text-center text-[#8C6D58]">
                <ShoppingBag className="w-12 h-12 mx-auto mb-3 opacity-40 text-[#B5761E]" />
                <h3 className="font-serif text-lg font-bold text-[#1E1511] mb-1">
                  Your bag is empty
                </h3>
                <p className="text-xs text-[#7A6351] max-w-xs mx-auto mb-6">
                  Explore our caramelized Basque bakes and signature vanilla custard reserves.
                </p>
                <button
                  type="button"
                  onClick={onClose}
                  className="px-5 py-2.5 text-xs font-semibold uppercase tracking-wider text-white bg-[#1E1511] rounded-lg hover:bg-[#34241C] transition-colors"
                >
                  Explore Bakes
                </button>
              </div>
            ) : (
              cart.map((item) => (
                <div key={item.cartItemId} className="py-4 first:pt-0 last:pb-0 flex gap-4">
                  {/* Color Thumbnail swatch */}
                  <div
                    className="w-14 h-14 rounded-xl border border-black/10 shrink-0 flex items-center justify-center font-serif font-bold text-xs shadow-xs text-white"
                    style={{ backgroundColor: item.accentColor || '#C68A29' }}
                  >
                    🍰
                  </div>

                  {/* Item Details */}
                  <div className="flex-1 flex flex-col justify-between">
                    <div>
                      <div className="flex items-start justify-between gap-2">
                        <h4 className="font-serif font-bold text-sm text-[#1E1511] leading-tight">
                          {item.productName}
                        </h4>
                        <button
                          type="button"
                          onClick={() => onRemoveItem(item.cartItemId)}
                          className="text-[#9E826F] hover:text-[#A2422C] transition-colors"
                          aria-label="Remove item"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>

                      <div className="text-[11px] text-[#8C6D58] mt-0.5">
                        {item.sizeName}
                      </div>

                      {item.isTastingFlight && item.flightFlavors && (
                        <div className="text-[10px] text-[#785E4D] mt-1 bg-[#F5ECE0] p-1.5 rounded border border-[#E8DAC9]">
                          <span className="font-semibold text-[#1E1511]">Flavors: </span>
                          {item.flightFlavors.join(', ')}
                        </div>
                      )}

                      {item.giftMessage && (
                        <div className="text-[10px] text-[#8C6D58] italic mt-1">
                          Note: "{item.giftMessage}"
                        </div>
                      )}
                    </div>

                    {/* Quantity & Price Row */}
                    <div className="flex items-center justify-between pt-2 mt-2">
                      <div className="flex items-center border border-[#DECBB4] rounded-md bg-white">
                        <button
                          type="button"
                          onClick={() => onUpdateQuantity(item.cartItemId, -1)}
                          className="p-1 hover:bg-[#F2E8D8] text-[#5B4738] transition-colors"
                          aria-label="Decrease"
                        >
                          <Minus className="w-3 h-3" />
                        </button>
                        <span className="w-7 text-center text-xs font-semibold text-[#1E1511] tabular-nums">
                          {item.quantity}
                        </span>
                        <button
                          type="button"
                          onClick={() => onUpdateQuantity(item.cartItemId, 1)}
                          className="p-1 hover:bg-[#F2E8D8] text-[#5B4738] transition-colors"
                          aria-label="Increase"
                        >
                          <Plus className="w-3 h-3" />
                        </button>
                      </div>

                      <div className="font-serif font-bold text-sm text-[#1E1511] tabular-nums">
                        ${item.price * item.quantity}
                      </div>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Drawer Footer with Pricing & Actions */}
          {cart.length > 0 && (
            <div className="p-6 bg-[#F5ECE0] border-t border-[#DFCBB5] space-y-4">
              {/* Promo code form */}
              <form onSubmit={handleApplyPromo} className="space-y-1">
                <div className="flex gap-2">
                  <div className="relative flex-1">
                    <Tag className="w-3.5 h-3.5 absolute left-3 top-2.5 text-[#8C6D58]" />
                    <input
                      type="text"
                      value={promoCodeInput}
                      onChange={(e) => setPromoCodeInput(e.target.value)}
                      placeholder="Promo code (e.g. BESTBAKE10)"
                      className="w-full pl-8 pr-3 py-1.5 text-xs bg-white border border-[#DECBB4] rounded-lg focus:outline-none focus:ring-1 focus:ring-[#C68A29] text-[#1E1511] uppercase"
                    />
                  </div>
                  <button
                    type="submit"
                    className="px-3 py-1.5 text-xs font-semibold bg-[#1E1511] text-white rounded-lg hover:bg-[#34241C] transition-colors cursor-pointer"
                  >
                    Apply
                  </button>
                </div>
                {appliedPromo && (
                  <div className="text-[11px] text-[#2E5E32] flex items-center gap-1 font-medium">
                    <Check className="w-3 h-3" /> Code '{appliedPromo}' applied!
                  </div>
                )}
                {promoError && (
                  <div className="text-[11px] text-[#A2422C]">{promoError}</div>
                )}
              </form>

              {/* Subtotal Breakdowns */}
              <div className="space-y-1.5 text-xs text-[#6B5342] pt-2 border-t border-[#EAE0D2]">
                <div className="flex justify-between">
                  <span>Subtotal</span>
                  <span className="font-mono text-[#1E1511] tabular-nums">${subtotal}</span>
                </div>
                {discount > 0 && (
                  <div className="flex justify-between text-[#2E5E32] font-medium">
                    <span>Special Discount</span>
                    <span className="font-mono tabular-nums">-${discount}</span>
                  </div>
                )}
                <div className="flex justify-between">
                  <span>{fulfillment === 'pickup' ? 'Bakehouse Pickup' : 'Chilled Express Courier'}</span>
                  <span className="font-mono text-[#1E1511] tabular-nums">
                    {standardShipping === 0 ? 'FREE' : `$${standardShipping}`}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span>Estimated Tax (5%)</span>
                  <span className="font-mono text-[#1E1511] tabular-nums">${estimatedTax.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-base font-serif font-bold text-[#1E1511] pt-2 border-t border-[#EAE0D2]">
                  <span>Total</span>
                  <span className="tabular-nums">${total.toFixed(2)}</span>
                </div>
              </div>

              {/* Checkout CTA */}
              <button
                type="button"
                onClick={() => onProceedToCheckout(discount, appliedPromo || '', fulfillment)}
                className="w-full py-3.5 px-4 text-sm font-semibold rounded-lg bg-[#1E1511] text-white hover:bg-[#34241C] transition-all flex items-center justify-center gap-2 shadow-sm cursor-pointer"
              >
                <span>Proceed to Checkout</span>
                <ArrowRight className="w-4 h-4 text-[#E5A738]" />
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
