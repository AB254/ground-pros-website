'use client';

import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { Check } from 'lucide-react';
import { cn } from '@/lib/utils';

interface AboutSectionProps {
  heading: string;
  bodyText: string;
  bullets: { icon: string; text: string }[];
  images: string[];
  className?: string;
}

export default function AboutSection({
  heading,
  bodyText,
  bullets,
  images,
  className,
}: AboutSectionProps) {
  const ref = useRef<HTMLElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-80px' });

  return (
    <section ref={ref} id="about" className={cn('bg-sand py-20', className)}>
      <div className="mx-auto grid max-w-7xl items-center gap-12 px-6 lg:grid-cols-2">
        {/* Image area */}
        <motion.div
          initial={{ opacity: 0, x: -40 }}
          animate={isInView ? { opacity: 1, x: 0 } : undefined}
          transition={{ duration: 0.7 }}
          className="relative"
        >
          {images.length > 0 ? (
            <div className="relative overflow-hidden rounded-2xl">
              <img
                src={images[0]}
                alt="About Ground Pros"
                className="h-full w-full object-cover"
                loading="lazy"
              />
              <div className="absolute -bottom-3 -right-3 -z-10 h-full w-full rounded-2xl border-2 border-sage/30" />
            </div>
          ) : (
            <div className="aspect-square rounded-2xl bg-cream flex items-center justify-center">
              <div className="text-center">
                <p className="text-8xl font-mono font-bold text-pine">25+</p>
                <p className="text-xl text-slate mt-4">Years of Excellence</p>
              </div>
            </div>
          )}
        </motion.div>

        {/* Text */}
        <div>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : undefined}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="mb-6 font-serif text-3xl font-bold text-forest sm:text-4xl"
          >
            {heading}
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : undefined}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="mb-8 leading-relaxed text-slate"
          >
            {bodyText}
          </motion.p>

          <ul className="space-y-4">
            {bullets.map((bullet, i) => (
              <motion.li
                key={i}
                initial={{ opacity: 0, x: 20 }}
                animate={isInView ? { opacity: 1, x: 0 } : undefined}
                transition={{ duration: 0.4, delay: 0.4 + i * 0.1 }}
                className="flex items-start gap-3"
              >
                <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-sage text-white">
                  <Check className="h-3 w-3" />
                </span>
                <span className="text-sm text-charcoal">{bullet.text}</span>
              </motion.li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
