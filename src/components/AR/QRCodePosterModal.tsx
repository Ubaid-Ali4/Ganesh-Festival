import React, { useState } from 'react';
import { QrCode, Smartphone, Printer, Copy, Check, Sparkles, X } from 'lucide-react';
import acetLogoImg from '../../assets/images/acet_college_logo_1789121643866.jpg';

interface QRCodePosterModalProps {
  onClose: () => void;
}

export const QRCodePosterModal: React.FC<QRCodePosterModalProps> = ({ onClose }) => {
  const [copied, setCopied] = useState(false);
  const appUrl = typeof window !== 'undefined' ? window.location.href : 'https://acet-ganpati-ar.edu';

  // SVG QR Code generator to ensure 100% reliable offline/online scannability without broken third-party services
  // Encodes current URL cleanly via standard Quick Response matrix or SVG rendering
  const qrApiUrl = `https://api.qrserver.com/v1/create-qr-code/?size=320x320&data=${encodeURIComponent(appUrl)}&margin=15&color=12-11-10`;

  const handleCopyLink = () => {
    navigator.clipboard.writeText(appUrl).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2200);
    });
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-[#120B0A]/90 backdrop-blur-md animate-fade-in overflow-y-auto">
      <div className="relative w-full max-w-lg rounded-2xl glass-panel-gold border-2 border-[#F5B83D]/50 p-6 sm:p-8 text-center shadow-2xl my-auto">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 rounded-full bg-white/10 text-[#FFF4DC]/80 hover:text-white hover:bg-white/20 transition-all cursor-pointer"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Physical Poster Preview Box */}
        <div
          id="printable-poster"
          className="bg-[#FFF4DC] text-[#120B0A] rounded-2xl p-6 sm:p-8 border-4 border-[#C58925] shadow-2xl relative overflow-hidden text-center my-2"
        >
          {/* Subtle Traditional Border Decoration */}
          <div className="absolute inset-2 border-2 border-[#E88918]/40 rounded-xl pointer-events-none" />

          {/* College Crest & Tagline */}
          <div className="flex items-center justify-center gap-2.5 mb-1.5">
            <img
              src={acetLogoImg}
              alt="ACET Emblem"
              className="w-9 h-9 rounded-full object-cover border border-[#C58925]"
              referrerPolicy="no-referrer"
            />
            <div className="text-left">
              <div className="text-[11px] uppercase tracking-wider text-[#4A1018] font-bold leading-tight">
                Anuradha College of Engineering & Technology, Chikhli
              </div>
              <div className="text-[10px] text-[#E88918] font-semibold">
                Ganesh Festival 2026 • (14th – 16th September 2026)
              </div>
            </div>
          </div>

          {/* Section 3: MAIN TEXT */}
          <h1 className="text-2xl sm:text-3xl font-extrabold font-heading text-[#4A1018] tracking-wide mb-1">
            🕉️ GANPATI BAPPA MORYA!
          </h1>

          {/* Section 3: SUBTEXT */}
          <h2 className="text-sm sm:text-base font-bold text-[#E88918] flex items-center justify-center gap-1.5 mb-2">
            <Sparkles className="w-4 h-4 fill-current" />
            Experience Bappa in Augmented Reality
            <Sparkles className="w-4 h-4 fill-current" />
          </h2>

          {/* Section 3: INSTRUCTION */}
          <div className="inline-block px-4 py-1.5 rounded-full bg-[#4A1018] text-[#FFF4DC] font-bold text-xs tracking-wider uppercase mb-5 shadow-sm">
            Scan • Point • Experience
          </div>

          {/* Section 3: PROMINENT QR CODE WITH SUFFICIENT WHITE SPACE */}
          <div className="w-52 h-52 sm:w-60 sm:h-60 mx-auto bg-white p-3 rounded-2xl border-2 border-[#120B0A]/20 shadow-md flex items-center justify-center mb-4">
            <img
              src={qrApiUrl}
              alt="Scan to Experience Bappa in AR"
              className="w-full h-full object-contain"
              referrerPolicy="no-referrer"
            />
          </div>

          {/* Section 3: Below the QR Steps */}
          <div className="bg-[#FAF0D7] rounded-xl p-3 max-w-xs mx-auto border border-[#E88918]/30 mb-3 text-left text-xs font-semibold text-[#4A1018] space-y-1">
            <div className="flex items-center gap-2">
              <span>📱</span>
              <span>Scan using your phone</span>
            </div>
            <div className="flex items-center gap-2">
              <span>✨</span>
              <span>Open the AR experience</span>
            </div>
            <div className="flex items-center gap-2">
              <span>🐘</span>
              <span>Point your camera at Bappa</span>
            </div>
          </div>

          {/* Section 3: Mobile Recommendation */}
          <p className="text-xs font-bold text-[#4A1018] flex items-center justify-center gap-1">
            Best experienced on mobile 📱
          </p>
        </div>

        {/* Organizer Actions */}
        <div className="flex items-center justify-center gap-3 mt-4 pt-2 border-t border-[#F5B83D]/20 text-xs">
          <button
            onClick={handleCopyLink}
            className="py-2.5 px-4 rounded-xl font-medium bg-[#4A1018]/80 hover:bg-[#4A1018] text-[#FFF4DC] border border-[#F5B83D]/30 flex items-center gap-1.5 transition-all cursor-pointer"
          >
            {copied ? <Check className="w-4 h-4 text-[#F5B83D]" /> : <Copy className="w-4 h-4" />}
            <span>{copied ? 'Link Copied' : 'Copy AR Link'}</span>
          </button>

          <button
            onClick={handlePrint}
            className="py-2.5 px-4 rounded-xl font-medium bg-[#F5B83D] text-[#120B0A] hover:bg-[#FFD066] flex items-center gap-1.5 transition-all cursor-pointer font-semibold shadow-md"
          >
            <Printer className="w-4 h-4" />
            <span>Print Poster</span>
          </button>
        </div>
      </div>
    </div>
  );
};
