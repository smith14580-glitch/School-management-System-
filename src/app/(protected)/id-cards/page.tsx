"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import { api } from "@/lib/api";

export default function IdCardsIndexPage() {
  const [students, setStudents] = useState<any[]>([]);
  useEffect(() => { api("/api/students").then(setStudents); }, []);
  return (
    <div>
      <h2 className="text-xl font-semibold mb-4">ID Cards - All Students</h2>
      <div className="table-wrap">
        <table className="w-full text-sm">
          <thead className="bg-navy-50"><tr><th className="text-left px-4 py-2">Code</th><th className="text-left px-4 py-2">Name</th><th className="px-4 py-2"></th></tr></thead>
          <tbody>
            {students.map((s) => (
              <tr key={s.id} className="border-t border-slate-100">
                <td className="px-4 py-2">{s.student_code}</td>
                <td className="px-4 py-2">{s.name}</td>
                <td className="px-4 py-2 text-right"><Link href={`/students/${s.id}/id-card`} className="text-navy-600 hover:underline">View Card</Link></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}


