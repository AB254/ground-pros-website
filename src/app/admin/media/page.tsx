"use client";

import React, { useEffect, useState } from "react";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { Modal } from "@/components/ui/Modal";
import { Skeleton } from "@/components/ui/Skeleton";
import { ImageUpload } from "@/components/admin/ImageUpload";
import { useToast } from "@/components/admin/Toast";
import { Plus, Trash2, ImageIcon } from "lucide-react";

interface MediaFile {
  id: string;
  fileName: string;
  fileUrl: string;
  fileType: string;
  fileSize: number | null;
  altText: string | null;
  category: string | null;
  createdAt: string;
}

export default function MediaPage() {
  const { toast } = useToast();
  const [files, setFiles] = useState<MediaFile[]>([]);
  const [loading, setLoading] = useState(true);
  const [showUpload, setShowUpload] = useState(false);
  const [saving, setSaving] = useState(false);
  const [newFile, setNewFile] = useState({
    fileName: "",
    fileUrl: "",
    fileType: "image",
    altText: "",
    category: "",
  });

  const fetchFiles = () => {
    fetch("/api/media")
      .then((r) => r.json())
      .then((d) => { setFiles(d); setLoading(false); })
      .catch(() => { toast("Failed to load media", "error"); setLoading(false); });
  };

  useEffect(() => { fetchFiles(); }, []);

  const uploadFile = async () => {
    if (!newFile.fileUrl || !newFile.fileName) {
      toast("Please provide a file name and upload an image", "warning");
      return;
    }
    setSaving(true);
    try {
      const res = await fetch("/api/media", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newFile),
      });
      if (!res.ok) throw new Error();
      toast("File uploaded");
      setShowUpload(false);
      setNewFile({ fileName: "", fileUrl: "", fileType: "image", altText: "", category: "" });
      fetchFiles();
    } catch {
      toast("Failed to upload", "error");
    }
    setSaving(false);
  };

  const deleteFile = async (id: string) => {
    if (!confirm("Delete this file?")) return;
    try {
      const res = await fetch(`/api/media?id=${id}`, { method: "DELETE" });
      if (!res.ok) throw new Error();
      setFiles(files.filter((f) => f.id !== id));
      toast("File deleted");
    } catch {
      toast("Failed to delete", "error");
    }
  };

  if (loading) {
    return (
      <div className="space-y-4">
        <Skeleton className="h-8 w-48" />
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
          {[1, 2, 3, 4, 5, 6].map((i) => <Skeleton key={i} className="h-40 w-full" />)}
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-charcoal font-sans">Media Library</h2>
        <Button size="sm" onClick={() => setShowUpload(true)}><Plus className="h-4 w-4" /> Upload</Button>
      </div>

      {files.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-16 text-stone">
          <ImageIcon className="h-12 w-12 mb-3 opacity-40" />
          <p>No media files yet</p>
        </div>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
          {files.map((file) => (
            <div key={file.id} className="group relative rounded-lg overflow-hidden border border-stone/20 bg-white">
              {file.fileType.startsWith("image") ? (
                <img src={file.fileUrl} alt={file.altText || file.fileName} className="w-full h-36 object-cover" />
              ) : (
                <div className="w-full h-36 flex items-center justify-center bg-sand">
                  <ImageIcon className="h-8 w-8 text-stone" />
                </div>
              )}
              <div className="p-2">
                <p className="text-xs font-medium text-charcoal truncate">{file.fileName}</p>
                {file.category && <p className="text-xs text-stone">{file.category}</p>}
              </div>
              <button
                onClick={() => deleteFile(file.id)}
                className="absolute top-2 right-2 rounded-full bg-black/60 p-1 text-white opacity-0 group-hover:opacity-100 transition-opacity"
              >
                <Trash2 className="h-3.5 w-3.5" />
              </button>
            </div>
          ))}
        </div>
      )}

      <Modal open={showUpload} onClose={() => setShowUpload(false)} title="Upload Media">
        <div className="space-y-4">
          <Input label="File Name" value={newFile.fileName} onChange={(e) => setNewFile({ ...newFile, fileName: e.target.value })} required />
          <ImageUpload
            onUpload={(dataUrl) => setNewFile({ ...newFile, fileUrl: dataUrl, fileType: "image" })}
          />
          <Input label="Alt Text" value={newFile.altText} onChange={(e) => setNewFile({ ...newFile, altText: e.target.value })} />
          <Input label="Category" value={newFile.category} onChange={(e) => setNewFile({ ...newFile, category: e.target.value })} placeholder="e.g. projects, services" />
          <div className="flex gap-3 pt-2">
            <Button onClick={uploadFile} loading={saving}>Upload</Button>
            <Button variant="secondary" onClick={() => setShowUpload(false)}>Cancel</Button>
          </div>
        </div>
      </Modal>
    </div>
  );
}
