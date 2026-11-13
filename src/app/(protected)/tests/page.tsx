"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import { api } from "@/lib/api";

export default function TestsPage() {
  const [tests, setTests] = useState<any[]>([]);
  const [classes, setClasses] = useState<any[]>([]);
  const [classId, setClassId] = useState("");
  useEffect(() => { api("/api/classes").then(setClasses); }, []);
  useEffect(() => { if (classId) api(`/api/tests?class_id=${classId}`).then(setTests); else api("/api/tests").then(setTests); }, [classId]);
  return (
    <div>
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-semibold">Daily Tests</h2>
        <Link href="/tests/create" className="btn btn-primary">+ New Test</Link>
      </div>
      <div className="mb-4">
        <select value={classId} onChange={(e) => setClassId(e.target.value)} className="input">
          <option value="">All classes</option>
          {classes.map((c) => <option key={c.id} value={c.id}>{c.name} {c.section}</option>)}
        </select>
      </div>
      <div className="table-wrap">
        <table className="w-full text-sm">
          <thead className="bg-navy-50"><tr><th className="text-left px-4 py-2">Title</th><th className="text-left px-4 py-2">Date</th><th className="text-left px-4 py-2">Total</th><th className="px-4 py-2"></th></tr></thead>
          <tbody>
            {tests.map((t) => (
              <tr key={t.id} className="border-t border-slate-100">
                <td className="px-4 py-2">{t.title}</td>
                <td className="px-4 py-2">{t.test_date}</td>
                <td className="px-4 py-2">{t.total_marks}</td>
                <td className="px-4 py-2 text-right"><Link href={`/tests/${t.id}`} className="text-navy-600 hover:underline">Open</Link></td>
              </tr>
            ))}
            {tests.length === 0 && <tr><td colSpan={4} className="px-4 py-6 text-center text-slate-500">No tests</td></tr>}
          </tbody>
        </table>
      </div>
    </div>
  );
}



