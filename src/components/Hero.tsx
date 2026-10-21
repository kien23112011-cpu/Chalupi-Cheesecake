import React from 'react';
import { ArrowDown, Sparkles, Clock, ShieldCheck, Award } from 'lucide-react';
import { CheesecakeProduct } from '../types';
import { CheesecakeVisual } from './CheesecakeVisual';

interface HeroProps {
  featuredProduct: CheesecakeProduct;
  onExploreMenu: () => void;
  onOpenTastingBuilder: () => void;
  onQuickView: (product: CheesecakeProduct) => void;
}

export const Hero: React.FC<HeroProps> = ({
  featuredProduct,
  onExploreMenu,
  onOpenTastingBuilder,
  onQuickView,
}) => {
  return (
    <section id="top" className="relative pt-6 pb-16 md:pt-10 md:pb-24 overflow-hidden">
      {/* Background radial atmosphere */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-full -z-10 pointer-events-none opacity-40">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-[#E8BA60]/20 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-[#C68A29]/15 rounded-full blur-3xl" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Main 2-Column Split Hero */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
          {/* Left Column: Brand Story & Call to Action */}
          <div className="lg:col-span-7 flex flex-col items-start">
            {/* The signature logo emblem badge & Founder Callout */}
            <div className="mb-6 flex flex-wrap items-center gap-3">
              <div className="inline-block rounded-2xl bg-gradient-to-r from-[#DFCAB3]/40 via-[#F5ECE0] to-[#DFCAB3]/40 p-1.5 shadow-sm border border-[#E2D2BE]">
                <img
                  src="/assets/aistudio/image_a5528e2b.png"
                  alt="Chalupi Cheesecake - Chalupi Cheesecake has the Best Bake"
                  className="w-full max-w-sm sm:max-w-md h-auto object-contain rounded-xl"
                />
              </div>

              {/* Leadership Mini Trust Cards */}
              <div className="flex flex-wrap items-center gap-2">
                <a
                  href="#founder"
                  className="flex items-center gap-2 px-2.5 py-1.5 bg-[#FFFDF9] border border-[#DFCBB5] rounded-xl hover:bg-[#F5ECE0] transition-colors shadow-xs"
                >
                  <img
                    src="/assets/aistudio/image_dcf68a45.png"
                    alt="CEO Yusuf Bagher Zadeh"
                    className="w-8 h-8 rounded-full object-cover border-2 border-[#C68A29] shadow-xs"
                  />
                  <div className="text-left text-xs">
                    <span className="text-[9px] uppercase font-bold text-[#8C6D58] tracking-wider block">
                      Chief Executive Officer
                    </span>
                    <span className="font-serif font-bold text-[#1E1511] text-[11px] sm:text-xs">
                      Yusuf Bagher Zadeh
                    </span>
                  </div>
                </a>

                <a
                  href="#founder"
                  className="flex items-center gap-2 px-2.5 py-1.5 bg-[#FFFDF9] border border-[#DFCBB5] rounded-xl hover:bg-[#F5ECE0] transition-colors shadow-xs"
                >
                  <img
                    src="/assets/aistudio/image_725b165d.png"
                    alt="Founder Mohamad Mneimneh"
                    className="w-8 h-8 rounded-full object-cover border-2 border-[#C68A29] shadow-xs"
                  />
                  <div className="text-left text-xs">
                    <span className="text-[9px] uppercase font-bold text-[#8C6D58] tracking-wider block">
                      Founder & Master Baker
                    </span>
                    <span className="font-serif font-bold text-[#1E1511] text-[11px] sm:text-xs">
                      Mohamad Mneimneh
                    </span>
                  </div>
                </a>

                <a
                  href="#founder"
                  className="flex items-center gap-2 px-2.5 py-1.5 bg-[#FFFDF9] border border-[#DFCBB5] rounded-xl hover:bg-[#F5ECE0] transition-colors shadow-xs"
                >
                  <img
                    src="/assets/aistudio/image_ffb8ac0a.png"
                    alt="Marketing Director Kien Phan"
                    className="w-8 h-8 rounded-full object-cover border-2 border-[#C68A29] shadow-xs"
                  />
                  <div className="text-left text-xs">
                    <span className="text-[9px] uppercase font-bold text-[#8C6D58] tracking-wider block">
                      Marketing Director
                    </span>
                    <span className="font-serif font-bold text-[#1E1511] text-[11px] sm:text-xs">
                      Kien Phan
                    </span>
                  </div>
                </a>
              </div>
            </div>

            {/* Core Brand Headline with text-wrap: balance */}
            <h1 className="font-serif text-3xl sm:text-5xl lg:text-[3.5rem] leading-[1.12] text-[#1E1511] font-bold tracking-tight text-balance mb-6">
              Chalupi Cheesecake has the <span className="text-[#B5761E] italic">Best Bake</span>.
            </h1>

            {/* Editorial Subtitle */}
            <p className="text-base sm:text-lg text-[#5B4738] leading-relaxed max-w-2xl mb-8">
              Led by CEO <strong>Yusuf Bagher Zadeh</strong>, founded by master baker <strong>Mohamad Mneimneh</strong>, and directed by <strong>Kien Phan</strong>.
              Caramelized to amber perfection on the outside, weightless molten velvet within.
              Slow-waterbath baked using single-herd cultured Wisconsin cream, hand-scraped Tahitian vanilla,
              and a 14-hour temperature tempering rest that unlocks unprecedented silkiness.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-wrap items-center gap-4 mb-10 w-full sm:w-auto">
              <button
                type="button"
                onClick={onExploreMenu}
                className="w-full sm:w-auto px-6 py-3.5 text-sm font-semibold text-[#FAF7F2] bg-[#1E1511] hover:bg-[#34241C] rounded-lg transition-all shadow-md hover:shadow-lg flex items-center justify-center gap-2 group whitespace-nowrap cursor-pointer"
              >
                <span>Explore The Bakes</span>
                <ArrowDown className="w-4 h-4 text-[#E5A738] group-hover:translate-y-0.5 transition-transform" />
              </button>

              <button
                type="button"
                onClick={onOpenTastingBuilder}
                className="w-full sm:w-auto px-6 py-3.5 text-sm font-semibold text-[#1E1511] bg-[#F2E8D8] border border-[#DFCBB5] hover:bg-[#EBDDC8] rounded-lg transition-all flex items-center justify-center gap-2 whitespace-nowrap cursor-pointer"
              >
                <Sparkles className="w-4 h-4 text-[#C68A29]" />
                <span>Curate 4-Slice Flight</span>
              </button>
            </div>

            {/* Proof Points & Adjacency */}
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 pt-6 border-t border-[#E8DCCF] w-full text-xs text-[#6B5342]">
              <div className="flex items-center gap-2">
                <Award className="w-4 h-4 text-[#C68A29] shrink-0" />
                <span>4.9★ from 1,280+ Connoisseurs</span>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4 text-[#C68A29] shrink-0" />
                <span>14-Hour Temperature Tempering</span>
              </div>
              <div className="flex items-center gap-2 col-span-2 sm:col-span-1">
                <ShieldCheck className="w-4 h-4 text-[#C68A29] shrink-0" />
                <span>Next-Day Chilled Insulated Courier</span>
              </div>
            </div>
          </div>

          {/* Right Column: Hero Spotlight Cake Card */}
          <div className="lg:col-span-5">
            <div className="relative bg-[#FFFDF9] border border-[#E8DCCF] rounded-2xl shadow-xl overflow-hidden p-6 transition-all hover:border-[#D1B898]">
              {/* Card Header Kicker (Unboxed text) */}
              <div className="flex items-center justify-between gap-2 text-xs text-[#8C6D58] mb-3">
                <span className="font-semibold uppercase tracking-wider text-[#B5761E]">
                  {featuredProduct.badge || 'Signature Creation'}
                </span>
                <span aria-hidden="true">·</span>
                <span>Waterbath Steam Bake</span>
                <span aria-hidden="true">·</span>
                <span className="font-semibold text-[#1E1511]">{featuredProduct.rating} ★</span>
              </div>

              {/* Title & Price */}
              <div className="flex items-baseline justify-between mb-4">
                <h3 className="font-serif text-2xl font-bold text-[#1E1511]">
                  {featuredProduct.name}
                </h3>
                <span className="font-serif text-xl font-bold text-[#1E1511] tabular-nums">
                  ${featuredProduct.sizes[0].price}
                </span>
              </div>

              {/* Visual Model */}
              <div className="rounded-xl overflow-hidden border border-[#EAE0D2] mb-5">
                <CheesecakeVisual product={featuredProduct} size="lg" showSliceToggle={true} />
              </div>

              {/* Flavor Profile Tasting Strip */}
              <div className="text-xs text-[#665040] mb-4">
                <span className="font-semibold text-[#1E1511]">Tasting Notes: </span>
                <span>{featuredProduct.tastingNotes.join(' · ')}</span>
              </div>

              {/* Quick Action */}
              <div className="flex items-center gap-3">
                <button
                  type="button"
                  onClick={() => onQuickView(featuredProduct)}
                  className="w-full py-2.5 px-4 text-xs font-semibold uppercase tracking-wider text-[#1E1511] bg-[#F4ECDF] hover:bg-[#EBDCC8] border border-[#DECBB4] rounded-lg transition-colors cursor-pointer"
                >
                  View Tasting & Ingredients
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Full-width 4-Column Quality Pillar Strip below hero split */}
        <div className="mt-14 pt-8 border-t border-[#E8DCCF] grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
          <div className="flex flex-col items-center p-3">
            <span className="font-serif text-lg font-bold text-[#1E1511]">100% Real Dairy</span>
            <span className="text-xs text-[#705645] mt-1">Single-herd cultured cream with 38% pure butterfat</span>
          </div>
          <div className="flex flex-col items-center p-3">
            <span className="font-serif text-lg font-bold text-[#1E1511]">The Basque Crown</span>
            <span className="text-xs text-[#705645] mt-1">480°F caramelized scorched crust with molten center</span>
          </div>
          <div className="flex flex-col items-center p-3">
            <span className="font-serif text-lg font-bold text-[#1E1511]">Slow Waterbath</span>
            <span className="text-xs text-[#705645] mt-1">3.5-hour gentle steam bath eliminates cracks and dry crumb</span>
          </div>
          <div className="flex flex-col items-center p-3">
            <span className="font-serif text-lg font-bold text-[#1E1511]">Peak Silkiness</span>
            <span className="text-xs text-[#705645] mt-1">Temperature calibrated to serve at a luxurious 64°F</span>
          </div>
        </div>
      </div>
    </section>
  );
};
