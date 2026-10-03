import React, { useState } from 'react';
import SectionHeading from './SectionHeading';
import PortfolioCard from './PortfolioCard';
import ProjectModal from './ProjectModal';
import { portfolioData } from '../data/portfolio';

export default function OurWork({ onEnquireService }) {
  const [selectedFilter, setSelectedFilter] = useState('All');
  const [activeModalProject, setActiveModalProject] = useState(null);

  const filterCategories = [
    'All',
    'Web Development',
    'Logo & Brand Design',
    'Video Editing',
    'Social Media Management',
    'Ad Management',
    'Event Management'
  ];

  const filteredProjects = selectedFilter === 'All'
    ? portfolioData
    : portfolioData.filter(p => p.category === selectedFilter);

  return (
    <section id="work" className="py-20 md:py-32 relative">
      {/* Background ambient lighting */}
      <div className="absolute top-1/3 right-0 w-[450px] h-[450px] bg-purple-900/10 rounded-full blur-[140px] pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading
          badge="Portfolio Showcase"
          title="Selected Work"
          subtitle="Ideas we've brought to life."
        />

        {/* Category Filter Tabs */}
        <div className="flex items-center justify-start sm:justify-center gap-2 overflow-x-auto pb-4 mb-10 no-scrollbar">
          {filterCategories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedFilter(cat)}
              className={`px-4 py-2 rounded-full text-xs font-semibold whitespace-nowrap transition-all ${
                selectedFilter === cat
                  ? 'bg-purple-600 text-white shadow-purple-glow-sm border border-purple-500'
                  : 'bg-zinc-900/80 text-zinc-400 hover:text-white border border-zinc-800 hover:border-zinc-700'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {filteredProjects.map((project) => (
            <PortfolioCard
              key={project.id}
              project={project}
              onOpenModal={(proj) => setActiveModalProject(proj)}
            />
          ))}
        </div>

        {/* Notice on concept work */}
        <div className="mt-12 text-center">
          <p className="text-xs text-zinc-500 max-w-lg mx-auto">
            * Showcase pieces represent agency concept demonstrations and technical blueprints designed by UXpert to illustrate execution standards.
          </p>
        </div>
      </div>

      {/* Interactive Project Modal */}
      <ProjectModal
        isOpen={Boolean(activeModalProject)}
        project={activeModalProject}
        onClose={() => setActiveModalProject(null)}
        onEnquire={(category) => {
          onEnquireService(category);
        }}
      />
    </section>
  );
}
