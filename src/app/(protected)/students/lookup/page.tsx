"use client";
import { useState } from "react";
import Link from "next/link";
import { api } from "@/lib/api";

export default function LookupPage() {
  const [q, setQ] = useState("");
  const [results, setResults] = useState<any[]>([]);
  async function search() {
    const data = await api(`/api/students/lookup?q=${encodeURIComponent(q)}`);
    setResults(data);
  }
  return (
    <div>
      <h2 className="text-xl font-semibold mb-4">Student Record Search</h2>
      <div className="mb-4 flex gap-2">
        <input value={q} onChange={(e) => setQ(e.target.value)} placeholder="Name or code" className="rounded-lg border border-cream-400 px-3 py-2 text-sm bg-white" />
        <button onClick={search} className="rounded-lg bg-brand-700 text-cream-50 px-3 py-2 text-sm">Search</button>
      </div>
      <div className="rounded-xl bg-cream-50 border border-cream-300 shadow-card overflow-hidden">
        <table className="w-full text-sm">
          <thead className="bg-cream-200"><tr><th className="text-left px-4 py-2">Code</th><th className="text-left px-4 py-2">Name</th><th className="px-4 py-2"></th></tr></thead>
          <tbody>
            {results.map((s) => (
              <tr key={s.id} className="border-t border-cream-200">
                <td className="px-4 py-2">{s.student_code}</td>
                <td className="px-4 py-2">{s.name}</td>
                <td className="px-4 py-2 text-right"><Link href={`/students/${s.id}`} className="text-brand-600 hover:underline">Open</Link></td>
              </tr>
            ))}
            {results.length === 0 && <tr><td colSpan={3} className="px-4 py-6 text-center text-brand-500">No results</td></tr>}
          </tbody>
        </table>
      </div>
    </div>
  );
}
