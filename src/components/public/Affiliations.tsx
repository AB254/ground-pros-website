'use client';

import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { cn } from '@/lib/utils';

interface Affiliation {
  name: string;
  logoUrl: string;
  website?: string | null;
}

interface AffiliationsProps {
  heading?: string;
  affiliations: Affiliation[];
  className?: string;
}

export default function Affiliations({
  heading = 'Proud Members & Affiliations',
  affiliations,
  className,
}: AffiliationsProps) {
  const ref = useRef<HTMLElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-60px' });

  return (
    <section ref={ref} className={cn('bg-white py-24 overflow-hidden', className)}>
      <div className="mx-auto max-w-6xl px-6">
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          animate={isInView ? { opacity: 1, y: 0 } : undefined}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="text-center mb-16"
        >
          <span className="inline-block font-mono text-sm uppercase tracking-[0.25em] text-pine mb-3">
            Our Partners
          </span>
          <h2 className="font-serif text-3xl font-bold text-forest sm:text-4xl lg:text-5xl">
            {heading}
          </h2>
          <motion.div
            initial={{ scaleX: 0 }}
            animate={isInView ? { scaleX: 1 } : undefined}
            transition={{ duration: 0.8, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
            className="mt-5 h-1 w-20 bg-gradient-to-r from-sage to-moss mx-auto rounded-full origin-center"
          />
        </motion.div>

        <div className="flex flex-wrap justify-center items-center gap-8 md:gap-12">
          {affiliations.map((a, i) => (
            <motion.div
              key={`${a.name}-${i}`}
              initial={{ opacity: 0, y: 30, scale: 0.9 }}
              animate={isInView ? { opacity: 1, y: 0, scale: 1 } : undefined}
              transition={{
                duration: 0.6,
                delay: 0.15 + i * 0.1,
                ease: [0.22, 1, 0.36, 1],
              }}
            >
              <a
                href={a.website || '#'}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex flex-col items-center justify-center bg-cream rounded-2xl p-8 w-56 h-56 hover:shadow-xl hover:-translate-y-2 transition-all duration-500 border border-transparent hover:border-sage/20"
              >
                <div className="relative w-28 h-28 mb-4 flex items-center justify-center">
                  <img
                    src={a.logoUrl}
                    alt={a.name}
                    className="max-w-full max-h-full object-contain grayscale group-hover:grayscale-0 transition-all duration-500 group-hover:scale-110"
                    loading="lazy"
                  />
                </div>
                <p className="text-xs font-semibold text-charcoal/70 text-center leading-snug group-hover:text-pine transition-colors duration-300">
                  {a.name}
                </p>
              </a>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
