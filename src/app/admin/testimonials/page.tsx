"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import { DataTable } from "@/components/admin/DataTable";
import { useToast } from "@/components/admin/Toast";
import { Skeleton } from "@/components/ui/Skeleton";
import { Plus, Pencil, Trash2, Star } from "lucide-react";

interface Testimonial {
  id: string;
  clientName: string;
  company: string | null;
  rating: number;
  isVisible: boolean;
  quote: string;
  [key: string]: unknown;
}

export default function TestimonialsPage() {
  const { toast } = useToast();
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/testimonials")
      .then((r) => r.json())
      .then((d) => { setTestimonials(d); setLoading(false); })
      .catch(() => { toast("Failed to load", "error"); setLoading(false); });
  }, []);

  const deleteTestimonial = async (id: string) => {
    if (!confirm("Delete this testimonial?")) return;
    try {
      const res = await fetch(`/api/testimonials?id=${id}`, { method: "DELETE" });
      if (!res.ok) throw new Error();
      setTestimonials(testimonials.filter((t) => t.id !== id));
      toast("Testimonial deleted");
    } catch {
      toast("Failed to delete", "error");
    }
  };

  if (loading) return <div className="space-y-4"><Skeleton className="h-8 w-48" /><Skeleton className="h-64 w-full" /></div>;

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-charcoal font-sans">Testimonials</h2>
        <Link href="/admin/testimonials/new">
          <Button size="sm"><Plus className="h-4 w-4" /> Add Testimonial</Button>
        </Link>
      </div>

      <DataTable
        data={testimonials}
        searchField="clientName"
        columns={[
          { key: "clientName", label: "Client" },
          { key: "company", label: "Company", render: (item) => <span>{item.company || "-"}</span> },
          { key: "rating", label: "Rating", render: (item) => (
            <div className="flex items-center gap-0.5">
              {Array.from({ length: item.rating }).map((_, i) => <Star key={i} className="h-3.5 w-3.5 fill-gold text-gold" />)}
            </div>
          )},
          { key: "quote", label: "Quote", render: (item) => <span className="line-clamp-1 max-w-xs">{item.quote}</span> },
        ]}
        actions={(item) => (
          <div className="flex items-center gap-1 justify-end">
            <Link href={`/admin/testimonials/${item.id}`}><Button variant="ghost" size="sm"><Pencil className="h-4 w-4" /></Button></Link>
            <Button variant="ghost" size="sm" onClick={() => deleteTestimonial(item.id)}><Trash2 className="h-4 w-4 text-red-500" /></Button>
          </div>
        )}
      />
    </div>
  );
}
