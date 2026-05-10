'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Leaf, ExternalLink, Globe } from 'lucide-react';
import { cn } from '@/lib/utils';

interface FooterProps {
  description: string;
  quickLinks: { label: string; url: string }[];
  services: { title: string; slug: string }[];
  copyright: string;
  showNewsletter: boolean;
  contactInfo?: {
    address: string;
    phone: string;
    email: string;
    socialLinks: {
      instagram?: string;
      linkedin?: string;
      facebook?: string;
    };
  };
}

export default function Footer({
  description,
  quickLinks,
  services,
  copyright,
  showNewsletter,
  contactInfo,
}: FooterProps) {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  async function handleNewsletter(e: React.FormEvent) {
    e.preventDefault();
    if (!email) return;
    try {
      await fetch('/api/newsletter', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      });
      setSubscribed(true);
      setEmail('');
    } catch {
      // silent
    }
  }

  return (
    <footer className="bg-charcoal text-white">
      <div className="mx-auto max-w-7xl px-6 py-16">
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
          {/* Company */}
          <div>
            <div className="mb-4 flex items-center gap-2">
              <Leaf className="h-5 w-5 text-sage" />
              <span className="font-serif text-lg font-bold tracking-wider">GROUND PROS</span>
            </div>
            <p className="text-sm leading-relaxed text-white/60 mb-6">
              {description || "Ground Pros Inc. — Chicagoland's premier commercial landscape partner."}
            </p>
            {contactInfo?.socialLinks && (
              <div className="flex gap-4">
                {contactInfo.socialLinks.instagram && (
                  <a
                    href={contactInfo.socialLinks.instagram}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-white/40 hover:text-sage transition-colors"
                  >
                    <ExternalLink className="w-5 h-5" />
                  </a>
                )}
                {contactInfo.socialLinks.linkedin && (
                  <a
                    href={contactInfo.socialLinks.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-white/40 hover:text-sage transition-colors"
                  >
                    <ExternalLink className="w-5 h-5" />
                  </a>
                )}
                {contactInfo.socialLinks.facebook && (
                  <a
                    href={contactInfo.socialLinks.facebook}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-white/40 hover:text-sage transition-colors"
                  >
                    <Globe className="w-5 h-5" />
                  </a>
                )}
              </div>
            )}
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="mb-4 font-semibold uppercase tracking-wider text-sage">Quick Links</h4>
            <ul className="space-y-2">
              {quickLinks.map((link) => (
                <li key={link.label}>
                  <Link href={link.url} className="text-sm text-white/60 hover:text-sage transition-colors">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div>
            <h4 className="mb-4 font-semibold uppercase tracking-wider text-sage">Services</h4>
            <ul className="space-y-2">
              {services.map((s) => (
                <li key={s.slug}>
                  <Link
                    href={`/services/${s.slug}`}
                    className="text-sm text-white/60 hover:text-sage transition-colors"
                  >
                    {s.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Newsletter or Contact */}
          <div>
            {showNewsletter ? (
              <>
                <h4 className="mb-4 font-semibold uppercase tracking-wider text-sage">Newsletter</h4>
                <p className="mb-4 text-sm text-white/60">
                  Stay updated with seasonal tips and company news.
                </p>
                {subscribed ? (
                  <p className="text-sm text-sage">Thanks for subscribing!</p>
                ) : (
                  <form onSubmit={handleNewsletter} className="flex gap-2">
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="Your email"
                      required
                      className={cn(
                        'flex-1 rounded-lg border border-white/10 bg-white/5 px-4 py-2.5 text-sm text-white',
                        'placeholder:text-white/30 focus:border-sage focus:outline-none'
                      )}
                    />
                    <button
                      type="submit"
                      className="rounded-lg bg-sage px-4 py-2.5 text-sm font-semibold text-white hover:bg-moss transition-colors"
                    >
                      Join
                    </button>
                  </form>
                )}
              </>
            ) : contactInfo ? (
              <>
                <h4 className="mb-4 font-semibold uppercase tracking-wider text-sage">Contact</h4>
                <div className="space-y-2 text-sm text-white/60">
                  <p>{contactInfo.address}</p>
                  <p>
                    <a href={`tel:${contactInfo.phone}`} className="hover:text-sage transition-colors">
                      {contactInfo.phone}
                    </a>
                  </p>
                  <p>
                    <a href={`mailto:${contactInfo.email}`} className="hover:text-sage transition-colors">
                      {contactInfo.email}
                    </a>
                  </p>
                </div>
              </>
            ) : null}
          </div>
        </div>
      </div>

      <div className="border-t border-white/10">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-4 px-6 py-6 sm:flex-row">
          <p className="text-xs text-white/40">{copyright}</p>
          <div className="flex gap-6 text-xs text-white/40">
            <a href="/privacy" className="hover:text-white/60">Privacy Policy</a>
            <a href="/terms" className="hover:text-white/60">Terms of Service</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
