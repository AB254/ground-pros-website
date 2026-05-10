export const dynamic = "force-dynamic";

import { prisma } from "@/lib/prisma";
import { Metadata } from "next";
import ScrollReveal from "@/components/public/ScrollReveal";
import ContactSection from "@/components/public/ContactSection";

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
      <section className="bg-forest text-white py-20">
        <div className="max-w-6xl mx-auto px-6 text-center">
          <ScrollReveal>
            <h1 className="text-5xl md:text-6xl font-serif font-bold mb-6">Contact Us</h1>
            <p className="text-xl text-white/80 max-w-3xl mx-auto">
              Ready to transform your property? Get in touch for a free consultation.
            </p>
          </ScrollReveal>
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
