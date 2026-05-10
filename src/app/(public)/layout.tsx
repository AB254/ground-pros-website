export const dynamic = "force-dynamic";

import { prisma } from "@/lib/prisma";
import Navbar from "@/components/public/Navbar";
import Footer from "@/components/public/Footer";

export default async function PublicLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const services = await prisma.service.findMany({
    where: { isVisible: true },
    orderBy: { sortOrder: "asc" },
    select: { title: true, slug: true },
  });
  const footerContent = await prisma.footerContent.findFirst();
  const contactInfo = await prisma.contactInfo.findFirst();

  return (
    <>
      <Navbar
        links={[
          { label: "Home", href: "/" },
          { label: "About", href: "/about" },
          { label: "Services", href: "/services" },
          { label: "Gallery", href: "/gallery" },
          { label: "Careers", href: "/careers" },
          { label: "Contact", href: "/contact" },
        ]}
      />
      <main className="flex-1">{children}</main>
      <Footer
        description={footerContent?.description ?? ""}
        quickLinks={(footerContent?.quickLinks as { label: string; url: string }[]) ?? []}
        services={services.map((s) => ({ title: s.title, slug: s.slug }))}
        copyright={footerContent?.copyright ?? ""}
        showNewsletter={footerContent?.showNewsletter ?? true}
        contactInfo={
          contactInfo
            ? {
                address: contactInfo.address,
                phone: contactInfo.phone,
                email: contactInfo.email,
                socialLinks: contactInfo.socialLinks as {
                  instagram?: string;
                  linkedin?: string;
                  facebook?: string;
                },
              }
            : undefined
        }
      />
    </>
  );
}
