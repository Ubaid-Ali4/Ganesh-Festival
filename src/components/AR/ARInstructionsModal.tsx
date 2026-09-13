import React from 'react';
import { Smartphone, Target, Move, Sparkles } from 'lucide-react';

interface ARInstructionsModalProps {
  onStart: () => void;
  onBack: () => void;
}

export const ARInstructionsModal: React.FC<ARInstructionsModalProps> = ({ onStart, onBack }) => {
  const steps = [
    {
      num: 'STEP 1',
      icon: Smartphone,
      title: 'Hold Phone Upright',
      desc: 'Hold your smartphone upright at chest level with a steady grip.',
    },
    {
      num: 'STEP 2',
      icon: Target,
      title: 'Point at Bappa',
      desc: 'Point the camera directly toward the physical Ganpati idol or installation.',
    },
    {
      num: 'STEP 3',
      icon: Move,
      title: 'Move Slowly',
      desc: 'Slowly adjust your distance so Bappa is framed within the scanning zone.',
    },
    {
      num: 'STEP 4',
      icon: Sparkles,
      title: 'Experience the Aura',
      desc: 'Wait 2 seconds as the AR engine anchors sacred mandalas, petals & diyas!',
    },
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#120B0A]/90 backdrop-blur-md animate-fade-in overflow-y-auto">
      <div className="relative w-full max-w-lg rounded-2xl p-6 sm:p-8 glass-panel-gold border-2 border-[#F5B83D]/40 text-center shadow-2xl my-auto">
        {/* Animated Visual Reticle Scanner Graphic */}
        <div className="relative w-28 h-28 mx-auto mb-6 flex items-center justify-center">
          {/* Outer rotating decorative ring */}
          <div className="absolute inset-0 rounded-full border border-dashed border-[#F5B83D]/40 animate-spin-slow" />
          {/* Inner pulsating target reticle */}
          <div className="absolute inset-2 rounded-full border border-[#E88918]/60 animate-pulse-glow" />
          {/* Phone scanning graphic */}
          <div className="relative z-10 w-14 h-20 rounded-xl bg-gradient-to-b from-[#4A1018] to-[#120B0A] border-2 border-[#F5B83D] flex flex-col items-center justify-between p-1.5 shadow-lg shadow-[#F5B83D]/20">
            <div className="w-4 h-1 bg-[#F5B83D]/60 rounded-full" />
            <div className="text-xl">🕉️</div>
            <div className="w-2 h-2 rounded-full bg-[#F5B83D]" />
          </div>
          {/* Scanning light sweep */}
          <div className="absolute inset-x-2 h-1 bg-gradient-to-r from-transparent via-[#FFD066] to-transparent animate-scan" />
        </div>

        <p className="text-xs uppercase tracking-widest text-[#E88918] font-semibold mb-1">
          Quick Calibration Guide
        </p>
        <h2 className="text-2xl sm:text-3xl font-bold font-heading text-[#FFF4DC] mb-6">
          AR Festival Instructions
        </h2>

        {/* 4 Steps Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-8 text-left">
          {steps.map((step) => {
            const Icon = step.icon;
            return (
              <div
                key={step.num}
                className="p-3.5 rounded-xl bg-[#120B0A]/70 border border-[#F5B83D]/20 flex items-start gap-3 hover:border-[#F5B83D]/40 transition-colors"
              >
                <div className="w-9 h-9 rounded-lg bg-[#4A1018]/80 border border-[#F5B83D]/30 flex items-center justify-center shrink-0 mt-0.5">
                  <Icon className="w-5 h-5 text-[#F5B83D]" />
                </div>
                <div>
                  <div className="flex items-center gap-1.5 mb-0.5">
                    <span className="text-[10px] font-bold tracking-wider text-[#E88918] uppercase">
                      {step.num}
                    </span>
                  </div>
                  <h4 className="text-sm font-semibold text-[#FFF4DC]">{step.title}</h4>
                  <p className="text-xs text-[#FFF4DC]/70 leading-relaxed mt-0.5">{step.desc}</p>
                </div>
              </div>
            );
          })}
        </div>

        {/* Primary CTA button as required by Section 8 */}
        <div className="flex flex-col gap-3">
          <button
            onClick={onStart}
            className="w-full py-4 px-6 rounded-xl font-bold text-base text-[#120B0A] bg-gradient-to-r from-[#F5B83D] via-[#FFD066] to-[#E88918] hover:opacity-95 active:scale-[0.98] transition-all shadow-xl shadow-[#F5B83D]/25 flex items-center justify-center gap-2 cursor-pointer"
          >
            <Sparkles className="w-5 h-5 fill-current" />
            START AR
          </button>
          <button
            onClick={onBack}
            className="w-full py-2.5 px-4 text-xs font-medium text-[#FFF4DC]/60 hover:text-[#FFF4DC] transition-colors"
          >
            Back to Home
          </button>
        </div>
      </div>
    </div>
  );
};
