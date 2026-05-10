"use client";

import React, { useEffect, useState } from "react";
import { Input } from "@/components/ui/Input";
import { Textarea } from "@/components/ui/Textarea";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { Skeleton } from "@/components/ui/Skeleton";
import { useToast } from "@/components/admin/Toast";
import { Plus, Trash2 } from "lucide-react";

interface BusinessHour {
  day: string;
  hours: string;
}

interface ContactData {
  id: string;
  address: string;
  phone: string;
  fax: string | null;
  email: string;
  businessHours: BusinessHour[];
  socialLinks: Record<string, string>;
  mapEmbedUrl: string | null;
  notificationEmail: string;
}

export default function ContactInfoPage() {
  const { toast } = useToast();
  const [data, setData] = useState<ContactData | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    fetch("/api/contact-info")
      .then((r) => r.json())
      .then((d) => {
        if (d) {
          setData({
            ...d,
            businessHours: Array.isArray(d.businessHours) ? d.businessHours : [],
            socialLinks: typeof d.socialLinks === "object" && d.socialLinks ? d.socialLinks : {},
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
      const res = await fetch("/api/contact-info", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      if (!res.ok) throw new Error();
      toast("Contact info updated");
    } catch {
      toast("Failed to save", "error");
    }
    setSaving(false);
  };

  if (loading) return <div className="space-y-4"><Skeleton className="h-8 w-48" /><Skeleton className="h-96 w-full" /></div>;
  if (!data) return <p className="text-stone">No contact info found.</p>;

  return (
    <div className="space-y-6 max-w-3xl">
      <h2 className="text-2xl font-bold text-charcoal font-sans">Contact Info</h2>

      <Card>
        <div className="space-y-4">
          <Input label="Address" value={data.address} onChange={(e) => setData({ ...data, address: e.target.value })} />
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Input label="Phone" value={data.phone} onChange={(e) => setData({ ...data, phone: e.target.value })} />
            <Input label="Fax" value={data.fax || ""} onChange={(e) => setData({ ...data, fax: e.target.value || null })} />
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Input label="Email" value={data.email} onChange={(e) => setData({ ...data, email: e.target.value })} />
            <Input label="Notification Email" value={data.notificationEmail} onChange={(e) => setData({ ...data, notificationEmail: e.target.value })} />
          </div>
          <Textarea label="Map Embed URL" value={data.mapEmbedUrl || ""} onChange={(e) => setData({ ...data, mapEmbedUrl: e.target.value || null })} />

          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <label className="text-sm font-medium text-charcoal">Business Hours</label>
              <Button type="button" variant="secondary" size="sm" onClick={() => setData({ ...data, businessHours: [...data.businessHours, { day: "", hours: "" }] })}>
                <Plus className="h-4 w-4" /> Add
              </Button>
            </div>
            {data.businessHours.map((bh, i) => (
              <div key={i} className="flex items-center gap-2">
                <Input placeholder="Day" value={bh.day} onChange={(e) => { const h = [...data.businessHours]; h[i] = { ...bh, day: e.target.value }; setData({ ...data, businessHours: h }); }} className="w-40" />
                <Input placeholder="Hours" value={bh.hours} onChange={(e) => { const h = [...data.businessHours]; h[i] = { ...bh, hours: e.target.value }; setData({ ...data, businessHours: h }); }} className="flex-1" />
                <Button type="button" variant="ghost" size="sm" onClick={() => setData({ ...data, businessHours: data.businessHours.filter((_, idx) => idx !== i) })}>
                  <Trash2 className="h-4 w-4 text-red-500" />
                </Button>
              </div>
            ))}
          </div>

          <div className="space-y-3">
            <label className="text-sm font-medium text-charcoal">Social Links</label>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <Input label="Instagram" value={data.socialLinks.instagram || ""} onChange={(e) => setData({ ...data, socialLinks: { ...data.socialLinks, instagram: e.target.value } })} />
              <Input label="LinkedIn" value={data.socialLinks.linkedin || ""} onChange={(e) => setData({ ...data, socialLinks: { ...data.socialLinks, linkedin: e.target.value } })} />
              <Input label="Facebook" value={data.socialLinks.facebook || ""} onChange={(e) => setData({ ...data, socialLinks: { ...data.socialLinks, facebook: e.target.value } })} />
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
