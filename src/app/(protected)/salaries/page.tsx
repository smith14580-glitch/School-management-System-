"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import { api } from "@/lib/api";

export default function SalariesIndexPage() {
  const [teachers, setTeachers] = useState<any[]>([]);
  useEffect(() => { api("/api/salaries").then(setTeachers); }, []);
  return (
    <div>
      <h2 className="text-xl font-semibold mb-4">Teacher Salary</h2>
      <div className="table-wrap">
        <table className="w-full text-sm">
          <thead className="bg-navy-50"><tr><th className="text-left px-4 py-2">Code</th><th className="text-left px-4 py-2">Name</th><th className="px-4 py-2"></th></tr></thead>
          <tbody>
            {teachers.map((t) => (
              <tr key={t.id} className="border-t border-slate-100">
                <td className="px-4 py-2">{t.employee_code}</td>
                <td className="px-4 py-2">{t.name}</td>
                <td className="px-4 py-2 text-right"><Link href={`/salaries/teachers/${t.id}`} className="text-navy-600 hover:underline">Open</Link></td>
              </tr>
            ))}
            {teachers.length === 0 && <tr><td colSpan={3} className="px-4 py-6 text-center text-slate-500">No teachers</td></tr>}
          </tbody>
        </table>
      </div>
    </div>
  );
}


