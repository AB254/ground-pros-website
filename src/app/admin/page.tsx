export const dynamic = "force-dynamic";

import React from "react";
import { prisma } from "@/lib/prisma";
import { Inbox, FolderOpen, Briefcase, BarChart3 } from "lucide-react";
import { DashboardCard } from "@/components/admin/DashboardCard";
import { formatDate } from "@/lib/utils";
import Link from "next/link";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";

export default async function AdminDashboardPage() {
  const now = new Date();
  const oneWeekAgo = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);

  const [
    totalSubmissions,
    newThisWeek,
    totalProjects,
    activeJobs,
    recentSubmissions,
  ] = await Promise.all([
    prisma.contactSubmission.count(),
    prisma.contactSubmission.count({
      where: { createdAt: { gte: oneWeekAgo } },
    }),
    prisma.project.count(),
    prisma.jobPosting.count({ where: { isActive: true } }),
    prisma.contactSubmission.findMany({
      take: 5,
      orderBy: { createdAt: "desc" },
    }),
  ]);

  const statusColor = (s: string) => {
    switch (s) {
      case "new":
        return "green" as const;
      case "contacted":
        return "yellow" as const;
      case "closed":
        return "gray" as const;
      default:
        return "gray" as const;
    }
  };

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-charcoal font-sans">Dashboard</h2>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <DashboardCard
          icon={Inbox}
          label="Total Submissions"
          value={totalSubmissions}
        />
        <DashboardCard
          icon={BarChart3}
          label="New This Week"
          value={newThisWeek}
          trend={
            newThisWeek > 0
              ? { value: `${newThisWeek} new`, positive: true }
              : undefined
          }
        />
        <DashboardCard
          icon={FolderOpen}
          label="Total Projects"
          value={totalProjects}
        />
        <DashboardCard
          icon={Briefcase}
          label="Active Jobs"
          value={activeJobs}
        />
      </div>

      <div className="rounded-xl border border-stone/20 bg-white shadow-sm">
        <div className="flex items-center justify-between border-b border-stone/20 px-6 py-4">
          <h3 className="font-semibold text-charcoal font-sans">
            Recent Submissions
          </h3>
          <Link href="/admin/submissions">
            <Button variant="ghost" size="sm">
              View All
            </Button>
          </Link>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-stone/20 bg-sand/50">
                <th className="px-6 py-3 text-left font-medium text-slate">
                  Name
                </th>
                <th className="px-6 py-3 text-left font-medium text-slate">
                  Email
                </th>
                <th className="px-6 py-3 text-left font-medium text-slate">
                  Service
                </th>
                <th className="px-6 py-3 text-left font-medium text-slate">
                  Status
                </th>
                <th className="px-6 py-3 text-left font-medium text-slate">
                  Date
                </th>
              </tr>
            </thead>
            <tbody>
              {recentSubmissions.length === 0 ? (
                <tr>
                  <td
                    colSpan={5}
                    className="px-6 py-8 text-center text-stone"
                  >
                    No submissions yet
                  </td>
                </tr>
              ) : (
                recentSubmissions.map((sub) => (
                  <tr
                    key={sub.id}
                    className="border-b border-stone/10 last:border-0"
                  >
                    <td className="px-6 py-3 text-charcoal">{sub.name}</td>
                    <td className="px-6 py-3 text-slate">{sub.email}</td>
                    <td className="px-6 py-3 text-slate">
                      {sub.serviceInterest || "-"}
                    </td>
                    <td className="px-6 py-3">
                      <Badge color={statusColor(sub.status)}>
                        {sub.status}
                      </Badge>
                    </td>
                    <td className="px-6 py-3 text-stone">
                      {formatDate(sub.createdAt)}
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
        <Link href="/admin/services/new">
          <div className="rounded-xl border border-stone/20 bg-white p-4 shadow-sm hover:border-pine/30 transition-colors cursor-pointer">
            <p className="font-medium text-charcoal">Add Service</p>
            <p className="text-sm text-stone">Create a new service listing</p>
          </div>
        </Link>
        <Link href="/admin/projects/new">
          <div className="rounded-xl border border-stone/20 bg-white p-4 shadow-sm hover:border-pine/30 transition-colors cursor-pointer">
            <p className="font-medium text-charcoal">Add Project</p>
            <p className="text-sm text-stone">Showcase a new project</p>
          </div>
        </Link>
        <Link href="/admin/careers">
          <div className="rounded-xl border border-stone/20 bg-white p-4 shadow-sm hover:border-pine/30 transition-colors cursor-pointer">
            <p className="font-medium text-charcoal">Manage Careers</p>
            <p className="text-sm text-stone">Post or edit job listings</p>
          </div>
        </Link>
      </div>
    </div>
  );
}
