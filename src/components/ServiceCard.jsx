import React from 'react';
import { 
  Code2, 
  Film, 
  Palette, 
  Share2, 
  Target, 
  Sparkles, 
  ArrowUpRight,
  CheckCircle2,
  Layers,
  Play,
  Radio
} from 'lucide-react';

const iconMap = {
  Code2: Code2,
  Film: Film,
  Palette: Palette,
  Share2: Share2,
  Target: Target,
  Sparkles: Sparkles,
  Layers: Layers
};

export default function ServiceCard({ service, onSelectService, onOpenDetail }) {
  const Icon = iconMap[service.iconName] || Code2;

  // Render bespoke visual mini graphic per service
  const renderVisualMini = (serviceId) => {
    switch (serviceId) {
      case 'web-development':
        return (
          <div className="w-full h-24 rounded-xl bg-[#07070B] border border-zinc-800/80 p-3 font-mono text-[10px] text-purple-300/80 flex flex-col justify-between overflow-hidden relative group-hover:border-purple-500/40 transition-colors">
            <div className="flex items-center justify-between border-b border-zinc-800 pb-1 text-zinc-500">
              <span className="flex gap-1">
                <span className="w-2 h-2 rounded-full bg-red-500/80" />
                <span className="w-2 h-2 rounded-full bg-yellow-500/80" />
                <span className="w-2 h-2 rounded-full bg-green-500/80" />
              </span>
              <span>App.jsx</span>
            </div>
            <div className="space-y-1 text-[9px]">
              <div className="text-purple-400">export default function Agency() &#123;</div>
              <div className="pl-2 text-zinc-400">&lt;<span className="text-pink-400">Hero</span> tech="React19" /&gt;</div>
              <div className="text-purple-400">&#125;</div>
            </div>
            <div className="absolute right-2 bottom-2 px-2 py-0.5 rounded bg-purple-950/60 border border-purple-500/30 text-[9px] text-purple-300">
              ⚡ 100 Performance
            </div>
          </div>
        );

      case 'video-editing':
        return (
          <div className="w-full h-24 rounded-xl bg-[#07070B] border border-zinc-800/80 p-3 flex flex-col justify-between relative overflow-hidden group-hover:border-purple-500/40 transition-colors">
            <div className="flex items-center justify-between text-xs text-zinc-400">
              <span className="flex items-center gap-1.5 text-pink-400 font-mono text-[10px]">
                <Play className="w-3 h-3 fill-pink-400" />
                <span>00:15:24 — Timeline</span>
              </span>
              <span className="text-[10px] text-zinc-500 font-mono">4K 60FPS</span>
            </div>
            <div className="space-y-1.5">
              <div className="w-full h-3 rounded bg-purple-900/40 border border-purple-500/30 flex items-center px-2">
                <span className="w-2/3 h-1.5 rounded bg-purple-500/80" />
              </div>
              <div className="w-full h-3 rounded bg-pink-900/40 border border-pink-500/30 flex items-center px-2">
                <span className="w-1/2 h-1.5 rounded bg-pink-500/80" />
              </div>
            </div>
          </div>
        );

      case 'logo-brand-design':
        return (
          <div className="w-full h-24 rounded-xl bg-[#07070B] border border-zinc-800/80 p-3 flex items-center justify-between relative group-hover:border-purple-500/40 transition-colors">
            <div className="space-y-1.5">
              <span className="text-[10px] font-mono text-zinc-400 block">Brand Palette</span>
              <div className="flex gap-1.5">
                <span className="w-5 h-5 rounded-lg bg-purple-600 border border-purple-400" />
                <span className="w-5 h-5 rounded-lg bg-indigo-600 border border-indigo-400" />
                <span className="w-5 h-5 rounded-lg bg-pink-500 border border-pink-400" />
                <span className="w-5 h-5 rounded-lg bg-zinc-900 border border-zinc-700" />
              </div>
            </div>
            <div className="w-12 h-12 rounded-xl bg-purple-950/40 border border-purple-500/40 flex items-center justify-center font-bold text-lg text-purple-300 shadow-sm">
              UX
            </div>
          </div>
        );

      case 'social-media-management':
        return (
          <div className="w-full h-24 rounded-xl bg-[#07070B] border border-zinc-800/80 p-3 flex items-center justify-between relative group-hover:border-purple-500/40 transition-colors">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-purple-600 to-pink-500 p-0.5">
                <div className="w-full h-full rounded-full bg-zinc-950 flex items-center justify-center text-[10px] font-bold text-purple-300">
                  UX
                </div>
              </div>
              <div className="text-[10px]">
                <span className="text-white font-bold block">@ux_pert</span>
                <span className="text-purple-400 font-mono">+14.2k Growth</span>
              </div>
            </div>
            <div className="px-2.5 py-1 rounded-full bg-purple-950/60 border border-purple-500/30 text-[10px] font-mono text-purple-300">
              30-Day Grid
            </div>
          </div>
        );

      case 'ad-management':
        return (
          <div className="w-full h-24 rounded-xl bg-[#07070B] border border-zinc-800/80 p-3 flex flex-col justify-between relative group-hover:border-purple-500/40 transition-colors">
            <div className="flex items-center justify-between text-[10px]">
              <span className="text-zinc-400 font-semibold">Meta & Google Ads</span>
              <span className="text-emerald-400 font-mono font-bold">ROAS 4.8x</span>
            </div>
            <div className="flex items-end gap-1.5 h-10 pt-2">
              <div className="w-1/5 bg-purple-950 rounded-t h-4" />
              <div className="w-1/5 bg-purple-900 rounded-t h-6" />
              <div className="w-1/5 bg-purple-700 rounded-t h-8" />
              <div className="w-1/5 bg-purple-500 rounded-t h-10" />
              <div className="w-1/5 bg-emerald-500 rounded-t h-12" />
            </div>
          </div>
        );

      case 'event-management':
        return (
          <div className="w-full h-24 rounded-xl bg-[#07070B] border border-zinc-800/80 p-3 flex flex-col justify-between relative group-hover:border-purple-500/40 transition-colors">
            <div className="flex items-center justify-between text-[10px]">
              <span className="text-fuchsia-400 font-mono font-semibold flex items-center gap-1">
                <Radio className="w-3 h-3 animate-pulse" />
                Live Event Stage
              </span>
              <span className="text-zinc-400">Media & Coverage</span>
            </div>
            <div className="p-2 rounded-lg bg-zinc-900/80 border border-zinc-800 text-[10px] text-zinc-300 flex justify-between items-center">
              <span>Conference Rollout</span>
              <span className="text-purple-400 font-bold">100% Executed</span>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div 
      className="group relative flex flex-col justify-between p-7 sm:p-8 rounded-3xl bg-[#09090F] border border-zinc-800/90 hover:border-purple-500/50 transition-all duration-300 hover:-translate-y-1.5 hover:shadow-purple-glow-sm"
    >
      {/* Background Hover Glow Accent */}
      <div className="absolute inset-0 rounded-3xl bg-gradient-to-b from-purple-500/[0.05] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />

      <div>
        {/* Top Header: Number & Icon */}
        <div className="flex items-center justify-between mb-5">
          <div className="w-12 h-12 rounded-2xl bg-zinc-900 border border-zinc-800 flex items-center justify-center text-purple-400 group-hover:text-white group-hover:bg-purple-600 group-hover:border-purple-500 transition-all duration-300 shadow-sm">
            <Icon className="w-6 h-6" />
          </div>
          <span className="font-mono text-2xl font-extrabold text-zinc-700 group-hover:text-purple-400 transition-colors">
            {service.number}
          </span>
        </div>

        {/* Visual Mini Graphic */}
        <div className="mb-5">
          {renderVisualMini(service.id)}
        </div>

        {/* Category Pill */}
        <span className="inline-block text-[10px] font-mono font-bold uppercase tracking-widest text-purple-400/90 mb-1.5">
          {service.category}
        </span>

        {/* Service Title */}
        <h3 className="text-xl sm:text-2xl font-bold text-white tracking-tight group-hover:text-purple-200 transition-colors">
          {service.title}
        </h3>

        {/* Tagline */}
        <p className="mt-2.5 text-xs sm:text-sm text-zinc-400 leading-relaxed font-normal">
          {service.tagline}
        </p>

        {/* Feature Highlights */}
        <div className="mt-5 pt-4 border-t border-zinc-800/60 space-y-2">
          {service.features.map((feature, i) => (
            <div key={i} className="flex items-center gap-2 text-xs text-zinc-300">
              <CheckCircle2 className="w-3.5 h-3.5 text-purple-400 shrink-0" />
              <span>{feature}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Action Buttons */}
      <div className="mt-6 pt-4 border-t border-zinc-800/40 flex items-center justify-between">
        <button
          onClick={() => onOpenDetail(service)}
          className="text-xs font-semibold text-zinc-400 hover:text-white transition-colors"
        >
          View Details
        </button>

        <button
          onClick={() => onSelectService(service.title)}
          className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-purple-950/60 border border-purple-500/30 text-xs font-bold text-purple-300 hover:bg-purple-600 hover:text-white hover:border-purple-500 transition-all"
        >
          <span>Enquire</span>
          <ArrowUpRight className="w-3.5 h-3.5" />
        </button>
      </div>
    </div>
  );
}
