import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, CheckCircle2, ArrowRight, ShieldCheck, Zap } from 'lucide-react';

export default function ServiceDetailModal({ isOpen, service, onClose, onStartProject }) {
  if (!isOpen || !service) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 bg-black/80 backdrop-blur-md"
        />

        {/* Modal Window */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          className="relative w-full max-w-3xl bg-[#0B0B12] border border-purple-500/30 rounded-3xl shadow-purple-glow-lg overflow-hidden z-10"
        >
          {/* Top Header */}
          <div className="p-6 sm:p-8 bg-gradient-to-r from-purple-950/40 via-zinc-950 to-zinc-950 border-b border-zinc-800 flex items-start justify-between">
            <div>
              <span className="inline-block px-3 py-1 rounded-full bg-purple-900/40 border border-purple-500/30 text-purple-300 text-xs font-mono font-semibold uppercase tracking-wider mb-2">
                {service.category || 'Core Agency Capability'}
              </span>
              <h2 className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight">
                {service.title}
              </h2>
            </div>

            <button
              onClick={onClose}
              className="p-2.5 rounded-full text-zinc-400 hover:text-white bg-zinc-900 hover:bg-zinc-800 border border-zinc-800 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Modal Body */}
          <div className="p-6 sm:p-8 space-y-6 max-h-[75vh] overflow-y-auto">
            {/* Tagline */}
            <p className="text-base sm:text-lg text-zinc-300 leading-relaxed font-normal">
              {service.tagline}
            </p>

            {/* Feature Deliverables Matrix */}
            <div>
              <h3 className="text-xs font-mono uppercase tracking-widest text-purple-400 font-bold mb-4 flex items-center gap-2">
                <Zap className="w-4 h-4" />
                <span>What We Deliver & Execute</span>
              </h3>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {service.features && service.features.map((feature, idx) => (
                  <div
                    key={idx}
                    className="p-4 rounded-xl bg-zinc-900/60 border border-zinc-800/90 flex items-start gap-3"
                  >
                    <CheckCircle2 className="w-4 h-4 text-purple-400 shrink-0 mt-0.5" />
                    <span className="text-xs sm:text-sm text-zinc-200 font-medium">{feature}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Tech Stack / Framework Badges */}
            {service.techStack && (
              <div>
                <h3 className="text-xs font-mono uppercase tracking-widest text-zinc-400 font-bold mb-3">
                  Technologies & Standards
                </h3>
                <div className="flex flex-wrap gap-2">
                  {service.techStack.map((tech, i) => (
                    <span
                      key={i}
                      className="px-3.5 py-1.5 rounded-lg bg-purple-950/30 border border-purple-800/40 text-xs text-purple-300 font-medium"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* Guarantee / Assurance Note */}
            <div className="p-4 rounded-2xl bg-zinc-950 border border-zinc-800/80 flex items-center gap-3">
              <ShieldCheck className="w-5 h-5 text-emerald-400 shrink-0" />
              <div className="text-xs text-zinc-400">
                <span className="text-white font-semibold">UX_PERT Standard: </span>
                Every deliverable comes with structured milestones, clear timelines, and dedicated post-launch support.
              </div>
            </div>

            {/* Footer Action Buttons */}
            <div className="pt-4 border-t border-zinc-800 flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="text-xs text-zinc-400">
                Ready to launch your project?
              </div>

              <div className="flex items-center gap-3 w-full sm:w-auto">
                <button
                  onClick={() => {
                    onClose();
                    onStartProject(service.title);
                  }}
                  className="w-full sm:w-auto flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-purple-600 hover:bg-purple-500 text-white font-bold text-sm shadow-purple-glow hover:shadow-purple-glow-lg transition-all"
                >
                  <span>Start {service.title}</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
