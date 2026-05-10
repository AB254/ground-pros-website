"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { Input } from "@/components/ui/Input";
import { Textarea } from "@/components/ui/Textarea";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { Toggle } from "@/components/ui/Toggle";
import { useToast } from "@/components/admin/Toast";
import { slugify } from "@/lib/utils";
import { X } from "lucide-react";

export default function NewServicePage() {
  const router = useRouter();
  const { toast } = useToast();
  const [saving, setSaving] = useState(false);
  const [form, setForm] = useState({
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

  const handleTitleChange = (val: string) => {
    setForm({ ...form, title: val, slug: slugify(val) });
  };

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
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...form,
          features: form.features.length > 0 ? form.features : null,
        }),
      });
      if (!res.ok) throw new Error();
      toast("Service created");
      router.push("/admin/services");
    } catch {
      toast("Failed to create service", "error");
    }
    setSaving(false);
  };

  return (
    <div className="space-y-6 max-w-3xl">
      <h2 className="text-2xl font-bold text-charcoal font-sans">New Service</h2>

      <form onSubmit={handleSubmit}>
        <Card>
          <div className="space-y-4">
            <Input label="Title" value={form.title} onChange={(e) => handleTitleChange(e.target.value)} required />
            <Input label="Slug" value={form.slug} onChange={(e) => setForm({ ...form, slug: e.target.value })} required />
            <Textarea label="Short Description" value={form.shortDesc} onChange={(e) => setForm({ ...form, shortDesc: e.target.value })} required />
            <Textarea label="Full Description" value={form.fullDesc} onChange={(e) => setForm({ ...form, fullDesc: e.target.value })} />
            <Input label="Icon Name (Lucide)" value={form.iconName} onChange={(e) => setForm({ ...form, iconName: e.target.value })} placeholder="e.g. Trees, Snowflake" />
            <Input label="Image URL" value={form.imageUrl} onChange={(e) => setForm({ ...form, imageUrl: e.target.value })} />
            <Input label="Sort Order" type="number" value={form.sortOrder} onChange={(e) => setForm({ ...form, sortOrder: parseInt(e.target.value) || 0 })} />

            <div className="space-y-2">
              <label className="block text-sm font-medium text-charcoal">Features</label>
              <div className="flex gap-2">
                <Input
                  value={featureInput}
                  onChange={(e) => setFeatureInput(e.target.value)}
                  placeholder="Add a feature"
                  onKeyDown={(e) => { if (e.key === "Enter") { e.preventDefault(); addFeature(); } }}
                />
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
              <Button type="submit" loading={saving}>Create Service</Button>
              <Button type="button" variant="secondary" onClick={() => router.back()}>Cancel</Button>
            </div>
          </div>
        </Card>
      </form>
    </div>
  );
}
