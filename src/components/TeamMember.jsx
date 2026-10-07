import React from 'react';
import { Phone, MessageCircle } from 'lucide-react';

export default function TeamMember({ name, role, title, description, phone, waLink, icon: Icon }) {
  return (
    <div className="p-7 sm:p-8 rounded-3xl bg-[#09090F] border border-zinc-800/90 hover:border-purple-500/50 transition-all duration-300 hover:shadow-purple-glow-sm flex flex-col justify-between group">
      <div>
        {/* Header icon / role */}
        <div className="flex items-center justify-between mb-5">
          <div className="w-12 h-12 rounded-2xl bg-purple-950/40 border border-purple-800/50 flex items-center justify-center text-purple-400 group-hover:bg-purple-600 group-hover:text-white transition-colors">
            {Icon && <Icon className="w-6 h-6" />}
          </div>
          <span className="px-3.5 py-1 rounded-full text-xs font-mono font-semibold uppercase tracking-wider bg-zinc-900 border border-zinc-800 text-purple-300">
            {title}
          </span>
        </div>

        <h3 className="text-2xl font-bold text-white tracking-tight group-hover:text-purple-200 transition-colors">
          {name}
        </h3>

        <div className="text-xs font-mono uppercase tracking-wider text-purple-400 font-semibold mt-1">
          {role}
        </div>

        <p className="mt-4 text-xs sm:text-sm text-zinc-300 leading-relaxed font-normal">
          {description}
        </p>
      </div>

      {/* Direct Contact Links */}
      {phone && (
        <div className="mt-6 pt-4 border-t border-zinc-800/60 flex items-center gap-2">
          <a
            href={`tel:${phone.replace(/\s+/g, '')}`}
            className="flex-1 inline-flex items-center justify-center gap-2 px-3 py-2 rounded-xl bg-zinc-900 hover:bg-zinc-800 border border-zinc-800 text-xs font-semibold text-zinc-300 hover:text-white transition-colors"
          >
            <Phone className="w-3.5 h-3.5 text-purple-400" />
            <span>{phone}</span>
          </a>

          {waLink && (
            <a
              href={waLink}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-1.5 px-3 py-2 rounded-xl bg-[#25D366]/10 hover:bg-[#25D366]/20 border border-[#25D366]/30 text-xs font-bold text-[#25D366] transition-colors"
            >
              <MessageCircle className="w-3.5 h-3.5" />
              <span>WhatsApp</span>
            </a>
          )}
        </div>
      )}
    </div>
  );
}
