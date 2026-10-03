import React from 'react';
import SectionHeading from './SectionHeading';
import ServiceCard from './ServiceCard';
import { servicesData } from '../data/services';

export default function Services({ onSelectService }) {
  return (
    <section id="services" className="py-20 md:py-32 relative">
      {/* Subtle background ambient light */}
      <div className="absolute top-1/2 left-0 w-96 h-96 bg-purple-950/20 rounded-full blur-[140px] pointer-events-none -z-10" />
      <div className="absolute bottom-10 right-0 w-80 h-80 bg-indigo-950/20 rounded-full blur-[120px] pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading
          badge="Core Services"
          title="What We Do"
          subtitle="Everything you need to build, present and grow your digital presence."
        />

        {/* 6 Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {servicesData.map((service) => (
            <ServiceCard
              key={service.id}
              service={service}
              onSelectService={onSelectService}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
