import React from 'react';
import SectionHeading from './SectionHeading';
import ContactForm from './ContactForm';
import ContactInfo from './ContactInfo';

export default function Contact({ preselectedService, onStartProject }) {
  const coveredAreas = [
    "Website Engineering",
    "Branding & Logo Systems",
    "Video Production & Editing",
    "Social Media Strategy",
    "Paid Ad Campaigns",
    "Event Promotion & Execution"
  ];

  return (
    <section id="contact" className="py-20 md:py-32 relative bg-[#040407] border-t border-zinc-800/80">
      {/* Background ambient glow */}
      <div className="absolute top-1/4 right-1/4 w-[500px] h-[500px] bg-purple-950/20 rounded-full blur-[160px] pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading
          badge="Start A Project"
          title="Let's Build Something Serious."
          subtitle="Ready to transform your brand or digital presence? Reach out below."
        />

        {/* Introduction Context Pill Grid */}
        <div className="max-w-3xl mx-auto text-center mb-12 sm:mb-16">
          <p className="text-sm sm:text-base text-zinc-300 font-medium mb-4">
            We partner with ambitious founders, companies, and organizations across:
          </p>
          <div className="flex flex-wrap items-center justify-center gap-2">
            {coveredAreas.map((area, idx) => (
              <span
                key={idx}
                className="px-3.5 py-1 rounded-full text-xs font-medium bg-zinc-900 border border-zinc-800 text-zinc-300"
              >
                {area}
              </span>
            ))}
          </div>
        </div>

        {/* 2-Column Grid: Form & Leadership Contact Info */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-start">
          {/* Left Column: Form */}
          <div className="lg:col-span-7">
            <ContactForm
              preselectedService={preselectedService}
              onLaunchFullWizard={onStartProject}
            />
          </div>

          {/* Right Column: Founder Info & WhatsApp Direct Links */}
          <div className="lg:col-span-5">
            <ContactInfo />
          </div>
        </div>
      </div>
    </section>
  );
}
