import React, { useState } from 'react';
import { Download, Share2, RotateCcw, Check, Sparkles, Heart } from 'lucide-react';
import confetti from 'canvas-confetti';

interface PhotoResultModalProps {
  photoDataUrl: string;
  onRetake: () => void;
  onClose: () => void;
}

export const PhotoResultModal: React.FC<PhotoResultModalProps> = ({
  photoDataUrl,
  onRetake,
  onClose,
}) => {
  const [copied, setCopied] = useState(false);
  const [saved, setSaved] = useState(false);

  // Trigger festive golden/marigold confetti
  React.useEffect(() => {
    try {
      confetti({
        particleCount: 55,
        spread: 60,
        origin: { y: 0.6 },
        colors: ['#F5B83D', '#E88918', '#FF5400', '#FFD066'],
      });
    } catch {
      // safe fallback
    }
  }, []);

  const handleDownload = () => {
    const link = document.createElement('a');
    link.href = photoDataUrl;
    link.download = `Ganesh_Festival_2026_Bappa_AR_${Date.now()}.jpg`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    setSaved(true);
    setTimeout(() => setSaved(false), 2500);
  };

  const handleShare = async () => {
    const shareText =
      '🕉️ I experienced Ganesh Festival 2026 in Augmented Reality at Anuradha College of Engineering & Technology, Chikhli!\nGanpati Bappa Morya! 🙏✨';
    const currentUrl = typeof window !== 'undefined' ? window.location.href : '';

    if (navigator.share) {
      try {
        // Attempt to share file if supported
        const res = await fetch(photoDataUrl);
        const blob = await res.blob();
        const file = new File([blob], 'ganesh_festival_2026_ar.jpg', { type: 'image/jpeg' });

        if (navigator.canShare && navigator.canShare({ files: [file] })) {
          await navigator.share({
            title: 'Ganesh Festival 2026 AR Moment',
            text: shareText,
            url: currentUrl,
            files: [file],
          });
          return;
        }

        await navigator.share({
          title: 'Ganesh Festival 2026 AR Moment',
          text: shareText,
          url: currentUrl,
        });
      } catch (err) {
        if ((err as Error).name !== 'AbortError') {
          copyToClipboard(shareText + ' ' + currentUrl);
        }
      }
    } else {
      copyToClipboard(shareText + ' ' + currentUrl);
    }
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    });
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-[#120B0A]/95 backdrop-blur-lg animate-fade-in overflow-y-auto">
      <div className="relative w-full max-w-md rounded-2xl p-4 sm:p-6 glass-panel-gold border-2 border-[#F5B83D]/50 text-center shadow-2xl my-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-3 px-1">
          <div className="flex items-center gap-2">
            <span className="text-lg">🕉️</span>
            <h3 className="font-heading font-bold text-lg sm:text-xl text-[#FFF4DC]">
              Your Bappa Moment ✨
            </h3>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 text-xs rounded-full bg-white/10 text-[#FFF4DC]/70 hover:text-white"
          >
            ✕
          </button>
        </div>

        {/* Captured Photo Container */}
        <div className="relative rounded-xl overflow-hidden border-2 border-[#F5B83D]/40 shadow-inner bg-black/60 aspect-[9/14] sm:aspect-[9/13] max-h-[62vh] mx-auto mb-4">
          <img
            src={photoDataUrl}
            alt="Your Bappa AR Capture"
            className="w-full h-full object-contain"
            referrerPolicy="no-referrer"
          />
          <div className="absolute top-3 right-3 px-2.5 py-1 rounded-full bg-[#120B0A]/70 backdrop-blur-md border border-[#F5B83D]/40 text-[11px] font-semibold text-[#F5B83D] flex items-center gap-1 shadow-md">
            <Sparkles className="w-3 h-3 fill-current" />
            AR Captured
          </div>
        </div>

        {/* Blessing banner */}
        <div className="p-2.5 rounded-xl bg-[#4A1018]/60 border border-[#F5B83D]/30 mb-4 text-xs text-[#FFF4DC]/90 flex items-center justify-center gap-1.5">
          <Heart className="w-3.5 h-3.5 text-[#F5B83D] fill-current" />
          <span>May Bappa bless you with wisdom, happiness & success!</span>
        </div>

        {/* Action Buttons as specified in Section 17 */}
        <div className="grid grid-cols-3 gap-2">
          <button
            onClick={handleDownload}
            className="py-3 px-2 rounded-xl font-semibold text-xs text-[#120B0A] bg-gradient-to-r from-[#F5B83D] to-[#E88918] hover:opacity-95 active:scale-[0.97] transition-all flex flex-col items-center justify-center gap-1 shadow-md shadow-[#F5B83D]/20 cursor-pointer"
          >
            {saved ? <Check className="w-4 h-4" /> : <Download className="w-4 h-4" />}
            <span>{saved ? 'Saved!' : 'Save Photo'}</span>
          </button>

          <button
            onClick={handleShare}
            className="py-3 px-2 rounded-xl font-semibold text-xs text-[#FFF4DC] bg-[#4A1018] border border-[#F5B83D]/40 hover:bg-[#4A1018]/80 active:scale-[0.97] transition-all flex flex-col items-center justify-center gap-1 cursor-pointer"
          >
            {copied ? <Check className="w-4 h-4 text-[#F5B83D]" /> : <Share2 className="w-4 h-4 text-[#F5B83D]" />}
            <span>{copied ? 'Link Copied' : 'Share'}</span>
          </button>

          <button
            onClick={onRetake}
            className="py-3 px-2 rounded-xl font-semibold text-xs text-[#FFF4DC]/80 bg-white/5 border border-white/15 hover:bg-white/10 active:scale-[0.97] transition-all flex flex-col items-center justify-center gap-1 cursor-pointer"
          >
            <RotateCcw className="w-4 h-4" />
            <span>Try Again</span>
          </button>
        </div>
      </div>
    </div>
  );
};
