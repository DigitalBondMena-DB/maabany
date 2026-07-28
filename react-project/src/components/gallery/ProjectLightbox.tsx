import React, { useState, useEffect, useCallback, useRef } from 'react';
import { createPortal } from 'react-dom';
import { motion, AnimatePresence, PanInfo } from 'motion/react';
import { 
  ChevronLeft, 
  ChevronRight, 
  X, 
  Download, 
  ZoomIn, 
  ZoomOut, 
  RotateCcw
} from 'lucide-react';

interface ProjectLightboxProps {
  isOpen: boolean;
  images: string[];
  initialIndex: number;
  projectTitle: string;
  onClose: () => void;
}

export const ProjectLightbox: React.FC<ProjectLightboxProps> = ({
  isOpen,
  images,
  initialIndex,
  projectTitle,
  onClose,
}) => {
  const [currentIndex, setCurrentIndex] = useState(initialIndex);
  const [zoomScale, setZoomScale] = useState(1);
  const containerRef = useRef<HTMLDivElement>(null);

  // Sync index when initialIndex or isOpen changes
  useEffect(() => {
    setCurrentIndex(initialIndex);
    setZoomScale(1);
  }, [initialIndex, isOpen]);

  // Lock body & document scroll while lightbox is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      document.documentElement.style.overflow = 'hidden';
      const scroller = document.getElementById('app-scroller');
      if (scroller) scroller.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
      document.documentElement.style.overflow = '';
      const scroller = document.getElementById('app-scroller');
      if (scroller) scroller.style.overflow = '';
    }

    return () => {
      document.body.style.overflow = '';
      document.documentElement.style.overflow = '';
      const scroller = document.getElementById('app-scroller');
      if (scroller) scroller.style.overflow = '';
    };
  }, [isOpen]);

  // Preload adjacent images
  useEffect(() => {
    if (!isOpen || images.length === 0) return;
    const prevIdx = (currentIndex - 1 + images.length) % images.length;
    const nextIdx = (currentIndex + 1) % images.length;
    
    [prevIdx, nextIdx].forEach((idx) => {
      if (images[idx]) {
        const img = new Image();
        img.src = images[idx];
      }
    });
  }, [currentIndex, isOpen, images]);

  const handlePrev = useCallback(() => {
    setZoomScale(1);
    setCurrentIndex((prev) => (prev - 1 + images.length) % images.length);
  }, [images.length]);

  const handleNext = useCallback(() => {
    setZoomScale(1);
    setCurrentIndex((prev) => (prev + 1) % images.length);
  }, [images.length]);

  // Keyboard navigation
  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowLeft') {
        handlePrev();
      } else if (e.key === 'ArrowRight') {
        handleNext();
      } else if (e.key === 'Escape') {
        onClose();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, handlePrev, handleNext, onClose]);

  // Double-click zoom toggle
  const handleDoubleClick = () => {
    setZoomScale((prev) => (prev > 1 ? 1 : 2));
  };

  // Mouse wheel zoom
  const handleWheel = (e: React.WheelEvent) => {
    if (e.deltaY < 0) {
      setZoomScale((prev) => Math.min(prev + 0.25, 3));
    } else {
      setZoomScale((prev) => Math.max(prev - 0.25, 1));
    }
  };

  // Drag end for touch swipe when not zoomed
  const handleDragEnd = (_: any, info: PanInfo) => {
    if (zoomScale > 1) return;
    const swipeThreshold = 50;
    if (info.offset.x < -swipeThreshold) {
      handleNext();
    } else if (info.offset.x > swipeThreshold) {
      handlePrev();
    }
  };

  if (!isOpen || images.length === 0) return null;

  return createPortal(
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.2 }}
        className="fixed inset-0 z-[99999] flex flex-col items-center justify-between bg-black/80 backdrop-blur-md select-none p-4 md:p-6 overflow-hidden scrollbar-none no-scrollbar"
      >
        {/* Top-Right Floating Cancel / Exit Icon Button */}
        <button
          type="button"
          onClick={onClose}
          className="absolute top-4 right-4 md:top-6 md:right-6 z-[210] p-3 rounded-full bg-neutral-900/80 border border-neutral-700/80 text-white hover:bg-[#EA8A22] hover:border-[#EA8A22] transition-all duration-300 hover:scale-110 active:scale-95 shadow-2xl focus:outline-none focus:ring-2 focus:ring-[#EA8A22] cursor-pointer"
          aria-label="Close image popup"
          title="Close (Esc)"
        >
          <X className="w-6 h-6 stroke-[2.5]" />
        </button>

        {/* Top-Left Floating Photo Counter */}
        <div className="absolute top-4 left-4 md:top-6 md:left-6 z-[210] px-3.5 py-1.5 rounded-full bg-black/60 border border-white/10 text-white font-mono text-xs font-bold uppercase tracking-wider backdrop-blur-sm">
          {currentIndex + 1} / {images.length}
        </div>

        {/* Main Stage */}
        <div 
          ref={containerRef}
          onWheel={handleWheel}
          className="relative w-full max-w-6xl h-full max-h-[82vh] flex items-center justify-center overflow-hidden my-auto"
        >
          {/* Navigation - Left Arrow */}
          <button
            type="button"
            onClick={handlePrev}
            className="absolute left-2 md:left-6 z-50 p-3 md:p-4 rounded-full bg-neutral-950/70 border border-neutral-800 text-white hover:bg-[#EA8A22] hover:border-[#EA8A22] transition-all duration-300 hover:scale-110 active:scale-95 shadow-xl cursor-pointer"
            title="Previous Photo (Left Arrow)"
          >
            <ChevronLeft className="w-6 h-6 stroke-[2]" />
          </button>

          {/* Navigation - Right Arrow */}
          <button
            type="button"
            onClick={handleNext}
            className="absolute right-2 md:right-6 z-50 p-3 md:p-4 rounded-full bg-neutral-950/70 border border-neutral-800 text-white hover:bg-[#EA8A22] hover:border-[#EA8A22] transition-all duration-300 hover:scale-110 active:scale-95 shadow-xl cursor-pointer"
            title="Next Photo (Right Arrow)"
          >
            <ChevronRight className="w-6 h-6 stroke-[2]" />
          </button>

          {/* Animated Image Component */}
          <AnimatePresence mode="wait">
            <motion.div
              key={currentIndex}
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: zoomScale }}
              exit={{ opacity: 0, scale: 0.96 }}
              transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
              drag={zoomScale > 1 ? true : 'x'}
              dragConstraints={zoomScale > 1 ? { left: -300, right: 300, top: -200, bottom: 200 } : { left: 0, right: 0 }}
              dragElastic={0.1}
              onDragEnd={handleDragEnd}
              onDoubleClick={handleDoubleClick}
              className={`relative max-w-full max-h-full flex items-center justify-center ${
                zoomScale > 1 ? 'cursor-grab active:cursor-grabbing' : 'cursor-zoom-in'
              }`}
            >
              <img
                src={images[currentIndex]}
                alt={`${projectTitle} Fullscreen view ${currentIndex + 1}`}
                className="max-w-full max-h-[78vh] w-auto h-auto object-contain rounded-xl shadow-2xl pointer-events-none select-none"
              />
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Bottom Thumbnails Strip */}
        <div className="w-full max-w-4xl z-50 flex items-center justify-center gap-2.5 overflow-x-auto py-2 px-4 no-scrollbar">
          {images.map((img, idx) => (
            <button
              key={idx}
              type="button"
              onClick={() => {
                setZoomScale(1);
                setCurrentIndex(idx);
              }}
              className={`relative w-12 h-10 md:w-16 md:h-12 rounded-lg overflow-hidden flex-shrink-0 transition-all duration-300 cursor-pointer ${
                idx === currentIndex
                  ? 'ring-2 ring-[#EA8A22] scale-105 opacity-100'
                  : 'opacity-40 hover:opacity-80 border border-neutral-800'
              }`}
            >
              <img src={img} alt={`Thumbnail ${idx + 1}`} className="w-full h-full object-cover" />
            </button>
          ))}
        </div>
      </motion.div>
    </AnimatePresence>,
    document.body
  );
};
