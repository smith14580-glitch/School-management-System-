"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import { api } from "@/lib/api";

export default function ClassesPage() {
  const [classes, setClasses] = useState<any[]>([]);
  const [q, setQ] = useState("");
  const [loading, setLoading] = useState(true);
  async function load() {
    setLoading(true);
    try { setClasses(await api(`/api/classes${q ? `?q=${encodeURIComponent(q)}` : ""}`)); }
    catch (e) { console.error(e); }
    finally { setLoading(false); }
  }
  useEffect(() => { load(); }, []);
  return (
    <div>
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-semibold">Classes</h2>
        <Link href="/classes/create" className="btn btn-primary">+ New Class</Link>
      </div>
      <div className="mb-4 flex gap-2">
        <input value={q} onChange={(e) => setQ(e.target.value)} placeholder="Search..." className="input" />
        <button onClick={load} className="btn btn-secondary">Search</button>
      </div>
      {loading ? <p>Loading...</p> : (
        <div className="table-wrap">
          <table className="w-full text-sm">
            <thead className="bg-navy-50"><tr>
              <th className="text-left px-4 py-2">Name</th><th className="text-left px-4 py-2">Section</th>
              <th className="text-left px-4 py-2">Subjects</th><th className="text-left px-4 py-2">Students</th><th className="px-4 py-2"></th>
            </tr></thead>
            <tbody>
              {classes.map((c) => (
                <tr key={c.id} className="border-t border-slate-100">
                  <td className="px-4 py-2">{c.name}</td>
                  <td className="px-4 py-2">{c.section || "-"}</td>
                  <td className="px-4 py-2">{c.subject_count}</td>
                  <td className="px-4 py-2">{c.student_count}</td>
                  <td className="px-4 py-2 text-right"><Link href={`/classes/${c.id}`} className="text-navy-600 hover:underline">Open</Link></td>
                </tr>
              ))}
              {classes.length === 0 && <tr><td colSpan={5} className="px-4 py-6 text-center text-slate-500">No classes</td></tr>}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}




