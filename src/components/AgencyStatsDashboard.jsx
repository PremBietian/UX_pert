import React from 'react';
import { motion } from 'framer-motion';
import { Terminal } from 'lucide-react';

export default function AgencyStatsDashboard() {
  const stats = [
    { label: 'Capabilities Unified', value: '7 Core Disciplines', subtext: 'Web, Video, Design, Ads & Events' },
    { label: 'Founding Leadership', value: 'Direct Founder Access', subtext: 'Prem & Raju on every project' },
    { label: 'Execution Speed', value: 'Rapid Delivery', subtext: 'Structured milestone deadlines' },
    { label: 'Satisfaction Focus', value: '100% Commitment', subtext: 'Strict quality control' }
  ];

  const techBadges = [
    'React', 'Next.js', 'Tailwind CSS', 'Framer Motion', 'Node.js',
    'Premiere Pro', 'After Effects', 'DaVinci Resolve', 'Meta Ads', 'Google Ads'
  ];

  return (
    <div className="py-12 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="p-8 sm:p-12 rounded-3xl bg-[#09090F]/90 border border-purple-500/25 shadow-purple-glow-sm relative">
          
          {/* Header */}
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 mb-10 pb-8 border-b border-zinc-800/80">
            <div>
              <span className="inline-flex items-center gap-2 text-xs font-mono font-bold uppercase tracking-widest text-purple-400">
                <Terminal className="w-4 h-4" />
                <span>Agency Command Center</span>
              </span>
              <h3 className="text-2xl sm:text-3xl font-extrabold text-white mt-1">
                Built for High-Growth Digital Execution
              </h3>
            </div>

            <div className="flex items-center gap-2">
              <span className="px-3.5 py-1.5 rounded-full bg-emerald-950/60 border border-emerald-500/40 text-emerald-400 text-xs font-mono font-medium flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                <span>Accepting New Q4 Projects</span>
              </span>
            </div>
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
            {stats.map((stat, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: idx * 0.1 }}
                className="p-5 rounded-2xl bg-[#0D0D14] border border-zinc-800/80 hover:border-purple-500/30 transition-colors"
              >
                <div className="text-xs text-zinc-400 uppercase tracking-wider font-semibold">
                  {stat.label}
                </div>
                <div className="text-xl font-bold text-white mt-1 text-glow">
                  {stat.value}
                </div>
                <div className="text-xs text-purple-300/80 mt-1">
                  {stat.subtext}
                </div>
              </motion.div>
            ))}
          </div>

          {/* Tech Stack Marquee / Badges */}
          <div>
            <p className="text-xs uppercase tracking-widest text-zinc-500 font-semibold mb-4">
              Technologies & Production Tools We Master
            </p>
            <div className="flex flex-wrap gap-2.5">
              {techBadges.map((badge, idx) => (
                <span
                  key={idx}
                  className="px-3.5 py-1.5 rounded-xl bg-zinc-900/90 border border-zinc-800 text-xs font-medium text-zinc-300 hover:border-purple-500/40 hover:text-white transition-colors"
                >
                  {badge}
                </span>
              ))}
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
