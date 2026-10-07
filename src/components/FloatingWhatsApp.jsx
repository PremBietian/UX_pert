import React, { useState } from 'react';
import { MessageCircle, X } from 'lucide-react';

export default function FloatingWhatsApp() {
  const [isTooltipDismissed, setIsTooltipDismissed] = useState(false);
  const whatsappNumber = "917899422316"; // Prem N Mahendrakar
  const defaultMessage = encodeURIComponent(
    "Hello UX_PERT, I am interested in your services and would like to discuss a project."
  );
  const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${defaultMessage}`;

  return (
    <div className="fixed bottom-6 right-6 z-40 flex items-center group">
      {/* Tooltip Popup */}
      {!isTooltipDismissed && (
        <div className="hidden sm:flex items-center gap-2 mr-3 px-3.5 py-2 rounded-xl bg-[#0F0F16] border border-purple-500/40 text-xs text-white shadow-xl backdrop-blur-md animate-fade-in">
          <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
          <span className="font-medium">Chat with UX_PERT Founder</span>
          <button
            onClick={(e) => {
              e.stopPropagation();
              e.preventDefault();
              setIsTooltipDismissed(true);
            }}
            className="ml-1 text-zinc-400 hover:text-white p-0.5 rounded-md hover:bg-zinc-800 transition-colors"
            title="Dismiss"
          >
            <X className="w-3 h-3" />
          </button>
        </div>
      )}

      {/* Floating Action Button */}
      <a
        href={whatsappUrl}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Chat on WhatsApp with UX_PERT Founder"
        className="relative flex items-center justify-center w-14 h-14 rounded-full bg-[#25D366] hover:bg-[#20bd5a] text-white shadow-[0_4px_25px_rgba(37,211,102,0.45)] hover:shadow-[0_6px_35px_rgba(37,211,102,0.6)] transform hover:scale-105 active:scale-95 transition-all duration-300"
      >
        <MessageCircle className="w-7 h-7 fill-white/20" />
        
        {/* Pulse badge */}
        <span className="absolute -top-1 -right-1 flex h-4 w-4">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
          <span className="relative inline-flex rounded-full h-4 w-4 bg-emerald-500 border-2 border-zinc-950"></span>
        </span>
      </a>
    </div>
  );
}
