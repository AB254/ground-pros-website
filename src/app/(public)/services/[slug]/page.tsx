export const dynamic = "force-dynamic";

import { prisma } from "@/lib/prisma";
import { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import ScrollReveal from "@/components/public/ScrollReveal";
import { CheckCircle, ArrowLeft, ArrowRight, Phone } from "lucide-react";

const serviceImages: Record<string, string> = {
  'landscape-management': 'https://images.unsplash.com/photo-1558904541-efa843a96f01?w=1600&q=80',
  'snow-ice-management': 'https://images.unsplash.com/photo-1457269449834-928af64c684d?w=1600&q=80',
  'landscape-installation': 'https://images.unsplash.com/photo-1585320806297-9794b3e4eeae?w=1600&q=80',
  'turf-plant-health-care': 'https://images.unsplash.com/photo-1592722182697-39b28cbfc1f8?w=1600&q=80',
  'irrigation-management': 'https://images.unsplash.com/photo-1416879595882-3373a0480b5b?w=1600&q=80',
  'seasonal-color-programs': 'https://images.unsplash.com/photo-1490750967868-88aa4f44baee?w=1600&q=80',
};

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const service = await prisma.service.findUnique({ where: { slug } });
  if (!service) return { title: "Service Not Found" };
  return {
    title: `${service.title} | Ground Pros Inc.`,
    description: service.shortDesc,
  };
}

export async function generateStaticParams() {
  try {
    const services = await prisma.service.findMany({ select: { slug: true } });
    return services.map((s) => ({ slug: s.slug }));
  } catch {
    return [];
  }
}

export default async function ServiceDetailPage({ params }: Props) {
  const { slug } = await params;
  const service = await prisma.service.findUnique({ where: { slug } });
  if (!service) notFound();

  const features = (service.features as string[]) ?? [];
  const heroImage = service.bgImageUrl || serviceImages[slug] || '';

  const allServices = await prisma.service.findMany({
    where: { isVisible: true },
    orderBy: { sortOrder: "asc" },
    select: { title: true, slug: true },
  });

  return (
    <div className="pt-24">
      {/* Hero with background image */}
      <section className="relative bg-forest text-white py-28 overflow-hidden">
        {heroImage && (
          <div
            className="absolute inset-0 bg-cover bg-center opacity-25"
            style={{ backgroundImage: `url(${heroImage})` }}
          />
        )}
        <div className="absolute inset-0 bg-gradient-to-b from-forest/70 to-forest" />
        <div className="relative max-w-6xl mx-auto px-6">
          <ScrollReveal>
            <Link
              href="/services"
              className="inline-flex items-center gap-2 text-white/70 hover:text-white mb-8 transition-colors font-medium"
            >
              <ArrowLeft className="w-4 h-4" /> All Services
            </Link>
            <h1 className="text-5xl md:text-7xl font-serif font-bold mb-6">{service.title}</h1>
            <p className="text-xl text-white/80 max-w-3xl leading-relaxed">{service.shortDesc}</p>
          </ScrollReveal>
        </div>
      </section>

      <section className="py-24 bg-cream">
        <div className="max-w-6xl mx-auto px-6">
          <div className="grid lg:grid-cols-3 gap-12">
            <div className="lg:col-span-2">
              <ScrollReveal>
                {heroImage && (
                  <div className="mb-10 overflow-hidden rounded-2xl shadow-lg">
                    <img src={heroImage} alt={service.title} className="w-full h-80 object-cover" loading="lazy" />
                  </div>
                )}
                <div className="prose prose-lg max-w-none">
                  <p className="text-slate leading-relaxed text-lg">{service.fullDesc}</p>
                </div>

                {features.length > 0 && (
                  <div className="mt-12">
                    <h2 className="text-2xl font-serif font-bold text-forest mb-8">
                      What&apos;s Included
                    </h2>
                    <div className="grid sm:grid-cols-2 gap-4">
                      {features.map((feature, i) => (
                        <ScrollReveal key={i} delay={i * 0.05}>
                          <div className="flex items-start gap-3 bg-white rounded-xl p-4 shadow-sm">
                            <CheckCircle className="w-5 h-5 text-sage mt-0.5 flex-shrink-0" />
                            <span className="text-slate">{feature}</span>
                          </div>
                        </ScrollReveal>
                      ))}
                    </div>
                  </div>
                )}

                <ScrollReveal delay={0.2}>
                  <div className="mt-12 bg-gradient-to-r from-pine to-forest rounded-2xl p-10 text-white">
                    <h3 className="text-2xl font-serif font-bold mb-3">
                      Ready to Get Started?
                    </h3>
                    <p className="text-white/80 mb-6 text-lg">
                      Contact us for a free consultation and custom proposal for your property.
                    </p>
                    <div className="flex flex-wrap gap-4">
                      <Link
                        href="/contact"
                        className="inline-flex items-center gap-2 bg-white text-pine px-6 py-3 rounded-xl hover:bg-sage hover:text-white transition-all duration-300 font-semibold"
                      >
                        Request a Consultation <ArrowRight className="w-4 h-4" />
                      </Link>
                      <a
                        href="tel:6309931400"
                        className="inline-flex items-center gap-2 border-2 border-white/30 text-white px-6 py-3 rounded-xl hover:border-white hover:bg-white/10 transition-all duration-300 font-semibold"
                      >
                        <Phone className="w-4 h-4" /> (630) 993-1400
                      </a>
                    </div>
                  </div>
                </ScrollReveal>
              </ScrollReveal>
            </div>

            <div>
              <ScrollReveal delay={0.2} direction="right">
                <div className="bg-white rounded-2xl p-6 shadow-sm sticky top-28">
                  <h3 className="text-lg font-serif font-bold text-forest mb-4">All Services</h3>
                  <nav className="space-y-1">
                    {allServices.map((s) => (
                      <Link
                        key={s.slug}
                        href={`/services/${s.slug}`}
                        className={`block px-4 py-3 rounded-xl transition-all duration-200 ${
                          s.slug === slug
                            ? "bg-pine text-white font-medium shadow-md"
                            : "text-slate hover:bg-sand hover:text-forest"
                        }`}
                      >
                        {s.title}
                      </Link>
                    ))}
                  </nav>
                </div>
              </ScrollReveal>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
