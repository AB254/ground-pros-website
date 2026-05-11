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
  const hero = await prisma.heroSection.findFirst();
  const stats = await prisma.statItem.findMany({ where: { isVisible: true }, orderBy: { sortOrder: "asc" } });
  const services = await prisma.service.findMany({ where: { isVisible: true }, orderBy: { sortOrder: "asc" } });
  const about = await prisma.aboutSection.findFirst();
  const projects = await prisma.project.findMany({ where: { isVisible: true }, orderBy: { sortOrder: "asc" } });
  const testimonials = await prisma.testimonial.findMany({ where: { isVisible: true }, orderBy: { sortOrder: "asc" } });
  const affiliations = await prisma.affiliation.findMany({ where: { isVisible: true }, orderBy: { sortOrder: "asc" } });
  const cta = await prisma.ctaBanner.findFirst();
  const contactInfo = await prisma.contactInfo.findFirst();

  return (
    <>
      <div className="relative bg-black">
        <img
          src={hero?.imageUrl || 'https://images.unsplash.com/photo-1558904541-efa843a96f01?w=1600&q=80'}
          alt=""
          className="absolute inset-0 w-full h-full object-cover"
        />
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
      </div>

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

      <ServiceAreaMap embedUrl="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d380511.5765498485!2d-88.24247704999999!3d41.8336479!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x880e5761e1d3ddbb%3A0x5ee76a25e4183586!2sGround%20Pros%20Inc.!5e0!3m2!1sen!2sus!4v1715000000000!5m2!1sen!2sus" />

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
