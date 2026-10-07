import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  X,
  CheckCircle2,
  ArrowRight,
  ArrowLeft,
  Code2,
  Film,
  Palette,
  Share2,
  Target,
  Sparkles,
  Layers,
  Building2,
  User,
  Mail,
  Phone,
  MessageCircle,
  MapPin,
  Send,
  Loader2,
  Sparkle
} from 'lucide-react';
import confetti from 'canvas-confetti';

export default function ProjectRegistrationModal({ isOpen, onClose, initialService = '' }) {
  const [step, setStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [requestId, setRequestId] = useState('');
  const [errors, setErrors] = useState({});

  const [formData, setFormData] = useState({
    name: '',
    organization: '',
    email: '',
    phone: '',
    whatsapp: '',
    city: '',
    services: initialService ? [initialService] : ['Web Development'],
    description: '',
    requirements: '',
    budget: '₹25,000 – ₹50,000',
    timeline: 'Within 2-4 Weeks',
    communication: 'WhatsApp'
  });

  const availableServices = [
    { id: 'Web Development', icon: Code2, desc: 'High performance web apps & portals' },
    { id: 'Video Editing', icon: Film, desc: 'Cinematic reels, promos & edits' },
    { id: 'Graphic Design', icon: Palette, desc: 'Marketing visuals & brand assets' },
    { id: 'Logo & Brand Design', icon: Layers, desc: 'Complete brand identity & logos' },
    { id: 'Social Media Management', icon: Share2, desc: 'Content strategy & management' },
    { id: 'Ad Management', icon: Target, desc: 'Paid ads performance & conversion' },
    { id: 'Event Management', icon: Sparkles, desc: 'End-to-end event planning & promo' },
    { id: 'Other', icon: Sparkle, desc: 'Custom digital or creative request' }
  ];

  const budgetRanges = [
    'Under ₹25,000',
    '₹25,000 – ₹50,000',
    '₹50,000 – ₹1,00,000',
    '₹1,00,000+'
  ];

  const timelineOptions = [
    'Urgent (< 1 Week)',
    'Within 2-4 Weeks',
    '1-2 Months',
    'Flexible Schedule'
  ];

  const communicationOptions = ['WhatsApp', 'Email', 'Phone Call'];

  const toggleService = (serviceId) => {
    setFormData((prev) => {
      const exists = prev.services.includes(serviceId);
      let updated;
      if (exists) {
        updated = prev.services.filter((s) => s !== serviceId);
      } else {
        updated = [...prev.services, serviceId];
      }
      return { ...prev, services: updated.length > 0 ? updated : ['Web Development'] };
    });
  };

  const validateStep = (currentStep) => {
    const errs = {};
    if (currentStep === 1) {
      if (!formData.name.trim()) errs.name = 'Full name is required';
      if (!formData.email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
        errs.email = 'Valid email is required';
      }
      if (!formData.phone.trim()) errs.phone = 'Phone number is required';
    } else if (currentStep === 2) {
      if (formData.services.length === 0) errs.services = 'Select at least one service';
    } else if (currentStep === 3) {
      if (!formData.description.trim() || formData.description.trim().length < 10) {
        errs.description = 'Please provide a brief description (at least 10 characters)';
      }
    }
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleNext = () => {
    if (validateStep(step)) {
      setStep((prev) => Math.min(prev + 1, 5));
    }
  };

  const handleBack = () => {
    setStep((prev) => Math.max(prev - 1, 1));
  };

  const handleSubmit = async (e) => {
    if (e) e.preventDefault();
    if (!validateStep(3)) return;

    setIsSubmitting(true);
    setErrors({});

    const newRequestId = `UXP-${Math.floor(100000 + Math.random() * 900000)}`;

    const payload = {
      name: formData.name,
      organization: formData.organization,
      email: formData.email,
      phone: formData.phone,
      whatsapp: formData.whatsapp || formData.phone,
      city: formData.city,
      service: formData.services.join(', '),
      description: formData.description,
      requirements: formData.requirements,
      budget: formData.budget,
      timeline: formData.timeline,
      communication: formData.communication,
      requestId: newRequestId,
      createdAt: new Date().toISOString()
    };

    try {
      // Try submitting to Netlify serverless function or Express backend API
      let res = await fetch('/.netlify/functions/submit-enquiry', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      }).catch(() => null);

      if (!res || !res.ok) {
        res = await fetch('/api/enquiries', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload)
        }).catch(() => null);
      }

      setRequestId(newRequestId);
      setIsSubmitted(true);

      // Trigger Confetti
      try {
        confetti({
          particleCount: 75,
          spread: 70,
          origin: { y: 0.6 },
          colors: ['#8B5CF6', '#A855F7', '#EC4899', '#FFFFFF']
        });
      } catch {
        // silent fallback
      }
    } catch (err) {
      console.error('Submission error:', err);
      // Even on connection fallback, allow client to finish with WhatsApp fallback payload
      setRequestId(newRequestId);
      setIsSubmitted(true);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleReset = () => {
    setStep(1);
    setIsSubmitted(false);
    setFormData({
      name: '',
      organization: '',
      email: '',
      phone: '',
      whatsapp: '',
      city: '',
      services: ['Web Development'],
      description: '',
      requirements: '',
      budget: '₹25,000 – ₹50,000',
      timeline: 'Within 2-4 Weeks',
      communication: 'WhatsApp'
    });
    onClose();
  };

  if (!isOpen) return null;

  const generateWhatsAppMessage = () => {
    const text = `*New Project Request [${requestId || 'UXP'}]*\n\n` +
      `*Name:* ${formData.name}\n` +
      `*Company:* ${formData.organization || 'Individual'}\n` +
      `*Services:* ${formData.services.join(', ')}\n` +
      `*Budget:* ${formData.budget}\n` +
      `*Timeline:* ${formData.timeline}\n` +
      `*Phone:* ${formData.phone}\n` +
      `*Email:* ${formData.email}\n` +
      `*City:* ${formData.city || 'N/A'}\n\n` +
      `*Description:*\n${formData.description}`;
    return encodeURIComponent(text);
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={handleReset}
          className="fixed inset-0 bg-black/80 backdrop-blur-md"
        />

        {/* Modal Container */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          className="relative w-full max-w-2xl bg-[#09090F] border border-purple-500/30 rounded-3xl shadow-purple-glow-lg overflow-hidden z-10"
        >
          {/* Header */}
          <div className="px-6 py-5 border-b border-zinc-800/80 flex items-center justify-between bg-zinc-950/60">
            <div>
              <span className="text-[11px] font-mono uppercase tracking-widest text-purple-400 font-bold">
                Start a Project with UX_PERT
              </span>
              <h2 className="text-lg sm:text-xl font-bold text-white tracking-tight">
                {isSubmitted ? 'Project Request Confirmed' : `Step ${step} of 5 — ${
                  step === 1 ? 'Client Information' :
                  step === 2 ? 'Select Services' :
                  step === 3 ? 'Project Description' :
                  step === 4 ? 'Budget & Timeline' : 'Review & Submit'
                }`}
              </h2>
            </div>

            <button
              onClick={handleReset}
              className="p-2 rounded-full text-zinc-400 hover:text-white bg-zinc-900 hover:bg-zinc-800 border border-zinc-800 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Progress Bar */}
          {!isSubmitted && (
            <div className="w-full bg-zinc-900 h-1">
              <div
                className="bg-gradient-to-r from-purple-600 to-indigo-500 h-1 transition-all duration-300"
                style={{ width: `${(step / 5) * 100}%` }}
              />
            </div>
          )}

          {/* Content Body */}
          <div className="p-6 sm:p-8 max-h-[75vh] overflow-y-auto">
            {isSubmitted ? (
              <div className="text-center py-4 space-y-6">
                <div className="w-16 h-16 rounded-2xl bg-purple-950/60 border border-purple-500/50 flex items-center justify-center mx-auto text-purple-400 shadow-purple-glow-sm">
                  <CheckCircle2 className="w-9 h-9" />
                </div>

                <div>
                  <span className="inline-block px-3 py-1 rounded-full bg-purple-900/40 border border-purple-500/30 text-purple-300 font-mono text-xs font-semibold mb-2">
                    Reference ID: {requestId}
                  </span>
                  <h3 className="text-2xl sm:text-3xl font-extrabold text-white">
                    Project Request Received!
                  </h3>
                  <p className="mt-2 text-sm text-zinc-300 max-w-md mx-auto leading-relaxed">
                    Thank you, <span className="text-white font-semibold">{formData.name}</span>. Our team at UX_PERT will review your project requirements and get back to you shortly.
                  </p>
                </div>

                <div className="p-5 rounded-2xl bg-[#0D0D14] border border-zinc-800 text-left space-y-3 text-xs sm:text-sm">
                  <div className="flex justify-between border-b border-zinc-800 pb-2">
                    <span className="text-zinc-400">Services:</span>
                    <span className="text-purple-300 font-semibold">{formData.services.join(', ')}</span>
                  </div>
                  <div className="flex justify-between border-b border-zinc-800 pb-2">
                    <span className="text-zinc-400">Budget Range:</span>
                    <span className="text-white font-semibold">{formData.budget}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-zinc-400">Target Timeline:</span>
                    <span className="text-white font-semibold">{formData.timeline}</span>
                  </div>
                </div>

                {/* Direct Action CTAs */}
                <div className="flex flex-col sm:flex-row items-center gap-3 pt-2">
                  <a
                    href={`https://wa.me/917899422316?text=${generateWhatsAppMessage()}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full sm:w-1/2 flex items-center justify-center gap-2 px-5 py-3.5 rounded-xl bg-[#25D366] hover:bg-[#20bd5a] text-white font-bold text-sm shadow-lg transition-colors"
                  >
                    <MessageCircle className="w-4 h-4 fill-white/20" />
                    <span>Send details on WhatsApp</span>
                  </a>

                  <button
                    onClick={handleReset}
                    className="w-full sm:w-1/2 px-5 py-3.5 rounded-xl bg-zinc-900 hover:bg-zinc-800 border border-zinc-800 text-zinc-200 hover:text-white text-sm font-semibold transition-colors"
                  >
                    Close Window
                  </button>
                </div>
              </div>
            ) : (
              <div>
                {/* Step 1: Client Information */}
                {step === 1 && (
                  <div className="space-y-4">
                    <p className="text-xs text-purple-400 font-semibold uppercase tracking-wider">
                      Let's get to know you
                    </p>

                    <div>
                      <label className="block text-xs font-semibold text-zinc-300 mb-1">
                        Full Name <span className="text-purple-400">*</span>
                      </label>
                      <div className="relative">
                        <User className="w-4 h-4 text-zinc-500 absolute left-3.5 top-3.5" />
                        <input
                          type="text"
                          value={formData.name}
                          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                          placeholder="e.g. Alex Rivera"
                          className="w-full pl-10 pr-4 py-3 rounded-xl bg-zinc-900/80 border border-zinc-800 text-white text-sm focus:outline-none focus:border-purple-500"
                        />
                      </div>
                      {errors.name && <p className="text-xs text-red-400 mt-1">{errors.name}</p>}
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs font-semibold text-zinc-300 mb-1">
                          Company / Business Name
                        </label>
                        <div className="relative">
                          <Building2 className="w-4 h-4 text-zinc-500 absolute left-3.5 top-3.5" />
                          <input
                            type="text"
                            value={formData.organization}
                            onChange={(e) => setFormData({ ...formData, organization: e.target.value })}
                            placeholder="e.g. Acme Agency"
                            className="w-full pl-10 pr-4 py-3 rounded-xl bg-zinc-900/80 border border-zinc-800 text-white text-sm focus:outline-none focus:border-purple-500"
                          />
                        </div>
                      </div>

                      <div>
                        <label className="block text-xs font-semibold text-zinc-300 mb-1">
                          City / Location
                        </label>
                        <div className="relative">
                          <MapPin className="w-4 h-4 text-zinc-500 absolute left-3.5 top-3.5" />
                          <input
                            type="text"
                            value={formData.city}
                            onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                            placeholder="e.g. Mumbai, Bangalore, Remote"
                            className="w-full pl-10 pr-4 py-3 rounded-xl bg-zinc-900/80 border border-zinc-800 text-white text-sm focus:outline-none focus:border-purple-500"
                          />
                        </div>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs font-semibold text-zinc-300 mb-1">
                          Email Address <span className="text-purple-400">*</span>
                        </label>
                        <div className="relative">
                          <Mail className="w-4 h-4 text-zinc-500 absolute left-3.5 top-3.5" />
                          <input
                            type="email"
                            value={formData.email}
                            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                            placeholder="alex@company.com"
                            className="w-full pl-10 pr-4 py-3 rounded-xl bg-zinc-900/80 border border-zinc-800 text-white text-sm focus:outline-none focus:border-purple-500"
                          />
                        </div>
                        {errors.email && <p className="text-xs text-red-400 mt-1">{errors.email}</p>}
                      </div>

                      <div>
                        <label className="block text-xs font-semibold text-zinc-300 mb-1">
                          Phone / WhatsApp <span className="text-purple-400">*</span>
                        </label>
                        <div className="relative">
                          <Phone className="w-4 h-4 text-zinc-500 absolute left-3.5 top-3.5" />
                          <input
                            type="tel"
                            value={formData.phone}
                            onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                            placeholder="+91 00000 00000"
                            className="w-full pl-10 pr-4 py-3 rounded-xl bg-zinc-900/80 border border-zinc-800 text-white text-sm focus:outline-none focus:border-purple-500"
                          />
                        </div>
                        {errors.phone && <p className="text-xs text-red-400 mt-1">{errors.phone}</p>}
                      </div>
                    </div>
                  </div>
                )}

                {/* Step 2: Select Services */}
                {step === 2 && (
                  <div className="space-y-4">
                    <p className="text-xs text-purple-400 font-semibold uppercase tracking-wider">
                      Select required services (Multiple allowed)
                    </p>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      {availableServices.map((srv) => {
                        const isSelected = formData.services.includes(srv.id);
                        const Icon = srv.icon;
                        return (
                          <div
                            key={srv.id}
                            onClick={() => toggleService(srv.id)}
                            className={`p-4 rounded-2xl border cursor-pointer transition-all duration-200 flex items-start gap-3 ${
                              isSelected
                                ? 'bg-purple-950/40 border-purple-500 shadow-purple-glow-sm'
                                : 'bg-zinc-900/60 border-zinc-800 hover:border-zinc-700'
                            }`}
                          >
                            <div className={`p-2 rounded-xl border shrink-0 ${
                              isSelected ? 'bg-purple-600 border-purple-400 text-white' : 'bg-zinc-800 border-zinc-700 text-purple-400'
                            }`}>
                              <Icon className="w-4 h-4" />
                            </div>

                            <div className="flex-1 min-w-0">
                              <p className={`text-sm font-bold ${isSelected ? 'text-white' : 'text-zinc-200'}`}>
                                {srv.id}
                              </p>
                              <p className="text-xs text-zinc-400 truncate">
                                {srv.desc}
                              </p>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                    {errors.services && <p className="text-xs text-red-400">{errors.services}</p>}
                  </div>
                )}

                {/* Step 3: Project Scope */}
                {step === 3 && (
                  <div className="space-y-4">
                    <p className="text-xs text-purple-400 font-semibold uppercase tracking-wider">
                      Tell us about your project
                    </p>

                    <div>
                      <label className="block text-xs font-semibold text-zinc-300 mb-1">
                        Project Description & Core Objectives <span className="text-purple-400">*</span>
                      </label>
                      <textarea
                        rows="4"
                        value={formData.description}
                        onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                        placeholder="Describe what you want to build, design, promote or manage. What are your main goals?"
                        className="w-full p-4 rounded-xl bg-zinc-900/80 border border-zinc-800 text-white text-sm focus:outline-none focus:border-purple-500 resize-none"
                      />
                      {errors.description && <p className="text-xs text-red-400 mt-1">{errors.description}</p>}
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-zinc-300 mb-1">
                        Specific Requirements or References (Optional)
                      </label>
                      <textarea
                        rows="2"
                        value={formData.requirements}
                        onChange={(e) => setFormData({ ...formData, requirements: e.target.value })}
                        placeholder="Reference websites, inspiration links, specific features or deadline constraints..."
                        className="w-full p-4 rounded-xl bg-zinc-900/80 border border-zinc-800 text-white text-sm focus:outline-none focus:border-purple-500 resize-none"
                      />
                    </div>
                  </div>
                )}

                {/* Step 4: Budget & Timeline */}
                {step === 4 && (
                  <div className="space-y-6">
                    <div>
                      <label className="block text-xs font-semibold text-purple-400 uppercase tracking-wider mb-2">
                        Estimated Budget Range
                      </label>
                      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                        {budgetRanges.map((b) => (
                          <button
                            key={b}
                            type="button"
                            onClick={() => setFormData({ ...formData, budget: b })}
                            className={`p-3 rounded-xl border text-xs font-semibold text-center transition-all ${
                              formData.budget === b
                                ? 'bg-purple-600 border-purple-400 text-white shadow-purple-glow-sm'
                                : 'bg-zinc-900 border-zinc-800 text-zinc-300 hover:border-zinc-700'
                            }`}
                          >
                            {b}
                          </button>
                        ))}
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-purple-400 uppercase tracking-wider mb-2">
                        Preferred Timeline
                      </label>
                      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                        {timelineOptions.map((t) => (
                          <button
                            key={t}
                            type="button"
                            onClick={() => setFormData({ ...formData, timeline: t })}
                            className={`p-3 rounded-xl border text-xs font-semibold text-center transition-all ${
                              formData.timeline === t
                                ? 'bg-purple-600 border-purple-400 text-white shadow-purple-glow-sm'
                                : 'bg-zinc-900 border-zinc-800 text-zinc-300 hover:border-zinc-700'
                            }`}
                          >
                            {t}
                          </button>
                        ))}
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-purple-400 uppercase tracking-wider mb-2">
                        Preferred Contact Method
                      </label>
                      <div className="grid grid-cols-3 gap-2">
                        {communicationOptions.map((c) => (
                          <button
                            key={c}
                            type="button"
                            onClick={() => setFormData({ ...formData, communication: c })}
                            className={`p-3 rounded-xl border text-xs font-semibold text-center transition-all ${
                              formData.communication === c
                                ? 'bg-purple-600 border-purple-400 text-white'
                                : 'bg-zinc-900 border-zinc-800 text-zinc-300 hover:border-zinc-700'
                            }`}
                          >
                            {c}
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>
                )}

                {/* Step 5: Review & Submit */}
                {step === 5 && (
                  <div className="space-y-4">
                    <p className="text-xs text-purple-400 font-semibold uppercase tracking-wider">
                      Review your project summary
                    </p>

                    <div className="p-5 rounded-2xl bg-zinc-950 border border-zinc-800 space-y-3 text-xs sm:text-sm">
                      <div className="grid grid-cols-2 gap-2 border-b border-zinc-800 pb-3">
                        <div>
                          <span className="text-zinc-400 block text-[11px]">Client Name:</span>
                          <span className="font-semibold text-white">{formData.name}</span>
                        </div>
                        <div>
                          <span className="text-zinc-400 block text-[11px]">Company / Business:</span>
                          <span className="font-semibold text-white">{formData.organization || 'Individual'}</span>
                        </div>
                      </div>

                      <div className="grid grid-cols-2 gap-2 border-b border-zinc-800 pb-3">
                        <div>
                          <span className="text-zinc-400 block text-[11px]">Email Address:</span>
                          <span className="font-semibold text-purple-300">{formData.email}</span>
                        </div>
                        <div>
                          <span className="text-zinc-400 block text-[11px]">Phone / WhatsApp:</span>
                          <span className="font-semibold text-white">{formData.phone}</span>
                        </div>
                      </div>

                      <div className="border-b border-zinc-800 pb-3">
                        <span className="text-zinc-400 block text-[11px]">Selected Services:</span>
                        <span className="font-semibold text-purple-300">{formData.services.join(', ')}</span>
                      </div>

                      <div className="grid grid-cols-2 gap-2 border-b border-zinc-800 pb-3">
                        <div>
                          <span className="text-zinc-400 block text-[11px]">Budget Range:</span>
                          <span className="font-semibold text-white">{formData.budget}</span>
                        </div>
                        <div>
                          <span className="text-zinc-400 block text-[11px]">Timeline:</span>
                          <span className="font-semibold text-white">{formData.timeline}</span>
                        </div>
                      </div>

                      <div>
                        <span className="text-zinc-400 block text-[11px]">Description:</span>
                        <p className="text-zinc-200 mt-1 whitespace-pre-wrap leading-relaxed">{formData.description}</p>
                      </div>
                    </div>
                  </div>
                )}

                {/* Footer Controls */}
                <div className="mt-8 pt-4 border-t border-zinc-800/80 flex items-center justify-between">
                  {step > 1 ? (
                    <button
                      type="button"
                      onClick={handleBack}
                      className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-zinc-900 hover:bg-zinc-800 text-zinc-300 text-xs sm:text-sm font-semibold transition-colors"
                    >
                      <ArrowLeft className="w-4 h-4" />
                      <span>Back</span>
                    </button>
                  ) : <div />}

                  {step < 5 ? (
                    <button
                      type="button"
                      onClick={handleNext}
                      className="flex items-center gap-2 px-6 py-3 rounded-xl bg-purple-600 hover:bg-purple-500 text-white text-xs sm:text-sm font-bold shadow-purple-glow-sm transition-all"
                    >
                      <span>Continue</span>
                      <ArrowRight className="w-4 h-4" />
                    </button>
                  ) : (
                    <button
                      type="button"
                      onClick={handleSubmit}
                      disabled={isSubmitting}
                      className="flex items-center gap-2 px-8 py-3.5 rounded-xl bg-purple-600 hover:bg-purple-500 text-white text-sm font-bold shadow-purple-glow hover:shadow-purple-glow-lg transition-all disabled:opacity-50"
                    >
                      {isSubmitting ? (
                        <>
                          <Loader2 className="w-4 h-4 animate-spin" />
                          <span>Submitting...</span>
                        </>
                      ) : (
                        <>
                          <Send className="w-4 h-4" />
                          <span>Submit Project Request</span>
                        </>
                      )}
                    </button>
                  )}
                </div>
              </div>
            )}
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
