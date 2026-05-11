export const dynamic = "force-dynamic";

import { Metadata } from "next";
import ScrollReveal from "@/components/public/ScrollReveal";

export const metadata: Metadata = {
  title: "Privacy Policy | Ground Pros Inc.",
  description: "Privacy policy for Ground Pros Inc.",
};

export default function PrivacyPage() {
  return (
    <div>
      <section className="relative bg-black text-white pt-40 pb-24 overflow-hidden">
        <div className="absolute inset-0 bg-[url('https://www.groundpros.com/wp-content/uploads/2019/05/Maintenace-Page-Slider_preview.jpeg')] bg-cover bg-center" />
        <div className="absolute inset-0 bg-black/50" />
        <div className="relative max-w-6xl mx-auto px-6 text-center">
          <ScrollReveal>
            <h1 className="text-5xl md:text-7xl font-serif font-bold mb-6">Privacy Policy</h1>
            <p className="text-xl text-white/80 max-w-3xl mx-auto leading-relaxed">
              Your privacy is important to us.
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

            <h2 className="text-2xl font-serif font-bold text-forest mt-10 mb-4">1. Information We Collect</h2>
            <p className="text-slate leading-relaxed">
              We collect information you provide directly to us, such as when you fill out a contact form,
              request a consultation, subscribe to our newsletter, or apply for a career position. This may
              include your name, email address, phone number, company name, and any message you send us.
            </p>

            <h2 className="text-2xl font-serif font-bold text-forest mt-10 mb-4">2. How We Use Your Information</h2>
            <p className="text-slate leading-relaxed">We use the information we collect to:</p>
            <ul className="text-slate space-y-2 list-disc pl-6">
              <li>Respond to your inquiries and provide customer service</li>
              <li>Send you information about our services</li>
              <li>Process job applications</li>
              <li>Send newsletters and marketing communications (with your consent)</li>
              <li>Improve our website and services</li>
            </ul>

            <h2 className="text-2xl font-serif font-bold text-forest mt-10 mb-4">3. Information Sharing</h2>
            <p className="text-slate leading-relaxed">
              We do not sell, trade, or rent your personal information to third parties. We may share your
              information with trusted service providers who assist us in operating our website and conducting
              our business, so long as those parties agree to keep this information confidential.
            </p>

            <h2 className="text-2xl font-serif font-bold text-forest mt-10 mb-4">4. Data Security</h2>
            <p className="text-slate leading-relaxed">
              We implement appropriate security measures to protect your personal information. However, no
              method of transmission over the Internet or electronic storage is 100% secure, and we cannot
              guarantee absolute security.
            </p>

            <h2 className="text-2xl font-serif font-bold text-forest mt-10 mb-4">5. Cookies</h2>
            <p className="text-slate leading-relaxed">
              Our website may use cookies to enhance your browsing experience. You can choose to disable
              cookies through your browser settings, though this may affect some functionality of the website.
            </p>

            <h2 className="text-2xl font-serif font-bold text-forest mt-10 mb-4">6. Third-Party Links</h2>
            <p className="text-slate leading-relaxed">
              Our website may contain links to third-party websites. We are not responsible for the privacy
              practices or content of those sites. We encourage you to read the privacy policies of any
              linked websites.
            </p>

            <h2 className="text-2xl font-serif font-bold text-forest mt-10 mb-4">7. Changes to This Policy</h2>
            <p className="text-slate leading-relaxed">
              We may update this privacy policy from time to time. Any changes will be posted on this page
              with an updated revision date.
            </p>

            <h2 className="text-2xl font-serif font-bold text-forest mt-10 mb-4">8. Contact Us</h2>
            <p className="text-slate leading-relaxed">
              If you have any questions about this privacy policy, please contact us through our{" "}
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
