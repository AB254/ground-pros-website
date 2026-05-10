"use client";

import React, { useState } from "react";
import { Input } from "@/components/ui/Input";
import { Textarea } from "@/components/ui/Textarea";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { Select } from "@/components/ui/Select";
import { useToast } from "@/components/admin/Toast";
import { Skeleton } from "@/components/ui/Skeleton";

const pages = [
  { value: "home", label: "Home" },
  { value: "services", label: "Services" },
  { value: "projects", label: "Projects" },
  { value: "about", label: "About" },
  { value: "careers", label: "Careers" },
  { value: "contact", label: "Contact" },
];

export default function SeoPage() {
  const { toast } = useToast();
  const [selectedPage, setSelectedPage] = useState("home");
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [form, setForm] = useState({
    metaTitle: "",
    metaDesc: "",
    ogImageUrl: "",
  });

  const fetchSeo = (page: string) => {
    setLoading(true);
    fetch(`/api/seo?page=${page}`)
      .then((r) => r.json())
      .then((d) => {
        if (d) {
          setForm({
            metaTitle: d.metaTitle || "",
            metaDesc: d.metaDesc || "",
            ogImageUrl: d.ogImageUrl || "",
          });
        } else {
          setForm({ metaTitle: "", metaDesc: "", ogImageUrl: "" });
        }
        setLoading(false);
      })
      .catch(() => { toast("Failed to load SEO settings", "error"); setLoading(false); });
  };

  React.useEffect(() => { fetchSeo(selectedPage); }, [selectedPage]);

  const handleSave = async () => {
    setSaving(true);
    try {
      const res = await fetch("/api/seo", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ page: selectedPage, ...form }),
      });
      if (!res.ok) throw new Error();
      toast("SEO settings saved");
    } catch {
      toast("Failed to save", "error");
    }
    setSaving(false);
  };

  return (
    <div className="space-y-6 max-w-3xl">
      <h2 className="text-2xl font-bold text-charcoal font-sans">SEO Settings</h2>

      <div className="w-48">
        <Select
          label="Page"
          options={pages}
          value={selectedPage}
          onChange={(e) => setSelectedPage(e.target.value)}
        />
      </div>

      {loading ? (
        <Skeleton className="h-64 w-full" />
      ) : (
        <Card>
          <div className="space-y-4">
            <Input
              label="Meta Title"
              value={form.metaTitle}
              onChange={(e) => setForm({ ...form, metaTitle: e.target.value })}
              placeholder="Page title for search engines"
            />
            <Textarea
              label="Meta Description"
              value={form.metaDesc}
              onChange={(e) => setForm({ ...form, metaDesc: e.target.value })}
              placeholder="Brief description for search results"
            />
            <Input
              label="OG Image URL"
              value={form.ogImageUrl}
              onChange={(e) => setForm({ ...form, ogImageUrl: e.target.value })}
              placeholder="Social sharing image URL"
            />

            <div className="pt-4">
              <Button onClick={handleSave} loading={saving}>Save Changes</Button>
            </div>
          </div>
        </Card>
      )}
    </div>
  );
}
