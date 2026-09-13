import React, { useState, useEffect } from 'react';
import { Flame, Clock, MapPin, Bell, Sparkles, CheckCircle2 } from 'lucide-react';
import { festivalData } from '../../data/festivalData';
import { audioService } from '../../utils/audio';

export const AartiSchedule: React.FC = () => {
  const [currentHour, setCurrentHour] = useState<number>(new Date().getHours());
  const [currentMinute, setCurrentMinute] = useState<number>(new Date().getMinutes());

  useEffect(() => {
    const timer = setInterval(() => {
      const now = new Date();
      setCurrentHour(now.getHours());
      setCurrentMinute(now.getMinutes());
    }, 60000);
    return () => clearInterval(timer);
  }, []);

  const isCurrentAarti = (startH: number, startM: number, endH: number, endM: number) => {
    const currentTotal = currentHour * 60 + currentMinute;
    const startTotal = startH * 60 + startM;
    const endTotal = endH * 60 + endM;
    return currentTotal >= startTotal && currentTotal <= endTotal;
  };

  const handleRingGhanti = (name: string) => {
    audioService.playAartiChime();
  };

  return (
    <section id="aarti" className="py-20 px-4 sm:px-6 max-w-7xl mx-auto">
      {/* Section Header */}
      <div className="text-center max-w-2xl mx-auto mb-14">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#E88918]/15 border border-[#E88918]/30 text-xs font-semibold text-[#E88918] mb-3">
          <Flame className="w-3.5 h-3.5 text-[#E88918]" />
          <span>DAILY RITUALS & DARSHAN TIMINGS</span>
        </div>
        <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold font-heading text-[#FFF4DC] mb-3">
          🪔 Aarti & Darshan
        </h2>
        <p className="text-sm sm:text-base text-[#FFF4DC]/80">
          Reverent daily prayers offered by students, faculty, and devotees at the central campus mandap.
        </p>

        {/* Location Banner (Section 21) */}
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-[#4A1018]/60 border border-[#F5B83D]/30 mt-5 text-xs text-[#FFF4DC] shadow-md">
          <MapPin className="w-4 h-4 text-[#F5B83D] shrink-0" />
          <span>
            <strong>Location:</strong> {festivalData.location}
          </span>
        </div>
      </div>

      {/* Aarti Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5 mb-12">
        {festivalData.aartiList.map((aarti) => {
          const active = isCurrentAarti(
            aarti.startHour,
            aarti.startMinute,
            aarti.endHour,
            aarti.endMinute
          );

          return (
            <div
              key={aarti.id}
              className={`rounded-3xl p-6 transition-all duration-300 flex flex-col justify-between relative overflow-hidden border ${
                active
                  ? 'glass-panel-gold border-[#F5B83D] shadow-2xl shadow-[#F5B83D]/20 ring-2 ring-[#F5B83D]/50'
                  : 'glass-panel border-[#F5B83D]/25 hover:border-[#F5B83D]/50'
              }`}
            >
              {/* Active live badge */}
              {active && (
                <div className="absolute top-3 right-3 px-2.5 py-0.5 rounded-full bg-[#F5B83D] text-[#120B0A] font-bold text-[10px] tracking-wide flex items-center gap-1 shadow-md">
                  <span className="w-2 h-2 rounded-full bg-[#120B0A] animate-ping" />
                  <span>DARSHAN LIVE NOW</span>
                </div>
              )}

              <div>
                {/* Diya Graphic */}
                <div className="w-12 h-12 rounded-2xl bg-[#4A1018]/80 border border-[#F5B83D]/40 flex items-center justify-center mb-4 shadow-md">
                  <div className="relative animate-flame">
                    <Flame className="w-6 h-6 text-[#F5B83D]" />
                  </div>
                </div>

                <div className="flex items-center gap-1.5 text-xs font-bold text-[#E88918] uppercase tracking-wider mb-1">
                  <Clock className="w-3.5 h-3.5" />
                  <span>{aarti.time}</span>
                </div>

                <h3 className="text-lg font-bold font-heading text-[#FFF4DC] mb-0.5">
                  {aarti.name}
                </h3>
                <p className="text-xs text-[#F5B83D] font-medium mb-3 italic">
                  {aarti.marathiName}
                </p>

                <p className="text-xs text-[#FFF4DC]/75 leading-relaxed mb-4">
                  {aarti.description}
                </p>
              </div>

              <div className="pt-4 border-t border-[#F5B83D]/15">
                <div className="text-[11px] text-[#FFF4DC]/60 italic mb-3">
                  ✨ {aarti.significance}
                </div>
                <button
                  onClick={() => handleRingGhanti(aarti.name)}
                  className="w-full py-2.5 px-3 rounded-xl font-semibold text-xs text-[#FFF4DC] bg-[#4A1018]/80 hover:bg-[#4A1018] border border-[#F5B83D]/30 flex items-center justify-center gap-2 transition-all active:scale-95 cursor-pointer"
                >
                  <Bell className="w-3.5 h-3.5 text-[#F5B83D]" />
                  <span>Ring Ghanti for Blessings</span>
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {/* Devotional Prasad & Mahapooja Notice */}
      <div className="p-6 rounded-2xl glass-panel border border-[#F5B83D]/25 max-w-3xl mx-auto flex flex-col sm:flex-row items-center gap-4 text-center sm:text-left">
        <div className="w-12 h-12 rounded-full bg-[#E88918]/20 border border-[#E88918] flex items-center justify-center shrink-0">
          <Sparkles className="w-6 h-6 text-[#F5B83D]" />
        </div>
        <div className="flex-1">
          <h4 className="text-sm font-bold text-[#FFF4DC] mb-1">
            Modak & Prasad Distribution
          </h4>
          <p className="text-xs text-[#FFF4DC]/70 leading-relaxed">
            Fresh handcrafted Ukadiche Modak and sacred prasad are distributed to all visitors immediately following the Madhyahna (12:30 PM) and Evening (7:00 PM) Aartis.
          </p>
        </div>
      </div>
    </section>
  );
};
