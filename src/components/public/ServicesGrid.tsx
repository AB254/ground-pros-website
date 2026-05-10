'use client';

import { useRef, type ComponentType } from 'react';
import { motion, useInView } from 'framer-motion';
import {
  Leaf,
  Snowflake,
  TreePine,
  Trees,
  Droplets,
  Sun,
  Shovel,
  Flower2,
} from 'lucide-react';
import { cn } from '@/lib/utils';
import Link from 'next/link';

const iconMap: Record<string, ComponentType<{ className?: string }>> = {
  Leaf,
  Snowflake,
  TreePine,
  Trees,
  Droplets,
  Sun,
  Shovel,
  Flower2,
  leaf: Leaf,
  snowflake: Snowflake,
  tree: TreePine,
  droplets: Droplets,
  sun: Sun,
  shovel: Shovel,
};

const serviceImages: Record<string, string> = {
  'landscape-management':
    'https://images.unsplash.com/photo-1558904541-efa843a96f01?w=800&q=80',
  'snow-ice-management':
    'https://images.unsplash.com/photo-1457269449834-928af64c684d?w=800&q=80',
  'landscape-installation':
    'https://images.unsplash.com/photo-1585320806297-9794b3e4eeae?w=800&q=80',
  'turf-plant-health-care':
    'https://images.unsplash.com/photo-1592722182697-39b28cbfc1f8?w=800&q=80',
  'irrigation-management':
    'https://images.unsplash.com/photo-1416879595882-3373a0480b5b?w=800&q=80',
  'seasonal-color-programs':
    'https://images.unsplash.com/photo-1490750967868-88aa4f44baee?w=800&q=80',
};

interface ServiceItem {
  title: string;
  slug: string;
  shortDesc: string;
  iconName: string;
  bgImageUrl?: string | null;
}

interface ServicesGridProps {
  heading?: string;
  subheading?: string;
  services: ServiceItem[];
  className?: string;
}

export default function ServicesGrid({
  heading = 'Our Services',
  subheading = 'Comprehensive commercial landscape solutions tailored to your property',
  services,
  className,
}: ServicesGridProps) {
  const ref = useRef<HTMLElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-80px' });

  return (
    <section ref={ref} className={cn('bg-cream py-24', className)}>
      <div className="mx-auto max-w-7xl px-6">
        <div className="mb-16 text-center">
          <motion.span
            initial={{ opacity: 0, y: 10 }}
            animate={isInView ? { opacity: 1, y: 0 } : undefined}
            transition={{ duration: 0.4 }}
            className="mb-4 inline-block font-mono text-sm uppercase tracking-[0.2em] text-pine"
          >
            What We Do
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : undefined}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="font-serif text-4xl font-bold text-forest sm:text-5xl"
          >
            {heading}
          </motion.h2>
          {subheading && (
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : undefined}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="mx-auto mt-4 max-w-2xl text-lg text-slate"
            >
              {subheading}
            </motion.p>
          )}
        </div>

        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {services.map((service, i) => {
            const Icon = iconMap[service.iconName] || Leaf;
            const bgImage = service.bgImageUrl || serviceImages[service.slug];
            return (
              <motion.div
                key={service.slug}
                initial={{ opacity: 0, y: 40 }}
                animate={isInView ? { opacity: 1, y: 0 } : undefined}
                transition={{ duration: 0.6, delay: i * 0.12 }}
              >
                <Link href={`/services/${service.slug}`}>
                  <div
                    className={cn(
                      'group relative h-[380px] overflow-hidden rounded-2xl',
                      'transition-all duration-500 hover:-translate-y-2 hover:shadow-2xl'
                    )}
                  >
                    {bgImage ? (
                      <div
                        className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-110"
                        style={{ backgroundImage: `url(${bgImage})` }}
                      />
                    ) : (
                      <div className="absolute inset-0 bg-gradient-to-br from-forest to-pine" />
                    )}

                    <div className="absolute inset-0 bg-gradient-to-t from-charcoal/90 via-charcoal/40 to-transparent transition-all duration-500 group-hover:from-charcoal/95 group-hover:via-charcoal/50" />

                    <div className="relative flex h-full flex-col justify-end p-8">
                      <div className="mb-4 inline-flex h-14 w-14 items-center justify-center rounded-xl bg-white/15 backdrop-blur-sm transition-all duration-300 group-hover:bg-sage group-hover:scale-110">
                        <Icon className="h-7 w-7 text-white" />
                      </div>
                      <h3 className="mb-2 font-serif text-2xl font-bold text-white">
                        {service.title}
                      </h3>
                      <p className="text-sm leading-relaxed text-white/75 transition-all duration-300 group-hover:text-white/90">
                        {service.shortDesc}
                      </p>
                      <span className="mt-4 inline-flex items-center gap-2 text-sm font-semibold text-sage transition-all duration-300 group-hover:gap-3">
                        Learn more
                        <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                          <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                        </svg>
                      </span>
                    </div>
                  </div>
                </Link>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
