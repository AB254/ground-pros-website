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

interface QuickLink {
  label: string;
  url: string;
}

interface FooterData {
  id: string;
  description: string;
  quickLinks: QuickLink[];
  copyright: string;
  showNewsletter: boolean;
}

export default function FooterPage() {
  const { toast } = useToast();
  const [data, setData] = useState<FooterData | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    fetch("/api/footer")
      .then((r) => r.json())
      .then((d) => {
        if (d) {
          setData({
            ...d,
            quickLinks: Array.isArray(d.quickLinks) ? d.quickLinks : [],
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
      const res = await fetch("/api/footer", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      if (!res.ok) throw new Error();
      toast("Footer updated");
    } catch {
      toast("Failed to save", "error");
    }
    setSaving(false);
  };

  if (loading) return <div className="space-y-4"><Skeleton className="h-8 w-48" /><Skeleton className="h-64 w-full" /></div>;
  if (!data) return <p className="text-stone">No footer content found.</p>;

  return (
    <div className="space-y-6 max-w-3xl">
      <h2 className="text-2xl font-bold text-charcoal font-sans">Footer Content</h2>
      <Card>
        <div className="space-y-4">
          <Textarea label="Description" value={data.description} onChange={(e) => setData({ ...data, description: e.target.value })} />
          <Input label="Copyright" value={data.copyright} onChange={(e) => setData({ ...data, copyright: e.target.value })} />

          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <label className="text-sm font-medium text-charcoal">Quick Links</label>
              <Button type="button" variant="secondary" size="sm" onClick={() => setData({ ...data, quickLinks: [...data.quickLinks, { label: "", url: "" }] })}>
                <Plus className="h-4 w-4" /> Add
              </Button>
            </div>
            {data.quickLinks.map((link, i) => (
              <div key={i} className="flex items-center gap-2">
                <Input placeholder="Label" value={link.label} onChange={(e) => { const l = [...data.quickLinks]; l[i] = { ...link, label: e.target.value }; setData({ ...data, quickLinks: l }); }} className="w-40" />
                <Input placeholder="URL" value={link.url} onChange={(e) => { const l = [...data.quickLinks]; l[i] = { ...link, url: e.target.value }; setData({ ...data, quickLinks: l }); }} className="flex-1" />
                <Button type="button" variant="ghost" size="sm" onClick={() => setData({ ...data, quickLinks: data.quickLinks.filter((_, idx) => idx !== i) })}>
                  <Trash2 className="h-4 w-4 text-red-500" />
                </Button>
              </div>
            ))}
          </div>

          <Toggle checked={data.showNewsletter} onChange={(v) => setData({ ...data, showNewsletter: v })} label="Show newsletter signup" />

          <div className="pt-4">
            <Button onClick={handleSave} loading={saving}>Save Changes</Button>
          </div>
        </div>
      </Card>
    </div>
  );
}
