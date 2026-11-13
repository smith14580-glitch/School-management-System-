"use client";
import { useEffect, useState } from "react";
import { useAuth } from "@/lib/auth";
import { api } from "@/lib/api";

export default function DashboardPage() {
  const { user } = useAuth();
  const [notices, setNotices] = useState<any[]>([]);
  useEffect(() => {
    api("/api/notices").then(setNotices).catch(() => setNotices([]));
  }, []);
  return (
    <div>
      <div className="mb-6">
        <h2 className="text-xl font-semibold">Welcome, {user?.name}</h2>
        <p className="text-sm text-brand-500 mt-1">Signed in as {user?.role_name}</p>
      </div>
      {notices.length > 0 && (
        <section className="mb-6 card p-5">
          <h3 className="font-semibold mb-3">Notices</h3>
          <ul className="divide-y divide-cream-200">
            {notices.map((n) => (
              <li key={n.id} className="py-3">
                <p className="font-medium text-sm">{n.title}</p>
                <p className="text-sm text-brand-600 mt-0.5">{n.body}</p>
              </li>
            ))}
          </ul>
        </section>
      )}
    </div>
  );
}

