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
  ctaPrimaryLink = '#contact',
  ctaSecondaryText = 'Our Services',
  ctaSecondaryLink = '#services',
  imageUrl,
  videoUrl,
}: HeroSectionProps) {
  const words = heading.split(' ');

  return (
    <section className="relative flex h-screen min-h-[600px] items-center justify-center overflow-hidden">
      {/* Background */}
      {videoUrl ? (
        <video
          autoPlay
          muted
          loop
          playsInline
          className="absolute inset-0 h-full w-full object-cover"
        >
          <source src={videoUrl} type="video/mp4" />
        </video>
      ) : (
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat bg-forest"
          style={imageUrl ? { backgroundImage: `url(${imageUrl})` } : undefined}
        />
      )}

      {/* Gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-forest/80 via-forest/60 to-charcoal/70" />

      {/* Content */}
      <div className="relative z-10 mx-auto max-w-5xl px-6 text-center">
        {tagline && (
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="mb-4 font-mono text-sm uppercase tracking-[0.2em] text-sage"
          >
            {tagline}
          </motion.p>
        )}

        <h1 className="mb-6 font-serif text-4xl font-bold leading-tight text-white sm:text-5xl md:text-6xl lg:text-7xl">
          {words.map((word, i) => (
            <motion.span
              key={i}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 + i * 0.12 }}
              className="mr-[0.3em] inline-block"
            >
              {word}
            </motion.span>
          ))}
        </h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="mx-auto mb-8 max-w-2xl text-lg text-white/80 sm:text-xl"
        >
          {subheading}
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 1 }}
          className="flex flex-col items-center justify-center gap-4 sm:flex-row"
        >
          <a
            href={ctaPrimaryLink}
            className={cn(
              'rounded-full bg-sage px-8 py-3.5 font-semibold text-white',
              'transition-all duration-300 hover:bg-moss hover:shadow-lg hover:shadow-sage/25'
            )}
          >
            {ctaPrimaryText}
          </a>
          <a
            href={ctaSecondaryLink}
            className={cn(
              'rounded-full border-2 border-white/30 px-8 py-3.5 font-semibold text-white',
              'transition-all duration-300 hover:border-white hover:bg-white/10'
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
        transition={{ delay: 1.5 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
        aria-label="Scroll down"
      >
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
        >
          <ChevronDown className="h-8 w-8 text-white/60" />
        </motion.div>
      </motion.a>
    </section>
  );
}
