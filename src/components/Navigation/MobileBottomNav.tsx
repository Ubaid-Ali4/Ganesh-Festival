import React from 'react';
import { Home, Sparkles, Calendar, Image, MoreHorizontal, Flame } from 'lucide-react';

interface MobileBottomNavProps {
  currentSection: string;
  onNavigate: (sectionId: string) => void;
  onStartAR: () => void;
  onOpenMore: () => void;
}

export const MobileBottomNav: React.FC<MobileBottomNavProps> = ({
  currentSection,
  onNavigate,
  onStartAR,
  onOpenMore,
}) => {
  return (
    <div className="md:hidden fixed bottom-0 inset-x-0 z-30 pb-safe pt-1 px-3 bg-[#120B0A]/95 backdrop-blur-xl border-t border-[#F5B83D]/25 shadow-2xl">
      <div className="flex items-center justify-around py-1.5 max-w-md mx-auto">
        {/* Home */}
        <button
          onClick={() => onNavigate('home')}
          className={`flex flex-col items-center gap-0.5 py-1 px-2.5 rounded-xl transition-all ${
            currentSection === 'home' ? 'text-[#F5B83D]' : 'text-[#FFF4DC]/60'
          }`}
        >
          <Home className="w-4 h-4" />
          <span className="text-[10px] font-medium">Home</span>
        </button>

        {/* Events */}
        <button
          onClick={() => onNavigate('events')}
          className={`flex flex-col items-center gap-0.5 py-1 px-2.5 rounded-xl transition-all ${
            currentSection === 'events' ? 'text-[#F5B83D]' : 'text-[#FFF4DC]/60'
          }`}
        >
          <Calendar className="w-4 h-4" />
          <span className="text-[10px] font-medium">Events</span>
        </button>

        {/* Prominent Center AR Button (Visually emphasized with glowing gold effect) */}
        <div className="-mt-5 relative">
          <button
            onClick={onStartAR}
            aria-label="Start Augmented Reality Experience"
            className="w-13 h-13 rounded-full bg-gradient-to-tr from-[#F5B83D] via-[#FFD066] to-[#E88918] p-1 shadow-lg shadow-[#F5B83D]/40 active:scale-95 transition-all flex items-center justify-center border-2 border-[#120B0A]"
          >
            <div className="flex flex-col items-center justify-center">
              <Sparkles className="w-5 h-5 text-[#120B0A] fill-current" />
              <span className="text-[9px] font-extrabold text-[#120B0A] leading-none mt-0.5">
                AR
              </span>
            </div>
          </button>
        </div>

        {/* Gallery */}
        <button
          onClick={() => onNavigate('gallery')}
          className={`flex flex-col items-center gap-0.5 py-1 px-2.5 rounded-xl transition-all ${
            currentSection === 'gallery' ? 'text-[#F5B83D]' : 'text-[#FFF4DC]/60'
          }`}
        >
          <Image className="w-4 h-4" />
          <span className="text-[10px] font-medium">Gallery</span>
        </button>

        {/* More Options (Diya / Aarti / Wishes) */}
        <button
          onClick={onOpenMore}
          className="flex flex-col items-center gap-0.5 py-1 px-2.5 rounded-xl text-[#FFF4DC]/60 hover:text-[#F5B83D] transition-all"
        >
          <MoreHorizontal className="w-4 h-4" />
          <span className="text-[10px] font-medium">More</span>
        </button>
      </div>
    </div>
  );
};
