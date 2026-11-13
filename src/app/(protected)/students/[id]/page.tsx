"use client";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import { api } from "@/lib/api";

export default function StudentShowPage() {
  const params = useParams();
  const id = params.id as string;
  const [student, setStudent] = useState<any>(null);
  useEffect(() => { api(`/api/students/${id}`).then(setStudent); }, [id]);
  if (!student) return <p>Loading...</p>;
  return (
    <div>
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-semibold">{student.name}</h2>
        <div className="flex gap-2">
          <Link href={`/students/${id}/edit`} className="rounded-lg border border-cream-400 px-3 py-2 text-sm">Edit</Link>
          <Link href={`/students/${id}/id-card`} className="rounded-lg border border-cream-400 px-3 py-2 text-sm">ID Card</Link>
        </div>
      </div>
      <div className="card p-5 grid sm:grid-cols-2 gap-3 text-sm">
        <div><span className="text-brand-500">Student Code:</span> {student.student_code}</div>
        <div><span className="text-brand-500">Roll:</span> {student.roll_number ?? "-"}</div>
        <div><span className="text-brand-500">Guardian:</span> {student.father_guardian_name}</div>
        <div><span className="text-brand-500">DOB:</span> {student.dob || "-"}</div>
        <div><span className="text-brand-500">Gender:</span> {student.gender || "-"}</div>
        <div><span className="text-brand-500">Contact:</span> {student.contact || "-"}</div>
        <div><span className="text-brand-500">WhatsApp:</span> {student.whatsapp_number || "-"}</div>
        <div><span className="text-brand-500">Address:</span> {student.address || "-"}</div>
        <div><span className="text-brand-500">Previous School:</span> {student.previous_school || "-"}</div>
        <div><span className="text-brand-500">Status:</span> {student.status}</div>
      </div>
      <div className="mt-4 flex gap-2">
        <Link href={`/fees/students/${id}`} className="text-sm text-brand-600 hover:underline">Fees</Link>
        <Link href={`/attendance/students/${id}`} className="text-sm text-brand-600 hover:underline">Attendance</Link>
        <Link href={`/reports/students/${id}/weekly`} className="text-sm text-brand-600 hover:underline">Weekly Report</Link>
        <Link href={`/reports/students/${id}/monthly`} className="text-sm text-brand-600 hover:underline">Monthly Report</Link>
      </div>
    </div>
  );
}

