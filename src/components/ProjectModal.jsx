import React, { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ArrowUpRight, CheckCircle2, Layers } from 'lucide-react';
import ProjectVisual from './ProjectVisual';

export default function ProjectModal({ project, isOpen, onClose, onEnquire }) {
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') onClose();
    };
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
    }
    return () => {
      document.body.style.overflow = 'unset';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, onClose]);

  if (!project) return null;

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/85 backdrop-blur-md"
            aria-hidden="true"
          />

          {/* Modal Container */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 15 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 15 }}
            transition={{ type: "spring", duration: 0.4 }}
            className="relative w-full max-w-2xl bg-[#0C0C12] border border-zinc-800 rounded-2xl shadow-2xl overflow-hidden z-10 my-8"
            role="dialog"
            aria-modal="true"
            aria-labelledby="modal-title"
          >
            {/* Visual Header Mockup */}
            <div className="relative">
              <ProjectVisual type={project.visualType} />
              
              {/* Close Button */}
              <button
                onClick={onClose}
                className="absolute top-3 right-3 p-2 rounded-full bg-black/70 hover:bg-black text-zinc-400 hover:text-white border border-zinc-700/80 transition-colors focus:outline-none focus:ring-2 focus:ring-purple-500"
                aria-label="Close project modal"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Content Body */}
            <div className="p-6 sm:p-8">
              {/* Badge & Category */}
              <div className="flex flex-wrap items-center gap-2 mb-3">
                <span className="px-2.5 py-1 rounded-full text-xs font-semibold uppercase tracking-wider bg-purple-950/80 text-purple-300 border border-purple-500/40">
                  {project.badge}
                </span>
                <span className="text-xs font-mono text-zinc-400">
                  {project.category}
                </span>
              </div>

              {/* Title */}
              <h3 id="modal-title" className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
                {project.title}
              </h3>

              {/* Detailed Description */}
              <p className="mt-4 text-sm sm:text-base text-zinc-300 leading-relaxed font-normal">
                {project.fullDescription}
              </p>

              {/* Deliverables Checklist */}
              <div className="mt-6 pt-5 border-t border-zinc-800">
                <h4 className="text-xs uppercase tracking-wider font-semibold text-zinc-400 mb-3 flex items-center gap-1.5">
                  <Layers className="w-3.5 h-3.5 text-purple-400" />
                  <span>Execution Scope & Deliverables</span>
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                  {project.deliverables.map((item, i) => (
                    <div key={i} className="flex items-start gap-2 text-xs sm:text-sm text-zinc-300">
                      <CheckCircle2 className="w-4 h-4 text-purple-400 shrink-0 mt-0.5" />
                      <span>{item}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Tags */}
              <div className="mt-6 flex flex-wrap gap-2">
                {project.tags.map((tag, i) => (
                  <span
                    key={i}
                    className="px-2.5 py-1 rounded-md bg-zinc-900 border border-zinc-800 text-xs text-zinc-400 font-mono"
                  >
                    #{tag}
                  </span>
                ))}
              </div>

              {/* Action Buttons */}
              <div className="mt-8 pt-6 border-t border-zinc-800 flex flex-col sm:flex-row items-center justify-between gap-4">
                <div className="text-xs text-zinc-500">
                  Concept Demonstration for UXpert Capabilities
                </div>
                <button
                  onClick={() => {
                    onClose();
                    onEnquire(project.category);
                  }}
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-purple-600 hover:bg-purple-500 text-white font-semibold text-sm shadow-purple-glow-sm hover:shadow-purple-glow transition-all"
                >
                  <span>Discuss Your Project</span>
                  <ArrowUpRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
