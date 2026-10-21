import React, { useState } from 'react';
import { ShoppingBag, X } from 'lucide-react';
import { CartItem } from '../types';

interface NavbarProps {
  cart: CartItem[];
  onOpenCart: () => void;
  onOpenTastingBuilder: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  cart,
  onOpenCart,
  onOpenTastingBuilder,
}) => {
  const [showBanner, setShowBanner] = useState(true);
  const totalCartCount = cart.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <div className="sticky top-0 z-40 bg-[#FAF7F2]/95 backdrop-blur-md border-b border-[#EAE0D2]">
      {/* Slim Top Announcement Banner (Dismissible, <= 40px) */}
      {showBanner && (
        <div className="bg-[#1E1511] text-[#FAF7F2] text-xs font-medium py-1.5 px-4 flex items-center justify-between transition-all">
          <div className="mx-auto flex items-center gap-2 text-center truncate">
            <span className="text-[#E5A738] font-serif italic text-sm tracking-wide">♦ Chalupi Cheesecake has the Best Bake ♦</span>
            <span className="hidden sm:inline text-[#E8DCCF]/60">·</span>
            <span className="hidden sm:inline text-[#E8DCCF]">Next-Day Nationwide Chilled Courier & Local Bakehouse Pickup</span>
          </div>
          <button
            type="button"
            onClick={() => setShowBanner(false)}
            aria-label="Dismiss banner"
            className="text-[#E8DCCF]/60 hover:text-[#FAF7F2] ml-2 p-0.5 rounded transition-colors"
          >
            <X className="w-3.5 h-3.5" />
          </button>
        </div>
      )}

      {/* Top Bar Contract: Zone 1, Zone 2, Zone 3 separated by gap-8 */}
      <header className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between gap-8">
        {/* Zone 1: Brand Wordmark with official portrait emblem */}
        <a
          href="#top"
          className="flex items-center gap-3.5 group whitespace-nowrap shrink-0 select-none"
        >
          <img
            src="/assets/aistudio/image_a5528e2b.png"
            alt="Chalupi Cheesecake Founder Emblem"
            className="h-12 w-auto object-contain transition-transform duration-300 group-hover:scale-105 drop-shadow-sm"
          />
          <div className="flex flex-col">
            <span className="font-serif text-2xl font-bold tracking-tight text-[#1E1511] leading-none group-hover:text-[#B5761E] transition-colors">
              Chalupi
            </span>
            <span className="text-[10px] tracking-[0.25em] uppercase text-[#8C6D58] font-medium mt-0.5">
              Cheesecake
            </span>
          </div>
        </a>

        {/* Zone 2: 4-5 single-line navigation links with subtle underlines */}
        <nav className="hidden md:flex items-center gap-7 text-sm font-medium text-[#5B4738]">
          <a
            href="#bakes"
            className="hover:text-[#1E1511] transition-colors whitespace-nowrap shrink-0 hover:underline underline-offset-8 decoration-[#C68A29]"
          >
            The Bakes
          </a>
          <a
            href="#founder"
            className="hover:text-[#1E1511] transition-colors whitespace-nowrap shrink-0 hover:underline underline-offset-8 decoration-[#C68A29]"
          >
            Leadership
          </a>
          <button
            type="button"
            onClick={onOpenTastingBuilder}
            className="hover:text-[#1E1511] transition-colors whitespace-nowrap shrink-0 hover:underline underline-offset-8 decoration-[#C68A29]"
          >
            Tasting Flights
          </button>
          <a
            href="#craft"
            className="hover:text-[#1E1511] transition-colors whitespace-nowrap shrink-0 hover:underline underline-offset-8 decoration-[#C68A29]"
          >
            The Best Bake Craft
          </a>
          <a
            href="#bakehouse"
            className="hover:text-[#1E1511] transition-colors whitespace-nowrap shrink-0 hover:underline underline-offset-8 decoration-[#C68A29]"
          >
            Bakehouse & Delivery
          </a>
        </nav>

        {/* Zone 3: 1 Primary Action (Cart Drawer Trigger + Order Button) */}
        <div className="flex items-center gap-3 shrink-0">
          <button
            type="button"
            onClick={onOpenCart}
            aria-label="View Shopping Cart"
            className="relative flex items-center gap-2.5 px-4 py-2 text-sm font-medium text-[#1E1511] bg-[#F2E8D8] border border-[#DFCBB5] rounded-lg hover:bg-[#EBDDC8] transition-all whitespace-nowrap shrink-0 cursor-pointer"
          >
            <ShoppingBag className="w-4 h-4 text-[#C68A29]" />
            <span className="hidden sm:inline">Bag</span>
            {totalCartCount > 0 && (
              <span className="px-2 py-0.5 text-xs font-semibold bg-[#1E1511] text-[#FAF7F2] rounded-full tabular-nums">
                {totalCartCount}
              </span>
            )}
          </button>

          <a
            href="#bakes"
            className="px-4 py-2 text-sm font-medium text-[#FAF7F2] bg-[#1E1511] border border-[#1E1511] rounded-lg hover:bg-[#34241C] transition-all whitespace-nowrap shrink-0 shadow-sm"
          >
            Order Now
          </a>
        </div>
      </header>
    </div>
  );
};
