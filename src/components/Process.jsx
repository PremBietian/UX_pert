import React, { useState } from 'react';
import { motion } from 'framer-motion';
import SectionHeading from './SectionHeading';
import { processSteps } from '../data/process';

export default function Process() {
  const [activeStep, setActiveStep] = useState(0);

  return (
    <section id="process" className="py-20 md:py-32 bg-[#050509] border-t border-zinc-800/60 relative overflow-hidden">
      {/* Background radial glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[300px] bg-purple-900/10 rounded-full blur-[160px] pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading
          badge="Structured Workflow"
          title="Our Process"
          subtitle="A disciplined 6-step roadmap from initial discovery to long-term digital growth."
        />

        {/* Desktop View: Interactive Horizontal Timeline */}
        <div className="hidden lg:block relative mt-16">
          {/* Connecting Line Across */}
          <div className="absolute top-12 left-12 right-12 h-[2px] bg-gradient-to-r from-purple-500/20 via-purple-500/60 to-purple-500/20 z-0" />

          <div className="grid grid-cols-6 gap-4 relative z-10">
            {processSteps.map((step, idx) => {
              const isActive = activeStep === idx;
              return (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: idx * 0.1 }}
                  onMouseEnter={() => setActiveStep(idx)}
                  className="flex flex-col items-center text-center cursor-pointer group"
                >
                  {/* Step Node */}
                  <div
                    className={`w-14 h-14 rounded-2xl border flex items-center justify-center font-mono font-bold text-base transition-all duration-300 ${
                      isActive
                        ? 'bg-purple-600 border-purple-400 text-white shadow-purple-glow-sm scale-110'
                        : 'bg-[#0F0F16] border-purple-500/30 text-purple-300 group-hover:border-purple-400'
                    }`}
                  >
                    {step.step}
                  </div>

                  {/* Content */}
                  <div className="mt-6">
                    <h3 className={`text-lg font-bold transition-colors ${isActive ? 'text-purple-300' : 'text-white group-hover:text-purple-300'}`}>
                      {step.name}
                    </h3>
                    <p className="text-xs font-semibold text-purple-300/90 mt-1">
                      "{step.quote}"
                    </p>
                    <p className="text-xs text-zinc-400 mt-2.5 leading-relaxed">
                      {step.description}
                    </p>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>

        {/* Mobile / Tablet View: Vertical Timeline */}
        <div className="lg:hidden relative mt-12 pl-6 sm:pl-8">
          <div className="absolute left-[19px] sm:left-[27px] top-4 bottom-4 w-[2px] bg-gradient-to-b from-purple-500/40 via-purple-500/80 to-purple-500/20" />

          <div className="space-y-8">
            {processSteps.map((step, idx) => (
              <div key={idx} className="relative flex items-start gap-4 sm:gap-6 group">
                <div className="w-10 h-10 rounded-xl bg-[#0F0F16] border border-purple-500/40 flex items-center justify-center font-mono font-bold text-white text-sm shrink-0 z-10 shadow-purple-glow-sm">
                  {step.step}
                </div>

                <div className="flex-1 p-5 rounded-2xl bg-[#09090E] border border-zinc-800/80 group-hover:border-purple-500/30 transition-all">
                  <span className="text-[10px] font-mono text-purple-400 uppercase tracking-wider font-semibold">
                    Step {step.step}
                  </span>
                  <h3 className="text-lg font-bold text-white mt-0.5">
                    {step.name}
                  </h3>
                  <p className="text-xs font-semibold text-purple-300 mt-1">
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
