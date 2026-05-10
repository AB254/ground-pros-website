export const dynamic = "force-dynamic";

import { prisma } from "@/lib/prisma";
import HeroSection from "@/components/public/HeroSection";
import StatsCounter from "@/components/public/StatsCounter";
import ServicesGrid from "@/components/public/ServicesGrid";
import AboutSection from "@/components/public/AboutSection";
import ProjectGallery from "@/components/public/ProjectGallery";
import Testimonials from "@/components/public/Testimonials";
import Affiliations from "@/components/public/Affiliations";
import CtaBanner from "@/components/public/CtaBanner";
import ContactSection from "@/components/public/ContactSection";
import ServiceAreaMap from "@/components/public/ServiceAreaMap";

export default async function HomePage() {
  const [hero, stats, services, about] = await Promise.all([
    prisma.heroSection.findFirst(),
    prisma.statItem.findMany({ where: { isVisible: true }, orderBy: { sortOrder: "asc" } }),
    prisma.service.findMany({ where: { isVisible: true }, orderBy: { sortOrder: "asc" } }),
    prisma.aboutSection.findFirst(),
  ]);

  const [projects, testimonials, affiliations] = await Promise.all([
    prisma.project.findMany({ where: { isVisible: true }, orderBy: { sortOrder: "asc" } }),
    prisma.testimonial.findMany({ where: { isVisible: true }, orderBy: { sortOrder: "asc" } }),
    prisma.affiliation.findMany({ where: { isVisible: true }, orderBy: { sortOrder: "asc" } }),
  ]);

  const [cta, contactInfo] = await Promise.all([
    prisma.ctaBanner.findFirst(),
    prisma.contactInfo.findFirst(),
  ]);

  return (
    <>
      {hero?.isVisible !== false && (
        <HeroSection
          heading={hero?.heading ?? "GROUND PROS INC."}
          subheading={hero?.subheading ?? "Chicagoland's Premier Commercial Landscape Partner"}
          tagline={hero?.tagline ?? "25+ Years of Landscaping Excellence"}
          ctaPrimaryText={hero?.ctaPrimaryText ?? "Request a Consultation"}
          ctaPrimaryLink={hero?.ctaPrimaryLink ?? "#contact"}
          ctaSecondaryText={hero?.ctaSecondaryText ?? "Our Services"}
          ctaSecondaryLink={hero?.ctaSecondaryLink ?? "#services"}
          imageUrl={hero?.imageUrl}
          videoUrl={hero?.videoUrl}
        />
      )}

      {stats.length > 0 && (
        <StatsCounter stats={stats.map((s) => ({ number: s.number, label: s.label }))} />
      )}

      {services.length > 0 && (
        <section id="services">
          <ServicesGrid
            services={services.map((s) => ({
              title: s.title,
              slug: s.slug,
              shortDesc: s.shortDesc,
              iconName: s.iconName ?? "Trees",
              bgImageUrl: s.bgImageUrl,
            }))}
          />
        </section>
      )}

      {about?.isVisible !== false && about && (
        <AboutSection
          heading={about.heading}
          bodyText={about.bodyText}
          bullets={about.bullets as { icon: string; text: string }[]}
          images={about.images as string[]}
        />
      )}

      {projects.length > 0 && (
        <ProjectGallery
          projects={projects.map((p) => ({
            id: p.id,
            title: p.title,
            category: p.category,
            description: p.description,
            beforeImage: p.beforeImage,
            afterImage: p.afterImage,
            images: p.images as string[] | null,
          }))}
        />
      )}

      {testimonials.length > 0 && (
        <Testimonials
          testimonials={testimonials.map((t) => ({
            quote: t.quote,
            clientName: t.clientName,
            clientTitle: t.clientTitle,
            company: t.company,
            rating: t.rating,
          }))}
        />
      )}

      {affiliations.length > 0 && (
        <Affiliations
          affiliations={affiliations.map((a) => ({
            name: a.name,
            logoUrl: a.logoUrl,
            website: a.website,
          }))}
        />
      )}

      {cta?.isVisible !== false && cta && (
        <CtaBanner
          heading={cta.heading}
          subtext={cta.subtext}
          buttonText={cta.buttonText}
          buttonLink={cta.buttonLink}
          bgImageUrl={cta.bgImageUrl}
        />
      )}

      <ServiceAreaMap />

      <section id="contact">
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
      </section>
    </>
  );
}
