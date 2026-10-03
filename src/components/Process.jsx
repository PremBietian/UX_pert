import React from 'react';
import SectionHeading from './SectionHeading';
import { processSteps } from '../data/process';

export default function Process() {
  return (
    <section className="py-20 md:py-32 bg-[#060609] border-t border-zinc-800/60 relative overflow-hidden">
      {/* Background radial glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[300px] bg-purple-900/10 rounded-full blur-[140px] pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading
          badge="Structured Workflow"
          title="How We Work"
          subtitle="A disciplined, transparent progression from initial concept to lasting execution."
        />

        {/* Desktop View: Horizontal Timeline */}
        <div className="hidden lg:block relative mt-16">
          {/* Connecting Line Across */}
          <div className="absolute top-12 left-12 right-12 h-[2px] bg-gradient-to-r from-purple-500/20 via-purple-500/50 to-purple-500/20 z-0" />

          <div className="grid grid-cols-6 gap-4 relative z-10">
            {processSteps.map((step, idx) => (
              <div key={idx} className="flex flex-col items-center text-center group">
                {/* Step Node */}
                <div className="w-14 h-14 rounded-2xl bg-[#0F0F16] border border-purple-500/30 group-hover:border-purple-400 group-hover:bg-purple-600 group-hover:shadow-purple-glow-sm flex items-center justify-center font-mono font-bold text-white text-base transition-all duration-300">
                  {step.step}
                </div>

                {/* Content */}
                <div className="mt-6">
                  <h3 className="text-lg font-bold text-white group-hover:text-purple-300 transition-colors">
                    {step.name}
                  </h3>
                  <p className="text-sm font-semibold text-purple-300/90 mt-1">
                    "{step.quote}"
                  </p>
                  <p className="text-xs text-zinc-400 mt-2.5 leading-relaxed">
                    {step.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Mobile / Tablet View: Vertical Timeline */}
        <div className="lg:hidden relative mt-12 pl-6 sm:pl-8">
          {/* Vertical connecting line */}
          <div className="absolute left-[19px] sm:left-[27px] top-4 bottom-4 w-[2px] bg-gradient-to-b from-purple-500/40 via-purple-500/80 to-purple-500/20" />

          <div className="space-y-8">
            {processSteps.map((step, idx) => (
              <div key={idx} className="relative flex items-start gap-4 sm:gap-6 group">
                {/* Node */}
                <div className="w-10 h-10 rounded-xl bg-[#0F0F16] border border-purple-500/40 flex items-center justify-center font-mono font-bold text-white text-sm shrink-0 z-10 shadow-purple-glow-sm">
                  {step.step}
                </div>

                {/* Card */}
                <div className="flex-1 p-5 rounded-xl bg-[#0B0B10] border border-zinc-800/80 group-hover:border-purple-500/30 transition-all">
                  <span className="text-[11px] font-mono text-purple-400 uppercase tracking-wider font-semibold">
                    Step {step.step}
                  </span>
                  <h3 className="text-lg font-bold text-white mt-0.5">
                    {step.name}
                  </h3>
                  <p className="text-sm font-semibold text-purple-300 mt-1">
                    "{step.quote}"
                  </p>
                  <p className="text-xs text-zinc-400 mt-2 leading-relaxed">
                    {step.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}
