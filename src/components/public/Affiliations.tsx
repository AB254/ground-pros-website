'use client';

import { cn } from '@/lib/utils';

interface Affiliation {
  name: string;
  logoUrl: string;
}

interface AffiliationsProps {
  heading?: string;
  affiliations: Affiliation[];
  className?: string;
}

export default function Affiliations({
  heading = 'Trusted By Industry Leaders',
  affiliations,
  className,
}: AffiliationsProps) {
  // Duplicate for seamless loop
  const items = [...affiliations, ...affiliations];

  return (
    <section className={cn('overflow-hidden bg-white py-16', className)}>
      {heading && (
        <h2 className="mb-10 text-center font-serif text-2xl font-bold text-forest sm:text-3xl">
          {heading}
        </h2>
      )}

      <div className="relative">
        {/* Fade edges */}
        <div className="pointer-events-none absolute left-0 top-0 z-10 h-full w-24 bg-gradient-to-r from-white to-transparent" />
        <div className="pointer-events-none absolute right-0 top-0 z-10 h-full w-24 bg-gradient-to-l from-white to-transparent" />

        <div className="flex animate-[marquee_30s_linear_infinite] items-center gap-16">
          {items.map((a, i) => (
            <img
              key={`${a.name}-${i}`}
              src={a.logoUrl}
              alt={a.name}
              className={cn(
                'h-12 w-auto shrink-0 object-contain grayscale opacity-60',
                'transition-all duration-300 hover:grayscale-0 hover:opacity-100'
              )}
            />
          ))}
        </div>
      </div>

      {/* Marquee keyframes via inline style */}
      <style>{`
        @keyframes marquee {
          from { transform: translateX(0); }
          to { transform: translateX(-50%); }
        }
      `}</style>
    </section>
  );
}
