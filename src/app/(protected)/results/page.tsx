"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import { api } from "@/lib/api";

export default function ResultsIndexPage() {
  const [exams, setExams] = useState<any[]>([]);
  useEffect(() => { api("/api/exams").then(setExams); }, []);
  return (
    <div>
      <h2 className="text-xl font-semibold mb-4">Results</h2>
      <div className="table-wrap">
        <table className="w-full text-sm">
          <thead className="bg-navy-50"><tr><th className="text-left px-4 py-2">Exam</th><th className="text-left px-4 py-2">Status</th><th className="px-4 py-2"></th></tr></thead>
          <tbody>
            {exams.map((e) => (
              <tr key={e.id} className="border-t border-slate-100">
                <td className="px-4 py-2">{e.name}</td>
                <td className="px-4 py-2">{e.status}</td>
                <td className="px-4 py-2 text-right"><Link href={`/results/exam/${e.id}`} className="text-navy-600 hover:underline">Roster</Link></td>
              </tr>
            ))}
            {exams.length === 0 && <tr><td colSpan={3} className="px-4 py-6 text-center text-slate-500">No exams</td></tr>}
          </tbody>
        </table>
      </div>
    </div>
  );
}


