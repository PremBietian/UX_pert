import React from 'react';

export default function SectionHeading({
  badge,
  title,
  subtitle,
  centered = true,
  className = ""
}) {
  return (
    <div className={`mb-12 md:mb-16 ${centered ? 'text-center mx-auto' : ''} max-w-3xl ${className}`}>
      {badge && (
        <div className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-semibold tracking-wider uppercase mb-4 ${
          centered ? 'mx-auto' : ''
        } bg-purple-950/40 text-purple-300 border border-purple-500/20`}>
          <span className="w-1.5 h-1.5 rounded-full bg-purple-400 animate-pulse" />
          <span>{badge}</span>
        </div>
      )}
      {title && (
        <h2 className="text-3xl md:text-5xl font-extrabold text-white tracking-tight leading-tight">
          {title}
        </h2>
      )}
      {subtitle && (
        <p className="mt-4 text-base md:text-lg text-zinc-400 font-normal leading-relaxed">
          {subtitle}
        </p>
      )}
    </div>
  );
}
