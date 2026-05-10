"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import { DataTable } from "@/components/admin/DataTable";
import { Modal } from "@/components/ui/Modal";
import { Input } from "@/components/ui/Input";
import { Textarea } from "@/components/ui/Textarea";
import { Select } from "@/components/ui/Select";
import { Toggle } from "@/components/ui/Toggle";
import { useToast } from "@/components/admin/Toast";
import { Skeleton } from "@/components/ui/Skeleton";
import { Plus, Pencil, Trash2 } from "lucide-react";

interface Job {
  id: string;
  title: string;
  department: string | null;
  location: string;
  type: string;
  isActive: boolean;
  [key: string]: unknown;
}

export default function CareersPage() {
  const { toast } = useToast();
  const [jobs, setJobs] = useState<Job[]>([]);
  const [loading, setLoading] = useState(true);
  const [showNew, setShowNew] = useState(false);
  const [saving, setSaving] = useState(false);
  const [newJob, setNewJob] = useState({
    title: "",
    department: "",
    location: "Itasca, IL",
    type: "Full-time",
    description: "",
    isActive: true,
  });

  const fetchJobs = () => {
    fetch("/api/careers?all=true")
      .then((r) => r.json())
      .then((d) => { setJobs(d); setLoading(false); })
      .catch(() => { toast("Failed to load", "error"); setLoading(false); });
  };

  useEffect(() => { fetchJobs(); }, []);

  const createJob = async () => {
    setSaving(true);
    try {
      const res = await fetch("/api/careers", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newJob),
      });
      if (!res.ok) throw new Error();
      toast("Job posting created");
      setShowNew(false);
      setNewJob({ title: "", department: "", location: "Itasca, IL", type: "Full-time", description: "", isActive: true });
      fetchJobs();
    } catch {
      toast("Failed to create", "error");
    }
    setSaving(false);
  };

  const deleteJob = async (id: string) => {
    if (!confirm("Delete this job posting?")) return;
    try {
      const res = await fetch(`/api/careers?id=${id}`, { method: "DELETE" });
      if (!res.ok) throw new Error();
      setJobs(jobs.filter((j) => j.id !== id));
      toast("Job deleted");
    } catch {
      toast("Failed to delete", "error");
    }
  };

  if (loading) return <div className="space-y-4"><Skeleton className="h-8 w-48" /><Skeleton className="h-64 w-full" /></div>;

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-charcoal font-sans">Careers</h2>
        <Button size="sm" onClick={() => setShowNew(true)}><Plus className="h-4 w-4" /> Add Job</Button>
      </div>

      <DataTable
        data={jobs}
        searchField="title"
        columns={[
          { key: "title", label: "Title" },
          { key: "department", label: "Department", render: (item) => <span>{item.department || "-"}</span> },
          { key: "location", label: "Location" },
          { key: "type", label: "Type" },
          {
            key: "isActive",
            label: "Status",
            render: (item) => <Badge color={item.isActive ? "green" : "gray"}>{item.isActive ? "Active" : "Inactive"}</Badge>,
          },
        ]}
        actions={(item) => (
          <div className="flex items-center gap-1 justify-end">
            <Link href={`/admin/careers/${item.id}`}><Button variant="ghost" size="sm"><Pencil className="h-4 w-4" /></Button></Link>
            <Button variant="ghost" size="sm" onClick={() => deleteJob(item.id)}><Trash2 className="h-4 w-4 text-red-500" /></Button>
          </div>
        )}
      />

      <Modal open={showNew} onClose={() => setShowNew(false)} title="New Job Posting">
        <div className="space-y-4">
          <Input label="Title" value={newJob.title} onChange={(e) => setNewJob({ ...newJob, title: e.target.value })} required />
          <Input label="Department" value={newJob.department} onChange={(e) => setNewJob({ ...newJob, department: e.target.value })} />
          <div className="grid grid-cols-2 gap-4">
            <Input label="Location" value={newJob.location} onChange={(e) => setNewJob({ ...newJob, location: e.target.value })} />
            <Select label="Type" options={[
              { value: "Full-time", label: "Full-time" },
              { value: "Part-time", label: "Part-time" },
              { value: "Seasonal", label: "Seasonal" },
              { value: "Contract", label: "Contract" },
            ]} value={newJob.type} onChange={(e) => setNewJob({ ...newJob, type: e.target.value })} />
          </div>
          <Textarea label="Description" value={newJob.description} onChange={(e) => setNewJob({ ...newJob, description: e.target.value })} required />
          <Toggle checked={newJob.isActive} onChange={(v) => setNewJob({ ...newJob, isActive: v })} label="Active" />
          <div className="flex gap-3 pt-2">
            <Button onClick={createJob} loading={saving}>Create</Button>
            <Button variant="secondary" onClick={() => setShowNew(false)}>Cancel</Button>
          </div>
        </div>
      </Modal>
    </div>
  );
}
