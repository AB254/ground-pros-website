'use client';

import { motion } from 'framer-motion';
import { ChevronDown } from 'lucide-react';
import { cn } from '@/lib/utils';

interface HeroSectionProps {
  heading: string;
  subheading: string;
  tagline?: string;
  ctaPrimaryText?: string;
  ctaPrimaryLink?: string;
  ctaSecondaryText?: string;
  ctaSecondaryLink?: string;
  imageUrl?: string | null;
  videoUrl?: string | null;
}

export default function HeroSection({
  heading,
  subheading,
  tagline,
  ctaPrimaryText = 'Get a Free Estimate',
  ctaPrimaryLink = '/contact',
  ctaSecondaryText = 'Our Services',
  ctaSecondaryLink = '/services',
  imageUrl,
  videoUrl,
}: HeroSectionProps) {
  const words = heading.split(' ');

  return (
    <section className="relative flex h-screen min-h-[700px] items-center justify-center overflow-hidden">
      {/* Background */}
      {videoUrl && (
        <video
          autoPlay
          muted
          loop
          playsInline
          className="absolute inset-0 h-full w-full object-cover"
        >
          <source src={videoUrl} type="video/mp4" />
        </video>
      )}

      {/* Overlay */}
      <div className="absolute inset-0 bg-black/60 z-[1]" />

      {/* Content */}
      <div className="relative z-10 mx-auto max-w-5xl px-6 text-center">
        {tagline && (
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            className="mb-6 font-mono text-sm uppercase tracking-[0.25em] text-sage"
          >
            {tagline}
          </motion.p>
        )}

        <h1 className="mb-8 font-serif text-5xl font-bold leading-tight text-white sm:text-6xl md:text-7xl lg:text-8xl">
          {words.map((word, i) => (
            <motion.span
              key={i}
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                duration: 0.7,
                delay: 0.3 + i * 0.15,
                ease: [0.22, 1, 0.36, 1],
              }}
              className="mr-[0.3em] inline-block"
            >
              {word}
            </motion.span>
          ))}
        </h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.9, ease: [0.22, 1, 0.36, 1] }}
          className="mx-auto mb-10 max-w-2xl text-lg text-white/80 sm:text-xl lg:text-2xl leading-relaxed"
        >
          {subheading}
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.1, ease: [0.22, 1, 0.36, 1] }}
          className="flex flex-col items-center justify-center gap-5 sm:flex-row"
        >
          <a
            href={ctaPrimaryLink}
            className={cn(
              'rounded-full bg-sage px-10 py-4 text-lg font-semibold text-white shadow-xl shadow-sage/25',
              'transition-all duration-300 hover:bg-moss hover:shadow-2xl hover:shadow-sage/30 hover:scale-105'
            )}
          >
            {ctaPrimaryText}
          </a>
          <a
            href={ctaSecondaryLink}
            className={cn(
              'rounded-full border-2 border-white/30 px-10 py-4 text-lg font-semibold text-white',
              'transition-all duration-300 hover:border-white hover:bg-white/10 hover:scale-105'
            )}
          >
            {ctaSecondaryText}
          </a>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.a
        href="#stats"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2 }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2"
        aria-label="Scroll down"
      >
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2.5, repeat: Infinity, ease: 'easeInOut' }}
          className="flex flex-col items-center gap-2"
        >
          <span className="text-xs font-mono uppercase tracking-widest text-white/40">Scroll</span>
          <ChevronDown className="h-6 w-6 text-white/40" />
        </motion.div>
      </motion.a>
    </section>
  );
}
