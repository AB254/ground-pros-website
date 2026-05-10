export const dynamic = "force-dynamic";

import { prisma } from "@/lib/prisma";
import { Metadata } from "next";
import ScrollReveal from "@/components/public/ScrollReveal";
import { Award, Shield, Clock, Leaf, Users, Target, Heart, Star } from "lucide-react";

export async function generateMetadata(): Promise<Metadata> {
  const seo = await prisma.seoSettings.findUnique({ where: { page: "about" } });
  return {
    title: seo?.metaTitle ?? "About Ground Pros Inc.",
    description: seo?.metaDesc ?? "Learn about Ground Pros Inc.",
  };
}

const iconMap: Record<string, React.ReactNode> = {
  Award: <Award className="w-6 h-6" />,
  Shield: <Shield className="w-6 h-6" />,
  Clock: <Clock className="w-6 h-6" />,
  Leaf: <Leaf className="w-6 h-6" />,
  Users: <Users className="w-6 h-6" />,
  Target: <Target className="w-6 h-6" />,
  Heart: <Heart className="w-6 h-6" />,
  Star: <Star className="w-6 h-6" />,
};

export default async function AboutPage() {
  const [about, affiliations] = await Promise.all([
    prisma.aboutSection.findFirst(),
    prisma.affiliation.findMany({ where: { isVisible: true }, orderBy: { sortOrder: "asc" } }),
  ]);

  const bullets = (about?.bullets as { icon: string; text: string }[]) ?? [];

  return (
    <div className="pt-24">
      {/* Hero Banner */}
      <section className="bg-forest text-white py-20">
        <div className="max-w-6xl mx-auto px-6 text-center">
          <ScrollReveal>
            <h1 className="text-5xl md:text-6xl font-serif font-bold mb-6">About Ground Pros</h1>
            <p className="text-xl text-white/80 max-w-3xl mx-auto">
              For over 25 years, we&apos;ve been Chicagoland&apos;s trusted partner in commercial landscape management.
            </p>
          </ScrollReveal>
        </div>
      </section>

      {/* Our Story */}
      <section className="py-20 bg-cream">
        <div className="max-w-6xl mx-auto px-6">
          <ScrollReveal>
            <div className="grid md:grid-cols-2 gap-16 items-center">
              <div>
                <h2 className="text-4xl font-serif font-bold text-forest mb-6">Our Story</h2>
                <p className="text-slate leading-relaxed text-lg mb-6">
                  {about?.bodyText ??
                    "Ground Pros Inc. has been providing premier commercial landscape management services to the Chicagoland area for over 25 years."}
                </p>
                <p className="text-slate leading-relaxed">
                  Founded with a vision to transform commercial properties through landscaping excellence,
                  creative solutions, and quality craftsmanship, Ground Pros has grown from a small local
                  operation to one of the most trusted names in Chicagoland commercial landscaping.
                </p>
              </div>
              <div className="bg-sand rounded-2xl p-8 aspect-square flex items-center justify-center">
                <div className="text-center">
                  <p className="text-8xl font-mono font-bold text-pine">25+</p>
                  <p className="text-xl text-slate mt-4">Years of Excellence</p>
                </div>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* Mission & Values */}
      <section className="py-20 bg-sand">
        <div className="max-w-6xl mx-auto px-6">
          <ScrollReveal>
            <div className="text-center mb-16">
              <h2 className="text-4xl font-serif font-bold text-forest mb-4">Our Mission</h2>
              <p className="text-2xl text-pine italic font-serif">
                &ldquo;To Create Raving Fans by Adhering to our Core Values&rdquo;
              </p>
            </div>
          </ScrollReveal>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {bullets.map((bullet, i) => (
              <ScrollReveal key={i} delay={i * 0.1}>
                <div className="bg-white rounded-xl p-8 text-center shadow-sm hover:shadow-md transition-shadow">
                  <div className="w-16 h-16 bg-sage/20 rounded-full flex items-center justify-center mx-auto mb-4 text-pine">
                    {iconMap[bullet.icon] ?? <Star className="w-6 h-6" />}
                  </div>
                  <p className="text-charcoal font-medium">{bullet.text}</p>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* Leadership */}
      <section className="py-20 bg-cream">
        <div className="max-w-6xl mx-auto px-6">
          <ScrollReveal>
            <h2 className="text-4xl font-serif font-bold text-forest mb-12 text-center">Leadership</h2>
          </ScrollReveal>
          <div className="grid md:grid-cols-2 gap-8 max-w-3xl mx-auto">
            <ScrollReveal delay={0.1}>
              <div className="bg-white rounded-xl p-8 text-center shadow-sm">
                <div className="w-24 h-24 bg-sand rounded-full mx-auto mb-4 flex items-center justify-center">
                  <Users className="w-10 h-10 text-pine" />
                </div>
                <h3 className="text-xl font-serif font-bold text-forest">Mike Pezza, CLP</h3>
                <p className="text-pine font-medium">President / CEO</p>
                <p className="text-stone text-sm mt-2">mikep@groundpros.com</p>
              </div>
            </ScrollReveal>
            <ScrollReveal delay={0.2}>
              <div className="bg-white rounded-xl p-8 text-center shadow-sm">
                <div className="w-24 h-24 bg-sand rounded-full mx-auto mb-4 flex items-center justify-center">
                  <Users className="w-10 h-10 text-pine" />
                </div>
                <h3 className="text-xl font-serif font-bold text-forest">Philip Pezza</h3>
                <p className="text-pine font-medium">President</p>
                <p className="text-stone text-sm mt-2">philipp@groundpros.com</p>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* Certifications */}
      {affiliations.length > 0 && (
        <section className="py-20 bg-sand">
          <div className="max-w-6xl mx-auto px-6">
            <ScrollReveal>
              <h2 className="text-4xl font-serif font-bold text-forest mb-12 text-center">
                Certifications & Affiliations
              </h2>
            </ScrollReveal>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              {affiliations.map((a, i) => (
                <ScrollReveal key={a.id} delay={i * 0.1}>
                  <div className="bg-white rounded-xl p-6 text-center shadow-sm hover:shadow-md transition-shadow">
                    <div className="h-20 flex items-center justify-center mb-4">
                      <Award className="w-12 h-12 text-pine" />
                    </div>
                    <p className="text-sm font-medium text-charcoal">{a.name}</p>
                  </div>
                </ScrollReveal>
              ))}
            </div>
          </div>
        </section>
      )}
    </div>
  );
}
