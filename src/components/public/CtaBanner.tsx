'use client';

import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { cn } from '@/lib/utils';

interface CtaBannerProps {
  heading: string;
  subtext?: string;
  buttonText?: string;
  buttonLink?: string;
  bgImageUrl?: string | null;
  className?: string;
}

export default function CtaBanner({
  heading,
  subtext,
  buttonText = 'Contact Us Today',
  buttonLink = '#contact',
  bgImageUrl,
  className,
}: CtaBannerProps) {
  const ref = useRef<HTMLElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-80px' });

  return (
    <section
      ref={ref}
      className={cn('relative overflow-hidden py-24', className)}
    >
      {/* Background with parallax-style fixed attachment */}
      <div
        className="absolute inset-0 bg-cover bg-fixed bg-center bg-no-repeat"
        style={bgImageUrl ? { backgroundImage: `url(${bgImageUrl})` } : undefined}
      />
      <div className="absolute inset-0 bg-forest/80" />

      <div className="relative z-10 mx-auto max-w-3xl px-6 text-center">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : undefined}
          transition={{ duration: 0.5 }}
          className="mb-4 font-serif text-3xl font-bold text-white sm:text-4xl lg:text-5xl"
        >
          {heading}
        </motion.h2>

        {subtext && (
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : undefined}
            transition={{ duration: 0.5, delay: 0.15 }}
            className="mb-8 text-lg text-white/80"
          >
            {subtext}
          </motion.p>
        )}

        <motion.a
          href={buttonLink}
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : undefined}
          transition={{ duration: 0.5, delay: 0.3 }}
          className={cn(
            'inline-block rounded-full bg-sage px-8 py-4 font-semibold text-white',
            'transition-all duration-300 hover:bg-moss hover:shadow-lg hover:shadow-sage/25'
          )}
        >
          {buttonText}
        </motion.a>
      </div>
    </section>
  );
}
