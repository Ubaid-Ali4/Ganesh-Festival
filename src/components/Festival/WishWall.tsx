import React, { useState } from 'react';
import { Heart, Send, Sparkles, Check, MessageSquareHeart } from 'lucide-react';
import confetti from 'canvas-confetti';
import { initialWishes } from '../../data/festivalData';
import { Wish } from '../../types';
import { audioService } from '../../utils/audio';

export const WishWall: React.FC = () => {
  const [wishes, setWishes] = useState<Wish[]>(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('ganpati_user_wishes');
      if (saved) {
        try {
          return [...JSON.parse(saved), ...initialWishes];
        } catch {
          return initialWishes;
        }
      }
    }
    return initialWishes;
  });

  const [message, setMessage] = useState('');
  const [department, setDepartment] = useState('Engineering Student');
  const [submitted, setSubmitted] = useState(false);
  const [likedIds, setLikedIds] = useState<Set<string>>(new Set());

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!message.trim()) return;

    audioService.playTempleBell(0.75);

    const newWish: Wish = {
      id: `wish-${Date.now()}`,
      author: 'Campus Devotee',
      department: department || 'ACET Community',
      message: message.trim(),
      timestamp: 'Just now',
      likes: 1,
    };

    const updated = [newWish, ...wishes];
    setWishes(updated);
    setMessage('');
    setSubmitted(true);

    if (typeof window !== 'undefined') {
      const userWishes = updated.filter((w) => w.id.startsWith('wish-'));
      localStorage.setItem('ganpati_user_wishes', JSON.stringify(userWishes));
    }

    // Festive confetti
    try {
      confetti({
        particleCount: 50,
        spread: 60,
        origin: { y: 0.7 },
        colors: ['#F5B83D', '#E88918', '#FF5400', '#FFD066'],
      });
    } catch {
      // safe
    }

    setTimeout(() => {
      setSubmitted(false);
    }, 4500);
  };

  const handleLike = (id: string) => {
    if (likedIds.has(id)) return;
    audioService.playTempleBell(0.4);
    setLikedIds((prev) => new Set(prev).add(id));
    setWishes((prev) =>
      prev.map((w) => (w.id === id ? { ...w, likes: w.likes + 1 } : w))
    );
  };

  return (
    <section id="wishes" className="py-20 px-4 sm:px-6 max-w-7xl mx-auto">
      {/* Header */}
      <div className="text-center max-w-2xl mx-auto mb-12">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#E88918]/15 border border-[#E88918]/30 text-xs font-semibold text-[#E88918] mb-3">
          <MessageSquareHeart className="w-3.5 h-3.5" />
          <span>BLESSINGS & PRAYERS</span>
        </div>
        <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold font-heading text-[#FFF4DC] mb-3">
          💌 Leave a Wish for Bappa
        </h2>
        <p className="text-sm sm:text-base text-[#FFF4DC]/80">
          Share your sincere prayers, placement hopes, or gratitude. Anonymous and peaceful.
        </p>
      </div>

      {/* Input Form Section (Section 23) */}
      <div className="max-w-xl mx-auto mb-16">
        <div className="p-6 sm:p-8 rounded-3xl glass-panel-gold border-2 border-[#F5B83D]/40 shadow-2xl relative overflow-hidden">
          {submitted ? (
            <div className="py-8 text-center animate-fade-in space-y-3">
              <div className="w-14 h-14 mx-auto rounded-full bg-[#4A1018] border border-[#F5B83D] flex items-center justify-center text-[#F5B83D]">
                <Check className="w-7 h-7" />
              </div>
              <h3 className="text-xl sm:text-2xl font-bold font-heading text-[#F5B83D]">
                Your wish has been offered to Bappa. 🙏
              </h3>
              <p className="text-xs sm:text-sm text-[#FFF4DC]/80 max-w-sm mx-auto">
                May your earnest intentions blossom with wisdom, health, and fulfillment.
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-[#F5B83D] mb-1.5">
                  Department / Role (Optional)
                </label>
                <select
                  value={department}
                  onChange={(e) => setDepartment(e.target.value)}
                  className="w-full py-2.5 px-3.5 rounded-xl bg-[#120B0A]/80 border border-[#F5B83D]/30 text-xs text-[#FFF4DC] focus:outline-none focus:border-[#F5B83D]"
                >
                  <option value="Computer Science & Engineering">Computer Science & Engineering</option>
                  <option value="Mechanical Engineering">Mechanical Engineering</option>
                  <option value="Electronics & Telecommunication">Electronics & Telecommunication</option>
                  <option value="Civil Engineering">Civil Engineering</option>
                  <option value="First Year Engineering">First Year Engineering</option>
                  <option value="Faculty & Staff">Faculty & Staff</option>
                  <option value="Alumni / Visitor">Alumni / Visitor</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-[#F5B83D] mb-1.5">
                  Your Prayer to Bappa
                </label>
                <textarea
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="Write your message... (e.g., 'May Bappa bless our campus with innovation, great exam results, and peace')"
                  rows={3}
                  maxLength={280}
                  required
                  className="w-full p-3.5 rounded-xl bg-[#120B0A]/80 border border-[#F5B83D]/30 text-sm text-[#FFF4DC] placeholder-[#FFF4DC]/40 focus:outline-none focus:border-[#F5B83D] resize-none"
                />
                <div className="flex justify-between items-center text-[10px] text-[#FFF4DC]/50 mt-1">
                  <span>🔒 Safe & Anonymous • No email or phone required</span>
                  <span>{280 - message.length} chars left</span>
                </div>
              </div>

              <button
                type="submit"
                className="w-full py-3.5 px-6 rounded-xl font-bold text-sm text-[#120B0A] bg-gradient-to-r from-[#F5B83D] via-[#FFD066] to-[#E88918] hover:opacity-95 active:scale-[0.98] transition-all shadow-lg shadow-[#F5B83D]/25 flex items-center justify-center gap-2 cursor-pointer"
              >
                <span>🙏 Offer Your Wish</span>
              </button>
            </form>
          )}
        </div>
      </div>

      {/* Community Wishes Grid */}
      <div>
        <h3 className="text-xl sm:text-2xl font-bold font-heading text-[#FFF4DC] text-center mb-6 flex items-center justify-center gap-2">
          <span>Devotee Prayers & Wishes</span>
          <span className="text-xs px-2.5 py-0.5 rounded-full bg-[#E88918]/20 border border-[#E88918]/40 text-[#F5B83D]">
            {wishes.length}
          </span>
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {wishes.map((wish) => {
            const isLiked = likedIds.has(wish.id);
            return (
              <div
                key={wish.id}
                className="p-5 rounded-2xl glass-panel border border-[#F5B83D]/25 flex flex-col justify-between hover:border-[#F5B83D]/45 transition-all"
              >
                <div>
                  <div className="flex items-center justify-between gap-2 mb-2 pb-2 border-b border-[#F5B83D]/15">
                    <span className="text-xs font-semibold text-[#F5B83D]">
                      {wish.author}
                    </span>
                    <span className="text-[10px] text-[#FFF4DC]/50">
                      {wish.timestamp}
                    </span>
                  </div>
                  {wish.department && (
                    <div className="text-[10px] uppercase font-bold tracking-wider text-[#E88918] mb-2">
                      {wish.department}
                    </div>
                  )}
                  <p className="text-xs sm:text-sm text-[#FFF4DC]/85 leading-relaxed italic">
                    "{wish.message}"
                  </p>
                </div>

                <div className="mt-4 pt-3 flex items-center justify-between border-t border-white/5">
                  <span className="text-[11px] text-[#FFF4DC]/40">Pranam & Reverence</span>
                  <button
                    onClick={() => handleLike(wish.id)}
                    className={`flex items-center gap-1.5 py-1 px-2.5 rounded-lg text-xs transition-all ${
                      isLiked
                        ? 'bg-[#E88918]/30 text-[#F5B83D] font-bold'
                        : 'hover:bg-white/5 text-[#FFF4DC]/60 hover:text-[#FFF4DC]'
                    }`}
                  >
                    <Heart className={`w-3.5 h-3.5 ${isLiked ? 'fill-current text-[#F5B83D]' : ''}`} />
                    <span>{wish.likes}</span>
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
