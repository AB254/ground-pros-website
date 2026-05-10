"use client";

import React from "react";
import { useSession, signOut } from "next-auth/react";
import { LogOut, User } from "lucide-react";

interface TopBarProps {
  title?: string;
}

export function TopBar({ title }: TopBarProps) {
  const { data: session } = useSession();

  return (
    <header className="flex items-center justify-between border-b border-stone/20 bg-white px-6 py-3 shadow-sm">
      <div className="flex items-center gap-4">
        {/* Spacer for mobile menu button */}
        <div className="w-10 lg:hidden" />
        <h1 className="text-xl font-semibold text-charcoal font-sans">
          {title || "Dashboard"}
        </h1>
      </div>

      <div className="flex items-center gap-4">
        <div className="flex items-center gap-2 text-sm text-slate">
          <User className="h-4 w-4" />
          <span>{session?.user?.name || "Admin"}</span>
        </div>
        <button
          onClick={() => signOut({ callbackUrl: "/admin/login" })}
          className="flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-sm text-stone hover:bg-sand transition-colors"
        >
          <LogOut className="h-4 w-4" />
          <span className="hidden sm:inline">Logout</span>
        </button>
      </div>
    </header>
  );
}
