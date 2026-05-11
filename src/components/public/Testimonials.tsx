'use client';

import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination, EffectFade } from 'swiper/modules';
import { Star, Quote } from 'lucide-react';
import { cn } from '@/lib/utils';

import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/effect-fade';

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
      className={cn('relative py-28 text-white overflow-hidden', className)}
    >
      <div className="absolute inset-0 bg-[url('https://www.groundpros.com/wp-content/uploads/2019/05/Schaumburg-Corporate-8-e1571424287942.jpg')] bg-cover bg-center" />
      <div className="absolute inset-0 bg-black/80" />

      <div className="absolute top-0 left-0 w-72 h-72 bg-sage/5 rounded-full -translate-x-1/2 -translate-y-1/2 blur-3xl" />
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-sage/5 rounded-full translate-x-1/3 translate-y-1/3 blur-3xl" />

      <div className="relative mx-auto max-w-6xl px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : undefined}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="text-center mb-16"
        >
          <motion.span
            initial={{ opacity: 0, scale: 0.8 }}
            animate={isInView ? { opacity: 1, scale: 1 } : undefined}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="inline-block font-mono text-sm uppercase tracking-[0.25em] text-sage mb-4"
          >
            Testimonials
          </motion.span>
          <h2 className="font-serif text-4xl font-bold sm:text-5xl lg:text-6xl">{heading}</h2>
          <motion.div
            initial={{ scaleX: 0 }}
            animate={isInView ? { scaleX: 1 } : undefined}
            transition={{ duration: 0.8, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
            className="mt-6 h-1 w-20 bg-gradient-to-r from-sage to-moss mx-auto rounded-full origin-center"
          />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : undefined}
          transition={{ duration: 0.8, delay: 0.3 }}
        >
          <Swiper
            modules={[Autoplay, Pagination, EffectFade]}
            autoplay={{ delay: 6000, disableOnInteraction: false }}
            pagination={{ clickable: true }}
            effect="fade"
            fadeEffect={{ crossFade: true }}
            loop={testimonials.length > 1}
            spaceBetween={40}
            className="pb-16 testimonial-swiper"
          >
            {testimonials.map((t, i) => (
              <SwiperSlide key={i}>
                <div className="flex flex-col items-center text-center px-4 md:px-16">
                  <div className="relative mb-10">
                    <Quote className="h-16 w-16 text-sage/20" />
                    <div className="absolute inset-0 bg-sage/10 rounded-full blur-xl scale-150" />
                  </div>

                  <blockquote className="mb-10 max-w-4xl font-serif text-xl leading-relaxed text-white/90 sm:text-2xl lg:text-3xl lg:leading-relaxed">
                    &ldquo;{t.quote}&rdquo;
                  </blockquote>

                  {t.rating && (
                    <div className="mb-6 flex gap-2">
                      {Array.from({ length: 5 }).map((_, si) => (
                        <Star
                          key={si}
                          className={cn(
                            'h-5 w-5 transition-all duration-300',
                            si < t.rating!
                              ? 'fill-gold text-gold drop-shadow-[0_0_6px_rgba(197,165,90,0.5)]'
                              : 'text-white/20'
                          )}
                        />
                      ))}
                    </div>
                  )}

                  <div className="h-px w-16 bg-gradient-to-r from-transparent via-sage/50 to-transparent mb-6" />

                  <p className="font-semibold text-lg text-sage">{t.clientName}</p>
                  {(t.clientTitle || t.company) && (
                    <p className="mt-1.5 text-sm text-white/50 tracking-wide">
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
