import React, { useState, useEffect } from 'react';
import { Sparkles, Volume2, VolumeX, Flame, Award, Menu, X } from 'lucide-react';
import { audioService } from '../../utils/audio';
import acetLogoImg from '../../assets/images/acet_college_logo_1789121643866.jpg';

interface NavbarProps {
  onStartAR: () => void;
  onNavigate: (sectionId: string) => void;
  activeSection: string;
}

export const Navbar: React.FC<NavbarProps> = ({
  onStartAR,
  onNavigate,
  activeSection,
}) => {
  const [isMuted, setIsMuted] = useState(audioService.getIsMuted());
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleSoundToggle = () => {
    const muted = audioService.toggleMute();
    setIsMuted(muted);
    if (!muted) {
      audioService.playTempleBell(0.6);
    }
  };

  const navLinks = [
    { id: 'about', label: 'About Bappa' },
    { id: 'events', label: 'Events & Schedule' },
    { id: 'diya', label: 'Light Diya' },
    { id: 'gallery', label: 'Gallery' },
  ];

  return (
    <header
      className={`fixed top-0 inset-x-0 z-30 transition-all duration-300 ${
        scrolled
          ? 'bg-[#120B0A]/90 backdrop-blur-md border-b border-[#F5B83D]/20 py-2.5 shadow-xl'
          : 'bg-gradient-to-b from-[#120B0A]/90 to-transparent py-4'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 flex items-center justify-between">
        {/* Brand / Logo */}
        <div
          onClick={() => onNavigate('home')}
          className="flex items-center gap-3 cursor-pointer select-none group"
        >
          {/* Official ACET True Eagle Logo Emblem */}
          <div className="relative w-11 h-11 sm:w-12 sm:h-12 rounded-full overflow-hidden border-2 border-[#F5B83D] shadow-lg shadow-[#F5B83D]/25 group-hover:scale-105 group-hover:border-[#FFD066] transition-all bg-[#0090C8] flex-shrink-0">
            <img
              src={acetLogoImg}
              alt="ACET Chikhli - True Eagle Official Emblem"
              className="w-full h-full object-cover object-center scale-105"
              referrerPolicy="no-referrer"
            />
            {/* Subtle inner gold rim overlay */}
            <div className="absolute inset-0 rounded-full ring-1 ring-inset ring-[#F5B83D]/40 pointer-events-none" />
          </div>

          <div>
            <div className="flex items-center gap-1.5">
              <span className="font-heading font-bold text-sm sm:text-base text-[#FFF4DC] tracking-wide group-hover:text-[#F5B83D] transition-colors">
                GANESH FESTIVAL 2026
              </span>
              <span className="hidden sm:inline text-[10px] px-1.5 py-0.5 rounded bg-[#E88918]/20 border border-[#E88918]/40 text-[#F5B83D] font-bold">
                ACET
              </span>
            </div>
            <p className="text-[10px] text-[#FFF4DC]/70 tracking-wider">
              Anuradha College of Engineering & Technology
            </p>
          </div>
        </div>

        {/* Desktop Nav Links */}
        <nav className="hidden lg:flex items-center gap-6 text-xs font-medium text-[#FFF4DC]/80">
          {navLinks.map((link) => (
            <button
              key={link.id}
              onClick={() => onNavigate(link.id)}
              className={`hover:text-[#F5B83D] transition-colors py-1 cursor-pointer ${
                activeSection === link.id ? 'text-[#F5B83D] font-semibold border-b border-[#F5B83D]' : ''
              }`}
            >
              {link.label}
            </button>
          ))}
        </nav>

        {/* Right Actions */}
        <div className="flex items-center gap-2.5">
          {/* Sound Mute/Unmute */}
          <button
            onClick={handleSoundToggle}
            title={isMuted ? 'Turn Sound On' : 'Mute Sound'}
            className="p-2 rounded-full glass-panel hover:bg-white/10 text-[#F5B83D] border border-[#F5B83D]/30 active:scale-95 transition-all cursor-pointer"
          >
            {isMuted ? <VolumeX className="w-4 h-4 text-white/50" /> : <Volume2 className="w-4 h-4" />}
          </button>

          {/* Primary AR Highlight Button */}
          <button
            onClick={onStartAR}
            className="py-2 px-3.5 sm:px-4 rounded-xl font-bold text-xs text-[#120B0A] bg-gradient-to-r from-[#F5B83D] via-[#FFD066] to-[#E88918] hover:opacity-95 active:scale-95 transition-all shadow-md shadow-[#F5B83D]/25 flex items-center gap-1.5 cursor-pointer"
          >
            <Sparkles className="w-3.5 h-3.5 fill-current" />
            <span className="hidden sm:inline">EXPERIENCE IN AR</span>
            <span className="sm:hidden">AR VIEW</span>
          </button>

          {/* Mobile Menu Toggle */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-2 rounded-xl glass-panel text-[#FFF4DC] hover:text-white"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Dropdown */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-[#120B0A]/95 backdrop-blur-xl border-b border-[#F5B83D]/30 p-4 animate-fade-in">
          <div className="grid grid-cols-2 gap-2 text-xs font-medium">
            {navLinks.map((link) => (
              <button
                key={link.id}
                onClick={() => {
                  onNavigate(link.id);
                  setMobileMenuOpen(false);
                }}
                className="p-2.5 rounded-xl bg-white/5 hover:bg-white/10 text-left text-[#FFF4DC] flex items-center justify-between"
              >
                <span>{link.label}</span>
                <span className="text-[#F5B83D]">→</span>
              </button>
            ))}
          </div>
        </div>
      )}
    </header>
  );
};
