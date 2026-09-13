import React from 'react';
import { Sparkles, Share2, Globe, Heart, ArrowUp } from 'lucide-react';
import { festivalData } from '../data/festivalData';
import acetLogoImg from '../assets/images/acet_college_logo_1789121643866.jpg';

interface FooterProps {
  onNavigate: (sectionId: string) => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigate }) => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleShareApp = () => {
    const text =
      '🕉️ Celebrate Ganesh Festival 2026 at Anuradha College of Engineering & Technology, Chikhli! Reception ACET. Ganpati Bappa Morya! 🙏✨';
    const url = typeof window !== 'undefined' ? window.location.href : '';

    if (navigator.share) {
      navigator.share({
        title: 'Ganesh Festival 2026 ACET Chikhli',
        text,
        url,
      }).catch(() => {});
    } else {
      navigator.clipboard.writeText(`${text} ${url}`);
      alert('Link copied to clipboard! Share with family & friends.');
    }
  };

  return (
    <footer className="relative bg-[#120B0A] text-[#FFF4DC] pt-16 pb-24 md:pb-16 border-t border-[#F5B83D]/20 overflow-hidden">
      {/* Background Decorative Arch */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-96 h-32 bg-gradient-to-b from-[#4A1018]/40 to-transparent blur-2xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 relative z-10">
        {/* Section 44: Farewell / Blessings Banner */}
        <div className="text-center max-w-xl mx-auto mb-12">
          <div className="text-3xl sm:text-4xl mb-2">🕉️</div>
          <h3 className="text-2xl sm:text-3xl font-extrabold font-heading text-[#FFF4DC] mb-1">
            Ganpati Bappa Morya!
          </h3>
          <p className="text-xs sm:text-sm text-[#F5B83D] font-medium italic mb-5">
            "Pudhchya varshi lavkar ya — Until next year, keep the blessings alive."
          </p>

          <div className="flex flex-wrap items-center justify-center gap-3">
            <button
              onClick={handleShareApp}
              className="py-2.5 px-4 rounded-xl text-xs font-semibold bg-[#4A1018] border border-[#F5B83D]/40 text-[#FFF4DC] hover:bg-[#4A1018]/80 flex items-center gap-1.5 transition-all cursor-pointer"
            >
              <Share2 className="w-3.5 h-3.5 text-[#F5B83D]" />
              <span>Share the Experience</span>
            </button>

            <button
              onClick={() => onNavigate('gallery')}
              className="py-2.5 px-4 rounded-xl text-xs font-semibold glass-panel border border-white/20 text-[#FFF4DC] hover:bg-white/10 transition-all cursor-pointer"
            >
              Relive Moments in Gallery
            </button>
          </div>
        </div>

        {/* 3 Columns Details */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 pb-12 border-b border-white/10 text-xs text-[#FFF4DC]/70">
          {/* Col 1: College Credentials */}
          <div>
            <span className="text-[10px] uppercase font-bold text-[#E88918] tracking-widest block mb-2">
              HOST INSTITUTION
            </span>
            <div className="flex items-center gap-3 mb-2">
              <div className="w-10 h-10 rounded-full overflow-hidden border border-[#F5B83D]/60 flex-shrink-0 bg-[#0090C8] shadow-md">
                <img
                  src={acetLogoImg}
                  alt="ACET Emblem"
                  className="w-full h-full object-cover scale-105"
                  referrerPolicy="no-referrer"
                />
              </div>
              <div>
                <h4 className="text-sm font-bold text-[#FFF4DC]">
                  {festivalData.collegeName}
                </h4>
                <p className="text-[11px] text-[#FFF4DC]/60">
                  {festivalData.parentTrust}
                </p>
              </div>
            </div>
            <p className="leading-relaxed">
              Approved by AICTE New Delhi, Recognized by DTE Mumbai, Affiliated to Sant Gadge Baba Amravati University.
            </p>
          </div>

          {/* Col 2: Quick Links */}
          <div className="space-y-2">
            <span className="text-[10px] uppercase font-bold text-[#E88918] tracking-widest block mb-2">
              FESTIVAL DIRECTORY
            </span>
            <div className="grid grid-cols-2 gap-2">
              <button
                onClick={() => onNavigate('about')}
                className="text-left hover:text-[#F5B83D] transition-colors"
              >
                About Bappa
              </button>
              <button
                onClick={() => onNavigate('events')}
                className="text-left hover:text-[#F5B83D] transition-colors"
              >
                Event Schedule
              </button>
              <button
                onClick={() => onNavigate('diya')}
                className="text-left hover:text-[#F5B83D] transition-colors"
              >
                Light a Diya
              </button>
              <button
                onClick={() => onNavigate('gallery')}
                className="text-left hover:text-[#F5B83D] transition-colors"
              >
                Festival Gallery
              </button>
              <button
                onClick={() => onNavigate('facts')}
                className="text-left hover:text-[#F5B83D] transition-colors"
              >
                Did You Know?
              </button>
              <button
                onClick={() => onNavigate('home')}
                className="text-left hover:text-[#F5B83D] transition-colors text-[#F5B83D]"
              >
                Reception ACET
              </button>
            </div>
          </div>

          {/* Col 3: Campus Heritage & Devotion Note */}
          <div>
            <span className="text-[10px] uppercase font-bold text-[#E88918] tracking-widest block mb-2">
              CAMPUS FESTIVAL
            </span>
            <p className="leading-relaxed mb-3">
              Organized with devotion by the students, staff, and faculty of ACET Chikhli. Dedicated to Lord Ganesha, the remover of all obstacles and giver of wisdom.
            </p>
            <div className="flex items-center gap-2 text-[11px] text-[#F5B83D]">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Technology with Wisdom for a Better Tomorrow</span>
            </div>
          </div>
        </div>

        {/* Designed & Developed by Credit */}
        <div className="my-6 text-center">
          <div className="inline-flex flex-wrap items-center justify-center gap-2 rounded-full border border-amber-500/20 bg-amber-950/20 px-4 py-1.5 text-xs text-stone-300 backdrop-blur-sm">
            <span>Designed & Developed by</span>
            <span className="font-semibold text-amber-300">Ubaid Ali</span>
            <span className="text-stone-500">|</span>
            <a 
              href="https://www.instagram.com/ubaid._.ali/" 
              target="_blank" 
              rel="noreferrer"
              className="text-amber-400 hover:text-white transition-colors"
              title="Instagram"
            >
              Insta ↗
            </a>
            <span className="text-stone-600">•</span>
            <a 
              href="https://www.linkedin.com/in/ubaid-ali-534b5a207/" 
              target="_blank" 
              rel="noreferrer"
              className="text-amber-400 hover:text-white transition-colors"
              title="LinkedIn"
            >
              LinkedIn ↗
            </a>
          </div>
        </div>

        {/* Bottom copyright & back to top */}
        <div className="pt-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] text-[#FFF4DC]/50">
          <div>
            © 2026 Anuradha College of Engineering & Technology, Chikhli. All rights reserved.
          </div>

          <button
            onClick={scrollToTop}
            className="flex items-center gap-1.5 hover:text-[#F5B83D] transition-colors cursor-pointer"
          >
            <span>Back to top</span>
            <ArrowUp className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </footer>
  );
};
