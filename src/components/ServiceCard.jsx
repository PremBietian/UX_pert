import React from 'react';
import { 
  Code2, 
  Film, 
  Palette, 
  Share2, 
  Target, 
  Sparkles, 
  ArrowUpRight,
  CheckCircle2
} from 'lucide-react';

const iconMap = {
  Code2: Code2,
  Film: Film,
  Palette: Palette,
  Share2: Share2,
  Target: Target,
  Sparkles: Sparkles
};

export default function ServiceCard({ service, onSelectService }) {
  const Icon = iconMap[service.iconName] || Code2;

  return (
    <div 
      className="group relative flex flex-col justify-between p-7 sm:p-8 rounded-2xl bg-[#0B0B10] border border-zinc-800/80 hover:border-purple-500/40 transition-all duration-300 hover:-translate-y-1 hover:shadow-purple-glow-sm"
    >
      {/* Background Hover Accent */}
      <div className="absolute inset-0 rounded-2xl bg-gradient-to-b from-purple-500/[0.04] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />

      <div>
        {/* Top Header: Number & Icon */}
        <div className="flex items-center justify-between mb-6">
          <div className="w-12 h-12 rounded-xl bg-zinc-900 border border-zinc-800 flex items-center justify-center text-purple-400 group-hover:text-white group-hover:bg-purple-600 group-hover:border-purple-500 transition-all duration-300 shadow-sm">
            <Icon className="w-6 h-6" />
          </div>
          <span className="font-mono text-2xl font-bold text-zinc-600 group-hover:text-purple-400 transition-colors">
            {service.number}
          </span>
        </div>

        {/* Category Pill */}
        <span className="inline-block text-[11px] font-semibold uppercase tracking-wider text-purple-400/90 mb-2">
          {service.category}
        </span>

        {/* Service Title */}
        <h3 className="text-xl sm:text-2xl font-bold text-white tracking-tight group-hover:text-purple-200 transition-colors">
          {service.title}
        </h3>

        {/* Service Description (Exact Specification) */}
        <p className="mt-3 text-sm sm:text-base text-zinc-400 leading-relaxed font-normal">
          {service.tagline}
        </p>

        {/* Feature deliverables list */}
        <div className="mt-6 pt-5 border-t border-zinc-800/60 space-y-2">
          {service.features.map((feature, i) => (
            <div key={i} className="flex items-center gap-2 text-xs sm:text-sm text-zinc-300">
              <CheckCircle2 className="w-3.5 h-3.5 text-purple-400 shrink-0" />
              <span>{feature}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Card Action Link */}
      <div className="mt-8 pt-4 border-t border-zinc-800/40 flex items-center justify-between">
        <button
          onClick={() => onSelectService(service.title)}
          className="inline-flex items-center gap-2 text-sm font-semibold text-zinc-300 group-hover:text-purple-300 transition-colors focus:outline-none"
        >
          <span>Enquire about this service</span>
          <ArrowUpRight className="w-4 h-4 transform group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform text-purple-400" />
        </button>
      </div>
    </div>
  );
}
