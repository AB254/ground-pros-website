"use client";

import { useState } from "react";
import { Send, CheckCircle } from "lucide-react";

interface Props {
  jobId: string;
  jobTitle: string;
}

export default function CareerApplicationForm({ jobId, jobTitle }: Props) {
  const [isOpen, setIsOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setIsSubmitting(true);

    const form = e.currentTarget;
    const formData = new FormData(form);

    try {
      const res = await fetch("/api/applications", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          jobId,
          name: formData.get("name"),
          email: formData.get("email"),
          phone: formData.get("phone"),
          coverLetter: formData.get("coverLetter"),
        }),
      });

      if (res.ok) {
        setIsSubmitted(true);
      }
    } catch {
      // silently fail
    } finally {
      setIsSubmitting(false);
    }
  }

  if (isSubmitted) {
    return (
      <div className="flex items-center gap-2 text-green-600">
        <CheckCircle className="w-5 h-5" />
        <span className="font-medium">Application Sent!</span>
      </div>
    );
  }

  if (!isOpen) {
    return (
      <button
        onClick={() => setIsOpen(true)}
        className="flex items-center gap-2 bg-pine text-white px-6 py-3 rounded-lg hover:bg-moss transition-colors font-medium whitespace-nowrap"
      >
        <Send className="w-4 h-4" /> Apply Now
      </button>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="w-full mt-6 border-t pt-6 space-y-4">
      <p className="text-sm font-medium text-forest">Apply for: {jobTitle}</p>
      <div className="grid sm:grid-cols-2 gap-4">
        <input
          name="name"
          required
          placeholder="Full Name"
          className="px-4 py-2 border border-stone/30 rounded-lg focus:ring-2 focus:ring-pine focus:border-transparent outline-none"
        />
        <input
          name="email"
          type="email"
          required
          placeholder="Email"
          className="px-4 py-2 border border-stone/30 rounded-lg focus:ring-2 focus:ring-pine focus:border-transparent outline-none"
        />
      </div>
      <input
        name="phone"
        placeholder="Phone (optional)"
        className="w-full px-4 py-2 border border-stone/30 rounded-lg focus:ring-2 focus:ring-pine focus:border-transparent outline-none"
      />
      <textarea
        name="coverLetter"
        rows={3}
        placeholder="Tell us about yourself..."
        className="w-full px-4 py-2 border border-stone/30 rounded-lg focus:ring-2 focus:ring-pine focus:border-transparent outline-none resize-none"
      />
      <div className="flex gap-3">
        <button
          type="submit"
          disabled={isSubmitting}
          className="bg-pine text-white px-6 py-2 rounded-lg hover:bg-moss transition-colors font-medium disabled:opacity-50"
        >
          {isSubmitting ? "Sending..." : "Submit Application"}
        </button>
        <button
          type="button"
          onClick={() => setIsOpen(false)}
          className="px-6 py-2 rounded-lg border border-stone/30 text-slate hover:bg-sand transition-colors"
        >
          Cancel
        </button>
      </div>
    </form>
  );
}
