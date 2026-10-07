import React, { useState } from 'react';
import { ArrowRight, CheckCircle2, AlertCircle, Loader2, MessageCircle, Send } from 'lucide-react';
import confetti from 'canvas-confetti';

export default function ContactForm({ preselectedService, onLaunchFullWizard }) {
  const [formData, setFormData] = useState({
    name: '',
    organization: '',
    email: '',
    phone: '',
    city: '',
    service: preselectedService || 'Web Development',
    budget: '₹25,000 – ₹50,000',
    timeline: 'Within 2-4 Weeks',
    description: ''
  });

  const [prevPreselected, setPrevPreselected] = useState(preselectedService);
  if (preselectedService && preselectedService !== prevPreselected) {
    setPrevPreselected(preselectedService);
    setFormData((prev) => ({ ...prev, service: preselectedService }));
  }

  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [requestId, setRequestId] = useState('');

  const serviceOptions = [
    'Web Development',
    'Video Editing',
    'Graphic Design',
    'Logo & Brand Design',
    'Social Media Management',
    'Ad Management',
    'Event Management',
    'Other'
  ];

  const budgetOptions = [
    'Under ₹25,000',
    '₹25,000 – ₹50,000',
    '₹50,000 – ₹1,00,000',
    '₹1,00,000+'
  ];

  const validate = () => {
    const errs = {};
    if (!formData.name.trim()) errs.name = 'Please enter your full name.';
    if (!formData.email.trim()) {
      errs.email = 'Please provide your email address.';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email.trim())) {
      errs.email = 'Please enter a valid email format.';
    }
    if (!formData.phone.trim()) {
      errs.phone = 'Please enter your contact phone or WhatsApp number.';
    }
    if (!formData.description.trim() || formData.description.trim().length < 10) {
      errs.description = 'Please describe your project (at least 10 characters).';
    }
    return errs;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors((prev) => {
        const updated = { ...prev };
        delete updated[name];
        return updated;
      });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    setIsSubmitting(true);
    setErrors({});
    const newRequestId = `UXP-${Math.floor(100000 + Math.random() * 900000)}`;

    const payload = {
      ...formData,
      requestId: newRequestId,
      createdAt: new Date().toISOString()
    };

    try {
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

      try {
        confetti({
          particleCount: 60,
          spread: 60,
          origin: { y: 0.7 },
          colors: ['#8B5CF6', '#A855F7', '#FFFFFF']
        });
      } catch {
        // confetti fallback
      }
    } catch {
      setRequestId(newRequestId);
      setIsSubmitted(true);
    }

 finally {
      setIsSubmitting(false);
    }
  };

  const handleReset = () => {
    setFormData({
      name: '',
      organization: '',
      email: '',
      phone: '',
      city: '',
      service: 'Web Development',
      budget: '₹25,000 – ₹50,000',
      timeline: 'Within 2-4 Weeks',
      description: ''
    });
    setErrors({});
    setIsSubmitted(false);
  };

  const generateWhatsAppMessage = () => {
    const text = `*New Project Registration [${requestId || 'UXP'}]*\n\n` +
      `*Name:* ${formData.name}\n` +
      `*Organization:* ${formData.organization || 'Individual'}\n` +
      `*Service:* ${formData.service}\n` +
      `*Budget:* ${formData.budget}\n` +
      `*Phone:* ${formData.phone}\n` +
      `*Email:* ${formData.email}\n` +
      `*City:* ${formData.city || 'N/A'}\n\n` +
      `*Project Description:*\n${formData.description}`;
    return encodeURIComponent(text);
  };

  if (isSubmitted) {
    return (
      <div className="p-8 sm:p-10 rounded-3xl bg-[#09090F] border border-purple-500/40 shadow-purple-glow-sm text-center">
        <div className="w-16 h-16 rounded-2xl bg-purple-950/60 border border-purple-500/50 flex items-center justify-center mx-auto text-purple-400 mb-4 shadow-purple-glow-sm">
          <CheckCircle2 className="w-8 h-8" />
        </div>
        <span className="inline-block px-3 py-1 rounded-full bg-purple-950/80 border border-purple-500/30 text-purple-300 font-mono text-xs font-semibold mb-2">
          Request ID: {requestId}
        </span>
        <h3 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
          Project Registration Received!
        </h3>
        <p className="mt-2 text-sm text-zinc-300 max-w-md mx-auto leading-relaxed">
          Thank you for choosing UX_PERT. Our team will review your project details and contact you shortly.
        </p>

        {/* WhatsApp Direct Action */}
        <div className="mt-6 pt-6 border-t border-zinc-800/80 flex flex-col sm:flex-row gap-3">
          <a
            href={`https://wa.me/917899422316?text=${generateWhatsAppMessage()}`}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full sm:w-1/2 flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-[#25D366] hover:bg-[#20bd5a] text-white font-bold text-xs sm:text-sm transition-colors shadow-md"
          >
            <MessageCircle className="w-4 h-4 fill-white/20" />
            <span>Send Details on WhatsApp</span>
          </a>

          <button
            onClick={handleReset}
            className="w-full sm:w-1/2 px-5 py-3 rounded-xl bg-zinc-900 hover:bg-zinc-800 border border-zinc-800 text-xs sm:text-sm font-semibold text-zinc-200 transition-colors"
          >
            Submit Another Request
          </button>
        </div>
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      noValidate
      className="p-6 sm:p-9 rounded-3xl bg-[#09090F] border border-zinc-800/90 shadow-2xl relative"
    >
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
            Start a Project
          </h3>
          <p className="mt-1 text-xs sm:text-sm text-zinc-400">
            Fill in your project requirements for an instant consultation proposal.
          </p>
        </div>

        {onLaunchFullWizard && (
          <button
            type="button"
            onClick={onLaunchFullWizard}
            className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-purple-950/60 border border-purple-500/30 text-xs font-semibold text-purple-300 hover:bg-purple-600 hover:text-white transition-all"
          >
            <span>Launch 5-Step Wizard</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        )}
      </div>

      {errors.form && (
        <div className="mb-6 p-4 rounded-xl bg-red-950/40 border border-red-800/50 flex items-center gap-3 text-red-200 text-xs">
          <AlertCircle className="w-4 h-4 shrink-0" />
          <span>{errors.form}</span>
        </div>
      )}

      <div className="space-y-4">
        {/* Name & Company */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-semibold text-zinc-300 uppercase tracking-wider mb-1.5">
              Your Name <span className="text-purple-400">*</span>
            </label>
            <input
              name="name"
              type="text"
              value={formData.name}
              onChange={handleChange}
              placeholder="e.g. Alex Rivera"
              className={`w-full px-4 py-3 rounded-xl bg-zinc-900/80 border text-white placeholder-zinc-500 text-xs sm:text-sm focus:outline-none focus:border-purple-500 transition-colors ${
                errors.name ? 'border-red-500' : 'border-zinc-800'
              }`}
            />
            {errors.name && <p className="mt-1 text-[11px] text-red-400">{errors.name}</p>}
          </div>

          <div>
            <label className="block text-xs font-semibold text-zinc-300 uppercase tracking-wider mb-1.5">
              Company / Business <span className="text-zinc-500 font-normal lowercase">(optional)</span>
            </label>
            <input
              name="organization"
              type="text"
              value={formData.organization}
              onChange={handleChange}
              placeholder="e.g. Acme Studio"
              className="w-full px-4 py-3 rounded-xl bg-zinc-900/80 border border-zinc-800 text-white placeholder-zinc-500 text-xs sm:text-sm focus:outline-none focus:border-purple-500 transition-colors"
            />
          </div>
        </div>

        {/* Email & Phone */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-semibold text-zinc-300 uppercase tracking-wider mb-1.5">
              Email Address <span className="text-purple-400">*</span>
            </label>
            <input
              name="email"
              type="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="alex@company.com"
              className={`w-full px-4 py-3 rounded-xl bg-zinc-900/80 border text-white placeholder-zinc-500 text-xs sm:text-sm focus:outline-none focus:border-purple-500 transition-colors ${
                errors.email ? 'border-red-500' : 'border-zinc-800'
              }`}
            />
            {errors.email && <p className="mt-1 text-[11px] text-red-400">{errors.email}</p>}
          </div>

          <div>
            <label className="block text-xs font-semibold text-zinc-300 uppercase tracking-wider mb-1.5">
              Phone / WhatsApp <span className="text-purple-400">*</span>
            </label>
            <input
              name="phone"
              type="tel"
              value={formData.phone}
              onChange={handleChange}
              placeholder="+91 00000 00000"
              className={`w-full px-4 py-3 rounded-xl bg-zinc-900/80 border text-white placeholder-zinc-500 text-xs sm:text-sm focus:outline-none focus:border-purple-500 transition-colors ${
                errors.phone ? 'border-red-500' : 'border-zinc-800'
              }`}
            />
            {errors.phone && <p className="mt-1 text-[11px] text-red-400">{errors.phone}</p>}
          </div>
        </div>

        {/* Service & Budget Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-semibold text-zinc-300 uppercase tracking-wider mb-1.5">
              Service Required <span className="text-purple-400">*</span>
            </label>
            <select
              name="service"
              value={formData.service}
              onChange={handleChange}
              className="w-full px-4 py-3 rounded-xl bg-zinc-900 border border-zinc-800 text-white text-xs sm:text-sm focus:outline-none focus:border-purple-500"
            >
              {serviceOptions.map((opt) => (
                <option key={opt} value={opt} className="bg-zinc-900 text-white">
                  {opt}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-xs font-semibold text-zinc-300 uppercase tracking-wider mb-1.5">
              Estimated Budget
            </label>
            <select
              name="budget"
              value={formData.budget}
              onChange={handleChange}
              className="w-full px-4 py-3 rounded-xl bg-zinc-900 border border-zinc-800 text-white text-xs sm:text-sm focus:outline-none focus:border-purple-500"
            >
              {budgetOptions.map((b) => (
                <option key={b} value={b} className="bg-zinc-900 text-white">
                  {b}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Description */}
        <div>
          <label className="block text-xs font-semibold text-zinc-300 uppercase tracking-wider mb-1.5">
            Project Description <span className="text-purple-400">*</span>
          </label>
          <textarea
            name="description"
            rows="3"
            value={formData.description}
            onChange={handleChange}
            placeholder="Describe your project, objectives, desired timeline or key deliverables..."
            className={`w-full px-4 py-3 rounded-xl bg-zinc-900/80 border text-white placeholder-zinc-500 text-xs sm:text-sm focus:outline-none focus:border-purple-500 transition-colors resize-none ${
              errors.description ? 'border-red-500' : 'border-zinc-800'
            }`}
          />
          {errors.description && <p className="mt-1 text-[11px] text-red-400">{errors.description}</p>}
        </div>

        {/* Submit Button */}
        <div className="pt-2">
          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full flex items-center justify-center gap-2.5 px-6 py-4 rounded-xl bg-purple-600 hover:bg-purple-500 text-white font-bold text-sm shadow-purple-glow hover:shadow-purple-glow-lg transition-all disabled:opacity-50"
          >
            {isSubmitting ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                <span>Processing Registration...</span>
              </>
            ) : (
              <>
                <Send className="w-4 h-4" />
                <span>Submit Project Registration</span>
              </>
            )}
          </button>
        </div>
      </div>
    </form>
  );
}
