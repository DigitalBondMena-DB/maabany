import React from 'react';
import { motion } from 'motion/react';
import { ArrowRight } from 'lucide-react';

interface ProjectGalleryButtonProps {
  onClick: () => void;
  imageCount?: number;
  label?: string;
  className?: string;
}

export const ProjectGalleryButton: React.FC<ProjectGalleryButtonProps> = ({
  onClick,
  imageCount,
  label = "Explore Project Gallery",
  className = ""
}) => {
  return (
    <motion.button
      type="button"
      onClick={onClick}
      whileHover={{ y: -2 }}
      whileTap={{ scale: 0.98 }}
      transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
      aria-label={`${label}${imageCount ? ` (${imageCount} photos)` : ''}`}
      className={`group relative inline-flex items-center gap-3 bg-white text-[#EA8A22] border border-[#EA8A22] hover:bg-[#EA8A22] hover:text-white font-mono text-xs md:text-sm font-bold uppercase tracking-[0.18em] px-8 py-3.5 rounded-full shadow-sm hover:shadow-md hover:shadow-[#EA8A22]/20 transition-all duration-300 focus:outline-none focus:ring-4 focus:ring-[#EA8A22]/20 cursor-pointer ${className}`}
    >
      <span className="relative z-10">{label}</span>

      {imageCount !== undefined && imageCount > 0 && (
        <span className="px-2.5 py-0.5 rounded-full bg-[#EA8A22]/10 text-[#EA8A22] group-hover:bg-white/20 group-hover:text-white font-mono text-[10px] font-bold tracking-normal transition-colors">
          {imageCount}
        </span>
      )}

      {/* Horizontal Right Arrow Icon matching reference image */}
      <ArrowRight className="w-4 h-4 text-[#EA8A22] group-hover:text-white transition-transform duration-300 group-hover:translate-x-1" />
    </motion.button>
  );
};
