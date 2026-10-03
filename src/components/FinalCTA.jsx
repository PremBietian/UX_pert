import React from 'react';
import { ArrowUpRight, Sparkles } from 'lucide-react';

export default function FinalCTA({ onNavigate }) {
  return (
    <section className="relative py-24 sm:py-32 overflow-hidden bg-[#050508]">
      {/* Background Gradients */}
      <div className="absolute inset-0 pointer-events-none -z-10">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] sm:w-[900px] h-[350px] bg-gradient-to-r from-purple-600/20 via-indigo-600/25 to-purple-800/20 rounded-full blur-[140px]" />
        <div className="absolute inset-0 grid-bg opacity-25 [mask-image:radial-gradient(ellipse_at_center,black_30%,transparent_75%)]" />
      </div>

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
        <div className="p-10 sm:p-16 rounded-3xl bg-gradient-to-b from-[#12121C]/80 to-[#0A0A10]/90 border border-purple-500/30 backdrop-blur-md shadow-2xl shadow-purple-950/40 relative overflow-hidden">
          {/* Subtle decorative glow orb */}
          <div className="absolute -top-24 left-1/2 -translate-x-1/2 w-72 h-72 bg-purple-500/20 rounded-full blur-3xl pointer-events-none" />

          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-purple-950/60 border border-purple-500/30 text-purple-300 text-xs font-semibold uppercase tracking-wider mb-6">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Ready for what's next?</span>
          </div>

          <h2 className="text-3xl sm:text-5xl md:text-6xl font-black text-white tracking-tight leading-tight">
            Your idea deserves to be seen. <br />
            <span className="bg-gradient-to-r from-purple-400 via-purple-300 to-indigo-300 bg-clip-text text-transparent">
              Let's turn it into something real.
            </span>
          </h2>

          <p className="mt-6 text-base sm:text-lg text-zinc-300 max-w-xl mx-auto font-normal">
            Whether you need a custom website, brand identity, video edits, social media, ads, or event execution — we’re ready to build with you.
          </p>

          <div className="mt-9 flex items-center justify-center">
            <button
              onClick={() => onNavigate('#contact')}
              className="inline-flex items-center gap-2.5 px-8 sm:px-10 py-4 rounded-full bg-purple-600 hover:bg-purple-500 text-white font-bold text-base sm:text-lg shadow-purple-glow hover:shadow-purple-glow-lg transition-all duration-200 transform hover:-translate-y-0.5 active:translate-y-0 focus:outline-none focus-visible:ring-2 focus-visible:ring-purple-400"
            >
              <span>Start a Project</span>
              <ArrowUpRight className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
