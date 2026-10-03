import React from 'react';

export default function Footer({ onNavigate, onOpenLegal, onSelectService }) {
  const navLinks = [
    { name: 'Home', href: '#home' },
    { name: 'Services', href: '#services' },
    { name: 'Our Work', href: '#work' },
    { name: 'About', href: '#about' },
    { name: 'Contact', href: '#contact' },
  ];

  const serviceLinks = [
    'Web Development',
    'Video Editing',
    'Logo & Brand Design',
    'Social Media Management',
    'Ad Management',
    'Event Management',
  ];

  // Social labels retained without invented URLs (marked placeholders for later configuration)
  const socialChannels = [
    { name: 'Instagram', note: 'Configuration pending' },
    { name: 'LinkedIn', note: 'Configuration pending' },
    { name: 'YouTube', note: 'Configuration pending' },
  ];

  const handleLinkClick = (e, href) => {
    e.preventDefault();
    onNavigate(href);
  };

  return (
    <footer className="bg-[#040406] border-t border-zinc-800/80 pt-16 pb-12 text-zinc-400">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 lg:gap-8 pb-14 border-b border-zinc-800/80">
          
          {/* Brand Info (Col 1 & 2) */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-purple-500 to-indigo-800 p-[1px] shadow-purple-glow-sm">
                <div className="w-full h-full bg-[#09090D] rounded-[11px] flex items-center justify-center">
                  <span className="font-extrabold text-white text-sm">UX</span>
                </div>
              </div>
              <span className="text-2xl font-bold tracking-tight text-white">
                UX<span className="text-purple-400">pert</span>
              </span>
            </div>

            <p className="text-sm font-semibold text-zinc-300">
              Creative Digital & Media Agency
            </p>

            <p className="text-xs sm:text-sm text-purple-400/90 font-medium">
              "We Build. We Create. We Grow."
            </p>

            <p className="text-xs text-zinc-500 max-w-sm leading-relaxed">
              Creative digital solutions for businesses, brands and events. Uniting code, motion, visual identities, media, and promotion.
            </p>
          </div>

          {/* Col 3: Navigation */}
          <div>
            <h4 className="text-xs font-semibold text-white uppercase tracking-wider mb-4">
              Navigation
            </h4>
            <ul className="space-y-2.5 text-sm">
              {navLinks.map((item) => (
                <li key={item.name}>
                  <a
                    href={item.href}
                    onClick={(e) => handleLinkClick(e, item.href)}
                    className="hover:text-purple-300 transition-colors"
                  >
                    {item.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 4: Services */}
          <div>
            <h4 className="text-xs font-semibold text-white uppercase tracking-wider mb-4">
              Services
            </h4>
            <ul className="space-y-2.5 text-sm">
              {serviceLinks.map((service) => (
                <li key={service}>
                  <button
                    onClick={() => onSelectService(service)}
                    className="text-left hover:text-purple-300 transition-colors focus:outline-none"
                  >
                    {service}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 5: Contact & Socials */}
          <div>
            <h4 className="text-xs font-semibold text-white uppercase tracking-wider mb-4">
              Direct Contact
            </h4>
            <div className="space-y-3 text-sm">
              <div>
                <span className="text-[11px] text-zinc-500 uppercase font-mono block">Founder</span>
                <a href="tel:+917899422316" className="text-zinc-200 hover:text-purple-400 transition-colors font-mono">
                  +91 7899422316
                </a>
              </div>
              <div>
                <span className="text-[11px] text-zinc-500 uppercase font-mono block">Co-Founder</span>
                <a href="tel:+918431487497" className="text-zinc-200 hover:text-purple-400 transition-colors font-mono">
                  +91 8431487497
                </a>
              </div>
            </div>

            {/* Social Channels (Retaining labels without invented URLs) */}
            <div className="mt-6 pt-5 border-t border-zinc-800/60">
              <h5 className="text-[11px] uppercase tracking-wider text-zinc-500 font-semibold mb-2.5">
                Social Channels
              </h5>
              <div className="flex flex-wrap gap-2">
                {socialChannels.map((channel) => (
                  <span
                    key={channel.name}
                    title="Profile link will be configured upon public launch"
                    className="inline-flex items-center px-2.5 py-1 rounded bg-zinc-900 border border-zinc-800 text-xs text-zinc-400 cursor-default hover:text-zinc-300 hover:border-zinc-700"
                  >
                    {channel.name}
                  </span>
                ))}
              </div>
            </div>
          </div>

        </div>

        {/* Bottom Bar: Copyright & Legal */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-zinc-500">
          <div>
            © 2026 UXpert. All rights reserved.
          </div>

          <div className="flex items-center gap-6">
            <button
              onClick={() => onOpenLegal('privacy')}
              className="hover:text-zinc-300 transition-colors focus:outline-none focus:underline"
            >
              Privacy Policy
            </button>
            <button
              onClick={() => onOpenLegal('terms')}
              className="hover:text-zinc-300 transition-colors focus:outline-none focus:underline"
            >
              Terms & Conditions
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
}
