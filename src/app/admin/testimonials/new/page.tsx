"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { Input } from "@/components/ui/Input";
import { Textarea } from "@/components/ui/Textarea";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { Toggle } from "@/components/ui/Toggle";
import { useToast } from "@/components/admin/Toast";

export default function NewTestimonialPage() {
  const router = useRouter();
  const { toast } = useToast();
  const [saving, setSaving] = useState(false);
  const [form, setForm] = useState({
    quote: "",
    clientName: "",
    clientTitle: "",
    company: "",
    rating: 5,
    isVisible: true,
    sortOrder: 0,
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    try {
      const res = await fetch("/api/testimonials", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      if (!res.ok) throw new Error();
      toast("Testimonial created");
      router.push("/admin/testimonials");
    } catch {
      toast("Failed to create testimonial", "error");
    }
    setSaving(false);
  };

  return (
    <div className="space-y-6 max-w-3xl">
      <h2 className="text-2xl font-bold text-charcoal font-sans">New Testimonial</h2>
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
              <Button type="submit" loading={saving}>Create Testimonial</Button>
              <Button type="button" variant="secondary" onClick={() => router.back()}>Cancel</Button>
            </div>
          </div>
        </Card>
      </form>
    </div>
  );
}
