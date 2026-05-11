export const dynamic = "force-dynamic";

import { prisma } from "@/lib/prisma";
import { Metadata } from "next";
import Link from "next/link";
import ScrollReveal from "@/components/public/ScrollReveal";
import {
  Trees,
  Snowflake,
  Shovel,
  Leaf,
  Droplets,
  Flower2,
  ArrowRight,
  CheckCircle,
} from "lucide-react";

export async function generateMetadata(): Promise<Metadata> {
  try {
    const seo = await prisma.seoSettings.findUnique({ where: { page: "services" } });
    return {
      title: seo?.metaTitle ?? "Our Services | Ground Pros Inc.",
      description: seo?.metaDesc ?? "Commercial landscaping services.",
    };
  } catch {
    return { title: "Our Services | Ground Pros Inc.", description: "Commercial landscaping services." };
  }
}

const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  Trees,
  Snowflake,
  Shovel,
  Leaf,
  Droplets,
  Flower2,
};

const serviceImages: Record<string, string> = {
  'landscape-management': 'https://images.unsplash.com/photo-1558904541-efa843a96f01?w=800&q=80',
  'snow-ice-management': 'https://images.unsplash.com/photo-1457269449834-928af64c684d?w=800&q=80',
  'landscape-installation': 'https://images.unsplash.com/photo-1585320806297-9794b3e4eeae?w=800&q=80',
  'turf-plant-health-care': 'https://images.unsplash.com/photo-1592722182697-39b28cbfc1f8?w=800&q=80',
  'irrigation-management': 'https://images.unsplash.com/photo-1416879595882-3373a0480b5b?w=800&q=80',
  'seasonal-color-programs': 'https://images.unsplash.com/photo-1490750967868-88aa4f44baee?w=800&q=80',
};

export default async function ServicesPage() {
  const services = await prisma.service.findMany({
    where: { isVisible: true },
    orderBy: { sortOrder: "asc" },
  });

  return (
    <div>
      <section className="relative bg-black text-white pt-40 pb-24 overflow-hidden">
        <div className="absolute inset-0 bg-[url('https://www.groundpros.com/wp-content/uploads/2014/07/Service-Banner7.jpg')] bg-cover bg-center" />
        <div className="absolute inset-0 bg-black/50" />
        <div className="relative max-w-6xl mx-auto px-6 text-center">
          <ScrollReveal>
            <span className="inline-block font-mono text-sm uppercase tracking-[0.2em] text-sage mb-4">
              What We Do
            </span>
            <h1 className="text-5xl md:text-7xl font-serif font-bold mb-6">Our Services</h1>
            <p className="text-xl text-white/80 max-w-3xl mx-auto leading-relaxed">
              Comprehensive commercial landscape management solutions tailored to your property&apos;s needs.
            </p>
          </ScrollReveal>
        </div>
      </section>

      <section className="py-24 bg-cream">
        <div className="max-w-6xl mx-auto px-6">
          <div className="space-y-20">
            {services.map((service, i) => {
              const Icon = iconMap[service.iconName ?? "Trees"] ?? Trees;
              const imageUrl = service.bgImageUrl || serviceImages[service.slug] || '';
              const features = (service.features as string[]) ?? [];
              const isReversed = i % 2 !== 0;

              return (
                <ScrollReveal key={service.id} delay={0.1}>
                  <div className={`grid lg:grid-cols-2 gap-12 items-center ${isReversed ? 'lg:flex-row-reverse' : ''}`}>
                    <div className={isReversed ? 'lg:order-2' : ''}>
                      <div className="relative group">
                        <div className="aspect-[4/3] rounded-2xl overflow-hidden shadow-lg">
                          {imageUrl ? (
                            <img
                              src={imageUrl}
                              alt={service.title}
                              className="w-full h-full object-cover"
                              loading="lazy"
                            />
                          ) : (
                            <div className="w-full h-full bg-gradient-to-br from-forest to-pine flex items-center justify-center">
                              <Icon className="w-20 h-20 text-white/30" />
                            </div>
                          )}
                        </div>
                        <div className="absolute -bottom-3 -right-3 -z-10 h-full w-full rounded-2xl border-2 border-sage/20" />
                      </div>
                    </div>
                    <div className={isReversed ? 'lg:order-1' : ''}>
                      <div className="flex items-center gap-3 mb-4">
                        <div className="w-12 h-12 bg-sage/15 rounded-xl flex items-center justify-center text-pine">
                          <Icon className="w-6 h-6" />
                        </div>
                        <span className="font-mono text-xs uppercase tracking-[0.15em] text-pine">
                          Service {String(i + 1).padStart(2, '0')}
                        </span>
                      </div>
                      <h2 className="text-3xl font-serif font-bold text-forest mb-4">{service.title}</h2>
                      <p className="text-slate leading-relaxed text-lg mb-6">{service.fullDesc || service.shortDesc}</p>
                      {features.length > 0 && (
                        <div className="grid sm:grid-cols-2 gap-3 mb-6">
                          {features.slice(0, 4).map((feature, j) => (
                            <div key={j} className="flex items-start gap-2">
                              <CheckCircle className="w-4 h-4 text-sage mt-1 flex-shrink-0" />
                              <span className="text-sm text-slate">{feature}</span>
                            </div>
                          ))}
                        </div>
                      )}
                      <Link
                        href={`/services/${service.slug}`}
                        className="inline-flex items-center gap-2 bg-pine text-white px-6 py-3 rounded-xl hover:bg-moss transition-all duration-300 font-medium group hover:gap-3"
                      >
                        Learn More <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                      </Link>
                    </div>
                  </div>
                </ScrollReveal>
              );
            })}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-pine text-white text-center">
        <div className="max-w-4xl mx-auto px-6">
          <ScrollReveal direction="scale">
            <h2 className="text-3xl md:text-4xl font-serif font-bold mb-4">
              Need a Custom Solution?
            </h2>
            <p className="text-white/80 text-lg mb-8 max-w-2xl mx-auto">
              Every property is unique. Let us create a tailored landscape management plan for yours.
            </p>
            <a
              href="/contact"
              className="inline-block rounded-full bg-white text-pine px-10 py-4 font-semibold text-lg hover:bg-sage hover:text-white transition-all duration-300 shadow-lg hover:shadow-xl hover:scale-105"
            >
              Request a Consultation
            </a>
          </ScrollReveal>
        </div>
      </section>
    </div>
  );
}
