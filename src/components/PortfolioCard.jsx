import React from 'react';
import { ArrowRight } from 'lucide-react';
import ProjectVisual from './ProjectVisual';

export default function PortfolioCard({ project, onOpenModal }) {
  return (
    <div className="group flex flex-col justify-between rounded-2xl bg-[#0B0B10] border border-zinc-800/90 hover:border-purple-500/50 transition-all duration-300 hover:-translate-y-1 hover:shadow-purple-glow-sm overflow-hidden">
      <div>
        {/* Project Visual Mockup */}
        <div className="relative overflow-hidden bg-black/40">
          <ProjectVisual type={project.visualType} />
          
          {/* Concept/Demo Badge */}
          <div className="absolute top-3 left-3">
            <span className="inline-block px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider bg-black/80 backdrop-blur-md text-purple-300 border border-purple-500/30">
              {project.badge}
            </span>
          </div>
        </div>

        {/* Content */}
        <div className="p-6">
          <span className="text-xs font-semibold uppercase tracking-wider text-purple-400 font-mono">
            {project.category}
          </span>
          <h3 className="mt-1.5 text-xl font-bold text-white group-hover:text-purple-200 transition-colors">
            {project.title}
          </h3>
          <p className="mt-2.5 text-sm text-zinc-400 line-clamp-3 leading-relaxed">
            {project.shortDescription}
          </p>

          {/* Tags preview */}
          <div className="mt-4 flex flex-wrap gap-1.5">
            {project.tags.slice(0, 3).map((tag, idx) => (
              <span
                key={idx}
                className="px-2 py-0.5 rounded text-[10px] bg-zinc-900 border border-zinc-800 text-zinc-400 font-mono"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* Footer link */}
      <div className="p-6 pt-0">
        <button
          onClick={() => onOpenModal(project)}
          className="inline-flex items-center gap-2 text-sm font-semibold text-zinc-300 group-hover:text-purple-300 transition-colors focus:outline-none focus:underline"
        >
          <span>View Project</span>
          <ArrowRight className="w-4 h-4 transform group-hover:translate-x-1.5 transition-transform text-purple-400" />
        </button>
      </div>
    </div>
  );
}
