export const dynamic = "force-dynamic";

import { prisma } from "@/lib/prisma";
import { Metadata } from "next";
import ScrollReveal from "@/components/public/ScrollReveal";
import { MapPin, Clock, Briefcase, Send } from "lucide-react";
import CareerApplicationForm from "@/components/public/CareerApplicationForm";

export async function generateMetadata(): Promise<Metadata> {
  const seo = await prisma.seoSettings.findUnique({ where: { page: "careers" } });
  return {
    title: seo?.metaTitle ?? "Careers | Ground Pros Inc.",
    description: seo?.metaDesc ?? "Join our team of landscape professionals.",
  };
}

export default async function CareersPage() {
  const jobs = await prisma.jobPosting.findMany({
    where: { isActive: true },
    orderBy: { createdAt: "desc" },
  });

  return (
    <div className="pt-24">
      <section className="bg-forest text-white py-20">
        <div className="max-w-6xl mx-auto px-6 text-center">
          <ScrollReveal>
            <h1 className="text-5xl md:text-6xl font-serif font-bold mb-6">Join Our Team</h1>
            <p className="text-xl text-white/80 max-w-3xl mx-auto">
              Build your career with Chicagoland&apos;s premier commercial landscape company.
            </p>
          </ScrollReveal>
        </div>
      </section>

      <section className="py-20 bg-cream">
        <div className="max-w-4xl mx-auto px-6">
          <ScrollReveal>
            <div className="bg-sand rounded-xl p-8 mb-12">
              <h2 className="text-2xl font-serif font-bold text-forest mb-4">
                Why Work at Ground Pros?
              </h2>
              <p className="text-slate leading-relaxed">
                At Ground Pros Inc., we believe our team is our greatest asset. We offer competitive pay,
                benefits, and a supportive work environment where you can grow your career in the
                landscape industry. Join a company that&apos;s been a trusted name in Chicagoland for over 25 years.
              </p>
            </div>
          </ScrollReveal>

          <h2 className="text-3xl font-serif font-bold text-forest mb-8">Current Openings</h2>

          {jobs.length > 0 ? (
            <div className="space-y-6">
              {jobs.map((job, i) => (
                <ScrollReveal key={job.id} delay={i * 0.1}>
                  <div className="bg-white rounded-xl p-8 shadow-sm hover:shadow-md transition-shadow">
                    <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4">
                      <div>
                        <h3 className="text-xl font-serif font-bold text-forest">{job.title}</h3>
                        <div className="flex flex-wrap gap-4 mt-2 text-sm text-stone">
                          {job.department && (
                            <span className="flex items-center gap-1">
                              <Briefcase className="w-4 h-4" /> {job.department}
                            </span>
                          )}
                          <span className="flex items-center gap-1">
                            <MapPin className="w-4 h-4" /> {job.location}
                          </span>
                          <span className="flex items-center gap-1">
                            <Clock className="w-4 h-4" /> {job.type}
                          </span>
                        </div>
                        <p className="text-slate mt-4 line-clamp-3">{job.description}</p>
                        {job.requirements && (
                          <div className="mt-4">
                            <p className="text-sm font-medium text-charcoal mb-2">Requirements:</p>
                            <ul className="text-sm text-slate space-y-1">
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
            <ScrollReveal>
              <div className="bg-white rounded-xl p-12 text-center shadow-sm">
                <Send className="w-12 h-12 text-stone mx-auto mb-4" />
                <h3 className="text-xl font-serif font-bold text-forest mb-2">
                  No Current Openings
                </h3>
                <p className="text-slate">
                  We&apos;re not currently hiring, but we&apos;re always looking for talented people.
                  Send your resume to{" "}
                  <a href="mailto:info@groundpros.com" className="text-pine hover:underline">
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
