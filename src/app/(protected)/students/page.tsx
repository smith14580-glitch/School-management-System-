"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import { api } from "@/lib/api";

export default function StudentsPage() {
  const [students, setStudents] = useState<any[]>([]);
  const [q, setQ] = useState("");
  const [loading, setLoading] = useState(true);
  async function load() {
    setLoading(true);
    try { setStudents(await api(`/api/students${q ? `?q=${encodeURIComponent(q)}` : ""}`)); }
    catch (e) { console.error(e); }
    finally { setLoading(false); }
  }
  useEffect(() => { load(); }, []);
  return (
    <div>
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-semibold">Students</h2>
        <Link href="/students/create" className="rounded-lg bg-brand-700 text-cream-50 px-4 py-2 text-sm">+ New Student</Link>
      </div>
      <div className="mb-4 flex gap-2">
        <input value={q} onChange={(e) => setQ(e.target.value)} placeholder="Search..." className="rounded-lg border border-cream-400 px-3 py-2 text-sm bg-white" />
        <button onClick={load} className="rounded-lg border border-cream-400 px-3 py-2 text-sm">Search</button>
      </div>
      {loading ? <p>Loading...</p> : (
        <div className="rounded-xl bg-cream-50 border border-cream-300 shadow-card overflow-hidden">
          <table className="w-full text-sm">
            <thead className="bg-cream-200"><tr>
              <th className="text-left px-4 py-2">Code</th><th className="text-left px-4 py-2">Name</th>
              <th className="text-left px-4 py-2">Roll</th><th className="text-left px-4 py-2">Status</th><th className="px-4 py-2"></th>
            </tr></thead>
            <tbody>
              {students.map((s) => (
                <tr key={s.id} className="border-t border-cream-200">
                  <td className="px-4 py-2">{s.student_code}</td>
                  <td className="px-4 py-2"><Link href={`/students/${s.id}`} className="text-brand-600 hover:underline">{s.name}</Link></td>
                  <td className="px-4 py-2">{s.roll_number ?? "-"}</td>
                  <td className="px-4 py-2">{s.status}</td>
                  <td className="px-4 py-2 text-right"><Link href={`/students/${s.id}/edit`} className="text-xs text-brand-600 hover:underline">Edit</Link></td>
                </tr>
              ))}
              {students.length === 0 && <tr><td colSpan={5} className="px-4 py-6 text-center text-brand-500">No students</td></tr>}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
