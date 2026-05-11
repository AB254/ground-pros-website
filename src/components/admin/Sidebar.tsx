"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import {
  LayoutDashboard,
  Image,
  BarChart3,
  Wrench,
  Info,
  FolderOpen,
  Quote,
  Award,
  Megaphone,
  Phone,
  FileText,
  Inbox,
  Briefcase,
  ImageIcon,
  Search,
  Settings,
  ChevronLeft,
  Menu,
} from "lucide-react";

const allNavItems = [
  { label: "Dashboard", href: "/admin", icon: LayoutDashboard },
  { label: "Hero Section", href: "/admin/hero", icon: Image },
  { label: "Stats", href: "/admin/stats", icon: BarChart3 },
  { label: "Services", href: "/admin/services", icon: Wrench },
  { label: "About", href: "/admin/about", icon: Info },
  { label: "Projects", href: "/admin/projects", icon: FolderOpen },
  { label: "Testimonials", href: "/admin/testimonials", icon: Quote },
  { label: "Affiliations", href: "/admin/affiliations", icon: Award },
  { label: "CTA Banner", href: "/admin/cta-banner", icon: Megaphone },
  { label: "Contact Info", href: "/admin/contact-info", icon: Phone },
  { label: "Footer", href: "/admin/footer", icon: FileText },
  { label: "Submissions", href: "/admin/submissions", icon: Inbox },
  { label: "Careers", href: "/admin/careers", icon: Briefcase },
  { label: "Media", href: "/admin/media", icon: ImageIcon },
  { label: "SEO", href: "/admin/seo", icon: Search },
  { label: "Settings", href: "/admin/settings", icon: Settings },
];

const editorNavHrefs = new Set([
  "/admin",
  "/admin/stats",
  "/admin/services",
  "/admin/projects",
  "/admin/testimonials",
  "/admin/careers",
  "/admin/settings",
]);

export function Sidebar({ role = "admin" }: { role?: string }) {
  const pathname = usePathname();
  const [collapsed, setCollapsed] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  const navItems = role === "admin"
    ? allNavItems
    : allNavItems.filter((item) => editorNavHrefs.has(item.href));

  const isActive = (href: string) => {
    if (href === "/admin") return pathname === "/admin";
    return pathname.startsWith(href);
  };

  const sidebar = (
    <aside
      className={cn(
        "flex flex-col bg-forest text-white transition-all duration-300 h-full",
        collapsed ? "w-16" : "w-60"
      )}
    >
      <div className="flex items-center justify-between px-4 py-5 border-b border-white/10">
        {!collapsed && (
          <Link href="/admin" className="text-lg font-bold tracking-wide font-sans">
            Ground Pros
          </Link>
        )}
        <button
          onClick={() => setCollapsed(!collapsed)}
          className="hidden lg:block p-1 rounded hover:bg-white/10 transition-colors"
        >
          <ChevronLeft
            className={cn("h-5 w-5 transition-transform", collapsed && "rotate-180")}
          />
        </button>
      </div>

      <nav className="flex-1 overflow-y-auto py-2 space-y-0.5 px-2">
        {navItems.map((item) => {
          const Icon = item.icon;
          const active = isActive(item.href);
          return (
            <Link
              key={item.href}
              href={item.href}
              onClick={() => setMobileOpen(false)}
              className={cn(
                "flex items-center gap-3 rounded-lg px-3 py-2 text-sm transition-colors",
                active
                  ? "bg-sage/20 text-sage font-medium"
                  : "text-white/70 hover:bg-white/10 hover:text-white"
              )}
              title={collapsed ? item.label : undefined}
            >
              <Icon className="h-5 w-5 shrink-0" />
              {!collapsed && <span>{item.label}</span>}
            </Link>
          );
        })}
      </nav>
    </aside>
  );

  return (
    <>
      {/* Mobile toggle */}
      <button
        onClick={() => setMobileOpen(true)}
        className="fixed top-4 left-4 z-50 lg:hidden rounded-lg bg-forest p-2 text-white shadow-lg"
      >
        <Menu className="h-5 w-5" />
      </button>

      {/* Mobile overlay */}
      {mobileOpen && (
        <div className="fixed inset-0 z-40 lg:hidden">
          <div
            className="absolute inset-0 bg-black/50"
            onClick={() => setMobileOpen(false)}
          />
          <div className="relative z-10 h-full w-60">{sidebar}</div>
        </div>
      )}

      {/* Desktop sidebar */}
      <div className="hidden lg:block h-full">{sidebar}</div>
    </>
  );
}
