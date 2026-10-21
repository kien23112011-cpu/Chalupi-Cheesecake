import React, { useState } from 'react';
import { X, Check, Sparkles, RefreshCw, Plus, Package } from 'lucide-react';
import { CheesecakeProduct, CartItem } from '../types';

interface TastingFlightBuilderProps {
  products: CheesecakeProduct[];
  isOpen: boolean;
  onClose: () => void;
  onAddToCart: (item: Omit<CartItem, 'cartItemId'>) => void;
}

export const TastingFlightBuilder: React.FC<TastingFlightBuilderProps> = ({
  products,
  isOpen,
  onClose,
  onAddToCart,
}) => {
  const [selectedSlots, setSelectedSlots] = useState<(CheesecakeProduct | null)[]>([
    products[0], // Classic Gold
    products[1], // Basque
    products[2], // Pistachio
    null,        // Fourth slot to pick
  ]);
  const [ribbonColor, setRibbonColor] = useState<'Gold Foil' | 'Velvet Crimson' | 'Espresso Leather' | 'Forest Sage'>('Gold Foil');
  const [giftNote, setGiftNote] = useState('');
  const [isAdded, setIsAdded] = useState(false);

  if (!isOpen) return null;

  const FLIGHT_PRICE = 34;

  const handleSelectProduct = (product: CheesecakeProduct, slotIndex: number) => {
    const updated = [...selectedSlots];
    updated[slotIndex] = product;
    setSelectedSlots(updated);
  };

  const handleRemoveSlot = (slotIndex: number) => {
    const updated = [...selectedSlots];
    updated[slotIndex] = null;
    setSelectedSlots(updated);
  };

  const handleAutoFill = () => {
    setSelectedSlots([products[0], products[1], products[2], products[3]]);
  };

  const filledCount = selectedSlots.filter(Boolean).length;
  const isComplete = filledCount === 4;

  const handleAddToCart = () => {
    if (!isComplete) return;

    const flavorNames = selectedSlots.map((p) => p?.name || 'Signature');

    onAddToCart({
      productId: 'tasting-flight-4pk',
      productName: 'The Chalupi 4-Slice Tasting Flight',
      productSlug: 'tasting-flight',
      sizeId: 'minis-4pk',
      sizeName: 'Custom 4-Slice Flight Box',
      price: FLIGHT_PRICE,
      quantity: 1,
      isTastingFlight: true,
      flightFlavors: flavorNames,
      giftMessage: giftNote.trim() ? `[${ribbonColor} Ribbon] ${giftNote.trim()}` : `[${ribbonColor} Ribbon]`,
      accentColor: '#C68A29',
    });

    setIsAdded(true);
    setTimeout(() => {
      setIsAdded(false);
      onClose();
    }, 1200);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm overflow-y-auto">
      <div 
        className="relative w-full max-w-4xl bg-[#FAF7F2] rounded-2xl shadow-2xl border border-[#DFCBB5] overflow-hidden my-8 max-h-[92vh] flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="p-6 sm:p-8 border-b border-[#EAE0D2] flex items-start justify-between gap-4 bg-[#F5ECE0]">
          <div>
            <div className="flex items-center gap-2 text-xs text-[#8C6D58] mb-1.5">
              <span className="font-serif italic text-sm text-[#B5761E]">♦ Chalupi Cheesecake has the Best Bake ♦</span>
              <span aria-hidden="true">·</span>
              <span>Artisanal Custom Gift Box</span>
            </div>
            <h2 className="font-serif text-2xl sm:text-3xl font-bold text-[#1E1511]">
              Curate Your 4-Slice Tasting Flight
            </h2>
            <p className="text-xs sm:text-sm text-[#665040] mt-1 max-w-xl">
              Select 4 distinct bakes to experience Chalupi's spectrum of caramelized crusts,
              silken custards, and botanical swirls. Presented in our gold-embossed keepsake gift box.
            </p>
          </div>

          <button
            type="button"
            onClick={onClose}
            aria-label="Close"
            className="p-2 text-[#5B4738] hover:text-[#1E1511] bg-white/70 rounded-full border border-[#D5C1AA] transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content Body */}
        <div className="overflow-y-auto p-6 sm:p-8 space-y-8 flex-1">
          {/* Flight Tray Display (The 4 Box Slots) */}
          <div>
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <Package className="w-4 h-4 text-[#C68A29]" />
                <span className="text-xs font-bold uppercase tracking-wider text-[#1E1511]">
                  Flight Tray ({filledCount}/4 Slices Selected)
                </span>
              </div>
              <button
                type="button"
                onClick={handleAutoFill}
                className="text-xs font-medium text-[#B5761E] hover:underline flex items-center gap-1 cursor-pointer"
              >
                <RefreshCw className="w-3 h-3" />
                <span>Auto-fill with Mohamad's Top 4</span>
              </button>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 p-4 bg-[#EFE5D6] rounded-xl border border-[#DFCBB5]">
              {selectedSlots.map((slot, index) => (
                <div
                  key={index}
                  className={`relative p-4 rounded-xl border flex flex-col justify-between min-h-[140px] transition-all ${
                    slot
                      ? 'bg-[#FFFDF9] border-[#D5C2AA] shadow-sm'
                      : 'border-dashed border-[#C5B099] bg-[#FAF5EC]/60 flex items-center justify-center text-center'
                  }`}
                >
                  {slot ? (
                    <>
                      <div className="flex items-start justify-between gap-1 mb-2">
                        <span className="text-[10px] font-mono text-[#8C6D58] font-semibold">
                          0{index + 1}
                        </span>
                        <button
                          type="button"
                          onClick={() => handleRemoveSlot(index)}
                          className="text-[#8C6D58] hover:text-[#A2422C] p-0.5 rounded transition-colors"
                          title="Remove slice"
                        >
                          <X className="w-3.5 h-3.5" />
                        </button>
                      </div>

                      <div className="flex items-center gap-2 mb-2">
                        <div
                          className="w-4 h-4 rounded-full border border-black/10 shrink-0"
                          style={{ backgroundColor: slot.palette.accent }}
                        />
                        <span className="font-serif font-bold text-xs text-[#1E1511] leading-tight line-clamp-2">
                          {slot.name}
                        </span>
                      </div>

                      <div className="text-[10px] text-[#785E4D] uppercase tracking-wider">
                        {slot.bakeStyle.split(' ')[0]}
                      </div>
                    </>
                  ) : (
                    <div className="py-4 text-center">
                      <span className="w-7 h-7 rounded-full bg-[#E5D7C3] flex items-center justify-center text-[#6B5342] mx-auto mb-2 text-xs font-semibold">
                        {index + 1}
                      </span>
                      <span className="text-xs text-[#7A6351] font-medium block">
                        Select a Flavor Below
                      </span>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Flavor Selection Grid */}
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-[#8C6D58] block mb-3">
              Choose from Chalupi's Bakes
            </span>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-3">
              {products.map((p) => {
                const isSelectedInSlot = selectedSlots.some((s) => s?.id === p.id);
                return (
                  <button
                    key={p.id}
                    type="button"
                    onClick={() => {
                      const firstEmptyIndex = selectedSlots.findIndex((s) => s === null);
                      if (firstEmptyIndex !== -1) {
                        handleSelectProduct(p, firstEmptyIndex);
                      } else {
                        // replace the last slot if all full
                        handleSelectProduct(p, 3);
                      }
                    }}
                    className={`p-3 text-left border rounded-xl transition-all cursor-pointer flex flex-col justify-between ${
                      isSelectedInSlot
                        ? 'border-[#C68A29] bg-[#FFF8EB] shadow-xs'
                        : 'border-[#DFCBB5] bg-[#FFFDF9] hover:border-[#B5761E] hover:bg-[#FAF6EE]'
                    }`}
                  >
                    <div>
                      <div className="flex items-center gap-2 mb-1.5">
                        <div
                          className="w-3.5 h-3.5 rounded-full border border-black/10 shrink-0"
                          style={{ backgroundColor: p.palette.accent }}
                        />
                        <span className="font-serif font-bold text-xs text-[#1E1511] truncate">
                          {p.name}
                        </span>
                      </div>
                      <p className="text-[11px] text-[#6D5544] line-clamp-2 leading-relaxed">
                        {p.tagline}
                      </p>
                    </div>

                    <div className="mt-3 pt-2 border-t border-[#EFE5D8] flex items-center justify-between text-[10px] text-[#8C6D58]">
                      <span>{p.bakeStyle.split(' ')[0]}</span>
                      <span className="font-semibold text-[#B5761E] flex items-center gap-0.5">
                        <Plus className="w-3 h-3" /> Add Slice
                      </span>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Ribbon & Presentation Packaging Customization */}
          <div className="p-4 bg-[#F2E8D8]/70 rounded-xl border border-[#DFCBB5] space-y-4">
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-[#1E1511] block mb-2">
                Complimentary Satin Packaging Ribbon
              </span>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-xs">
                {(['Gold Foil', 'Velvet Crimson', 'Espresso Leather', 'Forest Sage'] as const).map((color) => (
                  <button
                    key={color}
                    type="button"
                    onClick={() => setRibbonColor(color)}
                    className={`p-2.5 rounded-lg border font-medium text-left transition-all cursor-pointer ${
                      ribbonColor === color
                        ? 'border-[#1E1511] bg-[#1E1511] text-[#FAF7F2]'
                        : 'border-[#DFCBB5] bg-white text-[#1E1511] hover:border-[#B5761E]'
                    }`}
                  >
                    {color}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-[#1E1511] block mb-1.5">
                Gift Inscription (Optional)
              </span>
              <input
                type="text"
                value={giftNote}
                onChange={(e) => setGiftNote(e.target.value)}
                placeholder="E.g., Happy 30th Birthday, Sarah! From the team."
                maxLength={120}
                className="w-full p-2.5 text-xs bg-white border border-[#DECBB4] rounded-lg focus:outline-none focus:ring-1 focus:ring-[#C68A29] text-[#1E1511]"
              />
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="p-4 sm:p-6 bg-[#FAF7F2] border-t border-[#EAE0D2] flex items-center justify-between gap-4">
          <div>
            <span className="text-xs text-[#8C6D58] block">Flight Box (4 Slices)</span>
            <span className="font-serif text-2xl font-bold text-[#1E1511] tabular-nums">
              ${FLIGHT_PRICE}
            </span>
          </div>

          <button
            type="button"
            onClick={handleAddToCart}
            disabled={!isComplete || isAdded}
            className={`px-8 py-3 text-sm font-semibold rounded-lg transition-all flex items-center justify-center gap-2 cursor-pointer shadow-sm ${
              !isComplete
                ? 'bg-[#DECBB4] text-[#7A6351] cursor-not-allowed'
                : isAdded
                ? 'bg-[#2E5E32] text-white'
                : 'bg-[#1E1511] text-[#FAF7F2] hover:bg-[#34241C]'
            }`}
          >
            {isAdded ? (
              <>
                <Check className="w-4 h-4" />
                <span>Flight Added to Bag!</span>
              </>
            ) : !isComplete ? (
              <span>Select {4 - filledCount} More {4 - filledCount === 1 ? 'Slice' : 'Slices'}</span>
            ) : (
              <>
                <Sparkles className="w-4 h-4 text-[#E5A738]" />
                <span>Add Custom Flight to Bag · ${FLIGHT_PRICE}</span>
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};
