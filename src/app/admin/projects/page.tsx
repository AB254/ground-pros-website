"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import { DataTable } from "@/components/admin/DataTable";
import { useToast } from "@/components/admin/Toast";
import { Skeleton } from "@/components/ui/Skeleton";
import { Plus, Pencil, Trash2 } from "lucide-react";

interface Project {
  id: string;
  title: string;
  category: string;
  isFeatured: boolean;
  isVisible: boolean;
  [key: string]: unknown;
}

export default function ProjectsPage() {
  const { toast } = useToast();
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchProjects = () => {
    fetch("/api/projects")
      .then((r) => r.json())
      .then((d) => { setProjects(d); setLoading(false); })
      .catch(() => { toast("Failed to load projects", "error"); setLoading(false); });
  };

  useEffect(() => { fetchProjects(); }, []);

  const deleteProject = async (id: string) => {
    if (!confirm("Delete this project?")) return;
    try {
      const res = await fetch(`/api/projects?id=${id}`, { method: "DELETE" });
      if (!res.ok) throw new Error();
      setProjects(projects.filter((p) => p.id !== id));
      toast("Project deleted");
    } catch {
      toast("Failed to delete", "error");
    }
  };

  if (loading) return <div className="space-y-4"><Skeleton className="h-8 w-48" /><Skeleton className="h-64 w-full" /></div>;

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-charcoal font-sans">Projects</h2>
        <Link href="/admin/projects/new">
          <Button size="sm"><Plus className="h-4 w-4" /> Add Project</Button>
        </Link>
      </div>

      <DataTable
        data={projects}
        searchField="title"
        columns={[
          { key: "title", label: "Title" },
          { key: "category", label: "Category" },
          {
            key: "isFeatured",
            label: "Featured",
            render: (item) => item.isFeatured ? <Badge color="yellow">Featured</Badge> : <span className="text-stone">-</span>,
          },
          {
            key: "isVisible",
            label: "Status",
            render: (item) => <Badge color={item.isVisible ? "green" : "gray"}>{item.isVisible ? "Visible" : "Hidden"}</Badge>,
          },
        ]}
        actions={(item) => (
          <div className="flex items-center gap-1 justify-end">
            <Link href={`/admin/projects/${item.id}`}><Button variant="ghost" size="sm"><Pencil className="h-4 w-4" /></Button></Link>
            <Button variant="ghost" size="sm" onClick={() => deleteProject(item.id)}><Trash2 className="h-4 w-4 text-red-500" /></Button>
          </div>
        )}
      />
    </div>
  );
}
