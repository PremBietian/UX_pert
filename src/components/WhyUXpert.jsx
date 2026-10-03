import React from 'react';
import { Lightbulb, Cpu, Users, Target } from 'lucide-react';
import SectionHeading from './SectionHeading';

export default function WhyUXpert() {
  const pillars = [
    {
      title: "Creative",
      quote: "Ideas designed to make your brand stand out.",
      icon: Lightbulb,
      description: "Visual identity, content framing, and media production built to command attention in crowded digital spaces.",
      tag: "Design & Concept"
    },
    {
      title: "Technology",
      quote: "Modern tools and technology used to turn ideas into reliable digital experiences.",
      icon: Cpu,
      description: "Performant code, clean UI architectures, and modern web frameworks that deliver fast, accessible interactions.",
      tag: "Execution & Code"
    },
    {
      title: "Collaboration",
      quote: "We work closely with clients throughout the project.",
      icon: Users,
      description: "Direct communication with the team building your work, keeping progress transparent and feedback agile.",
      tag: "Partnership & Flow"
    },
    {
      title: "Purpose",
      quote: "Every project starts with a clear goal and a meaningful outcome.",
      icon: Target,
      description: "No vanity deliverables. Everything we design and build is calibrated to support real brand and business objectives.",
      tag: "Focus & Strategy"
    }
  ];

  return (
    <section className="py-20 md:py-28 bg-[#07070A] border-y border-zinc-800/60 relative overflow-hidden">
      {/* Subtle background glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[350px] bg-purple-900/10 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <SectionHeading
          badge="Why UXpert"
          title="One Team. Multiple Capabilities."
          subtitle="We bring creative thinking and technical execution together to build complete digital solutions."
        />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {pillars.map((pillar, idx) => {
            const Icon = pillar.icon;
            return (
              <div
                key={idx}
                className="group relative p-7 rounded-2xl bg-[#0D0D12] border border-zinc-800/80 hover:border-purple-500/40 transition-all duration-300 hover:-translate-y-1 hover:shadow-purple-glow-sm flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-5">
                    <div className="w-12 h-12 rounded-xl bg-purple-950/40 border border-purple-800/40 flex items-center justify-center text-purple-400 group-hover:bg-purple-600 group-hover:text-white transition-all duration-300">
                      <Icon className="w-6 h-6" />
                    </div>
                    <span className="text-[10px] font-mono uppercase tracking-wider px-2 py-1 rounded bg-zinc-900 border border-zinc-800 text-zinc-400">
                      0{idx + 1}
                    </span>
                  </div>

                  <span className="text-xs font-semibold text-purple-400 tracking-wider uppercase block mb-1">
                    {pillar.tag}
                  </span>

                  <h3 className="text-xl font-bold text-white tracking-tight">
                    {pillar.title}
                  </h3>

                  <p className="mt-3 text-sm font-semibold text-zinc-200 leading-snug">
                    "{pillar.quote}"
                  </p>

                  <p className="mt-2 text-xs text-zinc-400 leading-relaxed">
                    {pillar.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
