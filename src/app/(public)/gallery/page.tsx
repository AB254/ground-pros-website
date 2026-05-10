export const dynamic = "force-dynamic";

import { prisma } from "@/lib/prisma";
import { Metadata } from "next";
import ScrollReveal from "@/components/public/ScrollReveal";
import ProjectGallery from "@/components/public/ProjectGallery";

export async function generateMetadata(): Promise<Metadata> {
  const seo = await prisma.seoSettings.findUnique({ where: { page: "gallery" } });
  return {
    title: seo?.metaTitle ?? "Project Gallery | Ground Pros Inc.",
    description: seo?.metaDesc ?? "View our portfolio of commercial landscape projects.",
  };
}

export default async function GalleryPage() {
  const projects = await prisma.project.findMany({
    where: { isVisible: true },
    orderBy: { sortOrder: "asc" },
  });

  return (
    <div className="pt-24">
      <section className="bg-forest text-white py-20">
        <div className="max-w-6xl mx-auto px-6 text-center">
          <ScrollReveal>
            <h1 className="text-5xl md:text-6xl font-serif font-bold mb-6">Our Portfolio</h1>
            <p className="text-xl text-white/80 max-w-3xl mx-auto">
              Explore our commercial landscape projects across the Chicagoland area.
            </p>
          </ScrollReveal>
        </div>
      </section>

      <section className="py-20 bg-cream">
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
            <ScrollReveal>
              <div className="text-center py-20">
                <p className="text-xl text-stone">
                  Projects coming soon. Contact us to see examples of our work.
                </p>
              </div>
            </ScrollReveal>
          )}
        </div>
      </section>
    </div>
  );
}
