import React from 'react';

export default function TeamMember({ name, role, title, description, icon: Icon }) {
  return (
    <div className="p-7 sm:p-8 rounded-2xl bg-[#0C0C12] border border-zinc-800/80 hover:border-purple-500/40 transition-all duration-300 hover:shadow-purple-glow-sm flex flex-col justify-between">
      <div>
        {/* Header icon / role */}
        <div className="flex items-center justify-between mb-5">
          <div className="w-12 h-12 rounded-xl bg-purple-950/40 border border-purple-800/50 flex items-center justify-center text-purple-400">
            {Icon && <Icon className="w-6 h-6" />}
          </div>
          <span className="px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wider bg-zinc-900 border border-zinc-800 text-purple-300">
            {title}
          </span>
        </div>

        <h3 className="text-2xl font-bold text-white tracking-tight">
          {name}
        </h3>

        <div className="text-xs font-mono uppercase tracking-wider text-purple-400 font-semibold mt-1">
          {role}
        </div>

        <p className="mt-4 text-sm text-zinc-300 leading-relaxed font-normal">
          {description}
        </p>
      </div>
    </div>
  );
}
