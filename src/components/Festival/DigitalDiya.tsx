import React, { useState, useEffect } from 'react';
import { Flame, Sparkles, Heart } from 'lucide-react';
import confetti from 'canvas-confetti';
import { audioService } from '../../utils/audio';

export const DigitalDiya: React.FC = () => {
  const BASE_COUNT = 125;
  const FIREBASE_DB_URL = 'https://acet-ganesh-default-rtdb.firebaseio.com/diyaCount.json';

  const [diyaCount, setDiyaCount] = useState<number>(() => {
    if (typeof window !== 'undefined') {
      const storedCount = localStorage.getItem('ganpati_diya_count_v2');
      if (storedCount) {
        const parsed = parseInt(storedCount, 10);
        if (!isNaN(parsed) && parsed < 500) return parsed;
      }
    }
    return BASE_COUNT;
  });
  const [isLit, setIsLit] = useState<boolean>(true);
  const [userOfferingsCount, setUserOfferingsCount] = useState<number>(0);
  const [justLit, setJustLit] = useState<boolean>(false);

  // Helper to fetch latest global count from Firebase Realtime Database
  const fetchGlobalCount = async () => {
    try {
      const res = await fetch(FIREBASE_DB_URL, { cache: 'no-cache' });
      if (res.ok) {
        const data = await res.json();
        const serverCount = Number(data);
        if (!isNaN(serverCount) && serverCount >= BASE_COUNT) {
          setDiyaCount((prev) => Math.max(prev, serverCount));
          if (typeof window !== 'undefined') {
            localStorage.setItem('ganpati_diya_count_v2', String(Math.max(serverCount, diyaCount)));
          }
        }
      }
    } catch {
      // Offline fallback
    }
  };

  useEffect(() => {
    // 1. Initial local load
    if (typeof window !== 'undefined') {
      const storedCount = localStorage.getItem('ganpati_diya_count_v2');
      if (storedCount) {
        const parsed = parseInt(storedCount, 10);
        if (!isNaN(parsed) && parsed < 500) setDiyaCount(parsed);
      }
      const myOfferings = localStorage.getItem('ganpati_user_offerings_count');
      if (myOfferings) {
        setUserOfferingsCount(parseInt(myOfferings, 10) || 0);
      }
    }

    // 2. Fetch live global shared count on mount from Firebase
    fetchGlobalCount();

    // 3. Periodic background sync every 10 seconds so all users see updates live
    const interval = setInterval(fetchGlobalCount, 10000);

    return () => clearInterval(interval);
  }, []);

  const handleLightDiya = async () => {
    audioService.playTempleBell(0.8);
    const newCount = diyaCount + 1;
    const newOfferings = userOfferingsCount + 1;

    // Optimistic UI Update
    setDiyaCount(newCount);
    setUserOfferingsCount(newOfferings);
    setIsLit(true);
    setJustLit(true);

    if (typeof window !== 'undefined') {
      localStorage.setItem('ganpati_diya_count_v2', String(newCount));
      localStorage.setItem('ganpati_user_offerings_count', String(newOfferings));
    }

    // Background Global Sync via Firebase Realtime Database
    try {
      await fetch(FIREBASE_DB_URL, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newCount),
      });
    } catch {
      // Offline fallback
    }

    // Festive marigold and saffron confetti burst
    try {
      confetti({
        particleCount: 50,
        spread: 75,
        origin: { y: 0.75 },
        colors: ['#F5B83D', '#E88918', '#FF8C00', '#FFD066'],
      });
    } catch {
      // safe fallback
    }

    setTimeout(() => {
      setJustLit(false);
    }, 4500);
  };

  return (
    <section id="diya" className="py-20 px-4 sm:px-6 max-w-5xl mx-auto">
      <div className="relative rounded-3xl glass-panel-gold border-2 border-[#F5B83D]/40 p-8 sm:p-12 text-center shadow-2xl overflow-hidden">
        {/* Subtle Decorative Golden Aura in Background */}
        <div
          className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-80 h-80 rounded-full transition-all duration-1000 pointer-events-none blur-3xl ${
            isLit
              ? 'bg-gradient-to-tr from-[#F5B83D]/30 via-[#E88918]/25 to-transparent scale-150'
              : 'bg-[#F5B83D]/5 scale-75'
          }`}
        />

        {/* Section Header */}
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#E88918]/15 border border-[#E88918]/30 text-xs font-semibold text-[#E88918] mb-3">
          <Flame className="w-3.5 h-3.5 text-[#E88918]" />
          <span>SACRED DIGITAL OFFERING</span>
        </div>

        <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold font-heading text-[#FFF4DC] mb-2">
          🪔 Light a Diya
        </h2>

        <p className="text-sm sm:text-base text-[#FFF4DC]/80 max-w-lg mx-auto mb-8">
          Offer a digital flame to Lord Ganesha for peace, clarity in education, and digital mindfulness across the campus.
        </p>

        {/* Interactive Diya Graphic with Dynamic Flame */}
        <div className="relative w-44 h-40 sm:w-52 sm:h-48 mx-auto flex flex-col items-center justify-end mb-8 select-none">
          {/* Flame element (Appears when lit) */}
          <div
            className={`transition-all duration-700 transform flex flex-col items-center mb-[-12px] z-10 ${
              isLit ? 'opacity-100 scale-100' : 'opacity-0 scale-50'
            }`}
          >
            {/* Dynamic CSS Flickering Flame */}
            <div className="relative animate-flame">
              {/* Outer orange flame */}
              <div className="w-10 h-16 sm:w-12 sm:h-20 bg-gradient-to-t from-[#FF5400] via-[#FF8C00] to-[#FFD066] rounded-full filter blur-[1px] shadow-[0_0_30px_#F5B83D]" />
              {/* Inner golden flame */}
              <div className="absolute inset-x-2 bottom-1 h-10 sm:h-12 bg-gradient-to-t from-[#FFF275] to-white rounded-full opacity-95" />
            </div>
            {/* Burning wick */}
            <div className="w-1.5 h-3 bg-[#3D1E06] rounded-full -mt-1" />
          </div>

          {/* Clay / Brass Diya Body */}
          <div className="relative w-36 sm:w-44 h-16 sm:h-20">
            {/* Diya Base Bowl */}
            <div className="w-full h-full rounded-b-full bg-gradient-to-b from-[#C58925] via-[#8C430B] to-[#4A1018] border-t-2 border-[#F5B83D] shadow-xl relative overflow-hidden flex items-center justify-center">
              {/* Subtle Carved Traditional Pattern */}
              <div className="absolute inset-x-2 top-1 border-b border-[#F5B83D]/40" />
              <div className="text-[#F5B83D]/40 text-xs font-display">ॐ</div>
            </div>
            {/* Diya Rim Oval Basin */}
            <div className="absolute top-0 inset-x-0 h-8 rounded-full bg-[#692906] border-2 border-[#F5B83D]/60 shadow-inner" />
          </div>

          {/* Ground reflection glow */}
          {isLit && (
            <div className="absolute -bottom-2 w-48 h-6 bg-[#F5B83D]/30 rounded-full blur-md" />
          )}
        </div>

        {/* Counter as required by Section 22 */}
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-[#120B0A]/70 border border-[#F5B83D]/30 mb-6 shadow-md">
          <Sparkles className="w-4 h-4 text-[#F5B83D]" />
          <span className="text-sm font-semibold text-[#FFF4DC]">
            <strong className="text-lg text-[#F5B83D] font-bold font-heading mr-1">
              {diyaCount.toLocaleString()}
            </strong>
            Diyas Lit for Bappa
          </span>
        </div>

        {/* Primary CTA Button (Always present and updates on each click) */}
        <div className="flex flex-col items-center justify-center gap-4">
          <button
            onClick={handleLightDiya}
            className="py-4 px-8 rounded-2xl font-bold text-base text-[#120B0A] bg-gradient-to-r from-[#F5B83D] via-[#FFD066] to-[#E88918] hover:opacity-95 active:scale-[0.98] transition-all shadow-xl shadow-[#F5B83D]/30 inline-flex items-center gap-2.5 cursor-pointer"
          >
            <Flame className="w-5 h-5 fill-current text-[#120B0A]" />
            <span>Light a Diya</span>
          </button>

          {justLit && (
            <div className="animate-fade-in p-3.5 rounded-xl bg-[#4A1018]/80 border border-[#F5B83D]/50 max-w-md mx-auto text-center shadow-lg">
              <p className="text-sm sm:text-base font-bold font-heading text-[#F5B83D] flex items-center justify-center gap-2">
                <Sparkles className="w-4 h-4 fill-current text-[#F5B83D]" />
                May Bappa illuminate your path!
                <Sparkles className="w-4 h-4 fill-current text-[#F5B83D]" />
              </p>
              <p className="text-xs text-[#FFF4DC]/90 mt-0.5">
                Flame offered successfully. Deepotsav count updated! 🙏
              </p>
            </div>
          )}

          {userOfferingsCount > 0 && !justLit && (
            <p className="text-xs text-[#FFF4DC]/70 italic flex items-center justify-center gap-1.5">
              <Sparkles className="w-3 h-3 text-[#F5B83D]" />
              <span>You have offered {userOfferingsCount} {userOfferingsCount === 1 ? 'diya' : 'diyas'} to Lord Ganesha</span>
            </p>
          )}
        </div>
      </div>
    </section>
  );
};
