import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ArrowUpRight } from 'lucide-react';

export default function MobileMenu({ isOpen, onClose, activeSection, onNavigate, onStartProject }) {
  const navLinks = [
    { name: 'Home', href: '#home' },
    { name: 'Services', href: '#services' },
    { name: 'Our Work', href: '#work' },
    { name: 'Process', href: '#process' },
    { name: 'About', href: '#about' },
    { name: 'Contact', href: '#contact' },
  ];

  const handleLinkClick = (href) => {
    onNavigate(href);
    onClose();
  };

  const handleStartProjectClick = () => {
    onClose();
    if (onStartProject) onStartProject();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/80 backdrop-blur-md z-40 lg:hidden"
            aria-hidden="true"
          />

          {/* Drawer */}
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 28, stiffness: 300 }}
            className="fixed top-0 right-0 bottom-0 w-full max-w-sm bg-[#07070B] border-l border-zinc-800/80 z-50 p-6 flex flex-col justify-between shadow-2xl lg:hidden overflow-y-auto"
            role="dialog"
            aria-modal="true"
            aria-label="Mobile Navigation Menu"
          >
            <div>
              {/* Header */}
              <div className="flex items-center justify-between pb-6 border-b border-zinc-800/60">
                <div className="flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-purple-500 to-purple-800 flex items-center justify-center shadow-purple-glow-sm">
                    <span className="font-extrabold text-white text-xs">UX</span>
                  </div>
                  <span className="text-xl font-black tracking-tight text-white">
                    UX_<span className="text-purple-400">PERT</span>
                  </span>
                </div>
                <button
                  onClick={onClose}
                  className="p-2 rounded-lg bg-zinc-900 border border-zinc-800 text-zinc-400 hover:text-white hover:bg-zinc-800 transition-colors focus:outline-none focus:ring-2 focus:ring-purple-500"
                  aria-label="Close menu"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Tagline pill */}
              <div className="mt-4 px-3 py-1.5 rounded-lg bg-purple-950/40 border border-purple-900/50 text-purple-300 text-xs font-mono font-medium">
                We Build. We Create. We Grow.
              </div>

              {/* Navigation Links */}
              <nav className="mt-8 flex flex-col gap-2">
                {navLinks.map((link, idx) => {
                  const isActive = activeSection === link.href.replace('#', '');
                  return (
                    <button
                      key={link.name}
                      onClick={() => handleLinkClick(link.href)}
                      className={`flex items-center justify-between px-4 py-3.5 rounded-xl text-base font-semibold text-left transition-all ${
                        isActive
                          ? 'bg-purple-600/20 text-purple-300 border border-purple-500/30 font-bold'
                          : 'text-zinc-300 hover:text-white hover:bg-zinc-900/70 border border-transparent'
                      }`}
                    >
                      <span>{link.name}</span>
                      <span className="text-xs text-zinc-500 font-mono">0{idx + 1}</span>
                    </button>
                  );
                })}
              </nav>

              {/* Project CTA */}
              <div className="mt-6 pt-4 border-t border-zinc-800/60">
                <button
                  onClick={handleStartProjectClick}
                  className="w-full flex items-center justify-center gap-2 px-5 py-3.5 rounded-xl bg-purple-600 hover:bg-purple-500 text-white font-bold shadow-purple-glow transition-all active:scale-[0.98]"
                >
                  <span>Start a Project</span>
                  <ArrowUpRight className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Quick Contact Info */}
            <div className="pt-6 border-t border-zinc-800/80 mt-6">
              <div className="text-xs uppercase tracking-wider text-zinc-500 font-semibold mb-3">
                Direct Contact
              </div>
              <div className="space-y-2.5">
                <a
                  href="tel:+917899422316"
                  className="flex items-center justify-between text-xs text-zinc-300 hover:text-purple-300 py-1"
                >
                  <span>Prem (Founder)</span>
                  <span className="font-mono text-purple-300">+91 7899422316</span>
                </a>
                <a
                  href="tel:+918431487497"
                  className="flex items-center justify-between text-xs text-zinc-300 hover:text-purple-300 py-1"
                >
                  <span>Raju (Co-Founder)</span>
                  <span className="font-mono text-purple-300">+91 8431487497</span>
                </a>
              </div>
              <p className="text-[11px] text-zinc-600 mt-4 text-center">
                UX_PERT — Creative Digital & Media Agency
              </p>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
