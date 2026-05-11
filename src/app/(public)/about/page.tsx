export const dynamic = "force-dynamic";

import { prisma } from "@/lib/prisma";
import { Metadata } from "next";
import ScrollReveal from "@/components/public/ScrollReveal";
import { Award, Shield, Clock, Leaf, Users, Target, Heart, Star, CheckCircle } from "lucide-react";

export async function generateMetadata(): Promise<Metadata> {
  try {
    const seo = await prisma.seoSettings.findUnique({ where: { page: "about" } });
    return {
      title: seo?.metaTitle ?? "About Ground Pros Inc.",
      description: seo?.metaDesc ?? "Learn about Ground Pros Inc.",
    };
  } catch {
    return { title: "About Ground Pros Inc.", description: "Learn about Ground Pros Inc." };
  }
}

const iconMap: Record<string, React.ReactNode> = {
  Award: <Award className="w-7 h-7" />,
  Shield: <Shield className="w-7 h-7" />,
  Clock: <Clock className="w-7 h-7" />,
  Leaf: <Leaf className="w-7 h-7" />,
  Users: <Users className="w-7 h-7" />,
  Target: <Target className="w-7 h-7" />,
  Heart: <Heart className="w-7 h-7" />,
  Star: <Star className="w-7 h-7" />,
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
      <section className="relative bg-forest text-white py-24 overflow-hidden">
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1558904541-efa843a96f01?w=1600&q=80')] bg-cover bg-center opacity-20" />
        <div className="absolute inset-0 bg-gradient-to-b from-forest/80 to-forest" />
        <div className="relative max-w-6xl mx-auto px-6 text-center">
          <ScrollReveal>
            <span className="inline-block font-mono text-sm uppercase tracking-[0.2em] text-sage mb-4">
              Our Story
            </span>
            <h1 className="text-5xl md:text-7xl font-serif font-bold mb-6">About Ground Pros</h1>
            <p className="text-xl text-white/80 max-w-3xl mx-auto leading-relaxed">
              For over 25 years, we&apos;ve been Chicagoland&apos;s trusted partner in commercial landscape management.
            </p>
          </ScrollReveal>
        </div>
      </section>

      {/* Our Story */}
      <section className="py-24 bg-cream">
        <div className="max-w-6xl mx-auto px-6">
          <div className="grid md:grid-cols-2 gap-16 items-center">
            <ScrollReveal direction="left">
              <div>
                <span className="inline-block font-mono text-sm uppercase tracking-[0.2em] text-pine mb-4">
                  Since 1999
                </span>
                <h2 className="text-4xl lg:text-5xl font-serif font-bold text-forest mb-6">Our Story</h2>
                <p className="text-slate leading-relaxed text-lg mb-6">
                  {about?.bodyText ??
                    "Ground Pros Inc. has been providing premier commercial landscape management services to the Chicagoland area for over 25 years."}
                </p>
                <p className="text-slate leading-relaxed mb-8">
                  Founded with a vision to transform commercial properties through landscaping excellence,
                  creative solutions, and quality craftsmanship, Ground Pros has grown from a small local
                  operation to one of the most trusted names in Chicagoland commercial landscaping.
                </p>
                <div className="flex flex-wrap gap-6">
                  <div className="text-center">
                    <p className="text-3xl font-mono font-bold text-pine">500+</p>
                    <p className="text-sm text-stone mt-1">Properties Managed</p>
                  </div>
                  <div className="text-center">
                    <p className="text-3xl font-mono font-bold text-pine">100%</p>
                    <p className="text-sm text-stone mt-1">Client Satisfaction</p>
                  </div>
                  <div className="text-center">
                    <p className="text-3xl font-mono font-bold text-pine">24/7</p>
                    <p className="text-sm text-stone mt-1">Snow Response</p>
                  </div>
                </div>
              </div>
            </ScrollReveal>
            <ScrollReveal direction="right" delay={0.2}>
              <div className="relative">
                <div className="bg-sand rounded-2xl p-8 aspect-square flex items-center justify-center overflow-hidden relative">
                  <div
                    className="absolute inset-0 bg-cover bg-center"
                    style={{ backgroundImage: "url('https://images.unsplash.com/photo-1558904541-efa843a96f01?w=800&q=80')" }}
                  />
                  <div className="absolute inset-0 bg-forest/60" />
                  <div className="relative text-center text-white">
                    <p className="text-8xl font-mono font-bold">25+</p>
                    <p className="text-xl mt-4 font-serif">Years of Excellence</p>
                  </div>
                </div>
                <div className="absolute -bottom-4 -right-4 -z-10 h-full w-full rounded-2xl border-2 border-sage/30" />
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* Mission & Values */}
      <section className="py-24 bg-sand">
        <div className="max-w-6xl mx-auto px-6">
          <ScrollReveal>
            <div className="text-center mb-16">
              <span className="inline-block font-mono text-sm uppercase tracking-[0.2em] text-pine mb-4">
                Our Foundation
              </span>
              <h2 className="text-4xl lg:text-5xl font-serif font-bold text-forest mb-6">Our Mission</h2>
              <p className="text-2xl text-pine italic font-serif max-w-2xl mx-auto">
                &ldquo;To Create Raving Fans by Adhering to our Core Values&rdquo;
              </p>
            </div>
          </ScrollReveal>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {bullets.map((bullet, i) => (
              <ScrollReveal key={i} delay={i * 0.12}>
                <div className="bg-white rounded-2xl p-8 text-center shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 group">
                  <div className="w-16 h-16 bg-sage/15 rounded-2xl flex items-center justify-center mx-auto mb-5 text-pine group-hover:bg-pine group-hover:text-white transition-all duration-300">
                    {iconMap[bullet.icon] ?? <Star className="w-7 h-7" />}
                  </div>
                  <p className="text-charcoal font-semibold text-lg">{bullet.text}</p>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-24 bg-forest text-white">
        <div className="max-w-6xl mx-auto px-6">
          <ScrollReveal>
            <div className="text-center mb-16">
              <span className="inline-block font-mono text-sm uppercase tracking-[0.2em] text-sage mb-4">
                Why Ground Pros
              </span>
              <h2 className="text-4xl lg:text-5xl font-serif font-bold mb-4">What Sets Us Apart</h2>
            </div>
          </ScrollReveal>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              { title: "Proactive Communication", desc: "We keep you informed with regular updates, reports, and proactive recommendations for your property." },
              { title: "Certified Professionals", desc: "Our team includes CLPs, ISA Certified Arborists, and trained landscape technicians." },
              { title: "Technology-Driven", desc: "We leverage the latest technology for GPS tracking, real-time reporting, and efficient operations." },
            ].map((item, i) => (
              <ScrollReveal key={i} delay={i * 0.15}>
                <div className="border border-white/15 rounded-2xl p-8 hover:border-sage/50 transition-colors duration-300">
                  <div className="w-10 h-10 rounded-lg bg-sage/20 flex items-center justify-center mb-5">
                    <CheckCircle className="w-5 h-5 text-sage" />
                  </div>
                  <h3 className="text-xl font-serif font-bold mb-3">{item.title}</h3>
                  <p className="text-white/70 leading-relaxed">{item.desc}</p>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* Leadership */}
      <section className="py-24 bg-cream">
        <div className="max-w-6xl mx-auto px-6">
          <ScrollReveal>
            <div className="text-center mb-16">
              <span className="inline-block font-mono text-sm uppercase tracking-[0.2em] text-pine mb-4">
                Our Team
              </span>
              <h2 className="text-4xl lg:text-5xl font-serif font-bold text-forest">Leadership</h2>
            </div>
          </ScrollReveal>
          <div className="grid md:grid-cols-2 gap-8 max-w-3xl mx-auto">
            <ScrollReveal delay={0.1} direction="left">
              <div className="bg-white rounded-2xl p-8 text-center shadow-sm hover:shadow-lg transition-shadow duration-300">
                <div className="w-28 h-28 bg-gradient-to-br from-sage/30 to-pine/20 rounded-full mx-auto mb-5 flex items-center justify-center">
                  <Users className="w-12 h-12 text-pine" />
                </div>
                <h3 className="text-xl font-serif font-bold text-forest">Mike Pezza, CLP</h3>
                <p className="text-pine font-medium mt-1">President / CEO</p>
                <p className="text-stone text-sm mt-3">mikep@groundpros.com</p>
              </div>
            </ScrollReveal>
            <ScrollReveal delay={0.2} direction="right">
              <div className="bg-white rounded-2xl p-8 text-center shadow-sm hover:shadow-lg transition-shadow duration-300">
                <div className="w-28 h-28 bg-gradient-to-br from-sage/30 to-pine/20 rounded-full mx-auto mb-5 flex items-center justify-center">
                  <Users className="w-12 h-12 text-pine" />
                </div>
                <h3 className="text-xl font-serif font-bold text-forest">Philip Pezza</h3>
                <p className="text-pine font-medium mt-1">President</p>
                <p className="text-stone text-sm mt-3">philipp@groundpros.com</p>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* Certifications */}
      {affiliations.length > 0 && (
        <section className="py-24 bg-sand">
          <div className="max-w-6xl mx-auto px-6">
            <ScrollReveal>
              <div className="text-center mb-16">
                <span className="inline-block font-mono text-sm uppercase tracking-[0.2em] text-pine mb-4">
                  Trusted Partners
                </span>
                <h2 className="text-4xl lg:text-5xl font-serif font-bold text-forest">
                  Certifications & Affiliations
                </h2>
              </div>
            </ScrollReveal>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              {affiliations.map((a, i) => (
                <ScrollReveal key={a.id} delay={i * 0.1} direction="scale">
                  <div className="bg-white rounded-2xl p-8 text-center shadow-sm hover:shadow-lg hover:-translate-y-1 transition-all duration-300">
                    <div className="h-20 flex items-center justify-center mb-4">
                      <Award className="w-14 h-14 text-pine" />
                    </div>
                    <p className="text-sm font-semibold text-charcoal">{a.name}</p>
                  </div>
                </ScrollReveal>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* CTA */}
      <section className="py-20 bg-pine text-white text-center">
        <div className="max-w-4xl mx-auto px-6">
          <ScrollReveal direction="scale">
            <h2 className="text-3xl md:text-4xl font-serif font-bold mb-4">
              Ready to Transform Your Property?
            </h2>
            <p className="text-white/80 text-lg mb-8 max-w-2xl mx-auto">
              Get a free consultation and custom landscape management proposal for your commercial property.
            </p>
            <a
              href="/contact"
              className="inline-block rounded-full bg-white text-pine px-10 py-4 font-semibold text-lg hover:bg-sage hover:text-white transition-all duration-300 shadow-lg hover:shadow-xl hover:scale-105"
            >
              Contact Us Today
            </a>
          </ScrollReveal>
        </div>
      </section>
    </div>
  );
}
