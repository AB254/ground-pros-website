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

export default function EditCareerPage() {
  const router = useRouter();
  const params = useParams();
  const { toast } = useToast();
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [form, setForm] = useState({
    id: "",
    title: "",
    department: "",
    location: "Itasca, IL",
    type: "Full-time",
    description: "",
    isActive: true,
  });

  useEffect(() => {
    fetch("/api/careers?all=true")
      .then((r) => r.json())
      .then((jobs: Array<Record<string, unknown>>) => {
        const job = jobs.find((j) => j.id === params.id);
        if (job) {
          setForm({
            id: job.id as string,
            title: job.title as string,
            department: (job.department as string) || "",
            location: job.location as string,
            type: job.type as string,
            description: job.description as string,
            isActive: job.isActive as boolean,
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
      const res = await fetch("/api/careers", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      if (!res.ok) throw new Error();
      toast("Job posting updated");
      router.push("/admin/careers");
    } catch {
      toast("Failed to update", "error");
    }
    setSaving(false);
  };

  if (loading) return <div className="space-y-4"><Skeleton className="h-8 w-48" /><Skeleton className="h-96 w-full" /></div>;

  return (
    <div className="space-y-6 max-w-3xl">
      <h2 className="text-2xl font-bold text-charcoal font-sans">Edit Job Posting</h2>
      <form onSubmit={handleSubmit}>
        <Card>
          <div className="space-y-4">
            <Input label="Title" value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} required />
            <Input label="Department" value={form.department} onChange={(e) => setForm({ ...form, department: e.target.value })} />
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <Input label="Location" value={form.location} onChange={(e) => setForm({ ...form, location: e.target.value })} />
              <Select label="Type" options={[
                { value: "Full-time", label: "Full-time" },
                { value: "Part-time", label: "Part-time" },
                { value: "Seasonal", label: "Seasonal" },
                { value: "Contract", label: "Contract" },
              ]} value={form.type} onChange={(e) => setForm({ ...form, type: e.target.value })} />
            </div>
            <Textarea label="Description" value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} required />
            <Toggle checked={form.isActive} onChange={(v) => setForm({ ...form, isActive: v })} label="Active" />
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
