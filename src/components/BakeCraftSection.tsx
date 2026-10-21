import React, { useState } from 'react';
import { BAKING_CRAFT_STEPS } from '../data/products';
import { Thermometer, Flame, Droplets, Clock, Sparkles } from 'lucide-react';

export const BakeCraftSection: React.FC = () => {
  const [temperature, setTemperature] = useState(64);

  const getTemperatureProfile = (temp: number) => {
    if (temp < 46) {
      return {
        label: 'Cellar Chilled & Dense',
        description: 'Crisp, structured bite with chilled dairy firmness. Great for clean geometric knife cuts.',
        moltenLevel: 25,
        recommendation: 'Allow 15 minutes on the counter to bring out deeper vanilla nuance.',
        color: '#4B6B94',
      };
    }
    if (temp <= 58) {
      return {
        label: 'Cool Velvet & Structured',
        description: 'Smooth and substantial. The graham crust holds firm while the cultured cream softens on the palate.',
        moltenLevel: 55,
        recommendation: 'A classic European bakery mouthfeel, ideal with hot dark roast coffee.',
        color: '#B5761E',
      };
    }
    if (temp <= 66) {
      return {
        label: '★ Mohamad’s Best Bake Peak Silkiness (Recommended)',
        description: 'The golden balance! The Basque center turns delicately molten, vanilla bean aromatics bloom, and the texture dissolves effortlessly without weight.',
        moltenLevel: 95,
        recommendation: 'The exact temperature calibrated by founder Mohamad Mneimneh for maximum sensory bliss.',
        color: '#C68A29',
      };
    }
    return {
      label: 'Ultra-Molten & Unctuous',
      description: 'Extremely soft, custardy, and luscious. The Basque core flows gently when sliced.',
      moltenLevel: 100,
      recommendation: 'Pairs magnificently with acidic fruit compotes and sparkling dry wines.',
      color: '#A2422C',
    };
  };

  const profile = getTemperatureProfile(temperature);

  return (
    <section id="craft" className="py-16 md:py-24 bg-[#F5ECE0] border-y border-[#DFCBB5]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="max-w-3xl mx-auto text-center mb-16">
          <div className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-widest text-[#B5761E] mb-3">
            <span>The Science of the Crumb</span>
            <span aria-hidden="true">·</span>
            <span>Founder Mohamad Mneimneh's Methodology</span>
          </div>
          <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold text-[#1E1511] leading-tight text-balance mb-4">
            Why Chalupi Cheesecake has the <span className="italic text-[#B5761E]">Best Bake</span>
          </h2>
          <p className="text-sm sm:text-base text-[#685343] leading-relaxed">
            Every cake is governed by four immutable rules: cultured cold-vessel dairy, slow aeration,
            graduated waterbath thermal equilibrium, and an overnight 14-hour rest.
          </p>
        </div>

        {/* 4 Craft Steps Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {BAKING_CRAFT_STEPS.map((step) => (
            <div
              key={step.step}
              className="bg-[#FAF7F2] p-6 rounded-2xl border border-[#DFCBB5] shadow-xs flex flex-col justify-between"
            >
              <div>
                <div className="font-mono text-xs font-bold text-[#B5761E] tracking-widest mb-3">
                  {step.step} // DISCIPLINE
                </div>
                <h3 className="font-serif text-lg font-bold text-[#1E1511] leading-snug mb-1">
                  {step.title}
                </h3>
                <div className="text-[11px] font-semibold text-[#8C6D58] uppercase tracking-wider mb-3">
                  {step.subtitle}
                </div>
                <p className="text-xs text-[#665040] leading-relaxed">
                  {step.description}
                </p>
              </div>

              <div className="mt-6 pt-4 border-t border-[#EAE0D2] flex items-center gap-2 text-[11px] text-[#8C6D58]">
                <Sparkles className="w-3.5 h-3.5 text-[#C68A29]" />
                <span>Zero Starch Fillers</span>
              </div>
            </div>
          ))}
        </div>

        {/* Interactive Temperature & Silkiness Masterclass Module */}
        <div className="bg-[#FFFDF9] border border-[#DECBB4] rounded-2xl p-6 sm:p-10 shadow-md max-w-4xl mx-auto">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-[#EAE0D2]">
            <div>
              <div className="flex items-center gap-2 text-xs text-[#8C6D58] font-semibold uppercase tracking-wider mb-1">
                <Thermometer className="w-4 h-4 text-[#B5761E]" />
                <span>Serving Calibration Masterclass</span>
              </div>
              <h3 className="font-serif text-2xl font-bold text-[#1E1511]">
                The Optimal Silkiness Curve
              </h3>
            </div>

            <div className="flex items-center gap-2 bg-[#FAF4EA] border border-[#DFCBB5] px-4 py-2 rounded-xl text-center">
              <span className="text-xs text-[#8C6D58] font-medium">Serving Temp:</span>
              <span className="font-mono text-xl font-bold text-[#1E1511] tabular-nums">
                {temperature}°F
              </span>
            </div>
          </div>

          <div className="py-6 space-y-6">
            {/* Interactive Slider */}
            <div>
              <div className="flex justify-between text-xs text-[#8C6D58] font-medium mb-2">
                <span>36°F (Chilled Firm)</span>
                <span className="font-bold text-[#B5761E]">64°F (Mohamad's Ideal)</span>
                <span>74°F (Ultra-Molten)</span>
              </div>
              <input
                type="range"
                min={36}
                max={74}
                value={temperature}
                onChange={(e) => setTemperature(Number(e.target.value))}
                className="w-full h-2 bg-[#EADDCB] rounded-lg appearance-none cursor-pointer accent-[#B5761E]"
              />
            </div>

            {/* Dynamic Results Display */}
            <div className="p-5 rounded-xl bg-[#FAF5EB] border border-[#E0CFBA] space-y-3">
              <div className="flex items-center justify-between gap-2">
                <span className="font-serif text-lg font-bold text-[#1E1511]">
                  {profile.label}
                </span>
                <span className="text-xs font-mono font-semibold text-[#8C6D58]">
                  Silkiness Index: {profile.moltenLevel}%
                </span>
              </div>

              {/* Silkiness Progress Bar */}
              <div className="w-full h-2.5 bg-[#E2D2BE] rounded-full overflow-hidden">
                <div
                  className="h-full transition-all duration-300 rounded-full"
                  style={{
                    width: `${profile.moltenLevel}%`,
                    backgroundColor: profile.color,
                  }}
                />
              </div>

              <p className="text-xs sm:text-sm text-[#5B4738] leading-relaxed">
                {profile.description}
              </p>

              <div className="text-xs text-[#8C6D58] italic border-t border-[#DECBB4] pt-2">
                <span className="font-semibold text-[#1E1511] not-italic">Chef Note: </span>
                {profile.recommendation}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
