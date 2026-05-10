'use client';

import { useState, useRef } from 'react';
import { motion, AnimatePresence, useInView } from 'framer-motion';
import { cn } from '@/lib/utils';
import Lightbox from './Lightbox';

interface ProjectItem {
  id: string;
  title: string;
  category: string;
  description?: string | null;
  beforeImage?: string | null;
  afterImage?: string | null;
  images?: string[] | null;
}

interface ProjectGalleryProps {
  heading?: string;
  projects: ProjectItem[];
  categories?: string[];
  className?: string;
}

const defaultCategories = ['All', 'Commercial', 'Healthcare', 'HOA', 'Seasonal'];

export default function ProjectGallery({
  heading = 'Our Work',
  projects,
  categories = defaultCategories,
  className,
}: ProjectGalleryProps) {
  const [activeFilter, setActiveFilter] = useState('All');
  const [lightboxIndex, setLightboxIndex] = useState(-1);
  const ref = useRef<HTMLElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-80px' });

  const filtered =
    activeFilter === 'All'
      ? projects
      : projects.filter((p) => p.category === activeFilter);

  const getImageUrl = (project: ProjectItem) =>
    project.afterImage || project.beforeImage || (project.images?.[0]) || '/images/placeholder.jpg';

  const lightboxImages = filtered.map((p) => ({
    src: getImageUrl(p),
    alt: p.title,
  }));

  return (
    <section ref={ref} id="gallery" className={cn('bg-cream py-20', className)}>
      <div className="mx-auto max-w-7xl px-6">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : undefined}
          transition={{ duration: 0.5 }}
          className="mb-4 text-center font-serif text-3xl font-bold text-forest sm:text-4xl"
        >
          {heading}
        </motion.h2>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : undefined}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="mb-10 flex flex-wrap justify-center gap-2"
        >
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveFilter(cat)}
              className={cn(
                'rounded-full px-5 py-2 text-sm font-medium transition-all duration-200',
                activeFilter === cat
                  ? 'bg-forest text-white'
                  : 'bg-sand text-slate hover:bg-stone/20'
              )}
            >
              {cat}
            </button>
          ))}
        </motion.div>

        <div className="columns-1 gap-4 sm:columns-2 lg:columns-3">
          <AnimatePresence mode="popLayout">
            {filtered.map((project, i) => (
              <motion.div
                key={project.id}
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.35, delay: i * 0.05 }}
                className="mb-4 break-inside-avoid"
              >
                <button
                  onClick={() => setLightboxIndex(i)}
                  className="group relative w-full overflow-hidden rounded-xl"
                >
                  <img
                    src={getImageUrl(project)}
                    alt={project.title}
                    className="w-full object-cover transition-transform duration-500 group-hover:scale-105"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-forest/0 transition-colors duration-300 group-hover:bg-forest/30" />
                  <div className="absolute bottom-0 left-0 right-0 p-4 opacity-0 transition-opacity group-hover:opacity-100">
                    <span className="rounded-md bg-black/60 px-3 py-1.5 text-sm font-medium text-white">
                      {project.title}
                    </span>
                    <span className="ml-2 rounded-md bg-sage/80 px-2 py-1 text-xs text-white">
                      {project.category}
                    </span>
                  </div>
                </button>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        {filtered.length === 0 && (
          <p className="text-center text-stone py-12">No projects found in this category.</p>
        )}
      </div>

      <Lightbox
        images={lightboxImages}
        currentIndex={lightboxIndex}
        isOpen={lightboxIndex >= 0}
        onClose={() => setLightboxIndex(-1)}
        onPrev={() =>
          setLightboxIndex((prev) =>
            prev > 0 ? prev - 1 : lightboxImages.length - 1
          )
        }
        onNext={() =>
          setLightboxIndex((prev) =>
            prev < lightboxImages.length - 1 ? prev + 1 : 0
          )
        }
      />
    </section>
  );
}
