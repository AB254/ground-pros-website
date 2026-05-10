export const dynamic = "force-dynamic";

import { prisma } from "@/lib/prisma";
import { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import ScrollReveal from "@/components/public/ScrollReveal";
import { CheckCircle, ArrowLeft, ArrowRight } from "lucide-react";

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

  const allServices = await prisma.service.findMany({
    where: { isVisible: true },
    orderBy: { sortOrder: "asc" },
    select: { title: true, slug: true },
  });

  return (
    <div className="pt-24">
      <section className="bg-forest text-white py-20">
        <div className="max-w-6xl mx-auto px-6">
          <ScrollReveal>
            <Link
              href="/services"
              className="inline-flex items-center gap-2 text-white/70 hover:text-white mb-6 transition-colors"
            >
              <ArrowLeft className="w-4 h-4" /> All Services
            </Link>
            <h1 className="text-5xl md:text-6xl font-serif font-bold mb-6">{service.title}</h1>
            <p className="text-xl text-white/80 max-w-3xl">{service.shortDesc}</p>
          </ScrollReveal>
        </div>
      </section>

      <section className="py-20 bg-cream">
        <div className="max-w-6xl mx-auto px-6">
          <div className="grid lg:grid-cols-3 gap-12">
            <div className="lg:col-span-2">
              <ScrollReveal>
                <div className="prose prose-lg max-w-none">
                  <p className="text-slate leading-relaxed text-lg">{service.fullDesc}</p>
                </div>

                {features.length > 0 && (
                  <div className="mt-12">
                    <h2 className="text-2xl font-serif font-bold text-forest mb-6">
                      What&apos;s Included
                    </h2>
                    <div className="grid sm:grid-cols-2 gap-4">
                      {features.map((feature, i) => (
                        <div key={i} className="flex items-start gap-3">
                          <CheckCircle className="w-5 h-5 text-sage mt-0.5 flex-shrink-0" />
                          <span className="text-slate">{feature}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                <div className="mt-12 bg-pine/5 rounded-xl p-8">
                  <h3 className="text-xl font-serif font-bold text-forest mb-3">
                    Ready to Get Started?
                  </h3>
                  <p className="text-slate mb-6">
                    Contact us for a free consultation and custom proposal for your property.
                  </p>
                  <Link
                    href="/contact"
                    className="inline-flex items-center gap-2 bg-pine text-white px-6 py-3 rounded-lg hover:bg-moss transition-colors font-medium"
                  >
                    Request a Consultation <ArrowRight className="w-4 h-4" />
                  </Link>
                </div>
              </ScrollReveal>
            </div>

            <div>
              <ScrollReveal delay={0.2}>
                <div className="bg-white rounded-xl p-6 shadow-sm sticky top-28">
                  <h3 className="text-lg font-serif font-bold text-forest mb-4">All Services</h3>
                  <nav className="space-y-2">
                    {allServices.map((s) => (
                      <Link
                        key={s.slug}
                        href={`/services/${s.slug}`}
                        className={`block px-4 py-2 rounded-lg transition-colors ${
                          s.slug === slug
                            ? "bg-pine text-white"
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
