"use client";

import React, { useEffect, useState } from "react";
import { useRouter, useParams } from "next/navigation";
import { Input } from "@/components/ui/Input";
import { Textarea } from "@/components/ui/Textarea";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { Toggle } from "@/components/ui/Toggle";
import { Skeleton } from "@/components/ui/Skeleton";
import { useToast } from "@/components/admin/Toast";
import { X } from "lucide-react";

export default function EditServicePage() {
  const router = useRouter();
  const params = useParams();
  const { toast } = useToast();
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [form, setForm] = useState({
    id: "",
    title: "",
    slug: "",
    shortDesc: "",
    fullDesc: "",
    iconName: "",
    imageUrl: "",
    features: [] as string[],
    isVisible: true,
    sortOrder: 0,
  });
  const [featureInput, setFeatureInput] = useState("");

  useEffect(() => {
    fetch("/api/services")
      .then((r) => r.json())
      .then((services: Array<Record<string, unknown>>) => {
        const svc = services.find((s) => s.id === params.id);
        if (svc) {
          setForm({
            id: svc.id as string,
            title: svc.title as string,
            slug: svc.slug as string,
            shortDesc: svc.shortDesc as string,
            fullDesc: (svc.fullDesc as string) || "",
            iconName: (svc.iconName as string) || "",
            imageUrl: (svc.imageUrl as string) || "",
            features: Array.isArray(svc.features) ? svc.features as string[] : [],
            isVisible: svc.isVisible as boolean,
            sortOrder: svc.sortOrder as number,
          });
        }
        setLoading(false);
      })
      .catch(() => { toast("Failed to load service", "error"); setLoading(false); });
  }, [params.id]);

  const addFeature = () => {
    if (!featureInput.trim()) return;
    setForm({ ...form, features: [...form.features, featureInput.trim()] });
    setFeatureInput("");
  };

  const removeFeature = (idx: number) => {
    setForm({ ...form, features: form.features.filter((_, i) => i !== idx) });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    try {
      const res = await fetch("/api/services", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...form,
          features: form.features.length > 0 ? form.features : null,
        }),
      });
      if (!res.ok) throw new Error();
      toast("Service updated");
      router.push("/admin/services");
    } catch {
      toast("Failed to update service", "error");
    }
    setSaving(false);
  };

  if (loading) {
    return <div className="space-y-4"><Skeleton className="h-8 w-48" /><Skeleton className="h-96 w-full" /></div>;
  }

  return (
    <div className="space-y-6 max-w-3xl">
      <h2 className="text-2xl font-bold text-charcoal font-sans">Edit Service</h2>

      <form onSubmit={handleSubmit}>
        <Card>
          <div className="space-y-4">
            <Input label="Title" value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} required />
            <Input label="Slug" value={form.slug} onChange={(e) => setForm({ ...form, slug: e.target.value })} required />
            <Textarea label="Short Description" value={form.shortDesc} onChange={(e) => setForm({ ...form, shortDesc: e.target.value })} required />
            <Textarea label="Full Description" value={form.fullDesc} onChange={(e) => setForm({ ...form, fullDesc: e.target.value })} />
            <Input label="Icon Name (Lucide)" value={form.iconName} onChange={(e) => setForm({ ...form, iconName: e.target.value })} />
            <Input label="Image URL" value={form.imageUrl} onChange={(e) => setForm({ ...form, imageUrl: e.target.value })} />
            <Input label="Sort Order" type="number" value={form.sortOrder} onChange={(e) => setForm({ ...form, sortOrder: parseInt(e.target.value) || 0 })} />

            <div className="space-y-2">
              <label className="block text-sm font-medium text-charcoal">Features</label>
              <div className="flex gap-2">
                <Input value={featureInput} onChange={(e) => setFeatureInput(e.target.value)} placeholder="Add a feature" onKeyDown={(e) => { if (e.key === "Enter") { e.preventDefault(); addFeature(); } }} />
                <Button type="button" variant="secondary" onClick={addFeature}>Add</Button>
              </div>
              <div className="flex flex-wrap gap-2">
                {form.features.map((f, i) => (
                  <span key={i} className="inline-flex items-center gap-1 rounded-full bg-sage/10 px-3 py-1 text-sm text-pine">
                    {f}
                    <button type="button" onClick={() => removeFeature(i)}><X className="h-3 w-3" /></button>
                  </span>
                ))}
              </div>
            </div>

            <Toggle checked={form.isVisible} onChange={(v) => setForm({ ...form, isVisible: v })} label="Visible on site" />

            <div className="flex gap-3 pt-4">
              <Button type="submit" loading={saving}>Save Changes</Button>
              <Button type="button" variant="secondary" onClick={() => router.back()}>Cancel</Button>
            </div>
          </div>
        </Card>
      </form>
    </div>
  );
}
