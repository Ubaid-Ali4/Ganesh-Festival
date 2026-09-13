import React, { useState } from 'react';
import { HelpCircle, RefreshCw, Sparkles, BookOpen } from 'lucide-react';
import { festivalData } from '../../data/festivalData';
import { audioService } from '../../utils/audio';

export const DidYouKnow: React.FC = () => {
  const [factIndex, setFactIndex] = useState(0);
  const [animating, setAnimating] = useState(false);

  const facts = festivalData.facts;
  const currentFact = facts[factIndex];

  const handleNextFact = () => {
    audioService.playTempleBell(0.4);
    setAnimating(true);
    setTimeout(() => {
      setFactIndex((prev) => (prev + 1) % facts.length);
      setAnimating(false);
    }, 250);
  };

  return (
    <section id="facts" className="py-16 px-4 sm:px-6 max-w-4xl mx-auto">
      <div className="relative rounded-3xl glass-panel-gold border-2 border-[#F5B83D]/35 p-6 sm:p-10 text-center shadow-2xl overflow-hidden">
        {/* Decorative Watermark */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-8xl sm:text-9xl text-[#F5B83D]/5 pointer-events-none select-none font-display">
          🐘
        </div>

        {/* Section Header */}
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#E88918]/15 border border-[#E88918]/30 text-xs font-semibold text-[#E88918] mb-3">
          <BookOpen className="w-3.5 h-3.5" />
          <span>FESTIVAL INSIGHTS</span>
        </div>

        <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold font-heading text-[#FFF4DC] mb-2">
          🐘 Did You Know?
        </h2>
        <p className="text-xs sm:text-sm text-[#FFF4DC]/75 mb-8">
          Timeless spiritual symbolisms with lessons for our modern digital lives.
        </p>

        {/* Animated Fact Card Content */}
        <div
          className={`transition-all duration-300 transform max-w-xl mx-auto p-6 rounded-2xl bg-[#120B0A]/70 border border-[#F5B83D]/25 mb-6 text-left ${
            animating ? 'opacity-0 scale-95' : 'opacity-100 scale-100'
          }`}
        >
          <div className="flex items-center justify-between mb-3 pb-2 border-b border-[#F5B83D]/15">
            <span className="text-xs font-bold uppercase tracking-wider text-[#F5B83D]">
              {currentFact.symbolism}
            </span>
            <span className="text-[10px] text-[#FFF4DC]/50">
              Insight {factIndex + 1} of {facts.length}
            </span>
          </div>

          <h3 className="text-lg font-bold font-heading text-[#FFF4DC] mb-2">
            {currentFact.title}
          </h3>

          <p className="text-xs sm:text-sm text-[#FFF4DC]/80 leading-relaxed mb-4">
            {currentFact.explanation}
          </p>

          <div className="p-3 rounded-xl bg-[#4A1018]/60 border border-[#F5B83D]/30">
            <span className="text-[10px] uppercase font-bold text-[#E88918] block mb-1">
              Digital Age Lesson:
            </span>
            <p className="text-xs text-[#FFF4DC]/90 italic leading-relaxed">
              "{currentFact.digitalWisdom}"
            </p>
          </div>
        </div>

        {/* Refresh / Next Button (Section 25) */}
        <button
          onClick={handleNextFact}
          className="py-2.5 px-5 rounded-xl text-xs font-bold text-[#120B0A] bg-gradient-to-r from-[#F5B83D] to-[#E88918] hover:opacity-95 active:scale-95 transition-all inline-flex items-center gap-2 shadow-md cursor-pointer"
        >
          <RefreshCw className={`w-3.5 h-3.5 ${animating ? 'animate-spin' : ''}`} />
          <span>Next Ganpati Fact</span>
        </button>
      </div>
    </section>
  );
};
