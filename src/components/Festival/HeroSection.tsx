import React, { useState } from 'react';
import { Sparkles, Compass, Volume2, VolumeX, Award, Calendar, MapPin } from 'lucide-react';
import { festivalData } from '../../data/festivalData';
import { audioService } from '../../utils/audio';
import digitalIdolImg from '../../assets/images/ganpati.jpg.jpeg';
import acetLogoImg from '../../assets/images/acet_college_logo_1789121643866.jpg';

interface HeroSectionProps {
  onStartAR: () => void;
  onExplore: () => void;
  onLightDiya?: () => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({
  onStartAR,
  onExplore,
  onLightDiya,
}) => {
  const [isMuted, setIsMuted] = useState(audioService.getIsMuted());

  const handleSoundToggle = () => {
    const muted = audioService.toggleMute();
    setIsMuted(muted);
    if (!muted) {
      audioService.playTempleBell(0.6);
    }
  };

  return (
    <section className="relative min-h-[95vh] sm:min-h-screen flex flex-col justify-between pt-24 pb-16 px-4 sm:px-6 max-w-7xl mx-auto overflow-hidden">
      {/* Subtle Temple Mandala Geometric Ring in Background */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[580px] h-[580px] sm:w-[780px] sm:h-[780px] rounded-full border border-[#F5B83D]/10 pointer-events-none animate-spin-slow" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] sm:w-[540px] sm:h-[540px] rounded-full border border-dashed border-[#E88918]/15 pointer-events-none animate-spin-reverse-slow" />
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-96 h-96 bg-gradient-to-b from-[#F5B83D]/15 via-[#E88918]/8 to-transparent rounded-full blur-3xl pointer-events-none" />

      {/* College & Autonomous Institution Crest Header */}
      <div className="text-center z-10 max-w-2xl mx-auto">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#4A1018]/75 border border-[#F5B83D]/40 backdrop-blur-md mb-2.5 text-xs text-[#FFF4DC] shadow-md">
          <img
            src={acetLogoImg}
            alt="ACET Chikhli Emblem"
            className="w-5 h-5 rounded-full object-cover border border-[#F5B83D]/80"
            referrerPolicy="no-referrer"
          />
          <span className="font-semibold text-[#F5B83D]">ACET Chikhli</span>
          <span className="opacity-40">•</span>
          <span className="text-[#FFF4DC]/90">Autonomous Engineering Institute</span>
        </div>
        <p className="text-[11px] sm:text-xs tracking-wider uppercase text-[#E88918] font-semibold">
          {festivalData.parentTrust}
        </p>
        <p className="text-xs sm:text-sm text-[#FFF4DC]/80 font-medium">
          {festivalData.collegeName}
        </p>
      </div>

      {/* Central Hero Content with Enriched Large Ganpati Image Behind the Main Heading */}
      <div className="my-auto text-center z-10 max-w-4xl mx-auto py-6 relative">
        {/* Main Ganpati Image - Large & Majestic positioned behind heading */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[380px] sm:w-[580px] md:w-[740px] lg:w-[880px] h-[380px] sm:h-[580px] md:h-[740px] lg:h-[880px] pointer-events-none -z-10 flex items-center justify-center select-none">
          {/* Radiant Solar Backlight & Golden Prabhavali Aura */}
          <div className="absolute inset-0 rounded-full bg-gradient-to-tr from-[#F5B83D]/30 via-[#E88918]/20 to-transparent blur-3xl animate-pulse-glow" />
          <div className="absolute inset-4 sm:inset-10 rounded-full border border-[#F5B83D]/25 animate-spin-slow opacity-60" />
          <div className="absolute inset-8 sm:inset-16 rounded-full border border-dashed border-[#E88918]/30 animate-spin-reverse-slow opacity-50" />
          
          {/* Main Ganpati Idol Big Artwork Container */}
          <div className="relative w-[300px] sm:w-[460px] md:w-[560px] lg:w-[660px] h-[300px] sm:h-[460px] md:h-[560px] lg:h-[660px] rounded-full overflow-hidden border-2 border-[#F5B83D]/40 shadow-2xl shadow-[#F5B83D]/30">
            <img
              src={digitalIdolImg}
              alt="Lord Ganesha - Vighnaharta of the Digital Age"
              className="w-full h-full object-cover object-center filter brightness-100 contrast-110 scale-105"
              referrerPolicy="no-referrer"
            />
            {/* Atmospheric soft radial and gradient masks allowing Bappa to shine through while keeping text crisp */}
            <div className="absolute inset-0 bg-radial from-transparent via-[#120B0A]/40 to-[#120B0A]/85" />
            <div className="absolute inset-0 bg-gradient-to-b from-[#120B0A]/60 via-transparent to-[#120B0A]/85" />
          </div>
        </div>

        {/* Sacred Glowing Om Glyphic Symbol */}
        <div className="relative inline-block mb-3">
          <div className="text-4xl sm:text-5xl font-display text-[#F5B83D] drop-shadow-[0_0_24px_rgba(245,184,61,0.8)] animate-pulse-glow">
            🕉️
          </div>
        </div>

        {/* Festival Title: GANESH FESTIVAL 2026 */}
        <h1 className="text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-extrabold font-display tracking-tight text-[#FFF4DC] mb-2 leading-none drop-shadow-[0_4px_16px_rgba(0,0,0,0.95)]">
          GANESH FESTIVAL
          <span className="block text-3xl sm:text-5xl md:text-6xl lg:text-7xl text-transparent bg-clip-text bg-gradient-to-r from-[#F5B83D] via-[#FFD066] to-[#E88918] mt-1 drop-shadow-[0_4px_24px_rgba(245,184,61,0.5)]">
            2026
          </span>
        </h1>

        {/* Official Duration Banner from Circular */}
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#4A1018]/85 border border-[#F5B83D]/40 backdrop-blur-md text-xs font-semibold text-[#F5B83D] my-3 shadow-lg shadow-black/40">
          <Calendar className="w-3.5 h-3.5 text-[#F5B83D]" />
          <span>14th September – 16th September 2026</span>
        </div>

        {/* Festival Theme */}
        <div className="my-3">
          <div className="inline-block text-[11px] uppercase tracking-widest text-[#f4dfd0] font-bold bg-[#E88918]/15 px-3 py-1 rounded-full border border-[#E88918]/30 mb-1">
            THEME OF THE YEAR
          </div>
          <h2 className="text-xl sm:text-2xl md:text-3xl font-heading text-[#FFF4DC] font-bold tracking-wide drop-shadow-md">
            {festivalData.theme}
          </h2>
          <p className="text-xs sm:text-sm text-[#F5B83D] italic mt-1 drop-shadow-sm">
            "{festivalData.themeSubtitle}"
          </p>
        </div>

        {/* Tagline */}
        <p className="text-sm sm:text-base text-[#FFF4DC]/90 max-w-xl mx-auto leading-relaxed mb-8 drop-shadow-md">
          Where sacred traditions meet cutting-edge digital harmony. Experience Lord Ganesha with interactive Augmented Reality directly through your smartphone camera.
        </p>

        {/* Primary & Secondary CTAs */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4 max-w-md mx-auto">
          {/* Primary AR Button */}
          <button
            onClick={onStartAR}
            className="w-full sm:w-auto py-4 px-8 rounded-2xl font-bold text-base text-[#120B0A] bg-gradient-to-r from-[#F5B83D] via-[#FFD066] to-[#E88918] hover:opacity-95 active:scale-[0.98] transition-all shadow-xl shadow-[#F5B83D]/30 flex items-center justify-center gap-2.5 cursor-pointer"
          >
            <Sparkles className="w-5 h-5 fill-current" />
            <span>EXPERIENCE BAPPA IN AR</span>
          </button>

          {/* Secondary Explore Button */}
          <button
            onClick={onExplore}
            className="w-full sm:w-auto py-3.5 px-6 rounded-2xl font-semibold text-sm text-[#FFF4DC] glass-panel hover:bg-white/10 active:scale-[0.98] transition-all border border-[#F5B83D]/30 flex items-center justify-center gap-2 cursor-pointer"
          >
            <Compass className="w-4 h-4 text-[#F5B83D]" />
            <span>Official Schedule</span>
          </button>
        </div>

        {/* Sound toggle button */}
        <div className="flex items-center justify-center gap-4 mt-6 text-xs text-[#FFF4DC]/70">
          <button
            onClick={handleSoundToggle}
            className="flex items-center gap-1.5 hover:text-[#F5B83D] transition-colors py-1 px-2.5 rounded-lg hover:bg-white/5 cursor-pointer"
          >
            {isMuted ? <VolumeX className="w-4 h-4 text-white/50" /> : <Volume2 className="w-4 h-4 text-[#F5B83D]" />}
            <span>{isMuted ? 'Sound Off' : 'Temple Sound On'}</span>
          </button>
        </div>
      </div>

      {/* Floating Bottom Live Highlights Bar */}
      <div className="z-10 grid grid-cols-2 md:grid-cols-4 gap-2.5 max-w-4xl mx-auto w-full pt-4 border-t border-[#F5B83D]/15">
        <div className="p-3 rounded-xl bg-[#4A1018]/40 border border-[#F5B83D]/20 text-center">
          <span className="text-[10px] text-[#E88918] font-bold uppercase tracking-wider block">Official Dates</span>
          <span className="text-xs font-semibold text-[#FFF4DC] truncate block">14 – 16 Sept 2026</span>
        </div>
        <div className="p-3 rounded-xl bg-[#4A1018]/40 border border-[#F5B83D]/20 text-center">
          <span className="text-[10px] text-[#E88918] font-bold uppercase tracking-wider block">Location</span>
          <span className="text-xs font-semibold text-[#FFF4DC] truncate block">Reception, ACET</span>
        </div>
        <div className="p-3 rounded-xl bg-[#4A1018]/40 border border-[#F5B83D]/20 text-center">
          <span className="text-[10px] text-[#E88918] font-bold uppercase tracking-wider block">Aarti Time</span>
          <span className="text-xs font-semibold text-[#FFF4DC] truncate block">14 Sept • 10:30 AM</span>
        </div>
        <div className="p-3 rounded-xl bg-[#4A1018]/40 border border-[#F5B83D]/20 text-center">
          <span className="text-[10px] text-[#E88918] font-bold uppercase tracking-wider block">Technology</span>
          <span className="text-xs font-semibold text-[#FFF4DC] truncate block">WebAR • No App Needed</span>
        </div>
      </div>
    </section>
  );
};
