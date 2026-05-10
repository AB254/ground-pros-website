'use client';

import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { cn } from '@/lib/utils';

interface ScrollRevealProps {
  children: React.ReactNode;
  direction?: 'up' | 'left' | 'right' | 'down' | 'scale';
  delay?: number;
  duration?: number;
  className?: string;
  once?: boolean;
}

const initialVariants = {
  up: { opacity: 0, y: 50 },
  down: { opacity: 0, y: -50 },
  left: { opacity: 0, x: -50 },
  right: { opacity: 0, x: 50 },
  scale: { opacity: 0, scale: 0.9 },
};

const animateVariants = {
  up: { opacity: 1, y: 0 },
  down: { opacity: 1, y: 0 },
  left: { opacity: 1, x: 0 },
  right: { opacity: 1, x: 0 },
  scale: { opacity: 1, scale: 1 },
};

export default function ScrollReveal({
  children,
  direction = 'up',
  delay = 0,
  duration = 0.7,
  className,
  once = true,
}: ScrollRevealProps) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once, margin: '-60px' });

  return (
    <motion.div
      ref={ref}
      initial={initialVariants[direction]}
      animate={isInView ? animateVariants[direction] : undefined}
      transition={{
        duration,
        delay,
        ease: [0.22, 1, 0.36, 1],
      }}
      className={cn(className)}
    >
      {children}
    </motion.div>
  );
}
