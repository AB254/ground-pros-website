"use client";

import React, { useEffect, useState } from "react";
import { Input } from "@/components/ui/Input";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { Toggle } from "@/components/ui/Toggle";
import { useToast } from "@/components/admin/Toast";
import { Skeleton } from "@/components/ui/Skeleton";
import { Plus, Trash2, GripVertical } from "lucide-react";

interface StatItem {
  id: string;
  number: string;
  label: string;
  sortOrder: number;
  isVisible: boolean;
}

export default function StatsPage() {
  const { toast } = useToast();
  const [stats, setStats] = useState<StatItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState<string | null>(null);

  const fetchStats = () => {
    fetch("/api/stats")
      .then((r) => r.json())
      .then((d) => { setStats(d); setLoading(false); })
      .catch(() => { toast("Failed to load stats", "error"); setLoading(false); });
  };

  useEffect(() => { fetchStats(); }, []);

  const addStat = async () => {
    try {
      const res = await fetch("/api/stats", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ number: "0", label: "New Stat", sortOrder: stats.length }),
      });
      if (!res.ok) throw new Error();
      toast("Stat added");
      fetchStats();
    } catch {
      toast("Failed to add stat", "error");
    }
  };

  const updateStat = async (stat: StatItem) => {
    setSaving(stat.id);
    try {
      const res = await fetch("/api/stats", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(stat),
      });
      if (!res.ok) throw new Error();
      toast("Stat updated");
    } catch {
      toast("Failed to update", "error");
    }
    setSaving(null);
  };

  const deleteStat = async (id: string) => {
    if (!confirm("Delete this stat?")) return;
    try {
      const res = await fetch(`/api/stats?id=${id}`, { method: "DELETE" });
      if (!res.ok) throw new Error();
      setStats(stats.filter((s) => s.id !== id));
      toast("Stat deleted");
    } catch {
      toast("Failed to delete", "error");
    }
  };

  if (loading) {
    return (
      <div className="space-y-4">
        <Skeleton className="h-8 w-48" />
        {[1, 2, 3].map((i) => <Skeleton key={i} className="h-20 w-full" />)}
      </div>
    );
  }

  return (
    <div className="space-y-6 max-w-3xl">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-charcoal font-sans">Stats</h2>
        <Button onClick={addStat} size="sm"><Plus className="h-4 w-4" /> Add Stat</Button>
      </div>

      <div className="space-y-3">
        {stats.map((stat, idx) => (
          <Card key={stat.id}>
            <div className="flex items-start gap-4">
              <GripVertical className="h-5 w-5 text-stone mt-2 shrink-0" />
              <div className="flex-1 grid grid-cols-1 sm:grid-cols-3 gap-3">
                <Input
                  label="Number"
                  value={stat.number}
                  onChange={(e) => {
                    const updated = [...stats];
                    updated[idx] = { ...stat, number: e.target.value };
                    setStats(updated);
                  }}
                />
                <Input
                  label="Label"
                  value={stat.label}
                  onChange={(e) => {
                    const updated = [...stats];
                    updated[idx] = { ...stat, label: e.target.value };
                    setStats(updated);
                  }}
                />
                <Input
                  label="Order"
                  type="number"
                  value={stat.sortOrder}
                  onChange={(e) => {
                    const updated = [...stats];
                    updated[idx] = { ...stat, sortOrder: parseInt(e.target.value) || 0 };
                    setStats(updated);
                  }}
                />
              </div>
              <div className="flex items-center gap-2 mt-6">
                <Toggle
                  checked={stat.isVisible}
                  onChange={(v) => {
                    const updated = [...stats];
                    updated[idx] = { ...stat, isVisible: v };
                    setStats(updated);
                  }}
                />
                <Button
                  variant="ghost"
                  size="sm"
                  loading={saving === stat.id}
                  onClick={() => updateStat(stats[idx])}
                >
                  Save
                </Button>
                <Button variant="danger" size="sm" onClick={() => deleteStat(stat.id)}>
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </Card>
        ))}
        {stats.length === 0 && (
          <p className="text-center text-stone py-8">No stats yet. Add one to get started.</p>
        )}
      </div>
    </div>
  );
}
