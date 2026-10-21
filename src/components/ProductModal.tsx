import React, { useState, useEffect } from 'react';
import { X, Check, Plus, Minus, Wine, ShieldCheck, Heart } from 'lucide-react';
import { CheesecakeProduct, CartItem } from '../types';
import { CheesecakeVisual } from './CheesecakeVisual';

interface ProductModalProps {
  product: CheesecakeProduct | null;
  onClose: () => void;
  onAddToCart: (item: Omit<CartItem, 'cartItemId'>) => void;
}

export const ProductModal: React.FC<ProductModalProps> = ({
  product,
  onClose,
  onAddToCart,
}) => {
  const [selectedSizeIndex, setSelectedSizeIndex] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [giftNote, setGiftNote] = useState('');
  const [showGiftInput, setShowGiftInput] = useState(false);
  const [isAddedFeedback, setIsAddedFeedback] = useState(false);

  useEffect(() => {
    setSelectedSizeIndex(0);
    setQuantity(1);
    setGiftNote('');
    setShowGiftInput(false);
  }, [product]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onClose]);

  if (!product) return null;

  const currentSize = product.sizes[selectedSizeIndex];

  const handleAdd = () => {
    onAddToCart({
      productId: product.id,
      productName: product.name,
      productSlug: product.slug,
      sizeId: currentSize.id,
      sizeName: currentSize.name,
      price: currentSize.price,
      quantity,
      giftMessage: giftNote.trim() ? giftNote.trim() : undefined,
      accentColor: product.palette.accent,
    });

    setIsAddedFeedback(true);
    setTimeout(() => {
      setIsAddedFeedback(false);
      onClose();
    }, 1200);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm overflow-y-auto">
      <div 
        className="relative w-full max-w-3xl bg-[#FAF7F2] rounded-2xl shadow-2xl border border-[#DFCBB5] overflow-hidden my-8 max-h-[90vh] flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          type="button"
          onClick={onClose}
          aria-label="Close dialog"
          className="absolute top-4 right-4 z-20 p-2 text-[#5B4738] hover:text-[#1E1511] bg-[#FAF7F2]/80 backdrop-blur-md rounded-full border border-[#D5C1AA] transition-colors cursor-pointer"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Scrollable Container */}
        <div className="overflow-y-auto flex-1">
          {/* Top Visual Showcase */}
          <div className="relative border-b border-[#EAE0D2]">
            <CheesecakeVisual product={product} size="lg" showSliceToggle={true} />
          </div>

          <div className="p-6 sm:p-8 space-y-6">
            {/* Header info */}
            <div>
              <div className="flex items-center gap-2 text-xs text-[#8C6D58] mb-2">
                <span className="uppercase tracking-widest font-semibold text-[#A86F1D]">
                  {product.bakeStyle}
                </span>
                <span aria-hidden="true">·</span>
                <span>{product.prepTime}</span>
                <span aria-hidden="true">·</span>
                <span className="font-semibold text-[#1E1511]">★ {product.rating} / 5.0</span>
              </div>

              <h2 className="font-serif text-2xl sm:text-3xl font-bold text-[#1E1511] mb-2">
                {product.name}
              </h2>

              <p className="text-sm sm:text-base text-[#5B4738] leading-relaxed">
                {product.description}
              </p>
            </div>

            {/* Flavor & Craft Highlights */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 p-4 bg-[#F2E8D8]/70 border border-[#DFCBB5] rounded-xl text-xs">
              <div>
                <span className="font-semibold text-[#1E1511] block mb-1">Crust Architecture</span>
                <p className="text-[#685343]">{product.crustDescription}</p>
              </div>
              <div>
                <span className="font-semibold text-[#1E1511] block mb-1 flex items-center gap-1.5">
                  <Wine className="w-3.5 h-3.5 text-[#C68A29]" />
                  Sommelier & Coffee Pairing
                </span>
                <p className="text-[#685343]">{product.pairing}</p>
              </div>
            </div>

            {/* Tasting Notes */}
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-[#8C6D58] block mb-2">
                Tasting Notes & Nuances
              </span>
              <div className="flex flex-wrap gap-2 text-xs">
                {product.tastingNotes.map((note) => (
                  <span
                    key={note}
                    className="px-3 py-1 bg-[#F5ECE0] text-[#4A382A] border border-[#DECBB4] rounded-md font-medium"
                  >
                    {note}
                  </span>
                ))}
              </div>
            </div>

            {/* Ingredient Transparency & Allergens */}
            <div className="border-t border-[#E8DCCF] pt-4 text-xs text-[#735C4A] space-y-2">
              <div>
                <span className="font-semibold text-[#1E1511]">Pure Ingredients: </span>
                <span>{product.ingredients.join(', ')}.</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="font-semibold text-[#1E1511]">Allergens: </span>
                <span className="text-[#A2422C] font-medium">{product.allergens.join(', ')}</span>
                <span aria-hidden="true">·</span>
                <span>{product.caloriesPerServing} cal per slice</span>
              </div>
            </div>

            {/* Contiguous Purchase Module */}
            <div className="border-t border-[#E8DCCF] pt-6 space-y-4">
              <span className="text-xs font-bold uppercase tracking-wider text-[#8C6D58] block">
                Select Format & Size
              </span>

              {/* Size grid */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
                {product.sizes.map((s, idx) => (
                  <button
                    key={s.id}
                    type="button"
                    onClick={() => setSelectedSizeIndex(idx)}
                    className={`p-3 text-left border rounded-xl transition-all cursor-pointer ${
                      selectedSizeIndex === idx
                        ? 'border-[#1E1511] bg-[#1E1511] text-[#FAF7F2]'
                        : 'border-[#DECBB4] bg-[#FFFDF9] text-[#1E1511] hover:border-[#B5761E]'
                    }`}
                  >
                    <div className="font-semibold text-xs leading-snug">{s.name}</div>
                    <div className="text-[11px] opacity-80 mt-0.5">{s.serves}</div>
                    <div className="font-serif font-bold text-sm mt-2 tabular-nums">
                      ${s.price}
                    </div>
                  </button>
                ))}
              </div>

              {/* Quantity and Gift Note */}
              <div className="flex flex-wrap items-center justify-between gap-4 pt-2">
                <div className="flex items-center gap-2">
                  <span className="text-xs font-medium text-[#5B4738]">Quantity:</span>
                  <div className="flex items-center border border-[#DECBB4] rounded-lg bg-white overflow-hidden">
                    <button
                      type="button"
                      onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                      className="p-1.5 hover:bg-[#F2E8D8] text-[#5B4738] transition-colors"
                      aria-label="Decrease quantity"
                    >
                      <Minus className="w-3.5 h-3.5" />
                    </button>
                    <span className="w-8 text-center text-xs font-semibold text-[#1E1511] tabular-nums">
                      {quantity}
                    </span>
                    <button
                      type="button"
                      onClick={() => setQuantity((q) => q + 1)}
                      className="p-1.5 hover:bg-[#F2E8D8] text-[#5B4738] transition-colors"
                      aria-label="Increase quantity"
                    >
                      <Plus className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={() => setShowGiftInput(!showGiftInput)}
                  className="text-xs font-medium text-[#B5761E] hover:underline flex items-center gap-1"
                >
                  <Heart className="w-3.5 h-3.5" />
                  <span>{showGiftInput ? 'Hide gift note' : '+ Add complimentary gift note'}</span>
                </button>
              </div>

              {showGiftInput && (
                <div className="mt-2">
                  <textarea
                    value={giftNote}
                    onChange={(e) => setGiftNote(e.target.value)}
                    placeholder="Write a heartfelt gift message to be hand-embossed on gold parchment..."
                    rows={2}
                    maxLength={150}
                    className="w-full p-2.5 text-xs bg-white border border-[#DECBB4] rounded-lg focus:outline-none focus:ring-1 focus:ring-[#C68A29] text-[#1E1511]"
                  />
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Sticky Modal Footer CTA */}
        <div className="p-4 sm:p-6 bg-[#FAF7F2] border-t border-[#EAE0D2] flex items-center justify-between gap-4">
          <div>
            <span className="text-xs text-[#8C6D58] block">Total</span>
            <span className="font-serif text-2xl font-bold text-[#1E1511] tabular-nums">
              ${currentSize.price * quantity}
            </span>
          </div>

          <button
            type="button"
            onClick={handleAdd}
            disabled={isAddedFeedback}
            className={`flex-1 sm:flex-initial px-8 py-3 text-sm font-semibold rounded-lg transition-all cursor-pointer flex items-center justify-center gap-2 shadow-sm ${
              isAddedFeedback
                ? 'bg-[#2E5E32] text-white'
                : 'bg-[#1E1511] text-[#FAF7F2] hover:bg-[#34241C]'
            }`}
          >
            {isAddedFeedback ? (
              <>
                <Check className="w-4 h-4" />
                <span>Added to Bag!</span>
              </>
            ) : (
              <>
                <span>Add to Bag</span>
                <span className="opacity-75">·</span>
                <span className="tabular-nums font-mono">${currentSize.price * quantity}</span>
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};
