'use client';

import { useState, useRef } from 'react';
import { motion, AnimatePresence, useInView } from 'framer-motion';
import { cn } from '@/lib/utils';
import { Search } from 'lucide-react';
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
    <section ref={ref} id="gallery" className={cn('bg-cream py-24', className)}>
      <div className="mx-auto max-w-7xl px-6">
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          animate={isInView ? { opacity: 1, y: 0 } : undefined}
          transition={{ duration: 0.6 }}
          className="text-center mb-6"
        >
          <span className="inline-block font-mono text-sm uppercase tracking-[0.25em] text-pine mb-3">
            Portfolio
          </span>
          <h2 className="font-serif text-3xl font-bold text-forest sm:text-4xl lg:text-5xl">
            {heading}
          </h2>
          <motion.div
            initial={{ scaleX: 0 }}
            animate={isInView ? { scaleX: 1 } : undefined}
            transition={{ duration: 0.8, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
            className="mt-5 h-1 w-20 bg-gradient-to-r from-sage to-moss mx-auto rounded-full origin-center"
          />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : undefined}
          transition={{ duration: 0.5, delay: 0.15 }}
          className="mb-12 flex flex-wrap justify-center gap-3"
        >
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveFilter(cat)}
              className={cn(
                'rounded-full px-6 py-2.5 text-sm font-medium transition-all duration-300',
                activeFilter === cat
                  ? 'bg-forest text-white shadow-lg shadow-forest/20 scale-105'
                  : 'bg-white text-slate hover:bg-sand hover:text-forest hover:shadow-md'
              )}
            >
              {cat}
            </button>
          ))}
        </motion.div>

        <div className="columns-1 gap-5 sm:columns-2 lg:columns-3">
          <AnimatePresence mode="popLayout">
            {filtered.map((project, i) => (
              <motion.div
                key={project.id}
                layout
                initial={{ opacity: 0, scale: 0.85, y: 30 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.85, y: -20 }}
                transition={{
                  duration: 0.5,
                  delay: i * 0.06,
                  ease: [0.22, 1, 0.36, 1],
                }}
                className="mb-5 break-inside-avoid"
              >
                <button
                  onClick={() => setLightboxIndex(i)}
                  className="group relative w-full overflow-hidden rounded-2xl shadow-sm hover:shadow-2xl transition-shadow duration-500"
                >
                  <img
                    src={getImageUrl(project)}
                    alt={project.title}
                    className="w-full object-cover transition-transform duration-700 group-hover:scale-110"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/0 to-black/0 opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
                  <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-500">
                    <div className="w-12 h-12 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center border border-white/30 scale-75 group-hover:scale-100 transition-transform duration-500">
                      <Search className="w-5 h-5 text-white" />
                    </div>
                  </div>
                  <div className="absolute bottom-0 left-0 right-0 p-5 translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-out">
                    <p className="text-white font-semibold text-lg drop-shadow-lg">
                      {project.title}
                    </p>
                    <div className="flex items-center gap-2 mt-1.5">
                      <span className="rounded-full bg-sage/80 px-3 py-0.5 text-xs font-medium text-white">
                        {project.category}
                      </span>
                    </div>
                  </div>
                </button>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        {filtered.length === 0 && (
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center text-stone py-16 text-lg"
          >
            No projects found in this category.
          </motion.p>
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
