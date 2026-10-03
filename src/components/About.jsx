import React from 'react';
import SectionHeading from './SectionHeading';
import TeamMember from './TeamMember';
import { Code, Compass, Users } from 'lucide-react';

export default function About() {
  return (
    <section id="about" className="py-20 md:py-32 relative">
      {/* Background ambient light */}
      <div className="absolute top-1/2 left-1/4 w-[500px] h-[500px] bg-purple-950/20 rounded-full blur-[160px] pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading
          badge="Who We Are"
          title="About UXpert"
          subtitle="Where creativity meets technology."
        />

        {/* Agency Mission / Overview narrative */}
        <div className="max-w-3xl mx-auto text-center mb-16">
          <p className="text-lg md:text-xl text-zinc-300 leading-relaxed font-normal">
            UXpert is a creative digital and media agency focused on helping businesses, brands and organizations build their digital presence. From web development and branding to video, social media, advertising and event management, our team brings different skills together to create complete solutions.
          </p>
        </div>

        {/* Leadership Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8 max-w-4xl mx-auto">
          {/* Founder */}
          <TeamMember
            name="Prem N Mahendrakar"
            title="Founder"
            role="Web Development"
            description="Leading UXpert with a focus on technology, digital solutions and business development."
            icon={Code}
          />

          {/* Co-Founder */}
          <TeamMember
            name="Raju Gumadal"
            title="Co-Founder"
            role="Co-Founder"
            description="Supporting UXpert's creative direction, operations and project execution."
            icon={Compass}
          />
        </div>

        {/* Team Banner */}
        <div className="mt-8 max-w-4xl mx-auto">
          <div className="p-6 rounded-2xl bg-[#09090E] border border-zinc-800/80 flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-purple-950/60 border border-purple-800/40 flex items-center justify-center text-purple-400 shrink-0">
                <Users className="w-5 h-5" />
              </div>
              <div>
                <p className="text-sm font-semibold text-white">
                  Extended Agency Capabilities
                </p>
                <p className="text-xs text-zinc-400">
                  Supported by a team of 4 creative and technical professionals.
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-mono bg-zinc-900 border border-zinc-800 text-zinc-300">
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                Cross-Functional Execution
              </span>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}
