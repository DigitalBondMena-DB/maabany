import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Images, MapPin, Building, Grid } from 'lucide-react';
import { ProjectGalleryGrid } from './ProjectGalleryGrid';
import { ProjectLightbox } from './ProjectLightbox';

interface ProjectGalleryModalProps {
  isOpen: boolean;
  onClose: () => void;
  images: string[];
  projectTitle: string;
  projectLocation?: string;
  projectCategory?: string;
}

export const ProjectGalleryModal: React.FC<ProjectGalleryModalProps> = ({
  isOpen,
  onClose,
  images,
  projectTitle,
  projectLocation,
  projectCategory
}) => {
  const [selectedImageIndex, setSelectedImageIndex] = useState<number | null>(null);

  // Lock body scroll while modal is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      const scroller = document.getElementById('app-scroller');
      if (scroller) scroller.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
      const scroller = document.getElementById('app-scroller');
      if (scroller) scroller.style.overflow = '';
    }

    return () => {
      document.body.style.overflow = '';
      const scroller = document.getElementById('app-scroller');
      if (scroller) scroller.style.overflow = '';
    };
  }, [isOpen]);

  // Handle Escape Key to close modal if Lightbox is not open
  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && selectedImageIndex === null) {
        onClose();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, selectedImageIndex, onClose]);

  if (!isOpen) return null;

  return (
    <>
      <AnimatePresence>
        <div className="fixed inset-0 z-[150] flex items-center justify-center p-3 sm:p-5 md:p-8 overflow-y-auto">
          {/* Backdrop Overlay */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            onClick={onClose}
            className="fixed inset-0 bg-neutral-950/80 backdrop-blur-xl z-0"
          />

          {/* Modal Content Box */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 15 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 15 }}
            transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
            onClick={(e) => e.stopPropagation()}
            className="relative z-10 w-full max-w-7xl max-h-[90vh] bg-neutral-900 border border-neutral-800 rounded-[28px] shadow-2xl overflow-hidden flex flex-col my-auto text-white"
          >
            {/* Header */}
            <div className="flex items-center justify-between p-5 md:p-7 border-b border-neutral-800/80 bg-neutral-900/90 backdrop-blur-md sticky top-0 z-20">
              <div className="flex items-center gap-3 md:gap-4 min-w-0">
                <div className="p-3 rounded-2xl bg-[#EA8A22]/10 border border-[#EA8A22]/20 text-[#EA8A22] hidden sm:flex">
                  <Images className="w-6 h-6" />
                </div>

                <div className="min-w-0">
                  <div className="flex items-center gap-2 mb-1 flex-wrap">
                    <span className="px-2.5 py-0.5 rounded-full bg-[#EA8A22]/20 text-[#EA8A22] border border-[#EA8A22]/30 font-mono text-[10px] font-bold uppercase tracking-wider">
                      Photo Gallery
                    </span>
                    {projectCategory && (
                      <span className="text-xs font-mono text-neutral-400 flex items-center gap-1">
                        <Building className="w-3 h-3 text-neutral-500" />
                        {projectCategory}
                      </span>
                    )}
                    {projectLocation && (
                      <span className="text-xs font-mono text-neutral-400 flex items-center gap-1">
                        <MapPin className="w-3 h-3 text-neutral-500" />
                        {projectLocation}
                      </span>
                    )}
                  </div>

                  <h3 className="text-xl md:text-2xl font-black font-mono uppercase tracking-tight text-white truncate">
                    {projectTitle}
                  </h3>
                </div>
              </div>

              {/* Close Button & Badge */}
              <div className="flex items-center gap-3 flex-shrink-0">
                <span className="hidden md:inline-flex px-3 py-1.5 rounded-full bg-neutral-800 border border-neutral-700 text-neutral-300 font-mono text-xs font-bold">
                  {images.length} {images.length === 1 ? 'Image' : 'Images'}
                </span>

                <button
                  type="button"
                  onClick={onClose}
                  className="p-3 rounded-full bg-neutral-800 hover:bg-[#EA8A22] text-neutral-300 hover:text-white transition-all duration-300 hover:scale-105 active:scale-95 focus:outline-none focus:ring-2 focus:ring-[#EA8A22]"
                  aria-label="Close modal"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* Scrollable Modal Body */}
            <div className="p-5 md:p-8 overflow-y-auto custom-scrollbar flex-1 space-y-6">
              <div className="flex items-center justify-between pb-2 border-b border-neutral-800/50">
                <p className="text-xs font-mono text-neutral-400 uppercase tracking-widest flex items-center gap-2">
                  <Grid className="w-3.5 h-3.5 text-[#EA8A22]" />
                  Click any image to view in high-resolution Lightbox
                </p>
                <span className="text-xs font-mono text-neutral-500 hidden sm:inline">
                  {images.length} High-Res Architectural Renders & Photos
                </span>
              </div>

              {/* Grid Component */}
              <ProjectGalleryGrid
                images={images}
                projectTitle={projectTitle}
                onSelectImage={(idx) => setSelectedImageIndex(idx)}
              />
            </div>
          </motion.div>
        </div>
      </AnimatePresence>

      {/* Lightbox Modal */}
      {selectedImageIndex !== null && (
        <ProjectLightbox
          isOpen={selectedImageIndex !== null}
          images={images}
          initialIndex={selectedImageIndex}
          projectTitle={projectTitle}
          onClose={() => setSelectedImageIndex(null)}
        />
      )}
    </>
  );
};
