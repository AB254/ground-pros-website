'use client';

import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { MapPin } from 'lucide-react';
import { cn } from '@/lib/utils';

interface ServiceAreaMapProps {
  heading?: string;
  description?: string;
  embedUrl?: string;
  areas?: string[];
  className?: string;
}

export default function ServiceAreaMap({
  heading = 'Our Service Area',
  description = 'Ground Pros Inc. proudly serves the greater Chicagoland area, including DuPage, Cook, Kane, Lake, and Will counties.',
  embedUrl,
  areas = [
    'DuPage County',
    'Cook County',
    'Kane County',
    'Lake County',
    'Will County',
    'McHenry County',
  ],
  className,
}: ServiceAreaMapProps) {
  const ref = useRef<HTMLElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-80px' });

  return (
    <section ref={ref} className={cn('bg-sand py-24', className)}>
      <div className="mx-auto max-w-7xl px-6">
        <div className="grid items-center gap-16 lg:grid-cols-2">
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            animate={isInView ? { opacity: 1, x: 0 } : undefined}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          >
            <span className="inline-block font-mono text-sm uppercase tracking-[0.2em] text-pine mb-4">
              Coverage Area
            </span>
            <h2 className="mb-5 font-serif text-3xl font-bold text-forest sm:text-4xl lg:text-5xl">
              {heading}
            </h2>
            <p className="mb-8 text-lg leading-relaxed text-slate">{description}</p>
            <div className="grid grid-cols-2 gap-4">
              {areas.map((area, i) => (
                <motion.div
                  key={area}
                  initial={{ opacity: 0, y: 15 }}
                  animate={isInView ? { opacity: 1, y: 0 } : undefined}
                  transition={{ duration: 0.4, delay: 0.3 + i * 0.08 }}
                  className="flex items-center gap-3 bg-white rounded-xl p-3 shadow-sm"
                >
                  <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-sage/15">
                    <MapPin className="h-4 w-4 text-pine" />
                  </div>
                  <span className="text-sm font-medium text-charcoal">{area}</span>
                </motion.div>
              ))}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={isInView ? { opacity: 1, x: 0 } : undefined}
            transition={{ duration: 0.7, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
            className="overflow-hidden rounded-2xl shadow-xl"
          >
            {embedUrl ? (
              <iframe
                src={embedUrl}
                className="h-[450px] w-full border-0"
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Service area map"
              />
            ) : (
              <div className="flex h-[450px] items-center justify-center bg-gradient-to-br from-forest/5 to-pine/10">
                <div className="text-center px-8">
                  <div className="w-20 h-20 bg-sage/15 rounded-full flex items-center justify-center mx-auto mb-4">
                    <MapPin className="h-10 w-10 text-pine" />
                  </div>
                  <h3 className="font-serif text-xl font-bold text-forest mb-2">
                    Chicagoland Area
                  </h3>
                  <p className="text-slate">
                    Serving commercial properties across the greater Chicago metropolitan area
                  </p>
                </div>
              </div>
            )}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
