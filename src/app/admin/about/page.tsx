"use client";

import React, { useEffect, useState } from "react";
import { Input } from "@/components/ui/Input";
import { Textarea } from "@/components/ui/Textarea";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { Toggle } from "@/components/ui/Toggle";
import { Skeleton } from "@/components/ui/Skeleton";
import { useToast } from "@/components/admin/Toast";
import { Plus, Trash2 } from "lucide-react";

interface Bullet {
  icon: string;
  text: string;
}

interface AboutData {
  id: string;
  heading: string;
  bodyText: string;
  bullets: Bullet[];
  images: string[];
  isVisible: boolean;
}

export default function AboutPage() {
  const { toast } = useToast();
  const [data, setData] = useState<AboutData | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    fetch("/api/about")
      .then((r) => r.json())
      .then((d) => {
        if (d) {
          setData({
            ...d,
            bullets: Array.isArray(d.bullets) ? d.bullets : [],
            images: Array.isArray(d.images) ? d.images : [],
          });
        }
        setLoading(false);
      })
      .catch(() => { toast("Failed to load", "error"); setLoading(false); });
  }, []);

  const handleSave = async () => {
    if (!data) return;
    setSaving(true);
    try {
      const res = await fetch("/api/about", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      if (!res.ok) throw new Error();
      toast("About section updated");
    } catch {
      toast("Failed to save", "error");
    }
    setSaving(false);
  };

  if (loading) return <div className="space-y-4"><Skeleton className="h-8 w-48" /><Skeleton className="h-96 w-full" /></div>;
  if (!data) return <p className="text-stone">No about section found.</p>;

  return (
    <div className="space-y-6 max-w-3xl">
      <h2 className="text-2xl font-bold text-charcoal font-sans">About Section</h2>

      <Card>
        <div className="space-y-4">
          <Input label="Heading" value={data.heading} onChange={(e) => setData({ ...data, heading: e.target.value })} />
          <Textarea label="Body Text" value={data.bodyText} onChange={(e) => setData({ ...data, bodyText: e.target.value })} />

          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <label className="text-sm font-medium text-charcoal">Bullet Points</label>
              <Button type="button" variant="secondary" size="sm" onClick={() => setData({ ...data, bullets: [...data.bullets, { icon: "CheckCircle", text: "" }] })}>
                <Plus className="h-4 w-4" /> Add
              </Button>
            </div>
            {data.bullets.map((b, i) => (
              <div key={i} className="flex items-center gap-2">
                <Input placeholder="Icon" value={b.icon} onChange={(e) => { const bullets = [...data.bullets]; bullets[i] = { ...b, icon: e.target.value }; setData({ ...data, bullets }); }} className="w-32" />
                <Input placeholder="Text" value={b.text} onChange={(e) => { const bullets = [...data.bullets]; bullets[i] = { ...b, text: e.target.value }; setData({ ...data, bullets }); }} className="flex-1" />
                <Button type="button" variant="ghost" size="sm" onClick={() => setData({ ...data, bullets: data.bullets.filter((_, idx) => idx !== i) })}>
                  <Trash2 className="h-4 w-4 text-red-500" />
                </Button>
              </div>
            ))}
          </div>

          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <label className="text-sm font-medium text-charcoal">Images (URLs)</label>
              <Button type="button" variant="secondary" size="sm" onClick={() => setData({ ...data, images: [...data.images, ""] })}>
                <Plus className="h-4 w-4" /> Add
              </Button>
            </div>
            {data.images.map((img, i) => (
              <div key={i} className="flex items-center gap-2">
                <Input placeholder="Image URL" value={img} onChange={(e) => { const images = [...data.images]; images[i] = e.target.value; setData({ ...data, images }); }} className="flex-1" />
                <Button type="button" variant="ghost" size="sm" onClick={() => setData({ ...data, images: data.images.filter((_, idx) => idx !== i) })}>
                  <Trash2 className="h-4 w-4 text-red-500" />
                </Button>
              </div>
            ))}
          </div>

          <Toggle checked={data.isVisible} onChange={(v) => setData({ ...data, isVisible: v })} label="Visible on site" />

          <div className="pt-4">
            <Button onClick={handleSave} loading={saving}>Save Changes</Button>
          </div>
        </div>
      </Card>
    </div>
  );
}
