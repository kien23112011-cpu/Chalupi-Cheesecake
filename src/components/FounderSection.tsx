import React from 'react';
import { Award, Sparkles, TrendingUp, Briefcase, HeartHandshake, ShieldCheck } from 'lucide-react';

interface FounderSectionProps {
  onExploreBakes: () => void;
  onOpenTastingBuilder: () => void;
}

export const FounderSection: React.FC<FounderSectionProps> = ({
  onExploreBakes,
  onOpenTastingBuilder,
}) => {
  return (
    <section id="founder" className="py-16 md:py-24 bg-[#FAF5EC] border-t border-[#DFCBB5] relative overflow-hidden">
      {/* Background warmth */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-[#C68A29]/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-[#B5761E]/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="max-w-3xl mx-auto text-center mb-16">
          <div className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-widest text-[#B5761E] mb-3">
            <span>The Leadership Behind The Bake</span>
            <span aria-hidden="true">·</span>
            <span>Chalupi Executive Team</span>
          </div>
          <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold text-[#1E1511] leading-tight text-balance mb-4">
            Meet the Minds Shaping the <span className="text-[#B5761E] italic">Best Bake</span>
          </h2>
          <p className="text-sm sm:text-base text-[#685343] leading-relaxed">
            From executive leadership and culinary innovation to our nationwide luxury unboxing experience,
            Chalupi Cheesecake is driven by an uncompromising standard of excellence.
          </p>
        </div>

        {/* 3-Column Executive Leadership Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          {/* Card 1: Yusuf Bagher Zadeh - Chief Executive Officer (CEO) */}
          <div className="group relative bg-[#FFFDF9] rounded-2xl border-2 border-[#DFCBB5] overflow-hidden shadow-lg hover:border-[#C68A29] transition-all flex flex-col justify-between">
            <div className="relative aspect-[4/5] overflow-hidden bg-[#1E1511]">
              <img
                src="/assets/aistudio/image_dcf68a45.png"
                alt="Yusuf Bagher Zadeh - Chief Executive Officer of Chalupi Cheesecake"
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-103"
              />

              {/* Gradient Scrim & Identity */}
              <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-[#1E1511] via-[#1E1511]/75 to-transparent p-6 text-white">
                <div className="flex items-center gap-2 text-xs text-[#E5A738] font-semibold uppercase tracking-wider mb-1">
                  <Briefcase className="w-3.5 h-3.5" />
                  <span>Chief Executive Officer</span>
                </div>
                <h3 className="font-serif text-2xl font-bold tracking-tight text-[#FAF7F2]">
                  Yusuf Bagher Zadeh
                </h3>
                <p className="text-xs text-[#DECBB4] mt-1 font-light">
                  Strategic Scale, Supply Chain Integrity & Expansion
                </p>
              </div>
            </div>

            {/* Yusuf's Story & Quote */}
            <div className="p-6 flex flex-col flex-1 justify-between space-y-4">
              <div className="space-y-3">
                <blockquote className="font-serif text-xs sm:text-sm text-[#4A382A] italic leading-relaxed">
                  "Our vision for Chalupi is simple: make the finest handcrafted cheesecake accessible across the nation without sacrificing a single ounce of artisanal integrity. By backing culinary mastery with operational precision, we guarantee perfection."
                </blockquote>
                <p className="text-xs text-[#6B5342] leading-relaxed">
                  Yusuf directs global operations, cold-chain logistics scaling, single-origin purveyor partnerships, and national bakehouse footprint expansion.
                </p>
              </div>

              {/* Key Competency Badges */}
              <div className="pt-4 border-t border-[#EAE0D2] flex flex-wrap gap-1.5 text-[10px] font-semibold text-[#8C6D58]">
                <span className="px-2 py-0.5 bg-[#F5ECE0] rounded">Executive Strategy</span>
                <span className="px-2 py-0.5 bg-[#F5ECE0] rounded">Cold-Chain Scale</span>
                <span className="px-2 py-0.5 bg-[#F5ECE0] rounded">Operational Quality</span>
              </div>
            </div>
          </div>

          {/* Card 2: Mohamad Mneimneh - Founder & Master Baker */}
          <div className="group relative bg-[#FFFDF9] rounded-2xl border-2 border-[#DFCBB5] overflow-hidden shadow-lg hover:border-[#C68A29] transition-all flex flex-col justify-between">
            <div className="relative aspect-[4/5] overflow-hidden bg-[#1E1511]">
              <img
                src="/assets/aistudio/image_725b165d.png"
                alt="Mohamad Mneimneh - Founder & Master Baker of Chalupi Cheesecake"
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-103"
              />

              {/* Gradient Scrim & Identity */}
              <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-[#1E1511] via-[#1E1511]/75 to-transparent p-6 text-white">
                <div className="flex items-center gap-2 text-xs text-[#E5A738] font-semibold uppercase tracking-wider mb-1">
                  <Award className="w-3.5 h-3.5" />
                  <span>Founder & Master Baker</span>
                </div>
                <h3 className="font-serif text-2xl font-bold tracking-tight text-[#FAF7F2]">
                  Mohamad Mneimneh
                </h3>
                <p className="text-xs text-[#DECBB4] mt-1 font-light">
                  Creator of the 14-Hour Graduated Temperature Curve
                </p>
              </div>
            </div>

            {/* Mohamad's Story & Quote */}
            <div className="p-6 flex flex-col flex-1 justify-between space-y-4">
              <div className="space-y-3">
                <blockquote className="font-serif text-xs sm:text-sm text-[#4A382A] italic leading-relaxed">
                  "Great cheesecake isn’t baked in haste. Over 140 trial bakes taught us that combining high-heat Basque caramelization with a gentle steam bath and a 14-hour rest yields an unprecedented level of dairy silkiness."
                </blockquote>
                <p className="text-xs text-[#6B5342] leading-relaxed">
                  Mohamad spearheads kitchen innovation, grass-fed 38% butterfat dairy selection, recipe formulation, and daily baking craftsmanship.
                </p>
              </div>

              {/* Key Competency Badges */}
              <div className="pt-4 border-t border-[#EAE0D2] flex flex-wrap gap-1.5 text-[10px] font-semibold text-[#8C6D58]">
                <span className="px-2 py-0.5 bg-[#F5ECE0] rounded">Basque Caramelization</span>
                <span className="px-2 py-0.5 bg-[#F5ECE0] rounded">Single-Herd Dairy</span>
                <span className="px-2 py-0.5 bg-[#F5ECE0] rounded">14-Hour Thermal Rest</span>
              </div>
            </div>
          </div>

          {/* Card 3: Kien Phan - Marketing Director */}
          <div className="group relative bg-[#FFFDF9] rounded-2xl border-2 border-[#DFCBB5] overflow-hidden shadow-lg hover:border-[#C68A29] transition-all flex flex-col justify-between">
            <div className="relative aspect-[4/5] overflow-hidden bg-[#1E1511]">
              <img
                src="/assets/aistudio/image_ffb8ac0a.png"
                alt="Kien Phan - Marketing Director of Chalupi Cheesecake"
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-103"
              />

              {/* Gradient Scrim & Identity */}
              <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-[#1E1511] via-[#1E1511]/75 to-transparent p-6 text-white">
                <div className="flex items-center gap-2 text-xs text-[#E5A738] font-semibold uppercase tracking-wider mb-1">
                  <TrendingUp className="w-3.5 h-3.5" />
                  <span>Marketing Director</span>
                </div>
                <h3 className="font-serif text-2xl font-bold tracking-tight text-[#FAF7F2]">
                  Kien Phan
                </h3>
                <p className="text-xs text-[#DECBB4] mt-1 font-light">
                  Architect of the Luxury Unboxing & Nationwide Brand Journey
                </p>
              </div>
            </div>

            {/* Kien's Story & Quote */}
            <div className="p-6 flex flex-col flex-1 justify-between space-y-4">
              <div className="space-y-3">
                <blockquote className="font-serif text-xs sm:text-sm text-[#4A382A] italic leading-relaxed">
                  "A world-class cheesecake deserves an uncompromising brand experience. From the embossed gold founder seal on our honeycomb packaging to the temperature it arrives at your table, every order is treated like fine dining."
                </blockquote>
                <p className="text-xs text-[#6B5342] leading-relaxed">
                  Kien leads brand architecture, experiential packaging, curated tasting flight drops, and customer engagement across all digital channels.
                </p>
              </div>

              {/* Key Competency Badges */}
              <div className="pt-4 border-t border-[#EAE0D2] flex flex-wrap gap-1.5 text-[10px] font-semibold text-[#8C6D58]">
                <span className="px-2 py-0.5 bg-[#F5ECE0] rounded">Luxury Unboxing</span>
                <span className="px-2 py-0.5 bg-[#F5ECE0] rounded">Nationwide Courier</span>
                <span className="px-2 py-0.5 bg-[#F5ECE0] rounded">Taste Community</span>
              </div>
            </div>
          </div>
        </div>

        {/* Unified Leadership Philosophy Banner */}
        <div className="p-6 sm:p-8 rounded-2xl bg-[#F2E8D8] border border-[#DFCBB5] flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="space-y-2 text-center md:text-left">
            <div className="text-xs font-bold uppercase tracking-wider text-[#B5761E] flex items-center justify-center md:justify-start gap-1.5">
              <HeartHandshake className="w-4 h-4" />
              <span>Vision, Craft & Guest Experience</span>
            </div>
            <h4 className="font-serif text-xl sm:text-2xl font-bold text-[#1E1511]">
              Led by CEO Yusuf Bagher Zadeh · Founded by Mohamad Mneimneh · Directed by Kien Phan
            </h4>
            <p className="text-xs text-[#705645] max-w-xl">
              Every Chalupi order reflects the unified dedication of our executive team to deliver the Best Bake in the world.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <button
              type="button"
              onClick={onExploreBakes}
              className="px-5 py-2.5 text-xs font-bold uppercase tracking-wider text-[#FAF7F2] bg-[#1E1511] hover:bg-[#34241C] rounded-lg transition-all shadow-sm cursor-pointer"
            >
              Explore The Bakes
            </button>
            <button
              type="button"
              onClick={onOpenTastingBuilder}
              className="px-5 py-2.5 text-xs font-bold uppercase tracking-wider text-[#1E1511] bg-[#FFFDF9] border border-[#DFCBB5] hover:bg-[#FAF4EA] rounded-lg transition-all flex items-center gap-1.5 cursor-pointer"
            >
              <Sparkles className="w-3.5 h-3.5 text-[#C68A29]" />
              <span>Curate Flight</span>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};
