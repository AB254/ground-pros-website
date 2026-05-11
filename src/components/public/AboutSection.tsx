'use client';

import { useRef, type ComponentType } from 'react';
import { motion, useInView } from 'framer-motion';
import { Check, Award, Shield, Clock, Leaf } from 'lucide-react';
import { cn } from '@/lib/utils';

const bulletIcons: Record<string, ComponentType<{ className?: string }>> = {
  Award,
  Shield,
  Clock,
  Leaf,
};

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
    <section ref={ref} id="about" className={cn('bg-sand py-24', className)}>
      <div className="mx-auto grid max-w-7xl items-center gap-16 px-6 lg:grid-cols-2">
        {/* Image area */}
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={isInView ? { opacity: 1, x: 0 } : undefined}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="relative"
        >
          {images.length > 0 ? (
            <div className="relative group">
              <div className="overflow-hidden rounded-2xl shadow-xl">
                <img
                  src={images[0]}
                  alt="Michael & Gina Pezza - Ground Pros Leadership"
                  className="w-full object-cover transition-transform duration-700 group-hover:scale-105"
                  loading="lazy"
                />
              </div>
              <motion.div
                initial={{ scale: 0, opacity: 0 }}
                animate={isInView ? { scale: 1, opacity: 1 } : undefined}
                transition={{ duration: 0.6, delay: 0.6 }}
                className="absolute -bottom-5 left-1/2 -translate-x-1/2 bg-forest text-white rounded-2xl px-6 py-4 shadow-xl text-center z-10"
              >
                <p className="text-3xl font-mono font-bold">25+</p>
                <p className="text-xs uppercase tracking-wider text-sage mt-1">Years of Excellence</p>
              </motion.div>
              <div className="absolute -bottom-4 -right-4 -z-10 h-full w-full rounded-2xl border-2 border-sage/30" />
            </div>
          ) : (
            <div className="relative">
              <div className="aspect-square rounded-2xl flex items-center justify-center overflow-hidden">
                <div
                  className="absolute inset-0 bg-cover bg-center"
                  style={{ backgroundImage: "url('https://www.groundpros.com/wp-content/uploads/2020/05/intro_web.jpg')" }}
                />
                <div className="absolute inset-0 bg-black/60" />
                <div className="relative text-center text-white">
                  <p className="text-8xl font-mono font-bold">25+</p>
                  <p className="text-xl mt-4 font-serif">Years of Excellence</p>
                </div>
              </div>
              <div className="absolute -bottom-4 -right-4 -z-10 h-full w-full rounded-2xl border-2 border-sage/30" />
            </div>
          )}
        </motion.div>

        {/* Text */}
        <div>
          <motion.span
            initial={{ opacity: 0, y: 15 }}
            animate={isInView ? { opacity: 1, y: 0 } : undefined}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="inline-block font-mono text-sm uppercase tracking-[0.2em] text-pine mb-4"
          >
            About Us
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : undefined}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="mb-6 font-serif text-3xl font-bold text-forest sm:text-4xl lg:text-5xl"
          >
            {heading}
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : undefined}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="mb-8 text-lg leading-relaxed text-slate"
          >
            {bodyText}
          </motion.p>

          <ul className="space-y-4">
            {bullets.map((bullet, i) => {
              const BulletIcon = bulletIcons[bullet.icon] || Check;
              return (
                <motion.li
                  key={i}
                  initial={{ opacity: 0, x: 30 }}
                  animate={isInView ? { opacity: 1, x: 0 } : undefined}
                  transition={{ duration: 0.5, delay: 0.4 + i * 0.1, ease: [0.22, 1, 0.36, 1] }}
                  className="flex items-start gap-4 bg-white rounded-xl p-4 shadow-sm hover:shadow-md transition-shadow"
                >
                  <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-sage/15 text-pine">
                    <BulletIcon className="h-5 w-5" />
                  </span>
                  <span className="text-charcoal font-medium pt-2">{bullet.text}</span>
                </motion.li>
              );
            })}
          </ul>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : undefined}
            transition={{ duration: 0.5, delay: 0.8 }}
            className="mt-8"
          >
            <a
              href="/about"
              className="inline-flex items-center gap-2 bg-pine text-white px-8 py-3 rounded-xl hover:bg-moss transition-all duration-300 font-semibold hover:scale-105"
            >
              Learn More About Us
              <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </a>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
