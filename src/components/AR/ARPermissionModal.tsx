import React from 'react';
import { Camera, ShieldCheck, Sparkles, AlertCircle } from 'lucide-react';

interface ARPermissionModalProps {
  onAllow: () => void;
  onCancel: () => void;
  permissionError: string | null;
  isRequesting: boolean;
}

export const ARPermissionModal: React.FC<ARPermissionModalProps> = ({
  onAllow,
  onCancel,
  permissionError,
  isRequesting,
}) => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#120B0A]/85 backdrop-blur-md animate-fade-in">
      <div className="relative w-full max-w-md rounded-2xl p-6 sm:p-8 glass-panel-gold border-2 border-[#F5B83D]/40 text-center shadow-2xl overflow-hidden">
        {/* Subtle Decorative Golden Mandala in BG */}
        <div className="absolute -top-16 -right-16 w-44 h-44 rounded-full border border-[#F5B83D]/15 animate-spin-slow pointer-events-none" />
        <div className="absolute -bottom-16 -left-16 w-44 h-44 rounded-full border border-[#E88918]/15 animate-spin-reverse-slow pointer-events-none" />

        {/* Sacred Icon Badge */}
        <div className="mx-auto w-16 h-16 sm:w-20 sm:h-20 rounded-2xl bg-gradient-to-br from-[#E88918]/30 to-[#4A1018]/60 border border-[#F5B83D]/50 flex items-center justify-center mb-5 shadow-lg shadow-[#F5B83D]/10">
          <Camera className="w-8 h-8 sm:w-10 sm:h-10 text-[#F5B83D] animate-pulse-glow" />
        </div>

        {/* Title */}
        <p className="text-xs uppercase tracking-widest text-[#E88918] font-semibold mb-1">
          Augmented Reality
        </p>
        <h2 className="text-2xl sm:text-3xl font-bold font-heading text-[#FFF4DC] mb-3">
          ✨ Meet Bappa in AR
        </h2>

        {/* Description as specified in Section 7 */}
        <p className="text-sm sm:text-base text-[#FFF4DC]/80 leading-relaxed mb-4">
          Your camera will be used to place an interactive, divine digital experience around the Ganpati idol.
        </p>

        {/* Privacy Note */}
        <div className="flex items-center justify-center gap-2 text-xs text-[#FFF4DC]/60 bg-[#120B0A]/60 rounded-lg p-2.5 mb-6 border border-[#F5B83D]/20">
          <ShieldCheck className="w-4 h-4 text-[#F5B83D] shrink-0" />
          <span>Camera stream is processed 100% locally on your device.</span>
        </div>

        {/* Permission Denied / Error handling as per Section 33 */}
        {permissionError && (
          <div className="mb-6 p-3.5 rounded-xl bg-[#4A1018]/90 border border-red-500/50 text-left flex items-start gap-3 text-xs text-red-200">
            <AlertCircle className="w-5 h-5 text-red-400 shrink-0 mt-0.5" />
            <div>
              <p className="font-semibold text-red-300 mb-0.5">Camera Access Needed</p>
              <p className="opacity-90">{permissionError}</p>
            </div>
          </div>
        )}

        {/* Action Buttons */}
        <div className="flex flex-col gap-3">
          <button
            onClick={onAllow}
            disabled={isRequesting}
            className="w-full py-3.5 px-6 rounded-xl font-semibold text-[#120B0A] bg-gradient-to-r from-[#F5B83D] via-[#FFD066] to-[#E88918] hover:opacity-95 active:scale-[0.98] transition-all duration-200 flex items-center justify-center gap-2 shadow-lg shadow-[#F5B83D]/25 disabled:opacity-50"
          >
            <Sparkles className="w-4 h-4 fill-current" />
            {isRequesting ? 'Accessing Camera...' : permissionError ? 'Try Again' : 'Allow Camera'}
          </button>

          <button
            onClick={onCancel}
            className="w-full py-3 px-6 rounded-xl font-medium text-sm text-[#FFF4DC]/70 hover:text-[#FFF4DC] hover:bg-white/5 active:scale-[0.98] transition-all"
          >
            {permissionError ? 'Continue Without AR' : 'Maybe Later'}
          </button>
        </div>
      </div>
    </div>
  );
};
