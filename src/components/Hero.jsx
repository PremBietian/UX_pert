import React from 'react';
import { motion } from 'framer-motion';
import { ArrowUpRight, ArrowRight, Sparkles, Terminal, Layers, PlayCircle, ShieldCheck } from 'lucide-react';

export default function Hero({ onNavigate }) {
  const disciplineBadges = [
    { label: "Web Development", icon: Terminal, color: "text-purple-400" },
    { label: "Video Editing", icon: PlayCircle, color: "text-pink-400" },
    { label: "Logo & Brand Design", icon: Layers, color: "text-indigo-400" },
    { label: "Social Media", icon: Sparkles, color: "text-purple-300" },
    { label: "Ad Management", icon: ShieldCheck, color: "text-violet-400" },
    { label: "Event Management", icon: ArrowUpRight, color: "text-fuchsia-400" }
  ];

  return (
    <section id="home" className="relative min-h-[92vh] flex items-center justify-center pt-28 pb-16 md:pt-36 md:pb-24 overflow-hidden">
      {/* Background Gradients & Grid */}
      <div className="absolute inset-0 pointer-events-none -z-10">
        {/* Subtle geometric grid */}
        <div className="absolute inset-0 grid-bg opacity-30 [mask-image:radial-gradient(ellipse_at_center,black_40%,transparent_75%)]" />
        
        {/* Ambient Electric Purple Glows */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[550px] sm:w-[750px] h-[350px] sm:h-[450px] bg-purple-600/15 rounded-full blur-[120px] pointer-events-none" />
        <div className="absolute top-1/3 left-1/4 w-[300px] h-[300px] bg-indigo-600/10 rounded-full blur-[100px] pointer-events-none" />
        <div className="absolute bottom-10 right-1/4 w-[350px] h-[350px] bg-purple-900/15 rounded-full blur-[110px] pointer-events-none" />

        {/* Abstract Geometric Rings & Accents */}
        <svg className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] opacity-15 stroke-purple-500/30" fill="none" viewBox="0 0 800 800">
          <circle cx="400" cy="400" r="280" strokeDasharray="6 6" strokeWidth="1" />
          <circle cx="400" cy="400" r="360" strokeWidth="1" />
          <circle cx="400" cy="400" r="180" strokeWidth="1" strokeDasharray="3 3" />
        </svg>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full relative z-10">
        <div className="text-center max-w-4xl mx-auto">
          
          {/* Top Agency Pill */}
          <motion.div
            initial={{ opacity: 0, y: -15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-zinc-900/80 border border-purple-500/25 text-xs sm:text-sm font-medium text-purple-300 mb-8 backdrop-blur-sm shadow-purple-glow-sm"
          >
            <span className="flex h-2 w-2 relative">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-purple-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-purple-500"></span>
            </span>
            <span>Creative Digital & Media Agency</span>
          </motion.div>

          {/* Main Large Headline */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-black tracking-tight text-white leading-[1.08] sm:leading-[1.05]"
          >
            We Build. <br />
            We Create. <br />
            <span className="bg-gradient-to-r from-purple-400 via-purple-300 to-indigo-300 bg-clip-text text-transparent drop-shadow-[0_0_35px_rgba(168,85,247,0.35)]">
              We Grow.
            </span>
          </motion.h1>

          {/* Supporting text */}
          <motion.p
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="mt-6 sm:mt-8 text-xl sm:text-2xl font-semibold text-zinc-200 tracking-tight"
          >
            Creative digital solutions for businesses, brands and events.
          </motion.p>

          {/* Additional text */}
          <motion.p
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="mt-4 text-sm sm:text-base md:text-lg text-zinc-400 max-w-2xl mx-auto leading-relaxed"
          >
            From websites and branding to video, social media, advertising and events — UXpert brings technology and creativity together.
          </motion.p>

          {/* Action Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4"
          >
            <button
              onClick={() => onNavigate('#contact')}
              className="w-full sm:w-auto flex items-center justify-center gap-2.5 px-8 py-4 rounded-full bg-purple-600 hover:bg-purple-500 text-white font-bold text-base shadow-purple-glow hover:shadow-purple-glow-lg transition-all duration-200 transform hover:-translate-y-0.5 active:translate-y-0 focus:outline-none focus-visible:ring-2 focus-visible:ring-purple-400"
            >
              <span>Start a Project</span>
              <ArrowUpRight className="w-5 h-5" />
            </button>

            <button
              onClick={() => onNavigate('#work')}
              className="w-full sm:w-auto flex items-center justify-center gap-2 px-8 py-4 rounded-full bg-zinc-900/90 hover:bg-zinc-800/90 border border-zinc-700/80 hover:border-purple-500/50 text-zinc-200 hover:text-white font-semibold text-base transition-all duration-200 backdrop-blur-sm"
            >
              <span>Explore Our Work</span>
              <ArrowRight className="w-5 h-5 text-purple-400" />
            </button>
          </motion.div>

          {/* Discipline Badges Grid */}
          <motion.div
            initial={{ opacity: 0, y: 25 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="mt-14 pt-10 border-t border-zinc-800/50"
          >
            <p className="text-xs uppercase tracking-widest text-zinc-500 font-semibold mb-5">
              Integrated Capabilities Under One Roof
            </p>
            <div className="flex flex-wrap items-center justify-center gap-2.5 sm:gap-3">
              {disciplineBadges.map((badge, idx) => {
                const IconComponent = badge.icon;
                return (
                  <div
                    key={idx}
                    className="flex items-center gap-2 px-3.5 py-1.5 rounded-lg bg-zinc-900/50 border border-zinc-800/60 text-xs sm:text-sm text-zinc-300 font-medium hover:border-purple-500/30 hover:bg-zinc-900/80 transition-colors"
                  >
                    <IconComponent className={`w-3.5 h-3.5 ${badge.color}`} />
                    <span>{badge.label}</span>
                  </div>
                );
              })}
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
