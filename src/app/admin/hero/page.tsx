"use client";

import React, { useEffect, useState } from "react";
import { Input } from "@/components/ui/Input";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { Toggle } from "@/components/ui/Toggle";
import { useToast } from "@/components/admin/Toast";
import { Skeleton } from "@/components/ui/Skeleton";

interface HeroData {
  id: string;
  videoUrl: string | null;
  imageUrl: string | null;
  heading: string;
  subheading: string;
  tagline: string;
  ctaPrimaryText: string;
  ctaPrimaryLink: string;
  ctaSecondaryText: string;
  ctaSecondaryLink: string;
  isVisible: boolean;
}

export default function HeroPage() {
  const { toast } = useToast();
  const [data, setData] = useState<HeroData | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    fetch("/api/hero")
      .then((r) => r.json())
      .then((d) => { setData(d); setLoading(false); })
      .catch(() => { toast("Failed to load hero data", "error"); setLoading(false); });
  }, []);

  const handleSave = async () => {
    if (!data) return;
    setSaving(true);
    try {
      const res = await fetch("/api/hero", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      if (!res.ok) throw new Error();
      toast("Hero section updated");
    } catch {
      toast("Failed to save", "error");
    }
    setSaving(false);
  };

  if (loading) {
    return (
      <div className="space-y-4">
        <Skeleton className="h-8 w-48" />
        <Skeleton className="h-64 w-full" />
      </div>
    );
  }

  if (!data) {
    return <p className="text-stone">No hero section data found. Create one in the database first.</p>;
  }

  return (
    <div className="space-y-6 max-w-3xl">
      <h2 className="text-2xl font-bold text-charcoal font-sans">Hero Section</h2>

      <Card>
        <div className="space-y-4">
          <Input label="Heading" value={data.heading} onChange={(e) => setData({ ...data, heading: e.target.value })} />
          <Input label="Subheading" value={data.subheading} onChange={(e) => setData({ ...data, subheading: e.target.value })} />
          <Input label="Tagline" value={data.tagline} onChange={(e) => setData({ ...data, tagline: e.target.value })} />

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Input label="CTA Primary Text" value={data.ctaPrimaryText} onChange={(e) => setData({ ...data, ctaPrimaryText: e.target.value })} />
            <Input label="CTA Primary Link" value={data.ctaPrimaryLink} onChange={(e) => setData({ ...data, ctaPrimaryLink: e.target.value })} />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Input label="CTA Secondary Text" value={data.ctaSecondaryText} onChange={(e) => setData({ ...data, ctaSecondaryText: e.target.value })} />
            <Input label="CTA Secondary Link" value={data.ctaSecondaryLink} onChange={(e) => setData({ ...data, ctaSecondaryLink: e.target.value })} />
          </div>

          <Input label="Video URL" value={data.videoUrl || ""} onChange={(e) => setData({ ...data, videoUrl: e.target.value || null })} />
          <Input label="Image URL" value={data.imageUrl || ""} onChange={(e) => setData({ ...data, imageUrl: e.target.value || null })} />

          <Toggle checked={data.isVisible} onChange={(v) => setData({ ...data, isVisible: v })} label="Visible on site" />

          <div className="pt-4">
            <Button onClick={handleSave} loading={saving}>Save Changes</Button>
          </div>
        </div>
      </Card>
    </div>
  );
}
