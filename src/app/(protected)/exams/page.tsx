"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import { api } from "@/lib/api";

export default function ExamsPage() {
  const [exams, setExams] = useState<any[]>([]);
  const [classes, setClasses] = useState<any[]>([]);
  const [classId, setClassId] = useState("");
  useEffect(() => { api("/api/classes").then(setClasses); }, []);
  useEffect(() => { if (classId) api(`/api/exams?class_id=${classId}`).then(setExams); else api("/api/exams").then(setExams); }, [classId]);
  return (
    <div>
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-semibold">Exams</h2>
        <Link href="/exams/create" className="rounded-lg bg-brand-700 text-cream-50 px-4 py-2 text-sm">+ New Exam</Link>
      </div>
      <div className="mb-4">
        <select value={classId} onChange={(e) => setClassId(e.target.value)} className="rounded-lg border border-cream-400 px-3 py-2 text-sm bg-white">
          <option value="">All classes</option>
          {classes.map((c) => <option key={c.id} value={c.id}>{c.name} {c.section}</option>)}
        </select>
      </div>
      <div className="rounded-xl bg-cream-50 border border-cream-300 shadow-card overflow-hidden">
        <table className="w-full text-sm">
          <thead className="bg-cream-200"><tr><th className="text-left px-4 py-2">Name</th><th className="text-left px-4 py-2">Term</th><th className="text-left px-4 py-2">Dates</th><th className="text-left px-4 py-2">Status</th><th className="px-4 py-2"></th></tr></thead>
          <tbody>
            {exams.map((e) => (
              <tr key={e.id} className="border-t border-cream-200">
                <td className="px-4 py-2">{e.name}</td>
                <td className="px-4 py-2">{e.term || "-"}</td>
                <td className="px-4 py-2">{e.start_date} to {e.end_date}</td>
                <td className="px-4 py-2">{e.status}</td>
                <td className="px-4 py-2 text-right"><Link href={`/exams/${e.id}`} className="text-brand-600 hover:underline">Open</Link></td>
              </tr>
            ))}
            {exams.length === 0 && <tr><td colSpan={5} className="px-4 py-6 text-center text-brand-500">No exams</td></tr>}
          </tbody>
        </table>
      </div>
    </div>
  );
}
