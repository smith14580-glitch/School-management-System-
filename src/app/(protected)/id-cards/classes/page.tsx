"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import { api } from "@/lib/api";

export default function IdCardsClassesPage() {
  const [classes, setClasses] = useState<any[]>([]);
  useEffect(() => { api("/api/classes").then(setClasses); }, []);
  return (
    <div>
      <h2 className="text-xl font-semibold mb-4">ID Cards - By Class</h2>
      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {classes.map((c) => (
          <Link key={c.id} href={`/id-cards/classes/${c.id}`} className="card p-4 shadow-card hover:border-brand-300">
            <p className="font-semibold">{c.name} {c.section}</p>
            <p className="text-sm text-brand-500">{c.student_count} students</p>
          </Link>
        ))}
      </div>
    </div>
  );
}

