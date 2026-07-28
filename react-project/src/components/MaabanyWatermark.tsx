import React from 'react';
import logoShape from '../assets/images/logo shape.png';

interface MaabanyWatermarkProps {
  className?: string;
  variant?: 'emblem' | 'full';
  color?: string;
}

/**
 * Maabany Watermark Component
 * Renders the official Maabany MEP symbol (3 connected circles: Lightning, Flame, Fan)
 * or full logo outline for background architectural watermarks.
 */
export const MaabanyWatermarkSymbol: React.FC<{ color?: string; className?: string }> = ({ 
  color = '#525252', 
  className = '' 
}) => {
  return (
    <svg 
      viewBox="0 0 520 460" 
      fill="none" 
      xmlns="http://www.w3.org/2000/svg" 
      className={`w-full h-full ${className}`}
      aria-hidden="true"
    >
      {/* Outer Connecting Lines / Stems */}
      <line x1="205" y1="205" x2="265" y2="265" stroke={color} strokeWidth="12" strokeLinecap="round" />
      <line x1="330" y1="240" x2="280" y2="275" stroke={color} strokeWidth="11" strokeLinecap="round" />
      <line x1="225" y1="315" x2="265" y2="280" stroke={color} strokeWidth="10" strokeLinecap="round" />

      {/* Circle 1: Top-Left (Lightning Bolt - Electrical) */}
      <g>
        <circle cx="150" cy="150" r="90" stroke={color} strokeWidth="12" fill="none" />
        <path 
          d="M172 82 L108 162 H152 L128 222 L192 142 H148 Z" 
          fill={color} 
        />
      </g>

      {/* Circle 2: Top-Right (Flame - Fire/Safety) */}
      <g>
        <circle cx="380" cy="180" r="72" stroke={color} strokeWidth="10" fill="none" />
        {/* Main Outer Flame */}
        <path 
          d="M380 128 C380 128 350 162 350 188 C350 205 363 218 380 218 C397 218 410 205 410 188 C410 162 380 128 380 128 Z" 
          fill={color} 
        />
        {/* Inner Flame Cutout */}
        <path 
          d="M380 156 C380 156 366 176 366 190 C366 198 372 204 380 204 C388 204 394 198 394 190 C394 176 380 156 380 156 Z" 
          fill="white" 
        />
      </g>

      {/* Circle 3: Bottom-Left (3-Blade Fan - HVAC/Mechanical) */}
      <g>
        <circle cx="180" cy="350" r="62" stroke={color} strokeWidth="9" fill="none" />
        {/* Fan Center Hub */}
        <circle cx="180" cy="350" r="12" fill={color} />
        {/* Blade 1 (Top Right) */}
        <path 
          d="M180 338 C188 322 208 310 216 322 C222 332 208 348 192 348 Z" 
          fill={color} 
        />
        {/* Blade 2 (Bottom) */}
        <path 
          d="M174 358 C160 370 152 390 166 394 C178 396 188 376 182 360 Z" 
          fill={color} 
        />
        {/* Blade 3 (Top Left) */}
        <path 
          d="M172 344 C158 336 142 352 150 364 C158 372 176 360 178 348 Z" 
          fill={color} 
        />
      </g>
    </svg>
  );
};

export const MaabanyWatermarkFullLogo: React.FC<{ color?: string; className?: string }> = ({ 
  color = '#525252', 
  className = '' 
}) => {
  return (
    <div className={`relative flex items-center gap-6 ${className}`} aria-hidden="true">
      <div className="w-44 h-44 shrink-0">
        <MaabanyWatermarkSymbol color={color} />
      </div>
      <div className="flex flex-col justify-center">
        <span 
          className="text-6xl font-black tracking-tighter uppercase font-mono leading-none"
          style={{ color }}
        >
          MAABANY
        </span>
        <span 
          className="text-xs font-mono font-bold tracking-[0.35em] uppercase mt-2 opacity-80"
          style={{ color }}
        >
          INTEGRATED BUILDING SOLUTIONS
        </span>
      </div>
    </div>
  );
};

/**
 * Single, static, light neutral-gray Maabany watermark
 * Centered in the right content column, ~75% height, 5% opacity.
 * No repetition or tiling, fully contained in the right content area.
 */
export const RightContentWatermark: React.FC = () => {
  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden z-0 select-none flex items-start justify-end pt-0 pr-0 pl-4 pb-4">
      <img 
        src={logoShape} 
        alt="" 
        className="w-[72%] sm:w-[68%] lg:w-[70%] max-w-[460px] h-auto max-h-[460px] object-contain opacity-[0.06] pointer-events-none select-none translate-y-[10px] translate-x-1 sm:translate-y-[8px] sm:translate-x-2"
      />
    </div>
  );
};

export const AboutSectionWatermarkBackground: React.FC = () => {
  return <RightContentWatermark />;
};
