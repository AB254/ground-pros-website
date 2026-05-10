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
} from "lucide-react";

export async function generateMetadata(): Promise<Metadata> {
  const seo = await prisma.seoSettings.findUnique({ where: { page: "services" } });
  return {
    title: seo?.metaTitle ?? "Our Services | Ground Pros Inc.",
    description: seo?.metaDesc ?? "Commercial landscaping services.",
  };
}

const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  Trees,
  Snowflake,
  Shovel,
  Leaf,
  Droplets,
  Flower2,
};

export default async function ServicesPage() {
  const services = await prisma.service.findMany({
    where: { isVisible: true },
    orderBy: { sortOrder: "asc" },
  });

  return (
    <div className="pt-24">
      <section className="bg-forest text-white py-20">
        <div className="max-w-6xl mx-auto px-6 text-center">
          <ScrollReveal>
            <h1 className="text-5xl md:text-6xl font-serif font-bold mb-6">Our Services</h1>
            <p className="text-xl text-white/80 max-w-3xl mx-auto">
              Comprehensive commercial landscape management solutions tailored to your property&apos;s needs.
            </p>
          </ScrollReveal>
        </div>
      </section>

      <section className="py-20 bg-cream">
        <div className="max-w-6xl mx-auto px-6">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((service, i) => {
              const Icon = iconMap[service.iconName ?? "Trees"] ?? Trees;
              return (
                <ScrollReveal key={service.id} delay={i * 0.1}>
                  <Link href={`/services/${service.slug}`}>
                    <div className="bg-white rounded-xl p-8 shadow-sm hover:shadow-lg hover:-translate-y-2 transition-all duration-300 h-full group">
                      <div className="w-14 h-14 bg-sage/20 rounded-xl flex items-center justify-center mb-6 group-hover:bg-pine group-hover:text-white transition-colors">
                        <Icon className="w-7 h-7 text-pine group-hover:text-white transition-colors" />
                      </div>
                      <h3 className="text-xl font-serif font-bold text-forest mb-3">
                        {service.title}
                      </h3>
                      <p className="text-slate mb-4 leading-relaxed">{service.shortDesc}</p>
                      <span className="text-pine font-medium inline-flex items-center gap-2 group-hover:gap-3 transition-all">
                        Learn More <ArrowRight className="w-4 h-4" />
                      </span>
                    </div>
                  </Link>
                </ScrollReveal>
              );
            })}
          </div>
        </div>
      </section>
    </div>
  );
}
