'use client';

import { useEffect, useRef, useState } from 'react';
import { motion, useInView } from 'framer-motion';
import { cn } from '@/lib/utils';

interface Stat {
  number: string;
  label: string;
}

interface StatsCounterProps {
  stats: Stat[];
  className?: string;
}

function parseStatValue(value: string): { numericPart: number; suffix: string; isAnimatable: boolean } {
  const match = value.match(/^(\d+)(.*)$/);
  if (match) {
    return { numericPart: parseInt(match[1], 10), suffix: match[2], isAnimatable: true };
  }
  return { numericPart: 0, suffix: value, isAnimatable: false };
}

function AnimatedStat({ value, inView }: { value: string; inView: boolean }) {
  const { numericPart, suffix, isAnimatable } = parseStatValue(value);
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!inView || !isAnimatable) return;

    let start = 0;
    const duration = 2000;
    const increment = numericPart / (duration / 16);
    const timer = setInterval(() => {
      start += increment;
      if (start >= numericPart) {
        setCount(numericPart);
        clearInterval(timer);
      } else {
        setCount(Math.floor(start));
      }
    }, 16);

    return () => clearInterval(timer);
  }, [inView, numericPart, isAnimatable]);

  return (
    <span className="font-mono text-5xl font-bold text-white sm:text-6xl">
      {isAnimatable ? count.toLocaleString() : ''}
      {suffix}
    </span>
  );
}

export default function StatsCounter({ stats, className }: StatsCounterProps) {
  const ref = useRef<HTMLElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <section ref={ref} id="stats" className={cn('relative py-20 overflow-hidden', className)}>
      <div className="absolute inset-0 bg-black/70 z-[1]" />
      <div className="relative z-10 mx-auto grid max-w-7xl grid-cols-2 gap-10 px-6 md:grid-cols-4">
        {stats.map((stat, i) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, y: 30, scale: 0.95 }}
            animate={isInView ? { opacity: 1, y: 0, scale: 1 } : undefined}
            transition={{ duration: 0.6, delay: i * 0.15, ease: [0.22, 1, 0.36, 1] }}
            className="text-center"
          >
            <AnimatedStat value={stat.number} inView={isInView} />
            <div className="mt-1 h-0.5 w-12 bg-sage/40 mx-auto rounded-full" />
            <p className="mt-3 text-sm font-semibold uppercase tracking-[0.15em] text-sage/80">
              {stat.label}
            </p>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
