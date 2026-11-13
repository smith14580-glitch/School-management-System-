"use client";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import { api } from "@/lib/api";

export default function IdCardsClassShowPage() {
  const params = useParams();
  const classId = params.id as string;
  const [students, setStudents] = useState<any[]>([]);
  useEffect(() => { api(`/api/classes/${classId}/students`).then(setStudents); }, [classId]);
  return (
    <div>
      <h2 className="text-xl font-semibold mb-4">ID Cards - Class</h2>
      <div className="table-wrap">
        <table className="w-full text-sm">
          <thead className="bg-cream-200"><tr><th className="text-left px-4 py-2">Roll</th><th className="text-left px-4 py-2">Name</th><th className="px-4 py-2"></th></tr></thead>
          <tbody>
            {students.map((s) => (
              <tr key={s.enrollment_id} className="border-t border-cream-200">
                <td className="px-4 py-2">{s.roll_number}</td>
                <td className="px-4 py-2">{s.name}</td>
                <td className="px-4 py-2 text-right"><Link href={`/students/${s.student_id}/id-card`} className="text-brand-600 hover:underline">View Card</Link></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}


