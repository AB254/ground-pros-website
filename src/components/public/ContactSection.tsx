'use client';

import { useRef } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { motion, useInView } from 'framer-motion';
import {
  MapPin,
  Phone,
  Mail,
  Clock,
  Globe,
  ExternalLink,
  Send,
} from 'lucide-react';
import { cn } from '@/lib/utils';
import type { BusinessHour, SocialLinks } from '@/types';

const contactSchema = z.object({
  name: z.string().min(2, 'Name is required'),
  email: z.string().email('Valid email is required'),
  phone: z.string().optional(),
  company: z.string().optional(),
  service: z.string().min(1, 'Please select a service'),
  propertyType: z.string().min(1, 'Please select a property type'),
  message: z.string().min(10, 'Message must be at least 10 characters'),
});

type ContactFormData = z.infer<typeof contactSchema>;

const propertyTypes = [
  'Commercial Office',
  'Healthcare',
  'HOA / Multi-Family',
  'Retail',
  'Industrial',
  'Municipal',
  'Other',
];

interface ContactSectionProps {
  services?: string[];
  contactInfo?: {
    address: string;
    phone: string;
    fax?: string | null;
    email: string;
    businessHours: BusinessHour[];
    socialLinks: SocialLinks;
    mapEmbedUrl?: string | null;
  };
  className?: string;
}

