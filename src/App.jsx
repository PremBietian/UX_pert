import React, { useState, useEffect } from 'react';
import CustomCursor from './components/CustomCursor';
import FloatingWhatsApp from './components/FloatingWhatsApp';
import ProjectRegistrationModal from './components/ProjectRegistrationModal';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Services from './components/Services';
import WhyUXpert from './components/WhyUXpert';
import OurWork from './components/OurWork';
import Process from './components/Process';
import About from './components/About';
import Contact from './components/Contact';
import FinalCTA from './components/FinalCTA';
import Footer from './components/Footer';
import LegalModal from './components/LegalModal';

export default function App() {
  const [activeSection, setActiveSection] = useState('home');
  const [preselectedService, setPreselectedService] = useState('Web Development');
  const [isProjectWizardOpen, setIsProjectWizardOpen] = useState(false);
  const [wizardService, setWizardService] = useState('');
  const [legalModal, setLegalModal] = useState({ isOpen: false, type: 'privacy' });

  // Smooth scroll handler
  const handleNavigate = (targetId) => {
    const cleanId = targetId.replace('#', '');
    const element = document.getElementById(cleanId);
    if (element) {
      const navOffset = 80;
      const elementPosition = element.getBoundingClientRect().top + window.scrollY;
      window.scrollTo({
        top: elementPosition - navOffset,
        behavior: 'smooth'
      });
      setActiveSection(cleanId);
    }
  };

  // Scrollspy to update active navigation item
  useEffect(() => {
    const sectionIds = ['home', 'services', 'work', 'process', 'about', 'contact'];
    
    const handleScroll = () => {
      const scrollPosition = window.scrollY + 200;

      for (let i = sectionIds.length - 1; i >= 0; i--) {
        const id = sectionIds[i];
        const element = document.getElementById(id);
        if (element) {
          const top = element.offsetTop;
          if (scrollPosition >= top) {
            setActiveSection(id);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleStartProject = (serviceName = '') => {
    setWizardService(serviceName);
    setIsProjectWizardOpen(true);
  };

  const handleSelectService = (serviceTitle) => {
    setPreselectedService(serviceTitle);
    handleStartProject(serviceTitle);
  };

  const handleOpenLegal = (type) => {
    setLegalModal({ isOpen: true, type });
  };

  const handleCloseLegal = () => {
    setLegalModal((prev) => ({ ...prev, isOpen: false }));
  };

  return (
    <div className="min-h-screen bg-[#030305] text-white selection:bg-purple-600/30 selection:text-purple-200 relative">
      {/* Subtle Custom Ambient Cursor */}
      <CustomCursor />

      {/* Floating Action WhatsApp Badge */}
      <FloatingWhatsApp />

      {/* Global 5-Step Project Registration Wizard Modal */}
      <ProjectRegistrationModal
        isOpen={isProjectWizardOpen}
        onClose={() => setIsProjectWizardOpen(false)}
        initialService={wizardService}
      />

      {/* Top Navbar */}
      <Navbar
        activeSection={activeSection}
        onNavigate={handleNavigate}
        onStartProject={handleStartProject}
      />

      {/* Main Content Sections */}
      <main>
        {/* Hero Section */}
        <Hero
          onStartProject={handleStartProject}
          onNavigate={handleNavigate}
        />

        {/* Services Section */}
        <Services
          onSelectService={handleSelectService}
        />

        {/* Why UXpert Section */}
        <WhyUXpert />

        {/* Our Work / Selected Work Section */}
        <OurWork
          onEnquireService={handleSelectService}
        />

        {/* Process Section */}
        <Process />

        {/* About Section */}
        <About />

        {/* Contact Section */}
        <Contact
          preselectedService={preselectedService}
          onStartProject={handleStartProject}
        />

        {/* Final CTA Banner */}
        <FinalCTA
          onStartProject={handleStartProject}
        />
      </main>

      {/* Footer */}
      <Footer
        onNavigate={handleNavigate}
        onOpenLegal={handleOpenLegal}
        onSelectService={handleSelectService}
      />

      {/* Privacy Policy & Terms Modal */}
      <LegalModal
        isOpen={legalModal.isOpen}
        onClose={handleCloseLegal}
        type={legalModal.type}
      />
    </div>
  );
}
