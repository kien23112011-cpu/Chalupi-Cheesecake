import React, { useState } from 'react';
import { CheesecakeProduct } from '../types';

interface CheesecakeVisualProps {
  product: CheesecakeProduct;
  size?: 'sm' | 'md' | 'lg';
  showSliceToggle?: boolean;
}

export const CheesecakeVisual: React.FC<CheesecakeVisualProps> = ({
  product,
  size = 'md',
  showSliceToggle = false,
}) => {
  const [viewMode, setViewMode] = useState<'whole' | 'slice'>('whole');

  const heightClasses = {
    sm: 'h-48',
    md: 'h-64',
    lg: 'h-80 sm:h-96',
  }[size];

  const p = product.palette;
  const isBasque = product.category === 'basque';
  const isEspresso = product.id === 'espresso-chocolate-truffle';
  const isPistachio = product.id === 'sicilian-pistachio-berry';
  const isMango = product.id === 'alphonso-mango-passion';
  const isBlueberry = product.id === 'wild-blueberry-lemon-thyme';
  const isPecan = product.id === 'bourbon-pecan-praline';
  const isSouffle = product.id === 'japanese-souffle-cloud';

  return (
    <div className={`relative w-full ${heightClasses} flex flex-col items-center justify-center overflow-hidden rounded-t-xl bg-gradient-to-b from-[#FAF4EA] to-[#F1E4D0] select-none p-4`}>
      {/* Background radial warmth */}
      <div 
        className="absolute inset-0 opacity-40 mix-blend-multiply pointer-events-none"
        style={{
          background: `radial-gradient(circle at 50% 45%, ${p.accent}25 0%, transparent 70%)`
        }}
      />

      {/* Decorative culinary background texture */}
      <div className="absolute inset-0 opacity-15 pointer-events-none bg-[radial-gradient(#C68A29_1px,transparent_1px)] [background-size:16px_16px]" />

      {/* View Switcher if enabled */}
      {showSliceToggle && (
        <div className="absolute top-3 right-3 z-10 flex items-center bg-[#FAF4EA]/90 backdrop-blur-sm border border-[#E0D0BC] rounded-lg p-0.5 text-xs shadow-sm">
          <button
            type="button"
            onClick={() => setViewMode('whole')}
            className={`px-2.5 py-1 rounded font-medium transition-colors ${
              viewMode === 'whole'
                ? 'bg-[#1E1511] text-[#FDFBF7]'
                : 'text-[#5B4738] hover:text-[#1E1511]'
            }`}
          >
            Whole Cake
          </button>
          <button
            type="button"
            onClick={() => setViewMode('slice')}
            className={`px-2.5 py-1 rounded font-medium transition-colors ${
              viewMode === 'slice'
                ? 'bg-[#1E1511] text-[#FDFBF7]'
                : 'text-[#5B4738] hover:text-[#1E1511]'
            }`}
          >
            Cross-Section
          </button>
        </div>
      )}

      {/* Realistic Artisanal Cheesecake SVG Illustration */}
      {viewMode === 'whole' ? (
        <div className="relative w-full max-w-[280px] sm:max-w-[320px] aspect-square flex items-center justify-center transition-transform duration-300 hover:scale-[1.03]">
          <svg
            viewBox="0 0 320 320"
            className="w-full h-full drop-shadow-[0_18px_25px_rgba(40,28,22,0.22)]"
            xmlns="http://www.w3.org/2000/svg"
          >
            <defs>
              {/* Outer Cake Shadow */}
              <radialGradient id={`shadow-${product.id}`} cx="50%" cy="50%" r="50%">
                <stop offset="60%" stopColor="#281C16" stopOpacity="0.35" />
                <stop offset="100%" stopColor="#281C16" stopOpacity="0" />
              </radialGradient>

              {/* Crust Ring Gradient */}
              <linearGradient id={`crust-${product.id}`} x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor={p.crust} />
                <stop offset="50%" stopColor={isBasque ? '#321609' : '#8B5120'} />
                <stop offset="100%" stopColor={p.crust} />
              </linearGradient>

              {/* Main Filling Gradient */}
              <radialGradient id={`fill-${product.id}`} cx="45%" cy="40%" r="55%">
                <stop offset="0%" stopColor={p.filling} />
                <stop offset="70%" stopColor={isBasque ? '#EAD6B3' : p.filling} />
                <stop offset="100%" stopColor={p.accent} stopOpacity="0.75" />
              </radialGradient>

              {/* Caramelized Basque / Golden Top */}
              <radialGradient id={`caramel-${product.id}`} cx="50%" cy="48%" r="48%">
                <stop offset="35%" stopColor={isBasque ? '#34180A' : '#DDA146'} stopOpacity={isBasque ? '0.92' : '0.45'} />
                <stop offset="65%" stopColor={isBasque ? '#5E2B0C' : '#C48128'} stopOpacity={isBasque ? '0.85' : '0.3'} />
                <stop offset="90%" stopColor={isBasque ? '#200D04' : '#8A4F16'} stopOpacity={isBasque ? '0.95' : '0.5'} />
                <stop offset="100%" stopColor={isBasque ? '#120702' : '#6A3A0E'} stopOpacity={isBasque ? '1' : '0.6'} />
              </radialGradient>

              {/* Filter for parchment folds & crinkles on Basque */}
              <filter id="crinkle" x="-10%" y="-10%" width="120%" height="120%">
                <feTurbulence type="fractalNoise" baseFrequency="0.04" numOctaves="3" result="noise" />
                <feDisplacementMap in="SourceGraphic" in2="noise" scale="4" xChannelSelector="R" yChannelSelector="G" />
              </filter>
            </defs>

            {/* Cake Pedestal / Plate Shadow */}
            <ellipse cx="160" cy="180" rx="140" ry="70" fill={`url(#shadow-${product.id})`} />

            {/* Artisanal Ceramic Serving Board Rim */}
            <ellipse cx="160" cy="165" rx="142" ry="76" fill="#F8F3EA" stroke="#DDD0BC" strokeWidth="2" />
            <ellipse cx="160" cy="163" rx="136" ry="71" fill="#F2EADB" stroke="#E6DCCB" strokeWidth="1" />

            {/* If Basque: parchment paper ruffle background */}
            {isBasque && (
              <g opacity="0.95">
                <ellipse cx="160" cy="155" rx="124" ry="74" fill="#D7C2A1" stroke="#AA8C62" strokeWidth="1.5" strokeDasharray="3 2" />
                <path
                  d="M 45 155 Q 60 115 100 100 Q 160 85 220 100 Q 260 115 275 155 Q 260 195 220 210 Q 160 225 100 210 Z"
                  fill="#E2D0B6"
                  opacity="0.75"
                />
              </g>
            )}

            {/* Outer Crust Ring (for non-Basque or subtle rim) */}
            {!isBasque && (
              <ellipse
                cx="160"
                cy="154"
                rx="116"
                ry="64"
                fill={`url(#crust-${product.id})`}
                stroke="#6B3B12"
                strokeWidth="1.5"
              />
            )}

            {/* Main Cheesecake Body Surface */}
            <ellipse
              cx="160"
              cy="152"
              rx={isBasque ? '112' : '108'}
              ry={isBasque ? '64' : '60'}
              fill={`url(#fill-${product.id})`}
            />

            {/* Caramelized Bake Crown Overlay */}
            <ellipse
              cx="160"
              cy="150"
              rx={isBasque ? '106' : '98'}
              ry={isBasque ? '58' : '52'}
              fill={`url(#caramel-${product.id})`}
              filter={isBasque ? 'url(#crinkle)' : undefined}
            />

            {/* Flavor specific visual garnishes on top */}
            {isBasque && (
              <g>
                {/* Basque rustic crack lines */}
                <path d="M 120 145 Q 145 140 170 148 Q 200 142 225 147" stroke="#160803" strokeWidth="3" fill="none" opacity="0.85" strokeLinecap="round" />
                <path d="M 140 135 Q 160 152 185 140" stroke="#1F0B04" strokeWidth="2.5" fill="none" opacity="0.8" strokeLinecap="round" />
                <path d="M 110 160 Q 130 156 150 164" stroke="#2B1006" strokeWidth="2" fill="none" opacity="0.7" strokeLinecap="round" />
                {/* Maldon Sea Salt Flakes */}
                <polygon points="135,138 140,136 142,141 137,143" fill="#FFFFFF" opacity="0.9" />
                <polygon points="175,142 181,140 183,145 177,147" fill="#FFFFFF" opacity="0.95" />
                <polygon points="152,158 157,156 159,161 154,163" fill="#FFFFFF" opacity="0.9" />
                <polygon points="195,152 199,150 201,155 197,157" fill="#FFFFFF" opacity="0.85" />
                {/* Molten center sheen */}
                <ellipse cx="160" cy="150" rx="35" ry="18" fill="#F8E3B6" opacity="0.45" />
              </g>
            )}

            {isEspresso && (
              <g>
                {/* Dark Chocolate Ganache Drip & Swirl */}
                <ellipse cx="160" cy="148" rx="80" ry="40" fill="#24140D" opacity="0.8" />
                <path d="M 95 148 Q 120 165 145 148 Q 175 162 205 146 Q 225 158 235 145" fill="none" stroke="#160B06" strokeWidth="6" strokeLinecap="round" />
                {/* Coffee Beans */}
                <g transform="translate(145, 138) scale(0.9)">
                  <ellipse cx="10" cy="8" rx="7" ry="4" fill="#1C0E07" transform="rotate(30 10 8)" />
                  <path d="M 5 6 Q 10 8 15 10" stroke="#482717" strokeWidth="1" />
                </g>
                <g transform="translate(170, 148) scale(0.85)">
                  <ellipse cx="10" cy="8" rx="7" ry="4" fill="#1C0E07" transform="rotate(-25 10 8)" />
                  <path d="M 5 10 Q 10 8 15 6" stroke="#482717" strokeWidth="1" />
                </g>
                {/* Cocoa Nib Dust */}
                <circle cx="130" cy="142" r="1.5" fill="#4A291A" />
                <circle cx="140" cy="155" r="1.8" fill="#4A291A" />
                <circle cx="165" cy="135" r="1.5" fill="#4A291A" />
                <circle cx="185" cy="150" r="1.7" fill="#4A291A" />
                <circle cx="195" cy="138" r="1.4" fill="#4A291A" />
              </g>
            )}

            {isPistachio && (
              <g>
                {/* Bronte Pistachio Green Mousse & Wild Berry Coulis Swirl */}
                <path d="M 100 148 Q 130 135 160 152 Q 190 138 220 148" fill="none" stroke="#A31F43" strokeWidth="5" strokeLinecap="round" opacity="0.9" />
                <path d="M 120 160 Q 155 142 195 156" fill="none" stroke="#7E1533" strokeWidth="3.5" strokeLinecap="round" opacity="0.85" />
                {/* Roasted Pistachio Slivers */}
                <ellipse cx="135" cy="142" rx="4" ry="2" fill="#6A8E38" stroke="#3D551D" strokeWidth="0.8" transform="rotate(20 135 142)" />
                <ellipse cx="170" cy="138" rx="4" ry="2" fill="#759C3E" stroke="#3D551D" strokeWidth="0.8" transform="rotate(-35 170 138)" />
                <ellipse cx="155" cy="158" rx="4.5" ry="2.2" fill="#5E8030" stroke="#3D551D" strokeWidth="0.8" transform="rotate(45 155 158)" />
                <ellipse cx="188" cy="148" rx="3.8" ry="1.8" fill="#6A8E38" stroke="#3D551D" strokeWidth="0.8" transform="rotate(-15 188 148)" />
                {/* Tiny berries */}
                <circle cx="145" cy="146" r="3" fill="#8C1738" />
                <circle cx="178" cy="152" r="3.2" fill="#78122E" />
              </g>
            )}

            {isMango && (
              <g>
                {/* Golden Alphonso Mirror Glaze */}
                <ellipse cx="160" cy="148" rx="86" ry="44" fill="#F59E0B" opacity="0.75" />
                <ellipse cx="155" cy="145" rx="68" ry="34" fill="#FBBF24" opacity="0.6" />
                {/* Passionfruit drizzle and black seed accents */}
                <path d="M 115 145 Q 140 162 170 144 Q 195 156 210 146" fill="none" stroke="#D97706" strokeWidth="3" opacity="0.85" />
                <circle cx="130" cy="148" r="2" fill="#1C1917" />
                <circle cx="150" cy="142" r="2.2" fill="#1C1917" />
                <circle cx="172" cy="150" r="1.8" fill="#1C1917" />
                <circle cx="190" cy="144" r="2" fill="#1C1917" />
              </g>
            )}

            {isPecan && (
              <g>
                {/* Warm Bourbon Caramel Pooling */}
                <path d="M 105 148 Q 135 162 165 146 Q 195 160 215 146" fill="none" stroke="#9A470E" strokeWidth="7" strokeLinecap="round" opacity="0.85" />
                {/* Candied Whole Pecan Halves */}
                <ellipse cx="132" cy="142" rx="7" ry="4" fill="#4D2813" stroke="#87471E" strokeWidth="1" transform="rotate(25 132 142)" />
                <ellipse cx="162" cy="136" rx="7.5" ry="4.2" fill="#522C16" stroke="#87471E" strokeWidth="1" transform="rotate(-15 162 136)" />
                <ellipse cx="186" cy="146" rx="6.8" ry="3.8" fill="#462410" stroke="#87471E" strokeWidth="1" transform="rotate(35 186 146)" />
                <ellipse cx="152" cy="156" rx="7" ry="4" fill="#4F2914" stroke="#87471E" strokeWidth="1" transform="rotate(-30 152 156)" />
              </g>
            )}

            {isBlueberry && (
              <g>
                {/* Deep Wild Berry Compote Marble & Lemon Thyme */}
                <ellipse cx="160" cy="148" rx="84" ry="42" fill="#312258" opacity="0.65" />
                <path d="M 108 145 Q 135 160 160 144 Q 185 158 212 146" fill="none" stroke="#241547" strokeWidth="5" opacity="0.8" />
                {/* Wild berries */}
                <circle cx="130" cy="144" r="3.5" fill="#1E123B" />
                <circle cx="148" cy="138" r="3.2" fill="#2C1B54" />
                <circle cx="168" cy="150" r="3.8" fill="#1C1038" />
                <circle cx="188" cy="142" r="3.4" fill="#25164B" />
                {/* Tiny thyme leaf accents */}
                <ellipse cx="140" cy="148" rx="3" ry="1.5" fill="#5A7D36" transform="rotate(45 140 148)" />
                <ellipse cx="178" cy="144" rx="3" ry="1.5" fill="#658B3E" transform="rotate(-20 178 144)" />
              </g>
            )}

            {isSouffle && (
              <g>
                {/* Gentle Wobbly Cloud Texture & Powdered Sugar Sheen */}
                <ellipse cx="160" cy="148" rx="90" ry="48" fill="#FFFBEB" opacity="0.7" />
                <path d="M 120 142 Q 160 135 200 142" stroke="#E5C78A" strokeWidth="1.5" fill="none" opacity="0.6" strokeDasharray="4 3" />
                {/* Dusting of confectioners sugar */}
                <ellipse cx="160" cy="146" rx="70" ry="32" fill="#FFFFFF" opacity="0.4" />
              </g>
            )}

            {!isBasque && !isEspresso && !isPistachio && !isMango && !isPecan && !isBlueberry && !isSouffle && (
              <g>
                {/* Classic Gold Vanilla Bean specks & golden swirl */}
                <ellipse cx="160" cy="148" rx="75" ry="38" fill="#F8E5BA" opacity="0.4" />
                <circle cx="135" cy="140" r="1" fill="#4B3319" opacity="0.8" />
                <circle cx="142" cy="152" r="0.9" fill="#4B3319" opacity="0.8" />
                <circle cx="158" cy="136" r="1" fill="#4B3319" opacity="0.8" />
                <circle cx="174" cy="148" r="0.9" fill="#4B3319" opacity="0.8" />
                <circle cx="185" cy="138" r="1.1" fill="#4B3319" opacity="0.8" />
                <circle cx="165" cy="158" r="0.8" fill="#4B3319" opacity="0.8" />
              </g>
            )}

            {/* Front 3D Rim Depth & Shadow */}
            <path
              d={isBasque 
                ? "M 48 155 C 55 178 85 205 160 205 C 235 205 265 178 272 155 C 265 190 230 216 160 216 C 90 216 55 190 48 155 Z"
                : "M 52 154 C 60 174 90 196 160 196 C 230 196 260 174 268 154 C 260 184 225 206 160 206 C 95 206 60 184 52 154 Z"
              }
              fill={isBasque ? "#180A04" : p.crust}
              opacity="0.95"
            />
          </svg>
        </div>
      ) : (
        /* Cross-Section Slice View */
        <div className="relative w-full max-w-[280px] sm:max-w-[320px] aspect-square flex items-center justify-center transition-transform duration-300 hover:scale-[1.03]">
          <svg
            viewBox="0 0 320 320"
            className="w-full h-full drop-shadow-[0_18px_25px_rgba(40,28,22,0.22)]"
            xmlns="http://www.w3.org/2000/svg"
          >
            {/* Plate Base */}
            <ellipse cx="160" cy="205" rx="130" ry="45" fill="#281C16" opacity="0.25" />
            <ellipse cx="160" cy="195" rx="130" ry="42" fill="#F8F3EA" stroke="#DDD0BC" strokeWidth="2" />

            {/* Slice Wedge 3D Shape */}
            {/* Bottom Crust Layer */}
            {!isBasque ? (
              <polygon
                points="80,185 240,165 240,182 80,202"
                fill={p.crust}
                stroke="#64330E"
                strokeWidth="1"
              />
            ) : (
              <polygon
                points="80,186 240,167 240,178 80,197"
                fill="#2A1408"
              />
            )}

            {/* Custard Filling Layer Face */}
            <polygon
              points="80,125 240,105 240,165 80,185"
              fill={p.filling}
            />

            {/* Molten center core highlight on the slice */}
            <ellipse
              cx="175"
              cy="142"
              rx="40"
              ry="18"
              fill={isBasque ? '#F6DFB3' : '#FFF5DE'}
              opacity={isBasque ? '0.9' : '0.6'}
            />

            {/* Top Caramelized Surface of Slice */}
            <polygon
              points="80,125 155,75 240,105"
              fill={isBasque ? '#220D04' : p.accent}
              stroke={isBasque ? '#120501' : '#A36817'}
              strokeWidth="1"
            />

            {/* Top Crust Back Edge */}
            <polygon
              points="155,75 162,79 240,109 240,105"
              fill={isBasque ? '#140602' : p.crust}
            />

            {/* Drizzle or Compote pooling over slice edge */}
            {p.drizzle && (
              <path
                d="M 120 100 Q 135 118 140 145 Q 145 170 142 188"
                stroke={p.drizzle}
                strokeWidth="4"
                fill="none"
                strokeLinecap="round"
                opacity="0.9"
              />
            )}

            {/* Subtle labels on slice indicating precision bake */}
            <text x="90" y="80" fill="#755E4E" fontSize="10" fontFamily="sans-serif" fontWeight="600">
              {isBasque ? '480°F Scorched Crown' : 'Caramelized Top'}
            </text>
            <path d="M 130 85 L 140 95" stroke="#9E8573" strokeWidth="1" />

            <text x="210" y="130" fill="#755E4E" fontSize="10" fontFamily="sans-serif" fontWeight="600">
              Molten Velvet Core
            </text>
            <path d="M 205 132 L 195 138" stroke="#9E8573" strokeWidth="1" />

            {!isBasque && (
              <>
                <text x="60" y="218" fill="#755E4E" fontSize="10" fontFamily="sans-serif" fontWeight="600">
                  Brown Butter Crust
                </text>
                <path d="M 105 212 L 115 198" stroke="#9E8573" strokeWidth="1" />
              </>
            )}
          </svg>
        </div>
      )}

      {/* Signature Seal / Badge */}
      <div className="absolute bottom-2 left-3 flex items-center gap-1.5 text-[11px] text-[#7A6453] font-medium tracking-wider uppercase">
        <span className="w-1.5 h-1.5 rounded-full bg-[#C68A29]" />
        <span>{product.bakeStyle}</span>
      </div>
    </div>
  );
};
