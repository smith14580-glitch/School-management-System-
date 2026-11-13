"use client";
import { useEffect, useState } from "react";
import { useAuth } from "@/lib/auth";
import { api } from "@/lib/api";

export default function DashboardPage() {
  const { user } = useAuth();
  const [stats, setStats] = useState<any>({});
  const [notices, setNotices] = useState<any[]>([]);

  useEffect(() => {
    Promise.all([
      api("/api/students").then((d) => d.length).catch(() => 0),
      api("/api/teachers").then((d) => d.length).catch(() => 0),
      api("/api/classes").then((d) => d.length).catch(() => 0),
      api("/api/exams").then((d) => d.length).catch(() => 0),
    ]).then(([students, teachers, classes, exams]) => setStats({ students, teachers, classes, exams }));
    api("/api/notices").then(setNotices).catch(() => setNotices([]));
  }, []);

  const cards = [
    { label: "Students", value: stats.students ?? 0 },
    { label: "Teachers", value: stats.teachers ?? 0 },
    { label: "Classes", value: stats.classes ?? 0 },
    { label: "Exams", value: stats.exams ?? 0 },
  ];

  return (
    <div>
      <div className="mb-6">
        <h2 className="page-title">Welcome, {user?.name}</h2>
        <p className="page-sub">Signed in as {user?.role_name}</p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4 mb-8">
        {cards.map((c) => (
          <div key={c.label} className="card p-5 hover:border-brand-300 transition">
            <p className="text-sm text-brand-500">{c.label}</p>
            <p className="mt-2 text-3xl font-semibold text-brand-800">{c.value}</p>
          </div>
        ))}
      </div>

      {notices.length > 0 && (
        <section className="card p-5 mb-6">
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
