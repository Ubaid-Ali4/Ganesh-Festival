import React from 'react';
import { Shield, Cpu, Leaf, Users, AlertCircle, HeartHandshake, Eye, Sparkles } from 'lucide-react';
import { festivalData } from '../../data/festivalData';
import digitalIdolImg from '../../assets/images/ganpati.jpg.jpeg';

export const AboutBappa: React.FC = () => {
  return (
    <section id="about" className="py-20 px-4 sm:px-6 max-w-7xl mx-auto">
      {/* Section Header */}
      <div className="text-center max-w-2xl mx-auto mb-14">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#E88918]/15 border border-[#E88918]/30 text-xs font-semibold text-[#E88918] mb-3">
          <Sparkles className="w-3.5 h-3.5" />
          <span>FESTIVAL THEME & INSTALLATION</span>
        </div>
        <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold font-heading text-[#FFF4DC] mb-4">
          🌺 About Our Bappa
        </h2>
        <p className="text-sm sm:text-base text-[#FFF4DC]/80 leading-relaxed">
          {festivalData.summary}
        </p>
      </div>

      {/* Visual Storytelling Showcase Card */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center mb-16">
        {/* Left: Photograph of Bappa Installation */}
        <div className="lg:col-span-5 relative">
          <div className="relative rounded-3xl overflow-hidden border-2 border-[#F5B83D]/40 shadow-2xl bg-black/60 aspect-[3/4] group">
            <img
              src={digitalIdolImg}
              alt="Vighnaharta of the Digital Age Installation"
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
              referrerPolicy="no-referrer"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#120B0A] via-transparent to-black/30" />
            <div className="absolute bottom-4 inset-x-4 p-4 rounded-2xl glass-panel-gold border border-[#F5B83D]/40 text-center">
              <span className="text-[10px] uppercase font-bold tracking-wider text-[#E88918] block mb-0.5">
                Physical Installation Mandap
              </span>
              <h4 className="font-heading font-bold text-base sm:text-lg text-[#FFF4DC]">
                Vighnaharta of the Digital Age
              </h4>
              <p className="text-xs text-[#FFF4DC]/80 italic mt-0.5">
                Reception ACET, Anuradha College of Engineering & Technology
              </p>
            </div>
          </div>
        </div>

        {/* Right: Meaning behind the decoration & Pillars */}
        <div className="lg:col-span-7 space-y-6">
          <div className="p-6 rounded-2xl glass-panel border border-[#F5B83D]/30">
            <h3 className="text-xl sm:text-2xl font-bold font-heading text-[#F5B83D] mb-2">
              The Meaning Behind the Decoration
            </h3>
            <p className="text-sm text-[#FFF4DC]/85 leading-relaxed">
              In ancient times, Lord Ganesha cleared physical brambles, ignorance, and spiritual hurdles. Today, in 2026, humanity faces intricate digital roadblocks: cybersecurity breaches, algorithmic addiction, misinformation echoes, e-waste, and widening technological divides.
            </p>
            <p className="text-sm text-[#FFF4DC]/85 leading-relaxed mt-2.5">
              Seated with his hand raised in Abhaya Mudra and holding a glowing digital laptop inscribed with the sacred ॐ, Bappa reminds every engineer and student: <strong className="text-[#F5B83D]">Technology without Wisdom is dangerous, but Technology with Wisdom creates a better tomorrow.</strong>
            </p>
          </div>

          {/* The 4 Illuminating Steps to Bappa's Feet */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-widest text-[#E88918] mb-3">
              The 4 Steps to Digital Enlightenment
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {festivalData.pillars.slice(0, 4).map((pillar, i) => (
                <div
                  key={pillar.title}
                  className="p-3.5 rounded-xl bg-[#4A1018]/50 border border-[#F5B83D]/25 hover:border-[#F5B83D]/50 transition-colors"
                >
                  <div className="flex items-center gap-2 mb-1.5">
                    <span className="w-5 h-5 rounded-full bg-[#F5B83D] text-[#120B0A] font-bold text-[11px] flex items-center justify-center">
                      {i + 1}
                    </span>
                    <h5 className="font-semibold text-sm text-[#FFF4DC]">{pillar.title}</h5>
                  </div>
                  <p className="text-xs text-[#FFF4DC]/70 leading-relaxed">{pillar.description}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Challenges & Solutions Bento Grid */}
      <div className="mb-16">
        <h3 className="text-xl sm:text-2xl font-bold font-heading text-[#FFF4DC] text-center mb-6">
          Overcoming Modern Obstacles with Divine Guidance
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          <div className="p-5 rounded-2xl glass-panel border border-red-500/30 relative overflow-hidden">
            <div className="w-10 h-10 rounded-xl bg-red-950/60 border border-red-500/40 flex items-center justify-center mb-3">
              <Shield className="w-5 h-5 text-red-400" />
            </div>
            <h4 className="font-bold text-base text-[#FFF4DC] mb-1">Cyber Threats & Privacy</h4>
            <p className="text-xs text-[#FFF4DC]/70 leading-relaxed">
              Shielding privacy against malware, phishing, and data breaches through conscious cyber hygiene and secure coding.
            </p>
          </div>

          <div className="p-5 rounded-2xl glass-panel border border-amber-500/30 relative overflow-hidden">
            <div className="w-10 h-10 rounded-xl bg-amber-950/60 border border-amber-500/40 flex items-center justify-center mb-3">
              <AlertCircle className="w-5 h-5 text-amber-400" />
            </div>
            <h4 className="font-bold text-base text-[#FFF4DC] mb-1">Misinformation & Deepfakes</h4>
            <p className="text-xs text-[#FFF4DC]/70 leading-relaxed">
              Practicing intellectual discernment (Viveka) to spot rumours and verify truth before amplifying on social networks.
            </p>
          </div>

          <div className="p-5 rounded-2xl glass-panel border border-blue-500/30 relative overflow-hidden">
            <div className="w-10 h-10 rounded-xl bg-blue-950/60 border border-blue-500/40 flex items-center justify-center mb-3">
              <Eye className="w-5 h-5 text-blue-400" />
            </div>
            <h4 className="font-bold text-base text-[#FFF4DC] mb-1">Digital Addiction & Wellness</h4>
            <p className="text-xs text-[#FFF4DC]/70 leading-relaxed">
              Combating sleep deprivation and screen exhaustion through digital fasts, mindful breaks, and real-world connection.
            </p>
          </div>

          <div className="p-5 rounded-2xl glass-panel border border-green-500/30 relative overflow-hidden">
            <div className="w-10 h-10 rounded-xl bg-green-950/60 border border-green-500/40 flex items-center justify-center mb-3">
              <Leaf className="w-5 h-5 text-green-400" />
            </div>
            <h4 className="font-bold text-base text-[#FFF4DC] mb-1">Environmental Impact & E-Waste</h4>
            <p className="text-xs text-[#FFF4DC]/70 leading-relaxed">
              Advancing circular electronics, responsible device recycling, and eco-friendly clay idol immersion.
            </p>
          </div>

          <div className="p-5 rounded-2xl glass-panel border border-purple-500/30 relative overflow-hidden">
            <div className="w-10 h-10 rounded-xl bg-purple-950/60 border border-purple-500/40 flex items-center justify-center mb-3">
              <Cpu className="w-5 h-5 text-purple-400" />
            </div>
            <h4 className="font-bold text-base text-[#FFF4DC] mb-1">Bridging the Tech Divide</h4>
            <p className="text-xs text-[#FFF4DC]/70 leading-relaxed">
              Democratizing STEM opportunities and digital literacy so no aspiring student is left in the offline shadows.
            </p>
          </div>

          <div className="p-5 rounded-2xl glass-panel-gold border border-[#F5B83D]/40 relative overflow-hidden">
            <div className="w-10 h-10 rounded-xl bg-[#4A1018] border border-[#F5B83D]/60 flex items-center justify-center mb-3">
              <Sparkles className="w-5 h-5 text-[#F5B83D]" />
            </div>
            <h4 className="font-bold text-base text-[#F5B83D] mb-1">Student Innovation</h4>
            <p className="text-xs text-[#FFF4DC]/80 leading-relaxed">
              Handcrafted, designed, and presented by engineering students and faculty of ACET Chikhli celebrating heritage and campus devotion.
            </p>
          </div>
        </div>
      </div>

      {/* College & Committee Information Box */}
      <div className="p-6 sm:p-8 rounded-3xl glass-panel-gold border-2 border-[#F5B83D]/30 max-w-4xl mx-auto">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6 text-center md:text-left">
          <div>
            <span className="text-xs uppercase font-bold text-[#E88918] tracking-widest block mb-1">
              HOSTED BY
            </span>
            <h4 className="text-xl sm:text-2xl font-bold font-heading text-[#FFF4DC]">
              {festivalData.collegeName}
            </h4>
            <p className="text-xs text-[#FFF4DC]/70 mt-1 max-w-xl">
              {festivalData.accreditations}
            </p>
          </div>

          <div className="shrink-0 flex flex-col sm:flex-row gap-3">
            <div className="px-4 py-2.5 rounded-xl bg-[#120B0A]/60 border border-[#F5B83D]/30 text-center">
              <span className="text-[10px] text-[#E88918] uppercase font-semibold block">Committee</span>
              <span className="text-xs font-bold text-[#FFF4DC]">ACET Ganesh Mandal 2026</span>
            </div>
            <div className="px-4 py-2.5 rounded-xl bg-[#120B0A]/60 border border-[#F5B83D]/30 text-center">
              <span className="text-[10px] text-[#E88918] uppercase font-semibold block">Location</span>
              <span className="text-xs font-bold text-[#FFF4DC]">Chikhli, Buldhana (MH)</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
