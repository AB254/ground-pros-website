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

export default function EditTestimonialPage() {
  const router = useRouter();
  const params = useParams();
  const { toast } = useToast();
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [form, setForm] = useState({
    id: "",
    quote: "",
    clientName: "",
    clientTitle: "",
    company: "",
    rating: 5,
    isVisible: true,
    sortOrder: 0,
  });

  useEffect(() => {
    fetch("/api/testimonials")
      .then((r) => r.json())
      .then((items: Array<Record<string, unknown>>) => {
        const t = items.find((x) => x.id === params.id);
        if (t) {
          setForm({
            id: t.id as string,
            quote: t.quote as string,
            clientName: t.clientName as string,
            clientTitle: (t.clientTitle as string) || "",
            company: (t.company as string) || "",
            rating: t.rating as number,
            isVisible: t.isVisible as boolean,
            sortOrder: t.sortOrder as number,
          });
        }
        setLoading(false);
      })
      .catch(() => { toast("Failed to load", "error"); setLoading(false); });
  }, [params.id]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    try {
      const res = await fetch("/api/testimonials", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      if (!res.ok) throw new Error();
      toast("Testimonial updated");
      router.push("/admin/testimonials");
    } catch {
      toast("Failed to update", "error");
    }
    setSaving(false);
  };

  if (loading) return <div className="space-y-4"><Skeleton className="h-8 w-48" /><Skeleton className="h-96 w-full" /></div>;

  return (
    <div className="space-y-6 max-w-3xl">
      <h2 className="text-2xl font-bold text-charcoal font-sans">Edit Testimonial</h2>
      <form onSubmit={handleSubmit}>
        <Card>
          <div className="space-y-4">
            <Textarea label="Quote" value={form.quote} onChange={(e) => setForm({ ...form, quote: e.target.value })} required />
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <Input label="Client Name" value={form.clientName} onChange={(e) => setForm({ ...form, clientName: e.target.value })} required />
              <Input label="Client Title" value={form.clientTitle} onChange={(e) => setForm({ ...form, clientTitle: e.target.value })} />
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <Input label="Company" value={form.company} onChange={(e) => setForm({ ...form, company: e.target.value })} />
              <Input label="Rating (1-5)" type="number" min={1} max={5} value={form.rating} onChange={(e) => setForm({ ...form, rating: parseInt(e.target.value) || 5 })} />
            </div>
            <Input label="Sort Order" type="number" value={form.sortOrder} onChange={(e) => setForm({ ...form, sortOrder: parseInt(e.target.value) || 0 })} />
            <Toggle checked={form.isVisible} onChange={(v) => setForm({ ...form, isVisible: v })} label="Visible" />
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
