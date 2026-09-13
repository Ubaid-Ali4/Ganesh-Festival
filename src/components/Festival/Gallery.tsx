import React, { useState } from 'react';
import { Camera, Eye, X, ChevronLeft, ChevronRight, Sparkles } from 'lucide-react';
import { festivalData } from '../../data/festivalData';
import { GalleryItem } from '../../types';

export const Gallery: React.FC = () => {
  const categories: ('All' | GalleryItem['category'])[] = [
    'All',
    'Bappa',
    'Decoration',
    'Aarti',
    'Events',
    'Celebrations',
  ];

  const [activeCategory, setActiveCategory] = useState<'All' | GalleryItem['category']>('All');
  const [activeLightboxIndex, setActiveLightboxIndex] = useState<number | null>(null);

  const filteredItems =
    activeCategory === 'All'
      ? festivalData.galleryItems
      : festivalData.galleryItems.filter((item) => item.category === activeCategory);

  const openLightbox = (index: number) => {
    setActiveLightboxIndex(index);
  };

  const closeLightbox = () => {
    setActiveLightboxIndex(null);
  };

  const prevImage = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (activeLightboxIndex !== null) {
      setActiveLightboxIndex(
        (activeLightboxIndex - 1 + filteredItems.length) % filteredItems.length
      );
    }
  };

  const nextImage = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (activeLightboxIndex !== null) {
      setActiveLightboxIndex((activeLightboxIndex + 1) % filteredItems.length);
    }
  };

  return (
    <section id="gallery" className="py-20 px-4 sm:px-6 max-w-7xl mx-auto">
      {/* Section Header */}
      <div className="text-center max-w-2xl mx-auto mb-10">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#E88918]/15 border border-[#E88918]/30 text-xs font-semibold text-[#E88918] mb-3">
          <Camera className="w-3.5 h-3.5" />
          <span>CAMPUS FESTIVAL ARCHIVE</span>
        </div>
        <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold font-heading text-[#FFF4DC] mb-3">
          📸 Festival Moments
        </h2>
        <p className="text-sm sm:text-base text-[#FFF4DC]/80">
          Memories of Bappa's arrival, evening deepotsav, hackathons, and cultural festivities.
        </p>
      </div>

      {/* Category Filter Pills (Section 24) */}
      <div className="flex items-center justify-center flex-wrap gap-2 mb-12">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setActiveCategory(cat)}
            className={`py-2 px-4 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
              activeCategory === cat
                ? 'bg-gradient-to-r from-[#F5B83D] to-[#E88918] text-[#120B0A] shadow-md shadow-[#F5B83D]/25 font-bold'
                : 'glass-panel text-[#FFF4DC]/70 hover:text-[#FFF4DC] hover:bg-white/10'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Gallery Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredItems.map((item, idx) => (
          <div
            key={item.id}
            onClick={() => openLightbox(idx)}
            className="group relative rounded-3xl overflow-hidden glass-panel border border-[#F5B83D]/30 shadow-xl cursor-pointer aspect-[4/3] sm:aspect-square"
          >
            <img
              src={item.imageUrl}
              alt={item.title}
              loading="lazy"
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              referrerPolicy="no-referrer"
            />
            {/* Gradient Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-[#120B0A] via-[#120B0A]/30 to-transparent opacity-80 group-hover:opacity-95 transition-opacity" />

            {/* Category badge */}
            <div className="absolute top-3.5 left-3.5 px-3 py-1 rounded-full bg-[#4A1018]/80 backdrop-blur-md border border-[#F5B83D]/30 text-[11px] font-semibold text-[#F5B83D]">
              {item.category}
            </div>

            {/* Hover Icon */}
            <div className="absolute top-3.5 right-3.5 w-8 h-8 rounded-full bg-[#F5B83D]/90 text-[#120B0A] flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
              <Eye className="w-4 h-4" />
            </div>

            {/* Bottom Caption */}
            <div className="absolute bottom-4 inset-x-4">
              <h3 className="text-base sm:text-lg font-bold font-heading text-[#FFF4DC] mb-1 leading-snug">
                {item.title}
              </h3>
              <p className="text-xs text-[#FFF4DC]/75 line-clamp-2 leading-relaxed">
                {item.caption}
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* Full-Screen Lightbox Modal */}
      {activeLightboxIndex !== null && (
        <div
          onClick={closeLightbox}
          className="fixed inset-0 z-50 bg-[#120B0A]/95 backdrop-blur-xl flex items-center justify-center p-4 animate-fade-in"
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="relative max-w-4xl w-full rounded-3xl glass-panel-gold border-2 border-[#F5B83D]/40 p-4 sm:p-6 text-center shadow-2xl overflow-hidden max-h-[92vh] flex flex-col justify-between"
          >
            {/* Top Bar */}
            <div className="flex items-center justify-between mb-3 px-2">
              <div className="flex items-center gap-2">
                <span className="px-2.5 py-0.5 rounded-full bg-[#4A1018] border border-[#F5B83D]/30 text-xs font-semibold text-[#F5B83D]">
                  {filteredItems[activeLightboxIndex].category}
                </span>
                <span className="text-xs text-[#FFF4DC]/60">
                  {activeLightboxIndex + 1} of {filteredItems.length}
                </span>
              </div>
              <button
                onClick={closeLightbox}
                className="p-2 rounded-full bg-white/10 text-white hover:bg-white/20 transition-all cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Image Box */}
            <div className="relative rounded-2xl overflow-hidden bg-black/60 aspect-[16/10] sm:aspect-[16/9] max-h-[65vh] mx-auto flex items-center justify-center my-auto w-full">
              <img
                src={filteredItems[activeLightboxIndex].imageUrl}
                alt={filteredItems[activeLightboxIndex].title}
                className="w-full h-full object-contain"
                referrerPolicy="no-referrer"
              />

              {/* Prev / Next controls */}
              {filteredItems.length > 1 && (
                <>
                  <button
                    onClick={prevImage}
                    className="absolute left-3 top-1/2 -translate-y-1/2 p-2.5 rounded-full bg-[#120B0A]/70 border border-[#F5B83D]/40 text-[#F5B83D] hover:bg-[#F5B83D] hover:text-[#120B0A] transition-all cursor-pointer"
                  >
                    <ChevronLeft className="w-5 h-5" />
                  </button>
                  <button
                    onClick={nextImage}
                    className="absolute right-3 top-1/2 -translate-y-1/2 p-2.5 rounded-full bg-[#120B0A]/70 border border-[#F5B83D]/40 text-[#F5B83D] hover:bg-[#F5B83D] hover:text-[#120B0A] transition-all cursor-pointer"
                  >
                    <ChevronRight className="w-5 h-5" />
                  </button>
                </>
              )}
            </div>

            {/* Caption */}
            <div className="mt-4 px-2 text-left">
              <h4 className="text-lg sm:text-xl font-bold font-heading text-[#F5B83D]">
                {filteredItems[activeLightboxIndex].title}
              </h4>
              <p className="text-xs sm:text-sm text-[#FFF4DC]/80 mt-1">
                {filteredItems[activeLightboxIndex].caption}
              </p>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
