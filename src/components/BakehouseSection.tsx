import React, { useState } from 'react';
import { MapPin, Truck, Clock, ChevronDown, ChevronUp, PackageCheck, ThermometerSnowflake } from 'lucide-react';
import { FAQS } from '../data/products';

export const BakehouseSection: React.FC = () => {
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(0);

  const toggleFaq = (index: number) => {
    setOpenFaqIndex(openFaqIndex === index ? null : index);
  };

  return (
    <section id="bakehouse" className="py-16 md:py-24 bg-[#F2E8D8] border-t border-[#DFCBB5]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          {/* Left Column: Logistics & Bakehouse Pick-Up */}
          <div className="lg:col-span-6 space-y-8">
            <div>
              <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-widest text-[#B5761E] mb-2">
                <span>The Flagship Bakehouse</span>
                <span aria-hidden="true">·</span>
                <span>Fresh Daily Batches</span>
              </div>
              <h2 className="font-serif text-3xl sm:text-4xl font-bold text-[#1E1511] leading-tight mb-4">
                Pick Up Fresh or Ship Nationwide
              </h2>
              <p className="text-sm sm:text-base text-[#614D3E] leading-relaxed">
                Whether you visit our aroma-filled kitchen counter or order for nationwide celebration delivery,
                your cheesecake leaves our care in thermal-insulated perfection.
              </p>
            </div>

            {/* Local Pickup Card */}
            <div className="bg-[#FAF7F2] p-6 rounded-2xl border border-[#DFCBB5] shadow-xs">
              <div className="flex items-start gap-4">
                <div className="p-3 bg-[#EAE0D0] rounded-xl text-[#C68A29] shrink-0">
                  <MapPin className="w-5 h-5" />
                </div>
                <div className="flex-1">
                  <h3 className="font-serif text-lg font-bold text-[#1E1511] mb-1">
                    Flagship Bakehouse Counter
                  </h3>
                  <p className="text-xs text-[#705645] mb-3">
                    418 Grand Artisan Avenue, Pastry Row · Kitchen Window 2
                  </p>
                  <div className="flex flex-wrap items-center gap-4 text-xs text-[#5B4738] pt-2 border-t border-[#EAE0D2]">
                    <span className="flex items-center gap-1.5 font-medium">
                      <Clock className="w-3.5 h-3.5 text-[#C68A29]" />
                      Daily: 8:00 AM – 6:30 PM
                    </span>
                    <span className="flex items-center gap-1.5 font-medium">
                      <PackageCheck className="w-3.5 h-3.5 text-[#2E5E32]" />
                      Ready in 2 Hours (Same-Day)
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Nationwide Insulated Shipping Card */}
            <div className="bg-[#FAF7F2] p-6 rounded-2xl border border-[#DFCBB5] shadow-xs">
              <div className="flex items-start gap-4">
                <div className="p-3 bg-[#EAE0D0] rounded-xl text-[#C68A29] shrink-0">
                  <Truck className="w-5 h-5" />
                </div>
                <div className="flex-1">
                  <h3 className="font-serif text-lg font-bold text-[#1E1511] mb-1">
                    Insulated Express Chilled Courier
                  </h3>
                  <p className="text-xs text-[#705645] mb-3">
                    Shipped with custom frozen dry-gel refrigerant packs in biodegradable insulated honeycomb coolers.
                  </p>
                  <div className="flex flex-wrap items-center gap-4 text-xs text-[#5B4738] pt-2 border-t border-[#EAE0D2]">
                    <span className="flex items-center gap-1.5 font-medium">
                      <ThermometerSnowflake className="w-3.5 h-3.5 text-[#3A6B88]" />
                      Guaranteed 34°F – 38°F Arrival
                    </span>
                    <span className="text-xs text-[#8C6D58]">
                      Free shipping on orders over $65
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: FAQ Accordion */}
          <div className="lg:col-span-6 bg-[#FAF7F2] p-6 sm:p-8 rounded-2xl border border-[#DFCBB5] shadow-sm">
            <h3 className="font-serif text-2xl font-bold text-[#1E1511] mb-2">
              Frequently Asked Questions
            </h3>
            <p className="text-xs text-[#755D4C] mb-6">
              Insights on storing, slicing, serving temperatures, and gift orders.
            </p>

            <div className="space-y-3">
              {FAQS.map((faq, idx) => {
                const isOpen = openFaqIndex === idx;
                return (
                  <div
                    key={idx}
                    className="border border-[#EAE0D2] rounded-xl overflow-hidden bg-white/70 transition-colors"
                  >
                    <button
                      type="button"
                      onClick={() => toggleFaq(idx)}
                      className="w-full p-4 text-left flex items-center justify-between gap-4 font-semibold text-xs sm:text-sm text-[#1E1511] hover:text-[#B5761E] transition-colors cursor-pointer"
                    >
                      <span>{faq.q}</span>
                      {isOpen ? (
                        <ChevronUp className="w-4 h-4 text-[#8C6D58] shrink-0" />
                      ) : (
                        <ChevronDown className="w-4 h-4 text-[#8C6D58] shrink-0" />
                      )}
                    </button>

                    {isOpen && (
                      <div className="px-4 pb-4 pt-1 text-xs sm:text-sm text-[#614C3C] leading-relaxed border-t border-[#F0E6D8] bg-[#FFFDF9]">
                        {faq.a}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
