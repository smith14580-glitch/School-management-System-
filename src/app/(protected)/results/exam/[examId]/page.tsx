"use client";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import { api } from "@/lib/api";

export default function ResultsRosterPage() {
  const params = useParams();
  const examId = params.examId as string;
  const [students, setStudents] = useState<any[]>([]);
  useEffect(() => { api(`/api/exam-results/exam/${examId}/roster`).then(setStudents); }, [examId]);
  return (
    <div>
      <h2 className="text-xl font-semibold mb-4">Exam Results Roster</h2>
      <div className="rounded-xl bg-cream-50 border border-cream-300 shadow-card overflow-hidden">
        <table className="w-full text-sm">
          <thead className="bg-cream-200"><tr><th className="text-left px-4 py-2">Roll</th><th className="text-left px-4 py-2">Name</th><th className="text-left px-4 py-2">%</th><th className="text-left px-4 py-2">Finalized</th><th className="px-4 py-2"></th></tr></thead>
          <tbody>
            {students.map((s) => (
              <tr key={s.student_id} className="border-t border-cream-200">
                <td className="px-4 py-2">{s.roll_number}</td>
                <td className="px-4 py-2">{s.name}</td>
                <td className="px-4 py-2">{s.percentage !== null ? s.percentage.toFixed(1) : "-"}</td>
                <td className="px-4 py-2">{s.finalized ? "Yes" : "No"}</td>
                <td className="px-4 py-2 text-right"><Link href={`/results/exam/${examId}/student/${s.student_id}`} className="text-brand-600 hover:underline">Enter Result</Link></td>
              </tr>
            ))}
            {students.length === 0 && <tr><td colSpan={5} className="px-4 py-6 text-center text-brand-500">No students</td></tr>}
          </tbody>
        </table>
      </div>
    </div>
  );
}
