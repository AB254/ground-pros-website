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
  subheading,
  services,
  className,
}: ServicesGridProps) {
  const ref = useRef<HTMLElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-80px' });

  return (
    <section ref={ref} className={cn('bg-cream py-20', className)}>
      <div className="mx-auto max-w-7xl px-6">
        <div className="mb-14 text-center">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : undefined}
            transition={{ duration: 0.5 }}
            className="font-serif text-3xl font-bold text-forest sm:text-4xl"
          >
            {heading}
          </motion.h2>
          {subheading && (
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : undefined}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="mx-auto mt-4 max-w-2xl text-slate"
            >
              {subheading}
            </motion.p>
          )}
        </div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {services.map((service, i) => {
            const Icon = iconMap[service.iconName] || Leaf;
            return (
              <motion.div
                key={service.slug}
                initial={{ opacity: 0, y: 30 }}
                animate={isInView ? { opacity: 1, y: 0 } : undefined}
                transition={{ duration: 0.5, delay: i * 0.1 }}
              >
                <Link href={`/services/${service.slug}`}>
                  <div
                    className={cn(
                      'group rounded-2xl border border-sand bg-white p-8 h-full',
                      'transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-forest/5'
                    )}
                  >
                    <div className="mb-5 inline-flex rounded-xl bg-sage/10 p-3 text-moss transition-colors group-hover:bg-sage/20">
                      <Icon className="h-6 w-6" />
                    </div>
                    <h3 className="mb-2 font-serif text-xl font-semibold text-charcoal">
                      {service.title}
                    </h3>
                    <p className="text-sm leading-relaxed text-slate">
                      {service.shortDesc}
                    </p>
                    <span className="mt-4 inline-block text-sm font-medium text-moss transition-colors group-hover:text-forest">
                      Learn more &rarr;
                    </span>
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
