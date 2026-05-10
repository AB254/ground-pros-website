"use client";

import React, { useEffect, useState } from "react";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import { Select } from "@/components/ui/Select";
import { Modal } from "@/components/ui/Modal";
import { Skeleton } from "@/components/ui/Skeleton";
import { useToast } from "@/components/admin/Toast";
import { formatDate } from "@/lib/utils";
import { Eye, Trash2, ChevronLeft, ChevronRight } from "lucide-react";

interface Submission {
  id: string;
  name: string;
  email: string;
  phone: string | null;
  company: string | null;
  serviceInterest: string | null;
  propertyType: string | null;
  message: string;
  status: string;
  createdAt: string;
}

const statusOptions = [
  { value: "", label: "All Statuses" },
  { value: "new", label: "New" },
  { value: "contacted", label: "Contacted" },
  { value: "closed", label: "Closed" },
];

const statusColors: Record<string, "green" | "yellow" | "gray" | "red"> = {
  new: "green",
  contacted: "yellow",
  closed: "gray",
};

export default function SubmissionsPage() {
  const { toast } = useToast();
  const [submissions, setSubmissions] = useState<Submission[]>([]);
  const [loading, setLoading] = useState(true);
  const [statusFilter, setStatusFilter] = useState("");
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [selected, setSelected] = useState<Submission | null>(null);

  const fetchSubmissions = (p = 1, status = statusFilter) => {
    setLoading(true);
    const params = new URLSearchParams({ page: String(p), limit: "15" });
    if (status) params.set("status", status);

    fetch(`/api/submissions?${params}`)
      .then((r) => r.json())
      .then((d) => {
        setSubmissions(d.submissions || []);
        setTotalPages(d.totalPages || 1);
        setPage(d.page || 1);
        setLoading(false);
      })
      .catch(() => { toast("Failed to load", "error"); setLoading(false); });
  };

  useEffect(() => { fetchSubmissions(); }, []);

  const updateStatus = async (id: string, newStatus: string) => {
    try {
      const res = await fetch("/api/submissions", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id, status: newStatus }),
      });
      if (!res.ok) throw new Error();
      setSubmissions(submissions.map((s) => s.id === id ? { ...s, status: newStatus } : s));
      if (selected?.id === id) setSelected({ ...selected, status: newStatus });
      toast("Status updated");
    } catch {
      toast("Failed to update status", "error");
    }
  };

  const deleteSubmission = async (id: string) => {
    if (!confirm("Delete this submission?")) return;
    try {
      const res = await fetch(`/api/submissions?id=${id}`, { method: "DELETE" });
      if (!res.ok) throw new Error();
      setSubmissions(submissions.filter((s) => s.id !== id));
      toast("Submission deleted");
    } catch {
      toast("Failed to delete", "error");
    }
  };

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-charcoal font-sans">Submissions</h2>

      <div className="flex items-center gap-4">
        <div className="w-48">
          <Select
            options={statusOptions}
            value={statusFilter}
            onChange={(e) => { setStatusFilter(e.target.value); fetchSubmissions(1, e.target.value); }}
          />
        </div>
      </div>

      {loading ? (
        <div className="space-y-2">{[1, 2, 3, 4, 5].map((i) => <Skeleton key={i} className="h-12 w-full" />)}</div>
      ) : (
        <>
          <div className="overflow-x-auto rounded-lg border border-stone/20">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-stone/20 bg-sand/50">
                  <th className="px-4 py-3 text-left font-medium text-slate">Name</th>
                  <th className="px-4 py-3 text-left font-medium text-slate">Email</th>
                  <th className="px-4 py-3 text-left font-medium text-slate">Service</th>
                  <th className="px-4 py-3 text-left font-medium text-slate">Status</th>
                  <th className="px-4 py-3 text-left font-medium text-slate">Date</th>
                  <th className="px-4 py-3 text-right font-medium text-slate">Actions</th>
                </tr>
              </thead>
              <tbody>
                {submissions.length === 0 ? (
                  <tr><td colSpan={6} className="px-4 py-8 text-center text-stone">No submissions found</td></tr>
                ) : (
                  submissions.map((sub) => (
                    <tr key={sub.id} className="border-b border-stone/10 last:border-0 hover:bg-sand/30">
                      <td className="px-4 py-3 text-charcoal">{sub.name}</td>
                      <td className="px-4 py-3 text-slate">{sub.email}</td>
                      <td className="px-4 py-3 text-slate">{sub.serviceInterest || "-"}</td>
                      <td className="px-4 py-3">
                        <Badge color={statusColors[sub.status] || "gray"}>{sub.status}</Badge>
                      </td>
                      <td className="px-4 py-3 text-stone">{formatDate(sub.createdAt)}</td>
                      <td className="px-4 py-3 text-right">
                        <div className="flex items-center gap-1 justify-end">
                          <Button variant="ghost" size="sm" onClick={() => setSelected(sub)}><Eye className="h-4 w-4" /></Button>
                          <Button variant="ghost" size="sm" onClick={() => deleteSubmission(sub.id)}><Trash2 className="h-4 w-4 text-red-500" /></Button>
                        </div>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>

          {totalPages > 1 && (
            <div className="flex items-center justify-between text-sm text-stone">
              <span>Page {page} of {totalPages}</span>
              <div className="flex gap-1">
                <button onClick={() => fetchSubmissions(page - 1)} disabled={page <= 1} className="rounded-lg p-1.5 hover:bg-sand disabled:opacity-30"><ChevronLeft className="h-4 w-4" /></button>
                <button onClick={() => fetchSubmissions(page + 1)} disabled={page >= totalPages} className="rounded-lg p-1.5 hover:bg-sand disabled:opacity-30"><ChevronRight className="h-4 w-4" /></button>
              </div>
            </div>
          )}
        </>
      )}

      <Modal open={!!selected} onClose={() => setSelected(null)} title="Submission Details">
        {selected && (
          <div className="space-y-3 text-sm">
            <div><span className="font-medium">Name:</span> {selected.name}</div>
            <div><span className="font-medium">Email:</span> {selected.email}</div>
            {selected.phone && <div><span className="font-medium">Phone:</span> {selected.phone}</div>}
            {selected.company && <div><span className="font-medium">Company:</span> {selected.company}</div>}
            {selected.serviceInterest && <div><span className="font-medium">Service Interest:</span> {selected.serviceInterest}</div>}
            {selected.propertyType && <div><span className="font-medium">Property Type:</span> {selected.propertyType}</div>}
            <div><span className="font-medium">Message:</span><p className="mt-1 text-slate whitespace-pre-wrap">{selected.message}</p></div>
            <div><span className="font-medium">Date:</span> {formatDate(selected.createdAt)}</div>
            <div className="flex items-center gap-2 pt-2">
              <span className="font-medium">Status:</span>
              <Select
                options={[
                  { value: "new", label: "New" },
                  { value: "contacted", label: "Contacted" },
                  { value: "closed", label: "Closed" },
                ]}
                value={selected.status}
                onChange={(e) => updateStatus(selected.id, e.target.value)}
              />
            </div>
          </div>
        )}
      </Modal>
    </div>
  );
}
