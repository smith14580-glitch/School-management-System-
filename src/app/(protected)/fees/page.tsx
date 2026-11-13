"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import { api } from "@/lib/api";

export default function FeesIndexPage() {
  const [classes, setClasses] = useState<any[]>([]);
  useEffect(() => { api("/api/fees").then(setClasses); }, []);
  return (
    <div>
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-semibold">Fees</h2>
        <Link href="/fees/types" className="btn btn-secondary">Fee Types</Link>
      </div>
      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {classes.map((c) => (
          <Link key={c.id} href={`/fees/classes/${c.id}`} className="card p-4 shadow-card hover:border-slate-300">
            <p className="font-semibold">{c.name} {c.section}</p>
          </Link>
        ))}
      </div>
    </div>
  );
}


