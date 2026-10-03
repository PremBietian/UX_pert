import React, { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Shield } from 'lucide-react';

export default function LegalModal({ isOpen, onClose, type }) {
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

  if (!isOpen) return null;

  const isPrivacy = type === 'privacy';
  const title = isPrivacy ? 'Privacy Policy' : 'Terms & Conditions';

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 bg-black/80 backdrop-blur-sm"
          aria-hidden="true"
        />

        {/* Modal Box */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 10 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 10 }}
          className="relative w-full max-w-xl bg-[#0F0F16] border border-zinc-800 rounded-2xl p-6 sm:p-8 shadow-2xl z-10 my-8 max-h-[85vh] overflow-y-auto"
          role="dialog"
          aria-modal="true"
          aria-labelledby="legal-title"
        >
          <div className="flex items-center justify-between pb-4 border-b border-zinc-800 mb-6">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-lg bg-purple-950/60 border border-purple-800/40 flex items-center justify-center text-purple-400">
                <Shield className="w-4 h-4" />
              </div>
              <h3 id="legal-title" className="text-xl font-bold text-white">
                {title}
              </h3>
            </div>
            <button
              onClick={onClose}
              className="p-1.5 rounded-lg bg-zinc-900 border border-zinc-800 text-zinc-400 hover:text-white transition-colors"
              aria-label="Close dialog"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          <div className="space-y-4 text-sm text-zinc-300 leading-relaxed font-normal">
            {isPrivacy ? (
              <>
                <p>
                  <strong>UXpert Digital Agency</strong> respects your privacy and is committed to protecting any personal information submitted via our contact forms or direct communications.
                </p>
                <div className="p-4 rounded-xl bg-zinc-900/60 border border-zinc-800/80">
                  <h4 className="text-xs uppercase tracking-wider font-semibold text-purple-300 mb-2">
                    Information We Collect
                  </h4>
                  <p className="text-xs text-zinc-400">
                    We only collect information voluntarily provided by you, such as your name, contact phone number, email address, and project brief, strictly for the purpose of communicating regarding your project enquiry.
                  </p>
                </div>
                <div className="p-4 rounded-xl bg-zinc-900/60 border border-zinc-800/80">
                  <h4 className="text-xs uppercase tracking-wider font-semibold text-purple-300 mb-2">
                    Use of Data
                  </h4>
                  <p className="text-xs text-zinc-400">
                    We never sell, rent, or trade your contact information with external marketing parties. Inquiries are handled solely by the founders and core team to provide project proposals.
                  </p>
                </div>
                <p className="text-xs text-zinc-500 pt-2">
                  * Policy placeholder: For custom data requests or inquiries, reach out directly to our founders.
                </p>
              </>
            ) : (
              <>
                <p>
                  Welcome to <strong>UXpert</strong>. By engaging with our website or commissioning creative services, you agree to these standard operating terms.
                </p>
                <div className="p-4 rounded-xl bg-zinc-900/60 border border-zinc-800/80">
                  <h4 className="text-xs uppercase tracking-wider font-semibold text-purple-300 mb-2">
                    Scope of Services
                  </h4>
                  <p className="text-xs text-zinc-400">
                    UXpert delivers creative digital solutions covering web development, video editing, branding, social media, ads, and event coordination under mutual agreements defined on a per-project basis.
                  </p>
                </div>
                <div className="p-4 rounded-xl bg-zinc-900/60 border border-zinc-800/80">
                  <h4 className="text-xs uppercase tracking-wider font-semibold text-purple-300 mb-2">
                    Intellectual Property
                  </h4>
                  <p className="text-xs text-zinc-400">
                    All client deliverables and final assets become client property upon agreed project completion and milestone fulfillment. Concept demos featured on this platform are owned by UXpert.
                  </p>
                </div>
                <p className="text-xs text-zinc-500 pt-2">
                  * Terms placeholder: Formal service agreements and milestone schedules are outlined individually per project contract.
                </p>
              </>
            )}
          </div>

          <div className="mt-8 pt-4 border-t border-zinc-800 flex justify-end">
            <button
              onClick={onClose}
              className="px-5 py-2 rounded-xl bg-zinc-900 hover:bg-zinc-800 text-sm font-semibold text-zinc-200 border border-zinc-700 transition-colors"
            >
              Close
            </button>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
