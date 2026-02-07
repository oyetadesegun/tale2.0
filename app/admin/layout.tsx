import Link from "next/link";
import { LogoutButton } from "@/components/admin/logout-button";
import { LayoutDashboard, Users, HelpCircle, Heart, Shield } from "lucide-react";

export const dynamic = 'force-dynamic';

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen bg-secondary/10">
      {/* Sidebar */}
      <aside className="w-64 bg-card border-r border-border hidden md:flex flex-col">
        <div className="p-6 border-b border-border flex items-center gap-2">
          <Heart className="h-6 w-6 text-primary fill-primary" />
          <span className="font-serif font-bold text-xl">Love Admin</span>
        </div>
        <nav className="flex-1 p-4 space-y-2">
          <Link
            href="/admin"
            className="flex items-center gap-3 px-4 py-2 text-sm font-medium rounded-md hover:bg-secondary transition-colors"
          >
            <LayoutDashboard className="h-4 w-4" />
            Dashboard
          </Link>
          <Link
            href="/admin/leads"
            className="flex items-center gap-3 px-4 py-2 text-sm font-medium rounded-md hover:bg-secondary transition-colors"
          >
            <Users className="h-4 w-4" />
            Leads
          </Link>
          <Link
            href="/admin/quiz"
            className="flex items-center gap-3 px-4 py-2 text-sm font-medium rounded-md hover:bg-secondary transition-colors"
          >
            <HelpCircle className="h-4 w-4" />
            Quiz Content
          </Link>
          <Link
            href="/admin/users"
            className="flex items-center gap-3 px-4 py-2 text-sm font-medium rounded-md hover:bg-secondary transition-colors"
          >
            <Shield className="h-4 w-4" />
            User Management
          </Link>
        </nav>
        <div className="p-4 border-t border-border mt-auto space-y-2">
          <Link
            href="/"
            className="flex items-center gap-3 px-4 py-2 text-sm font-medium rounded-md hover:bg-secondary transition-colors text-muted-foreground"
          >
            Back to Site
          </Link>
          <LogoutButton />
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-8 overflow-auto">
        {children}
      </main>
    </div>
  );
}
