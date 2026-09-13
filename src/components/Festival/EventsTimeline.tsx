import React, { useState } from 'react';
import { Calendar, MapPin, Clock, CheckCircle, FileText, Award, UserCheck, Sparkles } from 'lucide-react';
import { festivalData } from '../../data/festivalData';

export const EventsTimeline: React.FC = () => {
  const [selectedDay, setSelectedDay] = useState<string>('all');
  const [viewMode, setViewMode] = useState<'cards' | 'table'>('cards');

  const filteredEvents = festivalData.eventsList.filter((event) => {
    if (selectedDay === 'all') return true;
    return event.date === selectedDay;
  });

  return (
    <section id="events" className="py-20 px-4 sm:px-6 max-w-7xl mx-auto">
      {/* Section Header */}
      <div className="text-center max-w-3xl mx-auto mb-10">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#E88918]/15 border border-[#E88918]/30 text-xs font-semibold text-[#E88918] mb-3">
          <Calendar className="w-3.5 h-3.5" />
          <span>OFFICIAL FESTIVAL SCHEDULE</span>
        </div>
        <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold font-heading text-[#FFF4DC] mb-2">
          Ganesh Festival 2026 Schedule
        </h2>
        <p className="text-sm sm:text-base text-[#F5B83D] font-medium">
          (14th September – 16th September 2026)
        </p>
        <p className="text-xs sm:text-sm text-[#FFF4DC]/70 mt-1">
          Anuradha College of Engineering and Technology, Chikhli
        </p>
      </div>

      {/* Filter Tabs & View Mode Switcher */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 max-w-4xl mx-auto mb-8">
        {/* Day Filters */}
        <div className="flex flex-wrap items-center justify-center gap-2">
          <button
            onClick={() => setSelectedDay('all')}
            className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
              selectedDay === 'all'
                ? 'bg-[#F5B83D] text-[#120B0A] shadow-md'
                : 'glass-panel text-[#FFF4DC]/80 hover:bg-white/10'
            }`}
          >
            All Events ({festivalData.eventsList.length})
          </button>
          <button
            onClick={() => setSelectedDay('14/09/2026')}
            className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
              selectedDay === '14/09/2026'
                ? 'bg-[#F5B83D] text-[#120B0A] shadow-md'
                : 'glass-panel text-[#FFF4DC]/80 hover:bg-white/10'
            }`}
          >
            Day 1 (14 Sept)
          </button>
          <button
            onClick={() => setSelectedDay('15/09/2026')}
            className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
              selectedDay === '15/09/2026'
                ? 'bg-[#F5B83D] text-[#120B0A] shadow-md'
                : 'glass-panel text-[#FFF4DC]/80 hover:bg-white/10'
            }`}
          >
            Day 2 (15 Sept)
          </button>
          <button
            onClick={() => setSelectedDay('16/09/2026')}
            className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
              selectedDay === '16/09/2026'
                ? 'bg-[#F5B83D] text-[#120B0A] shadow-md'
                : 'glass-panel text-[#FFF4DC]/80 hover:bg-white/10'
            }`}
          >
            Day 3 (16 Sept)
          </button>
        </div>

        {/* View Switcher */}
        <div className="flex items-center gap-1.5 p-1 rounded-xl glass-panel border border-[#F5B83D]/25 text-xs font-medium">
          <button
            onClick={() => setViewMode('cards')}
            className={`px-3 py-1 rounded-lg transition-colors cursor-pointer ${
              viewMode === 'cards' ? 'bg-[#4A1018] text-[#F5B83D] font-bold shadow-sm' : 'text-[#FFF4DC]/70 hover:text-[#FFF4DC]'
            }`}
          >
            Cards
          </button>
          <button
            onClick={() => setViewMode('table')}
            className={`px-3 py-1 rounded-lg transition-colors cursor-pointer flex items-center gap-1 ${
              viewMode === 'table' ? 'bg-[#4A1018] text-[#F5B83D] font-bold shadow-sm' : 'text-[#FFF4DC]/70 hover:text-[#FFF4DC]'
            }`}
          >
            <FileText className="w-3.5 h-3.5" />
            <span>Official Table</span>
          </button>
        </div>
      </div>

      {/* View Mode: Official Table */}
      {viewMode === 'table' && (
        <div className="max-w-4xl mx-auto rounded-3xl overflow-hidden glass-panel border border-[#F5B83D]/30 shadow-2xl p-6 sm:p-8 mb-10">
          <div className="text-center pb-6 border-b border-[#F5B83D]/20 mb-6">
            <div className="inline-flex items-center gap-2 text-xs text-[#E88918] font-bold uppercase tracking-widest mb-1">
              <Award className="w-4 h-4 text-[#F5B83D]" />
              <span>Anuradha College of Engineering and Technology, Chikhli</span>
            </div>
            <h3 className="text-xl sm:text-2xl font-bold font-heading text-[#FFF4DC]">
              Ganesh Festival 2026
            </h3>
            <p className="text-xs sm:text-sm text-[#F5B83D] font-medium">
              (14th September – 16th September 2026) Schedule
            </p>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs sm:text-sm">
              <thead>
                <tr className="border-b border-[#F5B83D]/30 text-[#F5B83D] uppercase text-[11px] tracking-wider">
                  <th className="py-3 px-3 w-16">Sr. No.</th>
                  <th className="py-3 px-3">Event</th>
                  <th className="py-3 px-3">Date</th>
                  <th className="py-3 px-3">Time</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5">
                {filteredEvents.map((evt) => (
                  <tr key={evt.id} className="hover:bg-white/5 transition-colors">
                    <td className="py-3.5 px-3 font-bold text-[#F5B83D]">{evt.srNo}</td>
                    <td className="py-3.5 px-3">
                      <div className="font-semibold text-[#FFF4DC]">{evt.title}</div>
                      <div className="text-[11px] text-[#FFF4DC]/60">{evt.subtitle}</div>
                    </td>
                    <td className="py-3.5 px-3 whitespace-nowrap text-[#FFF4DC]/90 font-mono text-xs">{evt.date}</td>
                    <td className="py-3.5 px-3 whitespace-nowrap text-[#E88918] font-medium">{evt.time}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Official Signatures Block from Circular */}
          <div className="mt-8 pt-6 border-t border-[#F5B83D]/20 flex flex-col sm:flex-row items-center justify-between gap-6 px-2 text-center sm:text-left">
            <div>
              <div className="font-serif italic text-sm text-[#F5B83D] mb-1">Dr J K Shinde</div>
              <div className="text-xs text-[#FFF4DC]/75 font-medium">Cultural coordinator</div>
            </div>
            <div>
              <div className="font-serif italic text-sm text-[#F5B83D] mb-1">Dr. A. N. Nanhai</div>
              <div className="text-xs text-[#FFF4DC]/75 font-medium">Principal</div>
            </div>
          </div>
        </div>
      )}

      {/* View Mode: Rich Cards */}
      {viewMode === 'cards' && (
        <div className="space-y-3.5 max-w-4xl mx-auto">
          {filteredEvents.map((event) => (
            <div
              key={event.id}
              className="rounded-2xl glass-panel border border-[#F5B83D]/25 hover:border-[#F5B83D]/50 transition-all shadow-md relative overflow-hidden group flex flex-col sm:flex-row items-stretch"
            >
              {/* Mobile View: Clean, Well-Positioned Top Image Banner */}
              {event.imageUrl && (
                <div className="sm:hidden relative w-full h-32 overflow-hidden shrink-0">
                  <img
                    src={event.imageUrl}
                    alt={event.title}
                    className="w-full h-full object-cover"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#1b0d0c] via-transparent to-black/20" />
                </div>
              )}

              {/* Left/Main: Event Content */}
              <div className="flex-1 p-4 sm:p-5 min-w-0 flex flex-col justify-between relative z-10">
                <div>
                  {/* Top Bar with Sr. No, Day and Category Badge */}
                  <div className="flex flex-wrap items-center justify-between gap-2 mb-2 pb-2 border-b border-[#F5B83D]/15">
                    <div className="flex items-center gap-2">
                      <span className="w-6 h-6 rounded-lg bg-[#4A1018] border border-[#F5B83D]/40 text-[#F5B83D] font-bold text-xs flex items-center justify-center shadow-sm">
                        {event.srNo}
                      </span>
                      <span className="px-2.5 py-0.5 rounded-full bg-[#F5B83D] text-[#120B0A] font-extrabold text-[10px] tracking-wider uppercase">
                        {event.day}
                      </span>
                      <span className="text-xs font-semibold text-[#FFF4DC]/80 font-mono">
                        {event.date}
                      </span>
                    </div>

                    <div className="flex items-center gap-2">
                      <span className="px-2.5 py-0.5 rounded-full bg-[#4A1018] border border-[#F5B83D]/40 text-[10px] font-semibold text-[#F5B83D]">
                        {event.category}
                      </span>
                    </div>
                  </div>

                  {/* Event Title & Subtitle */}
                  <h3 className="text-lg sm:text-xl font-bold font-heading text-[#FFF4DC] group-hover:text-[#F5B83D] transition-colors leading-snug mb-0.5">
                    {event.title}
                  </h3>
                  <p className="text-xs text-[#E88918] font-medium mb-2">
                    {event.subtitle}
                  </p>

                  {/* Description */}
                  <p className="text-xs text-[#FFF4DC]/85 leading-relaxed mb-2.5">
                    {event.description}
                  </p>

                  {/* Highlights Chips */}
                  <div className="mb-2.5">
                    <div className="flex flex-wrap gap-1.5">
                      {event.highlights.map((h, i) => (
                        <span
                          key={i}
                          className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-lg bg-[#120B0A]/80 backdrop-blur-xs border border-[#F5B83D]/25 text-[11px] text-[#FFF4DC]/90"
                        >
                          <CheckCircle className="w-2.5 h-2.5 text-[#F5B83D]" />
                          <span>{h}</span>
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Meta Footer */}
                <div className="flex flex-wrap items-center gap-4 text-xs text-[#FFF4DC]/75 pt-2 border-t border-white/5 mt-auto">
                  <div className="flex items-center gap-1.5">
                    <Clock className="w-3.5 h-3.5 text-[#E88918]" />
                    <span className="font-medium text-[#FFF4DC]">{event.time}</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <MapPin className="w-3.5 h-3.5 text-[#E88918]" />
                    <span>{event.location}</span>
                  </div>
                </div>
              </div>

              {/* Right: Event Side Image (shows when imageUrl is provided on tablet/desktop) */}
              {event.imageUrl && (
                <div className="hidden sm:block w-36 md:w-44 lg:w-48 shrink-0 relative self-stretch z-10">
                  <img
                    src={event.imageUrl}
                    alt={event.title}
                    className="w-full h-full object-cover"
                    loading="lazy"
                  />
                  {/* Fade overlay on the left edge to blend with card */}
                  <div className="absolute inset-y-0 left-0 w-8 bg-gradient-to-r from-[#1a0f0e] to-transparent" />
                </div>
              )}
            </div>
          ))}
        </div>
      )}

      {/* Official Signatories Card */}
      <div className="max-w-4xl mx-auto mt-10 p-6 rounded-2xl bg-[#4A1018]/40 border border-[#F5B83D]/25 backdrop-blur-md flex flex-col sm:flex-row items-center justify-between gap-6 text-center sm:text-left">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-[#F5B83D]/10 border border-[#F5B83D]/30 flex items-center justify-center text-[#F5B83D]">
            <Award className="w-5 h-5" />
          </div>
          <div>
            <div className="text-xs uppercase tracking-wider font-bold text-[#F5B83D]">
              Certified College Circular
            </div>
            <div className="text-xs text-[#FFF4DC]/80">
              Anuradha College of Engineering and Technology, Chikhli
            </div>
          </div>
        </div>

        <div className="flex items-center gap-8 text-xs">
          <div>
            <div className="font-serif italic font-semibold text-[#FFF4DC]">{festivalData.culturalCoordinator}</div>
            <div className="text-[11px] text-[#E88918]">Cultural coordinator</div>
          </div>
          <div>
            <div className="font-serif italic font-semibold text-[#FFF4DC]">{festivalData.principal}</div>
            <div className="text-[11px] text-[#E88918]">Principal</div>
          </div>
        </div>
      </div>
    </section>
  );
};
