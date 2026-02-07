"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Shield, ShieldAlert, Loader2 } from "lucide-react";

interface RoleToggleProps {
  userId: string;
  currentRole: string;
}

export function RoleToggle({ userId, currentRole }: RoleToggleProps) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  async function handleToggle() {
    const newRole = currentRole === "admin" ? "user" : "admin";
    
    if (!confirm(`Are you sure you want to change this user's role to ${newRole}?`)) {
      return;
    }

    setLoading(true);
    try {
      const response = await fetch("/api/admin/users", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ userId, role: newRole }),
      });

      if (response.ok) {
        router.refresh();
      } else {
        const error = await response.json();
        alert(error.error || "Failed to update role");
      }
    } catch (err) {
      alert("Something went wrong");
    } finally {
      setLoading(false);
    }
  }

  return (
    <Button 
      variant="outline" 
      size="sm" 
      className="gap-2"
      onClick={handleToggle}
      disabled={loading}
    >
      {loading ? (
        <Loader2 className="h-4 w-4 animate-spin" />
      ) : currentRole === "admin" ? (
        <>
          <ShieldAlert className="h-4 w-4" />
          Demote to User
        </>
      ) : (
        <>
          <Shield className="h-4 w-4" />
          Make Admin
        </>
      )}
    </Button>
  );
}
