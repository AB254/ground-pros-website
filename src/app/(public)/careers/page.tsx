export const dynamic = "force-dynamic";

import { prisma } from "@/lib/prisma";
import { Metadata } from "next";
import ScrollReveal from "@/components/public/ScrollReveal";
import { MapPin, Clock, Briefcase, Send, Heart, TrendingUp, Shield, Users } from "lucide-react";
import CareerApplicationForm from "@/components/public/CareerApplicationForm";

export async function generateMetadata(): Promise<Metadata> {
  try {
    const seo = await prisma.seoSettings.findUnique({ where: { page: "careers" } });
    return {
      title: seo?.metaTitle ?? "Careers | Ground Pros Inc.",
      description: seo?.metaDesc ?? "Join our team of landscape professionals.",
    };
  } catch {
    return { title: "Careers | Ground Pros Inc.", description: "Join our team of landscape professionals." };
  }
}

export default async function CareersPage() {
  const jobs = await prisma.jobPosting.findMany({
    where: { isActive: true },
    orderBy: { createdAt: "desc" },
  });

  return (
    <div className="pt-24">
      <section className="relative bg-forest text-white py-24 overflow-hidden">
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1558904541-efa843a96f01?w=1600&q=80')] bg-cover bg-center opacity-15" />
        <div className="absolute inset-0 bg-gradient-to-b from-forest/80 to-forest" />
        <div className="relative max-w-6xl mx-auto px-6 text-center">
          <ScrollReveal>
            <span className="inline-block font-mono text-sm uppercase tracking-[0.2em] text-sage mb-4">
              Careers
            </span>
            <h1 className="text-5xl md:text-7xl font-serif font-bold mb-6">Join Our Team</h1>
            <p className="text-xl text-white/80 max-w-3xl mx-auto leading-relaxed">
              Build your career with Chicagoland&apos;s premier commercial landscape company.
            </p>
          </ScrollReveal>
        </div>
      </section>

      {/* Benefits */}
      <section className="py-24 bg-cream">
        <div className="max-w-6xl mx-auto px-6">
          <ScrollReveal>
            <div className="text-center mb-16">
              <span className="inline-block font-mono text-sm uppercase tracking-[0.2em] text-pine mb-4">
                Benefits
              </span>
              <h2 className="text-4xl font-serif font-bold text-forest mb-4">
                Why Work at Ground Pros?
              </h2>
              <p className="text-slate max-w-2xl mx-auto text-lg leading-relaxed">
                At Ground Pros Inc., we believe our team is our greatest asset. We offer competitive pay,
                benefits, and a supportive work environment.
              </p>
            </div>
          </ScrollReveal>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { icon: Heart, title: "Health Benefits", desc: "Comprehensive health, dental, and vision coverage" },
              { icon: TrendingUp, title: "Growth", desc: "Career advancement and training opportunities" },
              { icon: Shield, title: "Stability", desc: "25+ years in business with year-round work" },
              { icon: Users, title: "Team Culture", desc: "Supportive, family-oriented work environment" },
            ].map((benefit, i) => (
              <ScrollReveal key={i} delay={i * 0.1}>
                <div className="bg-white rounded-2xl p-8 text-center shadow-sm hover:shadow-lg hover:-translate-y-1 transition-all duration-300 group">
                  <div className="w-14 h-14 bg-sage/15 rounded-xl flex items-center justify-center mx-auto mb-4 group-hover:bg-pine group-hover:text-white transition-all duration-300">
                    <benefit.icon className="w-6 h-6 text-pine group-hover:text-white transition-colors" />
                  </div>
                  <h3 className="font-serif font-bold text-forest mb-2">{benefit.title}</h3>
                  <p className="text-slate text-sm">{benefit.desc}</p>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* Job Listings */}
      <section className="py-24 bg-sand">
        <div className="max-w-4xl mx-auto px-6">
          <ScrollReveal>
            <div className="text-center mb-12">
              <span className="inline-block font-mono text-sm uppercase tracking-[0.2em] text-pine mb-4">
                Openings
              </span>
              <h2 className="text-4xl font-serif font-bold text-forest">Current Openings</h2>
            </div>
          </ScrollReveal>

          {jobs.length > 0 ? (
            <div className="space-y-6">
              {jobs.map((job, i) => (
                <ScrollReveal key={job.id} delay={i * 0.1}>
                  <div className="bg-white rounded-2xl p-8 shadow-sm hover:shadow-lg transition-all duration-300">
                    <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4">
                      <div>
                        <h3 className="text-xl font-serif font-bold text-forest">{job.title}</h3>
                        <div className="flex flex-wrap gap-4 mt-3 text-sm text-stone">
                          {job.department && (
                            <span className="flex items-center gap-1.5 bg-sage/10 px-3 py-1 rounded-full">
                              <Briefcase className="w-3.5 h-3.5" /> {job.department}
                            </span>
                          )}
                          <span className="flex items-center gap-1.5 bg-sage/10 px-3 py-1 rounded-full">
                            <MapPin className="w-3.5 h-3.5" /> {job.location}
                          </span>
                          <span className="flex items-center gap-1.5 bg-sage/10 px-3 py-1 rounded-full">
                            <Clock className="w-3.5 h-3.5" /> {job.type}
                          </span>
                        </div>
                        <p className="text-slate mt-4 line-clamp-3 leading-relaxed">{job.description}</p>
                        {job.requirements && (
                          <div className="mt-4">
                            <p className="text-sm font-semibold text-charcoal mb-2">Requirements:</p>
                            <ul className="text-sm text-slate space-y-1.5">
                              {(job.requirements as string[]).slice(0, 3).map((req, j) => (
                                <li key={j} className="flex items-start gap-2">
                                  <span className="text-sage mt-1">&#8226;</span>
                                  {req}
                                </li>
                              ))}
                            </ul>
                          </div>
                        )}
                      </div>
                      <CareerApplicationForm jobId={job.id} jobTitle={job.title} />
                    </div>
                  </div>
                </ScrollReveal>
              ))}
            </div>
          ) : (
            <ScrollReveal direction="scale">
              <div className="bg-white rounded-2xl p-16 text-center shadow-sm">
                <div className="w-20 h-20 bg-sage/10 rounded-full flex items-center justify-center mx-auto mb-6">
                  <Send className="w-8 h-8 text-pine" />
                </div>
                <h3 className="text-2xl font-serif font-bold text-forest mb-3">
                  No Current Openings
                </h3>
                <p className="text-slate text-lg max-w-md mx-auto">
                  We&apos;re not currently hiring, but we&apos;re always looking for talented people.
                  Send your resume to{" "}
                  <a href="mailto:info@groundpros.com" className="text-pine hover:underline font-medium">
                    info@groundpros.com
                  </a>
                </p>
              </div>
            </ScrollReveal>
          )}
        </div>
      </section>
    </div>
  );
}
