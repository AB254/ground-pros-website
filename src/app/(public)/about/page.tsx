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
    <div>
      {/* Hero Banner */}
      <section className="relative bg-black text-white pt-40 pb-24 overflow-hidden">
        <div className="absolute inset-0 bg-[url('https://www.groundpros.com/wp-content/uploads/2018/04/Gp-Headers-About-Us.jpg')] bg-cover bg-center" />
        <div className="absolute inset-0 bg-black/50" />
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
              <div className="relative group">
                <div className="overflow-hidden rounded-2xl shadow-xl">
                  <img
                    src="https://www.groundpros.com/wp-content/uploads/2014/07/About-Us-Mike-Gina-300x240.jpg"
                    alt="Michael & Gina Pezza - Ground Pros Leadership"
                    className="w-full object-cover transition-transform duration-700 group-hover:scale-105"
                    loading="lazy"
                  />
                </div>
                <div className="absolute -bottom-5 left-1/2 -translate-x-1/2 bg-forest text-white rounded-2xl px-6 py-4 shadow-xl text-center z-10">
                  <p className="text-3xl font-mono font-bold">25+</p>
                  <p className="text-xs uppercase tracking-wider text-sage mt-1">Years of Excellence</p>
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
              <div className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-lg transition-shadow duration-300 group">
                <div className="overflow-hidden">
                  <img
                    src="https://www.groundpros.com/wp-content/uploads/2017/06/About-Us-Mike.jpg"
                    alt="Michael Pezza"
                    className="w-full aspect-[4/5] object-cover object-top transition-transform duration-700 group-hover:scale-105"
                    loading="lazy"
                  />
                </div>
                <div className="p-6 text-center">
                  <h3 className="text-xl font-serif font-bold text-forest">Michael Pezza, CLP</h3>
                  <p className="text-pine font-medium mt-1">President & Founder</p>
                  <p className="text-stone text-sm mt-3 leading-relaxed">
                    Founded Ground Pros Inc. in 1992. Board of Directors member for ILCA, recognized Trailblazer by NALP, and Landscape Industry Certified Manager.
                  </p>
                </div>
              </div>
            </ScrollReveal>
            <ScrollReveal delay={0.2} direction="right">
              <div className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-lg transition-shadow duration-300 group">
                <div className="overflow-hidden">
                  <img
                    src="https://www.groundpros.com/wp-content/uploads/2017/06/About-Us-Gina.jpg"
                    alt="Gina Pezza"
                    className="w-full aspect-[4/5] object-cover object-top transition-transform duration-700 group-hover:scale-105"
                    loading="lazy"
                  />
                </div>
                <div className="p-6 text-center">
                  <h3 className="text-xl font-serif font-bold text-forest">Gina Pezza</h3>
                  <p className="text-pine font-medium mt-1">VP & Director of Sales</p>
                  <p className="text-stone text-sm mt-3 leading-relaxed">
                    Building trust and client relationships is the number one most important part of building a successful business. Active member of BOMA and CAI.
                  </p>
                </div>
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
            <div className="flex flex-wrap justify-center gap-8">
              {affiliations.map((a, i) => (
                <ScrollReveal key={a.id} delay={i * 0.1} direction="scale">
                  <a
                    href={a.website || '#'}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group flex flex-col items-center justify-center bg-white rounded-2xl p-8 w-52 h-52 shadow-sm hover:shadow-xl hover:-translate-y-2 transition-all duration-500"
                  >
                    <div className="w-24 h-24 mb-4 flex items-center justify-center">
                      <img
                        src={a.logoUrl}
                        alt={a.name}
                        className="max-w-full max-h-full object-contain grayscale group-hover:grayscale-0 transition-all duration-500 group-hover:scale-110"
                        loading="lazy"
                      />
                    </div>
                    <p className="text-xs font-semibold text-charcoal/70 text-center leading-snug group-hover:text-pine transition-colors">{a.name}</p>
                  </a>
                </ScrollReveal>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* GPI Gives Back */}
      <section className="relative py-28 overflow-hidden">
        <div className="absolute inset-0 bg-[url('https://www.groundpros.com/wp-content/uploads/2015/03/GPI-Gives-Back-Loaves-Fishes.jpg')] bg-cover bg-center" />
        <div className="absolute inset-0 bg-black/75" />
        <div className="relative max-w-6xl mx-auto px-6">
          <ScrollReveal>
            <div className="text-center mb-16">
              <span className="inline-block font-mono text-sm uppercase tracking-[0.25em] text-sage mb-4">
                Community
              </span>
              <h2 className="text-4xl lg:text-5xl font-serif font-bold text-white mb-6">
                GPI Gives Back
              </h2>
              <div className="h-1 w-20 bg-gradient-to-r from-sage to-moss mx-auto rounded-full" />
            </div>
          </ScrollReveal>

          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <ScrollReveal direction="left">
              <div>
                <p className="text-white/90 text-lg leading-relaxed mb-6">
                  At Ground Pros, we believe in leaving the world better than we found it. Each year, we select a new charity — targeting smaller, local organizations in the Chicagoland area — and rally our team through company-sponsored raffles, food drives, and volunteer hours.
                </p>
                <p className="text-white/70 leading-relaxed mb-8">
                  Our commitment to community goes beyond landscaping. We are dedicated to creating an organization that through hard work and philanthropy makes a lasting positive impact on the communities we serve.
                </p>

                <div className="space-y-4">
                  <ScrollReveal delay={0.1}>
                    <div className="bg-white/10 backdrop-blur-sm rounded-xl p-5 border border-white/10 hover:border-sage/30 transition-all duration-300">
                      <div className="flex items-start gap-4">
                        <div className="w-10 h-10 rounded-lg bg-sage/20 flex items-center justify-center flex-shrink-0 mt-1">
                          <Heart className="w-5 h-5 text-sage" />
                        </div>
                        <div>
                          <h4 className="text-white font-semibold">Loaves and Fishes, Naperville IL</h4>
                          <p className="text-white/60 text-sm mt-1">2017 — Packed 690 Nutrition Bags during our March volunteer event</p>
                        </div>
                      </div>
                    </div>
                  </ScrollReveal>
                  <ScrollReveal delay={0.2}>
                    <div className="bg-white/10 backdrop-blur-sm rounded-xl p-5 border border-white/10 hover:border-sage/30 transition-all duration-300">
                      <div className="flex items-start gap-4">
                        <div className="w-10 h-10 rounded-lg bg-sage/20 flex items-center justify-center flex-shrink-0 mt-1">
                          <Heart className="w-5 h-5 text-sage" />
                        </div>
                        <div>
                          <h4 className="text-white font-semibold">Feed My Starving Children, Schaumburg IL</h4>
                          <p className="text-white/60 text-sm mt-1">2016 — Packed 138 boxes totaling 29,808 meals and donated $1,552 to feed 19 children for a whole year</p>
                        </div>
                      </div>
                    </div>
                  </ScrollReveal>
                </div>
              </div>
            </ScrollReveal>

            <ScrollReveal direction="right" delay={0.2}>
              <div className="space-y-5">
                <div className="overflow-hidden rounded-2xl shadow-xl group">
                  <img
                    src="https://www.groundpros.com/wp-content/uploads/2015/03/GPI-Gives-Back-Loaves-Fishes.jpg"
                    alt="GPI Gives Back - Loaves and Fishes"
                    className="w-full aspect-[4/3] object-cover transition-transform duration-700 group-hover:scale-105"
                    loading="lazy"
                  />
                </div>
                <div className="overflow-hidden rounded-2xl shadow-xl group">
                  <img
                    src="https://www.groundpros.com/wp-content/uploads/2015/03/GPI-Give-Back-Feed-my-starving-children.jpg"
                    alt="GPI Gives Back - Feed My Starving Children"
                    className="w-full aspect-[4/3] object-cover transition-transform duration-700 group-hover:scale-105"
                    loading="lazy"
                  />
                </div>
              </div>
            </ScrollReveal>
          </div>

          <ScrollReveal delay={0.3}>
            <div className="mt-16 text-center">
              <p className="text-white/50 text-sm uppercase tracking-wider mb-4">Past Charity Partners</p>
              <div className="flex flex-wrap justify-center gap-x-6 gap-y-2 text-white/40 text-sm">
                <span className="hover:text-sage transition-colors">The Peoples Resource Center</span>
                <span>•</span>
                <span className="hover:text-sage transition-colors">Su Casa — A Shelter for Families</span>
                <span>•</span>
                <span className="hover:text-sage transition-colors">Hesed House</span>
                <span>•</span>
                <span className="hover:text-sage transition-colors">Nuestros Pequeños Hermanos</span>
                <span>•</span>
                <span className="hover:text-sage transition-colors">Friends of the Orphans</span>
                <span>•</span>
                <span className="hover:text-sage transition-colors">Bensenville-Wood Dale Food Pantry</span>
                <span>•</span>
                <span className="hover:text-sage transition-colors">Dominican Literacy Center</span>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </section>

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
