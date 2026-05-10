"use client";

import React, { useEffect, useState } from "react";
import { Input } from "@/components/ui/Input";
import { Textarea } from "@/components/ui/Textarea";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { Toggle } from "@/components/ui/Toggle";
import { Skeleton } from "@/components/ui/Skeleton";
import { useToast } from "@/components/admin/Toast";

interface CtaData {
  id: string;
  heading: string;
  subtext: string;
  buttonText: string;
  buttonLink: string;
  bgImageUrl: string | null;
  isVisible: boolean;
}

export default function CtaBannerPage() {
  const { toast } = useToast();
  const [data, setData] = useState<CtaData | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    fetch("/api/cta")
      .then((r) => r.json())
      .then((d) => { setData(d); setLoading(false); })
      .catch(() => { toast("Failed to load", "error"); setLoading(false); });
  }, []);

  const handleSave = async () => {
    if (!data) return;
    setSaving(true);
    try {
      const res = await fetch("/api/cta", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      if (!res.ok) throw new Error();
      toast("CTA banner updated");
    } catch {
      toast("Failed to save", "error");
    }
    setSaving(false);
  };

  if (loading) return <div className="space-y-4"><Skeleton className="h-8 w-48" /><Skeleton className="h-64 w-full" /></div>;
  if (!data) return <p className="text-stone">No CTA banner found.</p>;

  return (
    <div className="space-y-6 max-w-3xl">
      <h2 className="text-2xl font-bold text-charcoal font-sans">CTA Banner</h2>
      <Card>
        <div className="space-y-4">
          <Input label="Heading" value={data.heading} onChange={(e) => setData({ ...data, heading: e.target.value })} />
          <Textarea label="Subtext" value={data.subtext} onChange={(e) => setData({ ...data, subtext: e.target.value })} />
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Input label="Button Text" value={data.buttonText} onChange={(e) => setData({ ...data, buttonText: e.target.value })} />
            <Input label="Button Link" value={data.buttonLink} onChange={(e) => setData({ ...data, buttonLink: e.target.value })} />
          </div>
          <Input label="Background Image URL" value={data.bgImageUrl || ""} onChange={(e) => setData({ ...data, bgImageUrl: e.target.value || null })} />
          <Toggle checked={data.isVisible} onChange={(v) => setData({ ...data, isVisible: v })} label="Visible" />
          <div className="pt-4">
            <Button onClick={handleSave} loading={saving}>Save Changes</Button>
          </div>
        </div>
      </Card>
    </div>
  );
}