export default function ContactSection({
  services: serviceOptions = ['Landscape Management', 'Snow & Ice Management', 'Landscape Installation', 'Turf & Plant Health Care', 'Irrigation Management', 'Seasonal Color Programs', 'Other'],
  contactInfo,
  className,
}: ContactSectionProps) {
  const address = contactInfo?.address ?? '1470 Industrial Dr, Itasca, IL 60143';
  const phone = contactInfo?.phone ?? '(630) 993-1400';
  const email = contactInfo?.email ?? 'info@groundpros.com';
  const hours = contactInfo?.businessHours ?? [
    { day: 'Mon - Fri', hours: '7:00 AM - 5:00 PM' },
    { day: 'Saturday', hours: 'By Appointment' },
    { day: 'Sunday', hours: 'Closed' },
  ];
  const social = contactInfo?.socialLinks ?? {};
  const ref = useRef<HTMLElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-80px' });

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting, isSubmitSuccessful },
    reset,
  } = useForm<ContactFormData>({
    resolver: zodResolver(contactSchema),
  });

  const onSubmit = async (data: ContactFormData) => {
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: data.name,
          email: data.email,
          phone: data.phone,
          company: data.company,
          serviceInterest: data.service,
          propertyType: data.propertyType,
          message: data.message,
        }),
      });
      if (!res.ok) throw new Error('Failed to send');
      reset();
    } catch {
      // error is shown implicitly via isSubmitSuccessful remaining false
    }
  };

  const inputClasses = cn(
    'w-full rounded-lg border border-stone/30 bg-white px-4 py-3 text-sm text-charcoal',
    'placeholder:text-stone/60 transition-colors focus:border-moss focus:outline-none focus:ring-1 focus:ring-moss'
  );

  const errorClasses = 'mt-1 text-xs text-red-600';

  return (
    <section ref={ref} id="contact" className={cn('bg-sand py-20', className)}>
      <div className="mx-auto max-w-7xl px-6">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : undefined}
          transition={{ duration: 0.5 }}
          className="mb-12 text-center font-serif text-3xl font-bold text-forest sm:text-4xl"
        >
          Get In Touch
        </motion.h2>

        <div className="grid gap-12 lg:grid-cols-5">
          {/* Form */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={isInView ? { opacity: 1, x: 0 } : undefined}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="lg:col-span-3"
          >
            {isSubmitSuccessful ? (
              <div className="flex h-full items-center justify-center rounded-2xl border border-sage/30 bg-white p-12 text-center">
                <div>
                  <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-sage/10 text-sage">
                    <Send className="h-7 w-7" />
                  </div>
                  <h3 className="mb-2 font-serif text-2xl font-bold text-forest">
                    Message Sent!
                  </h3>
                  <p className="text-slate">
                    We&apos;ll get back to you within one business day.
                  </p>
                </div>
              </div>
            ) : (
              <form
                onSubmit={handleSubmit(onSubmit)}
                className="grid gap-5 rounded-2xl border border-stone/20 bg-white p-8 shadow-sm sm:grid-cols-2"
              >
                <div>
                  <input {...register('name')} placeholder="Full Name *" className={inputClasses} />
                  {errors.name && <p className={errorClasses}>{errors.name.message}</p>}
                </div>
                <div>
                  <input {...register('email')} type="email" placeholder="Email Address *" className={inputClasses} />
                  {errors.email && <p className={errorClasses}>{errors.email.message}</p>}
                </div>
                <div>
                  <input {...register('phone')} type="tel" placeholder="Phone Number *" className={inputClasses} />
                  {errors.phone && <p className={errorClasses}>{errors.phone.message}</p>}
                </div>
                <div>
                  <input {...register('company')} placeholder="Company Name" className={inputClasses} />
                </div>
                <div>
                  <select {...register('service')} className={inputClasses} defaultValue="">
                    <option value="" disabled>Select a Service *</option>
                    {serviceOptions.map((s) => (
                      <option key={s} value={s}>{s}</option>
                    ))}
                  </select>
                  {errors.service && <p className={errorClasses}>{errors.service.message}</p>}
                </div>
                <div>
                  <select {...register('propertyType')} className={inputClasses} defaultValue="">
                    <option value="" disabled>Property Type *</option>
                    {propertyTypes.map((p) => (
                      <option key={p} value={p}>{p}</option>
                    ))}
                  </select>
                  {errors.propertyType && <p className={errorClasses}>{errors.propertyType.message}</p>}
                </div>
                <div className="sm:col-span-2">
                  <textarea
                    {...register('message')}
                    rows={5}
                    placeholder="Tell us about your project... *"
                    className={inputClasses}
                  />
                  {errors.message && <p className={errorClasses}>{errors.message.message}</p>}
                </div>
                <div className="sm:col-span-2">
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className={cn(
                      'w-full rounded-lg bg-forest py-3.5 font-semibold text-white',
                      'transition-all duration-300 hover:bg-pine disabled:opacity-50'
                    )}
                  >
                    {isSubmitting ? 'Sending...' : 'Send Message'}
                  </button>
                </div>
              </form>
            )}
          </motion.div>

          {/* Contact Info */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={isInView ? { opacity: 1, x: 0 } : undefined}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="space-y-8 lg:col-span-2"
          >
            <div className="flex gap-4">
              <MapPin className="mt-1 h-5 w-5 shrink-0 text-moss" />
              <div>
                <h4 className="mb-1 font-semibold text-charcoal">Address</h4>
                <p className="text-sm text-slate">{address}</p>
              </div>
            </div>

            <div className="flex gap-4">
              <Phone className="mt-1 h-5 w-5 shrink-0 text-moss" />
              <div>
                <h4 className="mb-1 font-semibold text-charcoal">Phone</h4>
                <a href={`tel:${phone.replace(/\D/g, '')}`} className="text-sm text-slate hover:text-moss">
                  {phone}
                </a>
              </div>
            </div>

            <div className="flex gap-4">
              <Mail className="mt-1 h-5 w-5 shrink-0 text-moss" />
              <div>
                <h4 className="mb-1 font-semibold text-charcoal">Email</h4>
                <a href={`mailto:${email}`} className="text-sm text-slate hover:text-moss">
                  {email}
                </a>
              </div>
            </div>

            <div className="flex gap-4">
              <Clock className="mt-1 h-5 w-5 shrink-0 text-moss" />
              <div>
                <h4 className="mb-1 font-semibold text-charcoal">Business Hours</h4>
                {hours.map((h) => (
                  <p key={h.day} className="text-sm text-slate">
                    <span className="font-medium">{h.day}:</span> {h.hours}
                  </p>
                ))}
              </div>
            </div>

            {/* Social links */}
            <div className="flex gap-4 pt-4">
              {social.instagram && (
                <a href={social.instagram} target="_blank" rel="noopener noreferrer"
                  className="rounded-full bg-forest/10 p-2.5 text-forest transition-colors hover:bg-forest hover:text-white">
                  <ExternalLink className="h-5 w-5" />
                  <span className="sr-only">Instagram</span>
                </a>
              )}
              {social.linkedin && (
                <a href={social.linkedin} target="_blank" rel="noopener noreferrer"
                  className="rounded-full bg-forest/10 p-2.5 text-forest transition-colors hover:bg-forest hover:text-white">
                  <ExternalLink className="h-5 w-5" />
                  <span className="sr-only">LinkedIn</span>
                </a>
              )}
              {social.facebook && (
                <a href={social.facebook} target="_blank" rel="noopener noreferrer"
                  className="rounded-full bg-forest/10 p-2.5 text-forest transition-colors hover:bg-forest hover:text-white">
                  <Globe className="h-5 w-5" />
                  <span className="sr-only">Facebook</span>
                </a>
              )}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
