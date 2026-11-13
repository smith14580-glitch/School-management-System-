"use client";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import { api } from "@/lib/api";

export default function TeacherShowPage() {
  const params = useParams();
  const id = params.id as string;
  const [t, setT] = useState<any>(null);
  useEffect(() => { api(`/api/teachers/${id}`).then(setT); }, [id]);
  if (!t) return <p>Loading...</p>;
  return (
    <div>
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-semibold">{t.name}</h2>
        <Link href={`/teachers/${id}/edit`} className="rounded-lg border border-cream-400 px-3 py-2 text-sm">Edit</Link>
      </div>
      <div className="card p-5 grid sm:grid-cols-2 gap-3 text-sm">
        <div><span className="text-brand-500">Code:</span> {t.employee_code}</div>
        <div><span className="text-brand-500">Contact:</span> {t.contact || "-"}</div>
        <div><span className="text-brand-500">WhatsApp:</span> {t.whatsapp_number || "-"}</div>
        <div><span className="text-brand-500">Email:</span> {t.email || "-"}</div>
        <div><span className="text-brand-500">CNIC:</span> {t.cnic || "-"}</div>
        <div><span className="text-brand-500">Qualification:</span> {t.qualification || "-"}</div>
        <div><span className="text-brand-500">Joining:</span> {t.joining_date || "-"}</div>
        <div><span className="text-brand-500">Basic Salary:</span> {t.basic_salary}</div>
        <div><span className="text-brand-500">Status:</span> {t.status}</div>
      </div>
      <div className="mt-4 flex gap-2">
        <Link href={`/salaries/teachers/${id}`} className="text-sm text-brand-600 hover:underline">Salary</Link>
      </div>
    </div>
  );
}

