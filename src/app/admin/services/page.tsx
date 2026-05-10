"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import { useToast } from "@/components/admin/Toast";
import { DataTable } from "@/components/admin/DataTable";
import { Skeleton } from "@/components/ui/Skeleton";
import { Plus, Pencil, Trash2 } from "lucide-react";

interface Service {
  id: string;
  title: string;
  slug: string;
  shortDesc: string;
  isVisible: boolean;
  sortOrder: number;
  [key: string]: unknown;
}

export default function ServicesPage() {
  const { toast } = useToast();
  const [services, setServices] = useState<Service[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchServices = () => {
    fetch("/api/services")
      .then((r) => r.json())
      .then((d) => { setServices(d); setLoading(false); })
      .catch(() => { toast("Failed to load services", "error"); setLoading(false); });
  };

  useEffect(() => { fetchServices(); }, []);

  const deleteService = async (id: string) => {
    if (!confirm("Delete this service?")) return;
    try {
      const res = await fetch(`/api/services?id=${id}`, { method: "DELETE" });
      if (!res.ok) throw new Error();
      setServices(services.filter((s) => s.id !== id));
      toast("Service deleted");
    } catch {
      toast("Failed to delete", "error");
    }
  };

  if (loading) {
    return (
      <div className="space-y-4">
        <Skeleton className="h-8 w-48" />
        <Skeleton className="h-64 w-full" />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-charcoal font-sans">Services</h2>
        <Link href="/admin/services/new">
          <Button size="sm"><Plus className="h-4 w-4" /> Add Service</Button>
        </Link>
      </div>

      <DataTable
        data={services}
        searchField="title"
        columns={[
          { key: "title", label: "Title" },
          { key: "slug", label: "Slug" },
          { key: "sortOrder", label: "Order" },
          {
            key: "isVisible",
            label: "Status",
            render: (item) => (
              <Badge color={item.isVisible ? "green" : "gray"}>
                {item.isVisible ? "Visible" : "Hidden"}
              </Badge>
            ),
          },
        ]}
        actions={(item) => (
          <div className="flex items-center gap-1 justify-end">
            <Link href={`/admin/services/${item.id}`}>
              <Button variant="ghost" size="sm"><Pencil className="h-4 w-4" /></Button>
            </Link>
            <Button variant="ghost" size="sm" onClick={() => deleteService(item.id)}>
              <Trash2 className="h-4 w-4 text-red-500" />
            </Button>
          </div>
        )}
      />
    </div>
  );
}
