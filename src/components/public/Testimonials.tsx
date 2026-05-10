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
      className={cn('relative bg-charcoal py-24 text-white overflow-hidden', className)}
    >
      <div className="absolute inset-0 bg-gradient-to-br from-charcoal via-charcoal to-forest/20" />
      <div className="relative mx-auto max-w-5xl px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : undefined}
          transition={{ duration: 0.5 }}
          className="text-center mb-14"
        >
          <span className="inline-block font-mono text-sm uppercase tracking-[0.2em] text-sage mb-4">
            Testimonials
          </span>
          <h2 className="font-serif text-4xl font-bold sm:text-5xl">{heading}</h2>
        </motion.div>

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
            className="pb-14"
          >
            {testimonials.map((t, i) => (
              <SwiperSlide key={i}>
                <div className="flex flex-col items-center text-center px-4">
                  <Quote className="mb-8 h-12 w-12 text-sage/30" />
                  <blockquote className="mb-10 max-w-3xl font-serif text-xl leading-relaxed italic text-white/90 sm:text-2xl lg:text-3xl">
                    &ldquo;{t.quote}&rdquo;
                  </blockquote>

                  {t.rating && (
                    <div className="mb-5 flex gap-1.5">
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

                  <div className="h-0.5 w-12 bg-sage/30 rounded-full mb-5" />
                  <p className="font-semibold text-lg text-sage">{t.clientName}</p>
                  {(t.clientTitle || t.company) && (
                    <p className="mt-1 text-sm text-white/50">
                      {[t.clientTitle, t.company].filter(Boolean).join(' — ')}
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
