export const dynamic = "force-dynamic";

import { Metadata } from "next";
import ScrollReveal from "@/components/public/ScrollReveal";

export const metadata: Metadata = {
  title: "Terms of Service | Ground Pros Inc.",
  description: "Terms of service for Ground Pros Inc.",
};

export default function TermsPage() {
  return (
    <div>
      <section className="relative bg-black text-white pt-40 pb-24 overflow-hidden">
        <div className="absolute inset-0 bg-[url('https://www.groundpros.com/wp-content/uploads/2019/05/Maintenace-Page-Slider_preview.jpeg')] bg-cover bg-center" />
        <div className="absolute inset-0 bg-black/50" />
        <div className="relative max-w-6xl mx-auto px-6 text-center">
          <ScrollReveal>
            <h1 className="text-5xl md:text-7xl font-serif font-bold mb-6">Terms of Service</h1>
            <p className="text-xl text-white/80 max-w-3xl mx-auto leading-relaxed">
              Please read these terms carefully before using our services.
            </p>
          </ScrollReveal>
        </div>
      </section>

      <section className="py-24 bg-cream">
        <div className="max-w-4xl mx-auto px-6 prose prose-lg">
          <ScrollReveal>
            <p className="text-slate leading-relaxed">
              <strong>Last Updated:</strong> May 11, 2026
            </p>

            <h2 className="text-2xl font-serif font-bold text-forest mt-10 mb-4">1. Acceptance of Terms</h2>
            <p className="text-slate leading-relaxed">
              By accessing and using the Ground Pros Inc. website, you agree to be bound by these Terms of
              Service and all applicable laws and regulations. If you do not agree with any of these terms,
              you are prohibited from using this site.
            </p>

            <h2 className="text-2xl font-serif font-bold text-forest mt-10 mb-4">2. Use of Website</h2>
            <p className="text-slate leading-relaxed">
              This website is provided for informational purposes and to facilitate communication between
              you and Ground Pros Inc. You agree to use the website only for lawful purposes and in a way
              that does not infringe upon the rights of others.
            </p>

            <h2 className="text-2xl font-serif font-bold text-forest mt-10 mb-4">3. Services</h2>
            <p className="text-slate leading-relaxed">
              Ground Pros Inc. provides commercial landscape management services. All services are subject
              to separate agreements and contracts. Information on this website about our services is for
              general informational purposes and does not constitute a binding offer.
            </p>

            <h2 className="text-2xl font-serif font-bold text-forest mt-10 mb-4">4. Intellectual Property</h2>
            <p className="text-slate leading-relaxed">
              All content on this website, including text, graphics, logos, images, and software, is the
              property of Ground Pros Inc. or its content suppliers and is protected by copyright and
              intellectual property laws. You may not reproduce, distribute, or create derivative works
              without our express written permission.
            </p>

            <h2 className="text-2xl font-serif font-bold text-forest mt-10 mb-4">5. Disclaimer of Warranties</h2>
            <p className="text-slate leading-relaxed">
              This website is provided &quot;as is&quot; without any warranties, express or implied. Ground Pros Inc.
              does not warrant that the website will be uninterrupted, error-free, or free of viruses or
              other harmful components.
            </p>

            <h2 className="text-2xl font-serif font-bold text-forest mt-10 mb-4">6. Limitation of Liability</h2>
            <p className="text-slate leading-relaxed">
              Ground Pros Inc. shall not be liable for any damages arising from the use or inability to use
              this website or any content on it. This includes direct, indirect, incidental, consequential,
              and punitive damages.
            </p>

            <h2 className="text-2xl font-serif font-bold text-forest mt-10 mb-4">7. User Submissions</h2>
            <p className="text-slate leading-relaxed">
              Any information you submit through our contact forms, newsletter subscriptions, or job
              applications will be handled in accordance with our{" "}
              <a href="/privacy" className="text-pine hover:text-sage transition-colors underline">
                Privacy Policy
              </a>
              . You are responsible for ensuring the accuracy of information you provide.
            </p>

            <h2 className="text-2xl font-serif font-bold text-forest mt-10 mb-4">8. Governing Law</h2>
            <p className="text-slate leading-relaxed">
              These terms shall be governed by and construed in accordance with the laws of the State of
              Illinois, without regard to its conflict of law provisions.
            </p>

            <h2 className="text-2xl font-serif font-bold text-forest mt-10 mb-4">9. Changes to Terms</h2>
            <p className="text-slate leading-relaxed">
              Ground Pros Inc. reserves the right to modify these terms at any time. Changes will be
              effective immediately upon posting to this website. Your continued use of the website
              constitutes acceptance of any changes.
            </p>

            <h2 className="text-2xl font-serif font-bold text-forest mt-10 mb-4">10. Contact Us</h2>
            <p className="text-slate leading-relaxed">
              If you have any questions about these Terms of Service, please contact us through our{" "}
              <a href="/contact" className="text-pine hover:text-sage transition-colors underline">
                contact page
              </a>.
            </p>
          </ScrollReveal>
        </div>
      </section>
    </div>
  );
}
