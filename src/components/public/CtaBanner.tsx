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
  buttonLink = '/contact',
  bgImageUrl,
  className,
}: CtaBannerProps) {
  const ref = useRef<HTMLElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-80px' });

  return (
    <section
      ref={ref}
      className={cn('relative overflow-hidden py-28', className)}
    >
      <div
        className="absolute inset-0 bg-cover bg-fixed bg-center bg-no-repeat"
        style={
          bgImageUrl
            ? { backgroundImage: `url(${bgImageUrl})` }
            : { backgroundImage: "url('https://images.unsplash.com/photo-1558904541-efa843a96f01?w=1600&q=80')" }
        }
      />
      <div className="absolute inset-0 bg-gradient-to-r from-forest/90 to-pine/85" />

      <div className="relative z-10 mx-auto max-w-4xl px-6 text-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={isInView ? { opacity: 1, scale: 1 } : undefined}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        >
          <h2 className="mb-5 font-serif text-3xl font-bold text-white sm:text-4xl lg:text-5xl">
            {heading}
          </h2>

          {subtext && (
            <p className="mb-10 text-lg text-white/80 max-w-2xl mx-auto leading-relaxed lg:text-xl">
              {subtext}
            </p>
          )}

          <a
            href={buttonLink}
            className={cn(
              'inline-block rounded-full bg-white text-pine px-10 py-4 text-lg font-semibold shadow-xl',
              'transition-all duration-300 hover:bg-sage hover:text-white hover:shadow-2xl hover:scale-105'
            )}
          >
            {buttonText}
          </a>
        </motion.div>
      </div>
    </section>
  );
}
