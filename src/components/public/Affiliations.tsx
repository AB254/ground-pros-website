'use client';

import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { Award } from 'lucide-react';
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
  heading = 'Trusted By Industry Leaders',
  affiliations,
  className,
}: AffiliationsProps) {
  const ref = useRef<HTMLElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-60px' });

  return (
    <section ref={ref} className={cn('bg-white py-20', className)}>
      <div className="mx-auto max-w-6xl px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : undefined}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <span className="inline-block font-mono text-sm uppercase tracking-[0.2em] text-pine mb-3">
            Our Partners
          </span>
          <h2 className="font-serif text-3xl font-bold text-forest sm:text-4xl">
            {heading}
          </h2>
        </motion.div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {affiliations.map((a, i) => (
            <motion.div
              key={`${a.name}-${i}`}
              initial={{ opacity: 0, y: 20, scale: 0.95 }}
              animate={isInView ? { opacity: 1, y: 0, scale: 1 } : undefined}
              transition={{ duration: 0.5, delay: i * 0.1 }}
            >
              <a
                href={a.website || '#'}
                target="_blank"
                rel="noopener noreferrer"
                className="flex flex-col items-center justify-center bg-cream rounded-2xl p-8 h-full hover:shadow-lg hover:-translate-y-1 transition-all duration-300 group"
              >
                <div className="w-16 h-16 bg-sage/15 rounded-full flex items-center justify-center mb-4 group-hover:bg-pine group-hover:text-white transition-all duration-300">
                  <Award className="w-8 h-8 text-pine group-hover:text-white transition-colors" />
                </div>
                <p className="text-sm font-semibold text-charcoal text-center leading-snug">
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
