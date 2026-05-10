"use client";

import React, { useEffect, useState } from "react";
import { Input } from "@/components/ui/Input";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { Skeleton } from "@/components/ui/Skeleton";
import { useToast } from "@/components/admin/Toast";

interface SettingsData {
  id: string;
  siteName: string;
  siteTagline: string;
  logoUrl: string | null;
  faviconUrl: string | null;
  analyticsId: string | null;
  primaryColor: string;
  secondaryColor: string;
  accentColor: string;
}

export default function SettingsPage() {
  const { toast } = useToast();
  const [data, setData] = useState<SettingsData | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    fetch("/api/settings")
      .then((r) => r.json())
      .then((d) => { setData(d); setLoading(false); })
      .catch(() => { toast("Failed to load settings", "error"); setLoading(false); });
  }, []);

  const handleSave = async () => {
    if (!data) return;
    setSaving(true);
    try {
      const res = await fetch("/api/settings", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      if (!res.ok) throw new Error();
      toast("Settings saved");
    } catch {
      toast("Failed to save", "error");
    }
    setSaving(false);
  };

  if (loading) return <div className="space-y-4"><Skeleton className="h-8 w-48" /><Skeleton className="h-96 w-full" /></div>;
  if (!data) return <p className="text-stone">No settings found.</p>;

  return (
    <div className="space-y-6 max-w-3xl">
      <h2 className="text-2xl font-bold text-charcoal font-sans">General Settings</h2>

      <Card>
        <div className="space-y-4">
          <Input label="Site Name" value={data.siteName} onChange={(e) => setData({ ...data, siteName: e.target.value })} />
          <Input label="Site Tagline" value={data.siteTagline} onChange={(e) => setData({ ...data, siteTagline: e.target.value })} />
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Input label="Logo URL" value={data.logoUrl || ""} onChange={(e) => setData({ ...data, logoUrl: e.target.value || null })} />
            <Input label="Favicon URL" value={data.faviconUrl || ""} onChange={(e) => setData({ ...data, faviconUrl: e.target.value || null })} />
          </div>
          <Input label="Analytics ID" value={data.analyticsId || ""} onChange={(e) => setData({ ...data, analyticsId: e.target.value || null })} placeholder="e.g. G-XXXXXXXXXX" />

          <div className="space-y-2">
            <label className="block text-sm font-medium text-charcoal">Brand Colors</label>
            <div className="grid grid-cols-3 gap-4">
              <div className="space-y-1">
                <label className="text-xs text-stone">Primary</label>
                <div className="flex items-center gap-2">
                  <input type="color" value={data.primaryColor} onChange={(e) => setData({ ...data, primaryColor: e.target.value })} className="h-8 w-8 rounded cursor-pointer border-0" />
                  <Input value={data.primaryColor} onChange={(e) => setData({ ...data, primaryColor: e.target.value })} className="flex-1" />
                </div>
              </div>
              <div className="space-y-1">
                <label className="text-xs text-stone">Secondary</label>
                <div className="flex items-center gap-2">
                  <input type="color" value={data.secondaryColor} onChange={(e) => setData({ ...data, secondaryColor: e.target.value })} className="h-8 w-8 rounded cursor-pointer border-0" />
                  <Input value={data.secondaryColor} onChange={(e) => setData({ ...data, secondaryColor: e.target.value })} className="flex-1" />
                </div>
              </div>
              <div className="space-y-1">
                <label className="text-xs text-stone">Accent</label>
                <div className="flex items-center gap-2">
                  <input type="color" value={data.accentColor} onChange={(e) => setData({ ...data, accentColor: e.target.value })} className="h-8 w-8 rounded cursor-pointer border-0" />
                  <Input value={data.accentColor} onChange={(e) => setData({ ...data, accentColor: e.target.value })} className="flex-1" />
                </div>
              </div>
            </div>
          </div>

          <div className="pt-4">
            <Button onClick={handleSave} loading={saving}>Save Changes</Button>
          </div>
        </div>
      </Card>
    </div>
  );
}
