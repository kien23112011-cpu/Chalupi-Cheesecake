import React from 'react';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-[#1E1511] text-[#FAF7F2] border-t border-[#34241C] pt-16 pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 pb-12 border-b border-[#34241C]">
          {/* Brand Column */}
          <div className="md:col-span-5 space-y-4">
            <div className="flex items-center gap-3">
              <img
                src="/assets/aistudio/image_a5528e2b.png"
                alt="Chalupi Cheesecake"
                className="h-14 w-auto object-contain brightness-95"
              />
              <div>
                <span className="font-serif text-2xl font-bold tracking-tight block">
                  Chalupi Cheesecake
                </span>
                <span className="text-[10px] tracking-[0.25em] uppercase text-[#C68A29] font-semibold">
                  Artisanal Bakehouse
                </span>
              </div>
            </div>

            <p className="text-xs text-[#BFAFA0] leading-relaxed max-w-sm">
              Handcrafted in micro-batches using 100% grass-fed cultured cream, slow waterbath steam convection,
              and our signature high-heat Basque scorched caramelization.
            </p>

            <div className="text-xs text-[#E5A738] font-serif italic">
              ♦ Chalupi Cheesecake has the Best Bake ♦
            </div>
          </div>

          {/* Quick Nav Links */}
          <div className="md:col-span-2 space-y-3">
            <span className="text-xs font-bold uppercase tracking-widest text-[#E5A738] block">
              The Menu
            </span>
            <ul className="space-y-2 text-xs text-[#BFAFA0]">
              <li><a href="#bakes" className="hover:text-white transition-colors">The Classic Gold</a></li>
              <li><a href="#bakes" className="hover:text-white transition-colors">San Sebastián Basque</a></li>
              <li><a href="#bakes" className="hover:text-white transition-colors">Bronte Pistachio & Berry</a></li>
              <li><a href="#bakes" className="hover:text-white transition-colors">Espresso Truffle</a></li>
              <li><a href="#bakes" className="hover:text-white transition-colors">Tasting Flights</a></li>
            </ul>
          </div>

          {/* The Craft */}
          <div className="md:col-span-2 space-y-3">
            <span className="text-xs font-bold uppercase tracking-widest text-[#E5A738] block">
              Craft & Care
            </span>
            <ul className="space-y-2 text-xs text-[#BFAFA0]">
              <li><a href="#founder" className="hover:text-white transition-colors">Leadership Team</a></li>
              <li><a href="#craft" className="hover:text-white transition-colors">The 4-Step Bake</a></li>
              <li><a href="#craft" className="hover:text-white transition-colors">Serving Temperature</a></li>
              <li><a href="#bakehouse" className="hover:text-white transition-colors">Chilled Shipping</a></li>
              <li><a href="#bakehouse" className="hover:text-white transition-colors">Bakehouse Pickup</a></li>
              <li><a href="#reviews" className="hover:text-white transition-colors">Customer Acclaim</a></li>
            </ul>
          </div>

          {/* Bakehouse Hours & Location */}
          <div className="md:col-span-3 space-y-3">
            <span className="text-xs font-bold uppercase tracking-widest text-[#E5A738] block">
              Flagship Bakehouse
            </span>
            <div className="text-xs text-[#BFAFA0] space-y-1">
              <p className="font-semibold text-white">418 Grand Artisan Avenue</p>
              <p>Pastry Row, Suite B</p>
              <p className="pt-2 text-[#E5A738]">Pickup Window: Daily 8am – 6:30pm</p>
              <p className="pt-2">Chief Executive Officer: Yusuf Bagher Zadeh</p>
              <p>Founder & Master Baker: Mohamad Mneimneh</p>
              <p>Marketing Director: Kien Phan</p>
              <p>Executive Office: yusuf@chalupicheesecake.com</p>
            </div>
          </div>
        </div>

        {/* Quiet Copyright & Legal Notice */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[#8C7A6D]">
          <div>
            © {new Date().getFullYear()} Chalupi Cheesecake Co. CEO: Yusuf Bagher Zadeh · Founder: Mohamad Mneimneh. All rights reserved.
          </div>
          <div className="flex items-center gap-4 text-[11px]">
            <span>100% Real Wisconsin Dairy</span>
            <span aria-hidden="true">·</span>
            <span>Handmade Daily</span>
            <span aria-hidden="true">·</span>
            <span>Allergen Transparency</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
