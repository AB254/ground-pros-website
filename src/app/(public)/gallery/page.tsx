export const dynamic = "force-dynamic";

import { prisma } from "@/lib/prisma";
import { Metadata } from "next";
import ScrollReveal from "@/components/public/ScrollReveal";
import ProjectGallery from "@/components/public/ProjectGallery";
import { Camera } from "lucide-react";

export async function generateMetadata(): Promise<Metadata> {
  try {
    const seo = await prisma.seoSettings.findUnique({ where: { page: "gallery" } });
    return {
      title: seo?.metaTitle ?? "Project Gallery | Ground Pros Inc.",
      description: seo?.metaDesc ?? "View our portfolio of commercial landscape projects.",
    };
  } catch {
    return { title: "Project Gallery | Ground Pros Inc.", description: "View our portfolio of commercial landscape projects." };
  }
}

export default async function GalleryPage() {
  const projects = await prisma.project.findMany({
    where: { isVisible: true },
    orderBy: { sortOrder: "asc" },
  });

  return (
    <div className="pt-24">
      <section className="relative bg-forest text-white py-24 overflow-hidden">
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1585320806297-9794b3e4eeae?w=1600&q=80')] bg-cover bg-center opacity-15" />
        <div className="absolute inset-0 bg-gradient-to-b from-forest/80 to-forest" />
        <div className="relative max-w-6xl mx-auto px-6 text-center">
          <ScrollReveal>
            <span className="inline-block font-mono text-sm uppercase tracking-[0.2em] text-sage mb-4">
              Portfolio
            </span>
            <h1 className="text-5xl md:text-7xl font-serif font-bold mb-6">Our Portfolio</h1>
            <p className="text-xl text-white/80 max-w-3xl mx-auto leading-relaxed">
              Explore our commercial landscape projects across the Chicagoland area.
            </p>
          </ScrollReveal>
        </div>
      </section>

      <section className="py-24 bg-cream">
        <div className="max-w-6xl mx-auto px-6">
          {projects.length > 0 ? (
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
          ) : (
            <ScrollReveal direction="scale">
              <div className="text-center py-20 bg-white rounded-2xl shadow-sm">
                <div className="w-20 h-20 bg-sage/10 rounded-full flex items-center justify-center mx-auto mb-6">
                  <Camera className="w-8 h-8 text-pine" />
                </div>
                <h2 className="text-2xl font-serif font-bold text-forest mb-3">
                  Projects Coming Soon
                </h2>
                <p className="text-xl text-stone max-w-md mx-auto">
                  Contact us to see examples of our work and discuss your project.
                </p>
                <a
                  href="/contact"
                  className="inline-block mt-6 bg-pine text-white px-8 py-3 rounded-xl hover:bg-moss transition-colors font-semibold"
                >
                  Get in Touch
                </a>
              </div>
            </ScrollReveal>
          )}
        </div>
      </section>
    </div>
  );
}
