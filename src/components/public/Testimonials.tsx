'use client';

import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination } from 'swiper/modules';
import { Star, Quote } from 'lucide-react';
import { cn } from '@/lib/utils';

import 'swiper/css';
import 'swiper/css/pagination';

export interface Testimonial {
  quote: string;
  clientName: string;
  clientTitle?: string | null;
  company?: string | null;
  rating?: number;
}

interface TestimonialsProps {
  heading?: string;
  testimonials: Testimonial[];
  className?: string;
}

export default function Testimonials({
  heading = 'What Our Clients Say',
  testimonials,
  className,
}: TestimonialsProps) {
  const ref = useRef<HTMLElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-80px' });

  return (
    <section
      ref={ref}
      className={cn('bg-charcoal py-20 text-white', className)}
    >
      <div className="mx-auto max-w-5xl px-6">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : undefined}
          transition={{ duration: 0.5 }}
          className="mb-12 text-center font-serif text-3xl font-bold sm:text-4xl"
        >
          {heading}
        </motion.h2>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : undefined}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <Swiper
            modules={[Autoplay, Pagination]}
            autoplay={{ delay: 5000, disableOnInteraction: false }}
            pagination={{ clickable: true }}
            loop={testimonials.length > 1}
            spaceBetween={40}
            className="pb-12"
          >
            {testimonials.map((t, i) => (
              <SwiperSlide key={i}>
                <div className="flex flex-col items-center text-center">
                  <Quote className="mb-6 h-10 w-10 text-sage/40" />
                  <blockquote className="mb-8 max-w-3xl font-serif text-xl leading-relaxed italic text-white/90 sm:text-2xl">
                    &ldquo;{t.quote}&rdquo;
                  </blockquote>

                  {/* Stars */}
                  {t.rating && (
                    <div className="mb-4 flex gap-1">
                      {Array.from({ length: 5 }).map((_, si) => (
                        <Star
                          key={si}
                          className={cn(
                            'h-5 w-5',
                            si < t.rating!
                              ? 'fill-gold text-gold'
                              : 'text-white/20'
                          )}
                        />
                      ))}
                    </div>
                  )}

                  <p className="font-semibold text-sage">{t.clientName}</p>
                  {(t.clientTitle || t.company) && (
                    <p className="mt-1 text-sm text-white/50">
                      {[t.clientTitle, t.company].filter(Boolean).join(', ')}
                    </p>
                  )}
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </motion.div>
      </div>
    </section>
  );
}
