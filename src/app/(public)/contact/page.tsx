export const dynamic = "force-dynamic";

import { prisma } from "@/lib/prisma";
import { Metadata } from "next";
import ScrollReveal from "@/components/public/ScrollReveal";
import ContactSection from "@/components/public/ContactSection";
import { Phone, Mail, MapPin } from "lucide-react";

export async function generateMetadata(): Promise<Metadata> {
  const seo = await prisma.seoSettings.findUnique({ where: { page: "contact" } });
  return {
    title: seo?.metaTitle ?? "Contact Us | Ground Pros Inc.",
    description: seo?.metaDesc ?? "Get in touch with Ground Pros Inc.",
  };
}

export default async function ContactPage() {
  const [services, contactInfo] = await Promise.all([
    prisma.service.findMany({
      where: { isVisible: true },
      orderBy: { sortOrder: "asc" },
      select: { title: true },
    }),
    prisma.contactInfo.findFirst(),
  ]);

  return (
    <div className="pt-24">
      <section className="relative bg-forest text-white py-24 overflow-hidden">
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1416879595882-3373a0480b5b?w=1600&q=80')] bg-cover bg-center opacity-15" />
        <div className="absolute inset-0 bg-gradient-to-b from-forest/80 to-forest" />
        <div className="relative max-w-6xl mx-auto px-6 text-center">
          <ScrollReveal>
            <span className="inline-block font-mono text-sm uppercase tracking-[0.2em] text-sage mb-4">
              Get In Touch
            </span>
            <h1 className="text-5xl md:text-7xl font-serif font-bold mb-6">Contact Us</h1>
            <p className="text-xl text-white/80 max-w-3xl mx-auto leading-relaxed">
              Ready to transform your property? Get in touch for a free consultation.
            </p>
          </ScrollReveal>
        </div>
      </section>

      {/* Quick contact cards */}
      <section className="py-12 bg-cream -mt-12 relative z-10">
        <div className="max-w-4xl mx-auto px-6">
          <div className="grid md:grid-cols-3 gap-6">
            <ScrollReveal delay={0}>
              <div className="bg-white rounded-2xl p-6 shadow-lg text-center hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
                <div className="w-14 h-14 bg-sage/15 rounded-xl flex items-center justify-center mx-auto mb-4">
                  <Phone className="w-6 h-6 text-pine" />
                </div>
                <h3 className="font-serif font-bold text-forest mb-1">Call Us</h3>
                <a href="tel:6309931400" className="text-pine hover:underline font-medium">(630) 993-1400</a>
              </div>
            </ScrollReveal>
            <ScrollReveal delay={0.1}>
              <div className="bg-white rounded-2xl p-6 shadow-lg text-center hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
                <div className="w-14 h-14 bg-sage/15 rounded-xl flex items-center justify-center mx-auto mb-4">
                  <Mail className="w-6 h-6 text-pine" />
                </div>
                <h3 className="font-serif font-bold text-forest mb-1">Email Us</h3>
                <a href="mailto:info@groundpros.com" className="text-pine hover:underline font-medium">info@groundpros.com</a>
              </div>
            </ScrollReveal>
            <ScrollReveal delay={0.2}>
              <div className="bg-white rounded-2xl p-6 shadow-lg text-center hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
                <div className="w-14 h-14 bg-sage/15 rounded-xl flex items-center justify-center mx-auto mb-4">
                  <MapPin className="w-6 h-6 text-pine" />
                </div>
                <h3 className="font-serif font-bold text-forest mb-1">Visit Us</h3>
                <p className="text-slate text-sm">1470 Industrial Dr, Itasca, IL</p>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      <ContactSection
        services={services.map((s) => s.title)}
        contactInfo={
          contactInfo
            ? {
                address: contactInfo.address,
                phone: contactInfo.phone,
                fax: contactInfo.fax,
                email: contactInfo.email,
                businessHours: contactInfo.businessHours as { day: string; hours: string }[],
                socialLinks: contactInfo.socialLinks as {
                  instagram?: string;
                  linkedin?: string;
                  facebook?: string;
                },
                mapEmbedUrl: contactInfo.mapEmbedUrl,
              }
            : undefined
        }
      />
    </div>
  );
}
