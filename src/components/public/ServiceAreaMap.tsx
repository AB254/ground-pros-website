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
    <section ref={ref} className={cn('bg-sand py-20', className)}>
      <div className="mx-auto max-w-7xl px-6">
        <div className="grid items-center gap-12 lg:grid-cols-2">
          {/* Text */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={isInView ? { opacity: 1, x: 0 } : undefined}
            transition={{ duration: 0.6 }}
          >
            <h2 className="mb-4 font-serif text-3xl font-bold text-forest sm:text-4xl">
              {heading}
            </h2>
            <p className="mb-8 leading-relaxed text-slate">{description}</p>
            <div className="grid grid-cols-2 gap-3">
              {areas.map((area, i) => (
                <motion.div
                  key={area}
                  initial={{ opacity: 0, y: 10 }}
                  animate={isInView ? { opacity: 1, y: 0 } : undefined}
                  transition={{ duration: 0.3, delay: 0.3 + i * 0.08 }}
                  className="flex items-center gap-2"
                >
                  <MapPin className="h-4 w-4 shrink-0 text-moss" />
                  <span className="text-sm text-charcoal">{area}</span>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Map */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={isInView ? { opacity: 1, x: 0 } : undefined}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="overflow-hidden rounded-2xl shadow-lg"
          >
            {embedUrl ? (
              <iframe
                src={embedUrl}
                className="h-[400px] w-full border-0"
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Service area map"
              />
            ) : (
              <div className="flex h-[400px] items-center justify-center bg-stone/20">
                <div className="text-center">
                  <MapPin className="mx-auto mb-3 h-12 w-12 text-moss/40" />
                  <p className="text-sm text-slate">
                    Google Maps embed will appear here
                  </p>
                  <p className="mt-1 text-xs text-stone">
                    Provide an embedUrl prop to display the map
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
