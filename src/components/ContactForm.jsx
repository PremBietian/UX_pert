import React, { useState } from 'react';
import { ArrowRight, CheckCircle2, AlertCircle, Loader2 } from 'lucide-react';
import confetti from 'canvas-confetti';

export default function ContactForm({ preselectedService }) {
  const [formData, setFormData] = useState({
    name: '',
    organization: '',
    email: '',
    phone: '',
    service: preselectedService || 'Web Development',
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

  const serviceOptions = [
    'Web Development',
    'Video Editing',
    'Logo & Brand Design',
    'Social Media Management',
    'Ad Management',
    'Event Management',
    'Other'
  ];

  const validate = () => {
    const errs = {};
    if (!formData.name.trim()) {
      errs.name = 'Please provide your full name.';
    }
    
    if (!formData.email.trim()) {
      errs.email = 'Please provide an email address.';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email.trim())) {
      errs.email = 'Please enter a valid email format (e.g. name@domain.com).';
    }

    if (!formData.phone.trim()) {
      errs.phone = 'Please provide a contact phone or WhatsApp number.';
    } else if (formData.phone.replace(/[^0-9]/g, '').length < 7) {
      errs.phone = 'Please enter a valid phone number.';
    }

    if (!formData.service) {
      errs.service = 'Please select a service.';
    }

    if (!formData.description.trim()) {
      errs.description = 'Please provide a brief description of your project.';
    } else if (formData.description.trim().length < 10) {
      errs.description = 'Description should be at least 10 characters long.';
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

    try {
      const response = await fetch('/api/enquiries', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const result = await response.json().catch(() => null);

      if (!response.ok) {
        if (response.status === 400 && result?.errors) {
          setErrors(result.errors);
          return;
        }
        if (response.status === 429) {
          setErrors({
            form: result?.message || 'Too many submissions. Please wait a few minutes or reach out via WhatsApp.'
          });
          return;
        }
        throw new Error(result?.message || 'Failed to submit enquiry. Please try again.');
      }

      setIsSubmitted(true);
      
      // Trigger subtle celebration confetti
      try {
        confetti({
          particleCount: 50,
          spread: 60,
          origin: { y: 0.7 },
          colors: ['#8B5CF6', '#A855F7', '#FFFFFF']
        });
      } catch {
        // confetti fallback silent
      }
    } catch (err) {
      setErrors({
        form: err.message || 'An unexpected error occurred. Please contact our founders directly via WhatsApp or phone.'
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleReset = () => {
    setFormData({
      name: '',
      organization: '',
      email: '',
      phone: '',
      service: 'Web Development',
      description: ''
    });
    setErrors({});
    setIsSubmitted(false);
  };

  if (isSubmitted) {
    return (
      <div className="p-8 sm:p-10 rounded-2xl bg-[#0D0D14] border border-purple-500/40 shadow-purple-glow-sm text-center">
        <div className="w-16 h-16 rounded-full bg-purple-950/60 border border-purple-500/50 flex items-center justify-center mx-auto text-purple-400 mb-6">
          <CheckCircle2 className="w-8 h-8" />
        </div>
        <h3 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
          Enquiry Received!
        </h3>
        <p className="mt-3 text-base text-zinc-300 max-w-md mx-auto leading-relaxed">
          Thank you for contacting UXpert. Our team will get in touch with you shortly.
        </p>
        <div className="mt-8 pt-6 border-t border-zinc-800/80">
          <button
            onClick={handleReset}
            className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full bg-zinc-900 hover:bg-zinc-800 border border-zinc-700 text-sm font-semibold text-zinc-200 hover:text-white transition-colors"
          >
            <span>Send another enquiry</span>
          </button>
        </div>
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      noValidate
      className="p-6 sm:p-9 rounded-2xl bg-[#0B0B10] border border-zinc-800/90 shadow-xl"
    >
      <div className="mb-6">
        <h3 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
          Project Enquiry
        </h3>
        <p className="mt-1 text-xs sm:text-sm text-zinc-400">
          Fill in your details below and our team will prepare a structured proposal outline.
        </p>
      </div>

      {errors.form && (
        <div className="mb-6 p-4 rounded-xl bg-red-950/40 border border-red-800/50 flex items-center gap-3 text-red-200 text-xs">
          <AlertCircle className="w-4 h-4 shrink-0" />
          <span>{errors.form}</span>
        </div>
      )}

      <div className="space-y-4">
        {/* Name */}
        <div>
          <label htmlFor="name" className="block text-xs font-semibold text-zinc-300 uppercase tracking-wider mb-1.5">
            Your Name <span className="text-purple-400">*</span>
          </label>
          <input
            id="name"
            name="name"
            type="text"
            value={formData.name}
            onChange={handleChange}
            placeholder="e.g. Alex Rivera"
            className={`w-full px-4 py-3 rounded-xl bg-zinc-900/80 border text-white placeholder-zinc-500 text-sm focus:outline-none focus:ring-2 focus:ring-purple-500 transition-colors ${
              errors.name ? 'border-red-500/80 focus:ring-red-400' : 'border-zinc-800 focus:border-purple-500'
            }`}
          />
          {errors.name && (
            <p className="mt-1 text-xs text-red-400 flex items-center gap-1">
              <span>{errors.name}</span>
            </p>
          )}
        </div>

        {/* Business / Organization */}
        <div>
          <label htmlFor="organization" className="block text-xs font-semibold text-zinc-300 uppercase tracking-wider mb-1.5">
            Business / Organization <span className="text-zinc-500 font-normal lowercase">(optional)</span>
          </label>
          <input
            id="organization"
            name="organization"
            type="text"
            value={formData.organization}
            onChange={handleChange}
            placeholder="e.g. Acme Studio or Independent"
            className="w-full px-4 py-3 rounded-xl bg-zinc-900/80 border border-zinc-800 text-white placeholder-zinc-500 text-sm focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-colors"
          />
        </div>

        {/* Email & Phone Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label htmlFor="email" className="block text-xs font-semibold text-zinc-300 uppercase tracking-wider mb-1.5">
              Email Address <span className="text-purple-400">*</span>
            </label>
            <input
              id="email"
              name="email"
              type="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="alex@company.com"
              className={`w-full px-4 py-3 rounded-xl bg-zinc-900/80 border text-white placeholder-zinc-500 text-sm focus:outline-none focus:ring-2 focus:ring-purple-500 transition-colors ${
                errors.email ? 'border-red-500/80 focus:ring-red-400' : 'border-zinc-800 focus:border-purple-500'
              }`}
            />
            {errors.email && (
              <p className="mt-1 text-xs text-red-400">
                {errors.email}
              </p>
            )}
          </div>

          <div>
            <label htmlFor="phone" className="block text-xs font-semibold text-zinc-300 uppercase tracking-wider mb-1.5">
              Phone / WhatsApp <span className="text-purple-400">*</span>
            </label>
            <input
              id="phone"
              name="phone"
              type="tel"
              value={formData.phone}
              onChange={handleChange}
              placeholder="+91 00000 00000"
              className={`w-full px-4 py-3 rounded-xl bg-zinc-900/80 border text-white placeholder-zinc-500 text-sm focus:outline-none focus:ring-2 focus:ring-purple-500 transition-colors ${
                errors.phone ? 'border-red-500/80 focus:ring-red-400' : 'border-zinc-800 focus:border-purple-500'
              }`}
            />
            {errors.phone && (
              <p className="mt-1 text-xs text-red-400">
                {errors.phone}
              </p>
            )}
          </div>
        </div>

        {/* Service Required Dropdown */}
        <div>
          <label htmlFor="service" className="block text-xs font-semibold text-zinc-300 uppercase tracking-wider mb-1.5">
            Service Required <span className="text-purple-400">*</span>
          </label>
          <select
            id="service"
            name="service"
            value={formData.service}
            onChange={handleChange}
            className="w-full px-4 py-3 rounded-xl bg-zinc-900 border border-zinc-800 text-white text-sm focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-colors"
          >
            {serviceOptions.map((opt) => (
              <option key={opt} value={opt} className="bg-zinc-900 text-white">
                {opt}
              </option>
            ))}
          </select>
        </div>

        {/* Project Description */}
        <div>
          <label htmlFor="description" className="block text-xs font-semibold text-zinc-300 uppercase tracking-wider mb-1.5">
            Project Description <span className="text-purple-400">*</span>
          </label>
          <textarea
            id="description"
            name="description"
            rows="4"
            value={formData.description}
            onChange={handleChange}
            placeholder="Tell us about your project, objectives, desired timeline, or any specific requirements..."
            className={`w-full px-4 py-3 rounded-xl bg-zinc-900/80 border text-white placeholder-zinc-500 text-sm focus:outline-none focus:ring-2 focus:ring-purple-500 transition-colors resize-none ${
              errors.description ? 'border-red-500/80 focus:ring-red-400' : 'border-zinc-800 focus:border-purple-500'
            }`}
          />
          {errors.description && (
            <p className="mt-1 text-xs text-red-400">
              {errors.description}
            </p>
          )}
        </div>

        {/* Submit Button */}
        <div className="pt-2">
          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full flex items-center justify-center gap-2.5 px-6 py-4 rounded-xl bg-purple-600 hover:bg-purple-500 text-white font-bold text-sm sm:text-base shadow-purple-glow hover:shadow-purple-glow-lg transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isSubmitting ? (
              <>
                <Loader2 className="w-5 h-5 animate-spin" />
                <span>Processing Enquiry...</span>
              </>
            ) : (
              <>
                <span>Send Enquiry</span>
                <ArrowRight className="w-4 h-4" />
              </>
            )}
          </button>
        </div>
      </div>
    </form>
  );
}
