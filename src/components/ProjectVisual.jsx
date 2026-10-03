import React from 'react';

export default function ProjectVisual({ type }) {
  switch (type) {
    case 'web':
      return (
        <div className="w-full h-48 bg-[#0D0D14] rounded-t-xl overflow-hidden relative border-b border-zinc-800/80 p-3 flex flex-col">
          {/* Browser header */}
          <div className="flex items-center gap-1.5 pb-2 border-b border-zinc-800/60">
            <div className="w-2.5 h-2.5 rounded-full bg-zinc-700" />
            <div className="w-2.5 h-2.5 rounded-full bg-zinc-700" />
            <div className="w-2.5 h-2.5 rounded-full bg-zinc-700" />
            <div className="ml-2 px-2 py-0.5 rounded bg-zinc-900 border border-zinc-800 text-[9px] font-mono text-zinc-500">
              https://uxpert.agency/platform
            </div>
          </div>
          {/* Web mockup body */}
          <div className="flex-1 mt-2.5 grid grid-cols-12 gap-2 relative">
            <div className="col-span-8 bg-zinc-900/60 rounded-lg p-2.5 border border-zinc-800/40 flex flex-col justify-between">
              <div className="space-y-1.5">
                <div className="w-16 h-2 rounded bg-purple-500/60" />
                <div className="w-28 h-3 rounded bg-white/80" />
                <div className="w-20 h-2 rounded bg-zinc-700" />
              </div>
              <div className="flex gap-1.5">
                <div className="px-2 py-1 rounded bg-purple-600/30 text-[9px] font-mono text-purple-300">
                  Button
                </div>
                <div className="px-2 py-1 rounded bg-zinc-800 text-[9px] font-mono text-zinc-400">
                  Preview
                </div>
              </div>
            </div>
            <div className="col-span-4 flex flex-col gap-2">
              <div className="h-1/2 bg-gradient-to-br from-purple-900/40 to-indigo-900/20 rounded-lg border border-purple-800/30" />
              <div className="h-1/2 bg-zinc-900/70 rounded-lg border border-zinc-800/40" />
            </div>
          </div>
        </div>
      );

    case 'branding':
      return (
        <div className="w-full h-48 bg-[#0D0D14] rounded-t-xl overflow-hidden relative border-b border-zinc-800/80 p-4 flex items-center justify-center">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(139,92,246,0.15),transparent_70%)]" />
          <div className="relative flex flex-col items-center">
            {/* Geometric Vector Emblem */}
            <div className="relative w-20 h-20 rounded-2xl bg-gradient-to-tr from-purple-600 via-indigo-600 to-purple-400 p-[2px] shadow-purple-glow-sm">
              <div className="w-full h-full bg-[#0B0B10] rounded-[14px] flex items-center justify-center">
                <svg className="w-10 h-10 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" />
                </svg>
              </div>
            </div>
            {/* Color swatch row */}
            <div className="flex items-center gap-1.5 mt-3">
              <span className="w-3 h-3 rounded-full bg-purple-500 shadow-sm" />
              <span className="w-3 h-3 rounded-full bg-indigo-500" />
              <span className="w-3 h-3 rounded-full bg-white" />
              <span className="w-3 h-3 rounded-full bg-zinc-800" />
            </div>
          </div>
        </div>
      );

    case 'social':
      return (
        <div className="w-full h-48 bg-[#0D0D14] rounded-t-xl overflow-hidden relative border-b border-zinc-800/80 p-3 flex flex-col">
          {/* Social header bar */}
          <div className="flex items-center justify-between pb-2 border-b border-zinc-800/60">
            <span className="text-[10px] font-mono text-purple-400 font-semibold">FEED CALENDAR // 30-DAY</span>
            <span className="text-[9px] text-zinc-500">CURATED GRID</span>
          </div>
          {/* 3x2 Grid items */}
          <div className="flex-1 mt-2 grid grid-cols-3 gap-1.5">
            <div className="rounded bg-gradient-to-tr from-purple-800/50 to-pink-900/30 border border-purple-600/30 flex items-center justify-center text-[10px] font-bold text-white">
              HOOK
            </div>
            <div className="rounded bg-zinc-900 border border-zinc-800 flex items-center justify-center text-[9px] font-mono text-zinc-400">
              CAROUSEL
            </div>
            <div className="rounded bg-gradient-to-br from-indigo-900/50 to-purple-900/40 border border-indigo-700/30 flex items-center justify-center text-[10px] font-bold text-purple-300">
              REEL
            </div>
            <div className="rounded bg-zinc-900 border border-zinc-800 flex items-center justify-center text-[9px] font-mono text-zinc-500">
              STORY
            </div>
            <div className="rounded bg-gradient-to-tl from-purple-900/40 to-zinc-900 border border-purple-800/30 flex items-center justify-center text-[10px] font-bold text-white">
              INSIGHT
            </div>
            <div className="rounded bg-zinc-900 border border-zinc-800 flex items-center justify-center text-[9px] font-mono text-zinc-400">
              CTA
            </div>
          </div>
        </div>
      );

    case 'event':
      return (
        <div className="w-full h-48 bg-[#0D0D14] rounded-t-xl overflow-hidden relative border-b border-zinc-800/80 p-4 flex items-center justify-center">
          <div className="relative w-48 h-36 bg-gradient-to-b from-zinc-900 to-[#12121A] rounded-xl border border-purple-500/30 p-3 shadow-lg flex flex-col justify-between">
            <div className="flex items-center justify-between">
              <span className="text-[9px] font-mono uppercase tracking-widest text-purple-400 font-bold">ALL ACCESS</span>
              <span className="w-2 h-2 rounded-full bg-purple-500 animate-pulse" />
            </div>
            <div>
              <div className="text-xs font-bold text-white">EXPERIENTIAL SUMMIT</div>
              <div className="text-[10px] text-zinc-400 font-mono mt-0.5">STAGE // MEDIA SYSTEM</div>
            </div>
            <div className="flex items-center justify-between pt-1 border-t border-zinc-800 text-[8px] font-mono text-zinc-500">
              <span>PROMO ROLLOUT</span>
              <span>LIVE RECAP</span>
            </div>
          </div>
        </div>
      );

    case 'video':
      return (
        <div className="w-full h-48 bg-[#0D0D14] rounded-t-xl overflow-hidden relative border-b border-zinc-800/80 p-3 flex flex-col justify-between">
          <div className="flex items-center justify-between text-[10px] font-mono text-zinc-400">
            <span>TIMELINE // 00:00:15:00</span>
            <span className="text-purple-400">4K 60FPS</span>
          </div>
          {/* Visual play area */}
          <div className="relative flex-1 my-2 bg-gradient-to-r from-zinc-950 via-purple-950/40 to-zinc-950 rounded-lg border border-zinc-800 flex items-center justify-center overflow-hidden">
            <div className="w-10 h-10 rounded-full bg-purple-600/40 border border-purple-400/60 flex items-center justify-center">
              <svg className="w-4 h-4 text-white ml-0.5" viewBox="0 0 24 24" fill="currentColor">
                <path d="M8 5v14l11-7z" />
              </svg>
            </div>
          </div>
          {/* Waveform track */}
          <div className="h-4 bg-zinc-900 rounded flex items-center px-2 gap-1 overflow-hidden">
            {[4, 8, 14, 10, 6, 12, 16, 9, 13, 7, 15, 11, 8, 14, 5, 12, 10, 15].map((h, i) => (
              <span key={i} className="w-1 bg-purple-500/70 rounded-full" style={{ height: `${h}px` }} />
            ))}
          </div>
        </div>
      );

    case 'ads':
      return (
        <div className="w-full h-48 bg-[#0D0D14] rounded-t-xl overflow-hidden relative border-b border-zinc-800/80 p-3 flex flex-col justify-between">
          <div className="flex items-center justify-between text-[10px] font-mono">
            <span className="text-zinc-400">CAMPAIGN DASHBOARD</span>
            <span className="text-purple-400 font-semibold">ACTIVE MONITORING</span>
          </div>
          {/* Chart SVG */}
          <div className="flex-1 my-1 flex items-end justify-between px-2 pt-2">
            <svg className="w-full h-24 stroke-purple-400" fill="none" viewBox="0 0 200 80">
              <defs>
                <linearGradient id="chartGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#8B5CF6" stopOpacity="0.4" />
                  <stop offset="100%" stopColor="#8B5CF6" stopOpacity="0" />
                </linearGradient>
              </defs>
              <path
                d="M 10 70 Q 50 55, 90 40 T 150 25 T 190 10"
                strokeWidth="2.5"
                strokeLinecap="round"
              />
              <path
                d="M 10 70 Q 50 55, 90 40 T 150 25 T 190 10 L 190 80 L 10 80 Z"
                fill="url(#chartGrad)"
                stroke="none"
              />
            </svg>
          </div>
          <div className="grid grid-cols-3 gap-2 pt-2 border-t border-zinc-800/60 text-[9px] font-mono text-zinc-400 text-center">
            <div>AUDIENCE: HIGH</div>
            <div>CTR: OPTIMIZED</div>
            <div>STATUS: LIVE</div>
          </div>
        </div>
      );

    default:
      return null;
  }
}
