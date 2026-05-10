"use client";

import React, { useEffect, useState } from "react";
import { Input } from "@/components/ui/Input";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { Toggle } from "@/components/ui/Toggle";
import { useToast } from "@/components/admin/Toast";
import { Skeleton } from "@/components/ui/Skeleton";
import { Plus, Trash2 } from "lucide-react";

interface Affiliation {
  id: string;
  name: string;
  logoUrl: string;
  website: string | null;
  sortOrder: number;
  isVisible: boolean;
}

export default function AffiliationsPage() {
  const { toast } = useToast();
  const [items, setItems] = useState<Affiliation[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState<string | null>(null);

  const fetchItems = () => {
    fetch("/api/affiliations")
      .then((r) => r.json())
      .then((d) => { setItems(d); setLoading(false); })
      .catch(() => { toast("Failed to load", "error"); setLoading(false); });
  };

  useEffect(() => { fetchItems(); }, []);

  const addItem = async () => {
    try {
      const res = await fetch("/api/affiliations", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name: "New Affiliation", logoUrl: "", sortOrder: items.length }),
      });
      if (!res.ok) throw new Error();
      toast("Affiliation added");
      fetchItems();
    } catch {
      toast("Failed to add", "error");
    }
  };

  const updateItem = async (item: Affiliation) => {
    setSaving(item.id);
    try {
      const res = await fetch("/api/affiliations", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(item),
      });
      if (!res.ok) throw new Error();
      toast("Updated");
    } catch {
      toast("Failed to update", "error");
    }
    setSaving(null);
  };

  const deleteItem = async (id: string) => {
    if (!confirm("Delete this affiliation?")) return;
    try {
      const res = await fetch(`/api/affiliations?id=${id}`, { method: "DELETE" });
      if (!res.ok) throw new Error();
      setItems(items.filter((i) => i.id !== id));
      toast("Deleted");
    } catch {
      toast("Failed to delete", "error");
    }
  };

  if (loading) return <div className="space-y-4"><Skeleton className="h-8 w-48" /><Skeleton className="h-64 w-full" /></div>;

  return (
    <div className="space-y-6 max-w-3xl">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-charcoal font-sans">Affiliations</h2>
        <Button onClick={addItem} size="sm"><Plus className="h-4 w-4" /> Add</Button>
      </div>

      <div className="space-y-3">
        {items.map((item, idx) => (
          <Card key={item.id}>
            <div className="space-y-3">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <Input label="Name" value={item.name} onChange={(e) => { const u = [...items]; u[idx] = { ...item, name: e.target.value }; setItems(u); }} />
                <Input label="Logo URL" value={item.logoUrl} onChange={(e) => { const u = [...items]; u[idx] = { ...item, logoUrl: e.target.value }; setItems(u); }} />
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <Input label="Website" value={item.website || ""} onChange={(e) => { const u = [...items]; u[idx] = { ...item, website: e.target.value || null }; setItems(u); }} />
                <Input label="Order" type="number" value={item.sortOrder} onChange={(e) => { const u = [...items]; u[idx] = { ...item, sortOrder: parseInt(e.target.value) || 0 }; setItems(u); }} />
              </div>
              <div className="flex items-center justify-between">
                <Toggle checked={item.isVisible} onChange={(v) => { const u = [...items]; u[idx] = { ...item, isVisible: v }; setItems(u); }} label="Visible" />
                <div className="flex gap-2">
                  <Button variant="ghost" size="sm" loading={saving === item.id} onClick={() => updateItem(items[idx])}>Save</Button>
                  <Button variant="danger" size="sm" onClick={() => deleteItem(item.id)}><Trash2 className="h-4 w-4" /></Button>
                </div>
              </div>
            </div>
          </Card>
        ))}
        {items.length === 0 && <p className="text-center text-stone py-8">No affiliations yet.</p>}
      </div>
    </div>
  );
}
