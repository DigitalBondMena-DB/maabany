import React from 'react';
import { motion } from 'motion/react';
import { Maximize2, Sparkles } from 'lucide-react';

interface ProjectGalleryGridProps {
  images: string[];
  projectTitle: string;
  onSelectImage: (index: number) => void;
}

export const ProjectGalleryGrid: React.FC<ProjectGalleryGridProps> = ({
  images,
  projectTitle,
  onSelectImage
}) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-6">
      {images.map((imgUrl, idx) => (
        <motion.div
          key={`${imgUrl}-${idx}`}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: idx * 0.04, ease: [0.16, 1, 0.3, 1] }}
          whileHover={{ y: -4 }}
          onClick={() => onSelectImage(idx)}
          className="group relative bg-neutral-900 border border-neutral-800 rounded-2xl overflow-hidden cursor-pointer shadow-md hover:shadow-2xl hover:shadow-[#EA8A22]/20 transition-all duration-300 aspect-[4/3]"
          role="button"
          tabIndex={0}
          onKeyDown={(e) => {
            if (e.key === 'Enter' || e.key === ' ') {
              e.preventDefault();
              onSelectImage(idx);
            }
          }}
          aria-label={`View photo ${idx + 1} of ${projectTitle}`}
        >
          {/* Image */}
          <img
            src={imgUrl}
            alt={`${projectTitle} photo ${idx + 1}`}
            loading="lazy"
            className="w-full h-full object-cover transition-transform duration-500 ease-out group-hover:scale-105"
          />

          {/* Dark Overlay on Hover */}
          <div className="absolute inset-0 bg-gradient-to-t from-neutral-950/85 via-neutral-950/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-between p-4" />

          {/* Top Badge */}
          <div className="absolute top-3 left-3 z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-black/60 backdrop-blur-md border border-white/10 text-white font-mono text-[10px] font-bold uppercase tracking-wider">
              <Sparkles className="w-3 h-3 text-[#EA8A22]" />
              Photo {idx + 1}
            </span>
          </div>

          {/* Center Zoom Icon */}
          <div className="absolute inset-0 z-10 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 pointer-events-none">
            <div className="p-3.5 rounded-full bg-[#EA8A22] text-white shadow-xl transform scale-75 group-hover:scale-100 transition-transform duration-300">
              <Maximize2 className="w-5 h-5" />
            </div>
          </div>

          {/* Bottom Caption */}
          <div className="absolute bottom-3 left-3 right-3 z-10 opacity-0 group-hover:opacity-100 transition-all duration-300 translate-y-2 group-hover:translate-y-0">
            <p className="text-xs font-mono font-bold text-white uppercase tracking-tight truncate">
              {projectTitle}
            </p>
          </div>
        </motion.div>
      ))}
    </div>
  );
};
