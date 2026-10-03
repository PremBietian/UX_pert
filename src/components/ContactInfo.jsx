import React from 'react';
import { Phone, MessageCircle, ShieldCheck } from 'lucide-react';

export default function ContactInfo() {
  const contacts = [
    {
      name: "Prem N Mahendrakar",
      role: "Founder",
      phone: "+91 7899422316",
      telLink: "tel:+917899422316",
      waLink: "https://wa.me/917899422316?text=Hi%20Prem,%20I'd%20like%20to%20discuss%20a%20project%20with%20UXpert.",
      discipline: "Technology & Web Development"
    },
    {
      name: "Raju Gumadal",
      role: "Co-Founder",
      phone: "+91 8431487497",
      telLink: "tel:+918431487497",
      waLink: "https://wa.me/918431487497?text=Hi%20Raju,%20I'd%20like%20to%20discuss%20a%20project%20with%20UXpert.",
      discipline: "Creative Direction & Operations"
    }
  ];

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
          Direct Leadership Contact
        </h3>
        <p className="mt-2 text-sm text-zinc-400 leading-relaxed">
          Reach our founders directly for high-priority discussions, project scope evaluation, or immediate timeline coordination.
        </p>
      </div>

      <div className="space-y-4">
        {contacts.map((contact, idx) => (
          <div
            key={idx}
            className="p-5 sm:p-6 rounded-2xl bg-[#0C0C12] border border-zinc-800/80 hover:border-purple-500/40 transition-all duration-300"
          >
            <div className="flex items-start justify-between">
              <div>
                <span className="text-[10px] font-mono uppercase tracking-wider text-purple-400 font-semibold">
                  {contact.role}
                </span>
                <h4 className="text-lg font-bold text-white mt-0.5">
                  {contact.name}
                </h4>
                <p className="text-xs text-zinc-400 font-medium">
                  {contact.discipline}
                </p>
              </div>
            </div>

            {/* Contact Action Buttons */}
            <div className="mt-4 pt-4 border-t border-zinc-800/60 flex flex-wrap gap-2.5">
              <a
                href={contact.telLink}
                className="inline-flex items-center gap-2 px-3.5 py-2 rounded-xl bg-zinc-900 hover:bg-zinc-800 border border-zinc-800 text-xs sm:text-sm font-semibold text-zinc-200 hover:text-white transition-colors"
                aria-label={`Call ${contact.name} at ${contact.phone}`}
              >
                <Phone className="w-3.5 h-3.5 text-purple-400" />
                <span>{contact.phone}</span>
              </a>

              <a
                href={contact.waLink}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-3.5 py-2 rounded-xl bg-[#25D366]/10 hover:bg-[#25D366]/20 border border-[#25D366]/30 text-xs sm:text-sm font-semibold text-[#25D366] transition-colors"
                aria-label={`Chat with ${contact.name} on WhatsApp`}
              >
                <MessageCircle className="w-3.5 h-3.5" />
                <span>WhatsApp</span>
              </a>
            </div>
          </div>
        ))}
      </div>

      {/* Reassurance panel */}
      <div className="p-4 rounded-xl bg-purple-950/20 border border-purple-900/30 flex items-start gap-3">
        <ShieldCheck className="w-5 h-5 text-purple-400 shrink-0 mt-0.5" />
        <div className="text-xs text-zinc-300 leading-relaxed">
          <span className="font-semibold text-white">Direct Agency Response: </span>
          We respect your time. All submitted inquiries and messages are reviewed directly by our founding team.
        </div>
      </div>
    </div>
  );
}
