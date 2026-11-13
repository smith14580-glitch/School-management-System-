"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import { api } from "@/lib/api";

export default function TeachersPage() {
  const [teachers, setTeachers] = useState<any[]>([]);
  const [q, setQ] = useState("");
  const [loading, setLoading] = useState(true);
  async function load() {
    setLoading(true);
    try { setTeachers(await api(`/api/teachers${q ? `?q=${encodeURIComponent(q)}` : ""}`)); }
    catch (e) { console.error(e); }
    finally { setLoading(false); }
  }
  useEffect(() => { load(); }, []);
  return (
    <div>
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-semibold">Teachers</h2>
        <Link href="/teachers/create" className="btn btn-primary">+ New Teacher</Link>
      </div>
      <div className="mb-4 flex gap-2">
        <input value={q} onChange={(e) => setQ(e.target.value)} placeholder="Search..." className="input" />
        <button onClick={load} className="rounded-lg border border-cream-400 px-3 py-2 text-sm">Search</button>
      </div>
      {loading ? <p>Loading...</p> : (
        <div className="table-wrap">
          <table className="w-full text-sm">
            <thead className="bg-cream-200"><tr>
              <th className="text-left px-4 py-2">Code</th><th className="text-left px-4 py-2">Name</th>
              <th className="text-left px-4 py-2">Contact</th><th className="text-left px-4 py-2">Status</th><th className="px-4 py-2"></th>
            </tr></thead>
            <tbody>
              {teachers.map((t) => (
                <tr key={t.id} className="border-t border-cream-200">
                  <td className="px-4 py-2">{t.employee_code}</td>
                  <td className="px-4 py-2"><Link href={`/teachers/${t.id}`} className="text-brand-600 hover:underline">{t.name}</Link></td>
                  <td className="px-4 py-2">{t.contact || "-"}</td>
                  <td className="px-4 py-2">{t.status}</td>
                  <td className="px-4 py-2 text-right"><Link href={`/teachers/${t.id}/edit`} className="text-xs text-brand-600 hover:underline">Edit</Link></td>
                </tr>
              ))}
              {teachers.length === 0 && <tr><td colSpan={5} className="px-4 py-6 text-center text-brand-500">No teachers</td></tr>}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}


