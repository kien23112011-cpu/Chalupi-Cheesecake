import React, { useState } from 'react';
import { Plus, Check, Eye } from 'lucide-react';
import { CheesecakeProduct, CartItem } from '../types';
import { CheesecakeVisual } from './CheesecakeVisual';

interface ProductCardProps {
  product: CheesecakeProduct;
  onAddToCart: (item: Omit<CartItem, 'cartItemId'>) => void;
  onQuickView: (product: CheesecakeProduct) => void;
}

export const ProductCard: React.FC<ProductCardProps> = ({
  product,
  onAddToCart,
  onQuickView,
}) => {
  const [selectedSizeIndex, setSelectedSizeIndex] = useState(0);
  const [isAddedFeedback, setIsAddedFeedback] = useState(false);

  const currentSize = product.sizes[selectedSizeIndex];

  const handleAdd = () => {
    onAddToCart({
      productId: product.id,
      productName: product.name,
      productSlug: product.slug,
      sizeId: currentSize.id,
      sizeName: currentSize.name,
      price: currentSize.price,
      quantity: 1,
      accentColor: product.palette.accent,
    });

    setIsAddedFeedback(true);
    setTimeout(() => {
      setIsAddedFeedback(false);
    }, 1500);
  };

  return (
    <div className="group relative bg-[#FFFDF9] border border-[#EAE0D2] rounded-xl overflow-hidden transition-all duration-300 hover:shadow-lg hover:-translate-y-0.5 hover:border-[#D5C2AA] flex flex-col justify-between">
      {/* Top Image Area (65-75% card visual presentation) */}
      <div className="relative">
        <CheesecakeVisual product={product} size="md" />

        {/* Quick View Button on Hover */}
        <button
          type="button"
          onClick={() => onQuickView(product)}
          className="absolute top-3 left-3 flex items-center gap-1.5 px-2.5 py-1 text-[11px] font-medium text-[#1E1511] bg-[#FAF7F2]/90 backdrop-blur-sm border border-[#DECDBB] rounded-md opacity-0 group-hover:opacity-100 transition-opacity duration-200 hover:bg-[#FAF7F2] cursor-pointer shadow-sm"
        >
          <Eye className="w-3 h-3 text-[#B5761E]" />
          <span>Quick View</span>
        </button>

        {/* Subtle Text Tag (Never pill badge sandwich) */}
        {product.badge && (
          <span className="absolute top-3 right-3 text-[11px] font-medium tracking-wide uppercase text-[#B5761E] bg-[#FAF7F2]/90 backdrop-blur-sm border border-[#DECDBB] px-2 py-0.5 rounded">
            {product.badge}
          </span>
        )}
      </div>

      {/* Body Metadata & Purchase Controls */}
      <div className="p-5 flex flex-col flex-grow justify-between">
        <div>
          {/* Category & Rating (Unboxed clean text with separators) */}
          <div className="flex items-center gap-2 text-xs text-[#8C6D58] mb-1.5">
            <span className="uppercase tracking-wider font-semibold text-[#A86F1D]">
              {product.bakeStyle}
            </span>
            <span aria-hidden="true">·</span>
            <span className="tabular-nums font-medium text-[#1E1511]">
              ★ {product.rating} ({product.reviewCount})
            </span>
          </div>

          {/* Product Name */}
          <h3 className="font-serif text-lg font-bold text-[#1E1511] leading-snug mb-2 group-hover:text-[#B5761E] transition-colors">
            {product.name}
          </h3>

          {/* Tagline / Brief Description */}
          <p className="text-xs text-[#634E3E] line-clamp-2 leading-relaxed mb-4">
            {product.tagline}
          </p>

          {/* Tasting notes list */}
          <div className="text-[11px] text-[#806755] mb-4 flex items-center gap-1 flex-wrap">
            <span className="font-semibold text-[#1E1511]">Notes:</span>
            {product.tastingNotes.slice(0, 3).map((note, idx) => (
              <React.Fragment key={note}>
                <span>{note}</span>
                {idx < 2 && <span aria-hidden="true">·</span>}
              </React.Fragment>
            ))}
          </div>
        </div>

        {/* Purchase Module: Size Selection & Add to Cart */}
        <div className="pt-3 border-t border-[#EFE5D8]">
          {/* Size segmented tabs */}
          <div className="flex items-center gap-1 p-1 bg-[#F4EDE2] rounded-lg mb-3">
            {product.sizes.map((s, idx) => (
              <button
                key={s.id}
                type="button"
                onClick={() => setSelectedSizeIndex(idx)}
                className={`flex-1 py-1 px-1.5 text-[11px] font-medium rounded-md transition-all whitespace-nowrap truncate cursor-pointer ${
                  selectedSizeIndex === idx
                    ? 'bg-[#1E1511] text-[#FAF7F2] shadow-xs'
                    : 'text-[#634E3E] hover:text-[#1E1511]'
                }`}
              >
                {s.name.replace(' Whole Cake', '').replace(' (2-Pack)', '').replace(' (4-Pack)', '')}
              </button>
            ))}
          </div>

          {/* Price & Action Row */}
          <div className="flex items-center justify-between gap-3">
            <div>
              <div className="text-base font-serif font-bold text-[#1E1511] tabular-nums">
                ${currentSize.price}
              </div>
              <div className="text-[10px] text-[#8C6D58]">
                {currentSize.serves}
              </div>
            </div>

            <button
              type="button"
              onClick={handleAdd}
              disabled={isAddedFeedback}
              className={`flex items-center gap-1.5 px-3.5 py-2 text-xs font-semibold rounded-lg transition-all cursor-pointer whitespace-nowrap shrink-0 shadow-xs ${
                isAddedFeedback
                  ? 'bg-[#2E5E32] text-white'
                  : 'bg-[#1E1511] text-[#FAF7F2] hover:bg-[#34241C]'
              }`}
            >
              {isAddedFeedback ? (
                <>
                  <Check className="w-3.5 h-3.5" />
                  <span>Added!</span>
                </>
              ) : (
                <>
                  <Plus className="w-3.5 h-3.5 text-[#E5A738]" />
                  <span>Add to Bag</span>
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
