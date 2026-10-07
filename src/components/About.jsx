import React from 'react';
import SectionHeading from './SectionHeading';
import TeamMember from './TeamMember';
import AgencyStatsDashboard from './AgencyStatsDashboard';
import { Code, Compass } from 'lucide-react';

export default function About() {
  return (
    <section id="about" className="py-20 md:py-32 relative">
      {/* Background ambient light */}
      <div className="absolute top-1/2 left-1/4 w-[500px] h-[500px] bg-purple-950/20 rounded-full blur-[160px] pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading
          badge="Who We Are"
          title="About UX_PERT"
          subtitle="Where strategic thinking meets modern digital execution."
        />

        {/* Agency Overview Narrative */}
        <div className="max-w-3xl mx-auto text-center mb-16">
          <p className="text-lg md:text-xl text-zinc-300 leading-relaxed font-normal">
            UX_PERT is a modern digital & media agency built to deliver complete end-to-end digital solutions. From custom web engineering and brand identities to video production, social media growth, targeted paid advertising, and live event management — we combine engineering precision with visual excellence.
          </p>
        </div>

        {/* Leadership Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8 max-w-4xl mx-auto">
          {/* Founder */}
          <TeamMember
            name="Prem N Mahendrakar"
            title="Founder"
            role="Technology & Web Development"
            description="Leading UX_PERT's technical engineering, digital platform architecture, and strategic growth."
            phone="+91 7899422316"
            waLink="https://wa.me/917899422316?text=Hi%20Prem,%20I'd%20like%20to%20discuss%20a%20project%20with%20UX_PERT."
            icon={Code}
          />

          {/* Co-Founder */}
          <TeamMember
            name="Raju Gumadal"
            title="Co-Founder"
            role="Creative Direction & Operations"
            description="Directing UX_PERT's creative media output, brand strategy, and multi-channel production execution."
            phone="+91 8431487497"
            waLink="https://wa.me/918431487497?text=Hi%20Raju,%20I'd%20like%20to%20discuss%20a%20project%20with%20UX_PERT."
            icon={Compass}
          />
        </div>

        {/* Agency Command Stats Dashboard */}
        <div className="mt-16">
          <AgencyStatsDashboard />
        </div>

      </div>
    </section>
  );
}
