"use client";

import React, { useEffect, useState } from "react";
import { useRouter, useParams } from "next/navigation";
import { Input } from "@/components/ui/Input";
import { Textarea } from "@/components/ui/Textarea";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { Select } from "@/components/ui/Select";
import { Toggle } from "@/components/ui/Toggle";
import { Skeleton } from "@/components/ui/Skeleton";
import { useToast } from "@/components/admin/Toast";
import { ImageUpload } from "@/components/admin/ImageUpload";

const categories = [
  { value: "commercial", label: "Commercial" },
  { value: "residential", label: "Residential" },
  { value: "municipal", label: "Municipal" },
  { value: "hoa", label: "HOA" },
];

export default function EditProjectPage() {
  const router = useRouter();
  const params = useParams();
  const { toast } = useToast();
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [form, setForm] = useState({
    id: "",
    title: "",
    category: "commercial",
    description: "",
    beforeImage: "",
    afterImage: "",
    clientName: "",
    clientType: "",
    isFeatured: false,
    isVisible: true,
    sortOrder: 0,
  });

  useEffect(() => {
    fetch("/api/projects")
      .then((r) => r.json())
      .then((projects: Array<Record<string, unknown>>) => {
        const p = projects.find((x) => x.id === params.id);
        if (p) {
          setForm({
            id: p.id as string,
            title: p.title as string,
            category: p.category as string,
            description: (p.description as string) || "",
            beforeImage: (p.beforeImage as string) || "",
            afterImage: (p.afterImage as string) || "",
            clientName: (p.clientName as string) || "",
            clientType: (p.clientType as string) || "",
            isFeatured: p.isFeatured as boolean,
            isVisible: p.isVisible as boolean,
            sortOrder: p.sortOrder as number,
          });
        }
        setLoading(false);
      })
      .catch(() => { toast("Failed to load project", "error"); setLoading(false); });
  }, [params.id]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    try {
      const res = await fetch("/api/projects", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      if (!res.ok) throw new Error();
      toast("Project updated");
      router.push("/admin/projects");
    } catch {
      toast("Failed to update project", "error");
    }
    setSaving(false);
  };

  if (loading) return <div className="space-y-4"><Skeleton className="h-8 w-48" /><Skeleton className="h-96 w-full" /></div>;

  return (
    <div className="space-y-6 max-w-3xl">
      <h2 className="text-2xl font-bold text-charcoal font-sans">Edit Project</h2>
      <form onSubmit={handleSubmit}>
        <Card>
          <div className="space-y-4">
            <Input label="Title" value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} required />
            <Select label="Category" options={categories} value={form.category} onChange={(e) => setForm({ ...form, category: e.target.value })} />
            <Textarea label="Description" value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} />
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <ImageUpload label="Before Image" currentImage={form.beforeImage} onUpload={(url) => setForm({ ...form, beforeImage: url })} />
              <ImageUpload label="After Image" currentImage={form.afterImage} onUpload={(url) => setForm({ ...form, afterImage: url })} />
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <Input label="Client Name" value={form.clientName} onChange={(e) => setForm({ ...form, clientName: e.target.value })} />
              <Input label="Client Type" value={form.clientType} onChange={(e) => setForm({ ...form, clientType: e.target.value })} />
            </div>
            <Input label="Sort Order" type="number" value={form.sortOrder} onChange={(e) => setForm({ ...form, sortOrder: parseInt(e.target.value) || 0 })} />
            <div className="flex gap-6">
              <Toggle checked={form.isFeatured} onChange={(v) => setForm({ ...form, isFeatured: v })} label="Featured" />
              <Toggle checked={form.isVisible} onChange={(v) => setForm({ ...form, isVisible: v })} label="Visible" />
            </div>
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
