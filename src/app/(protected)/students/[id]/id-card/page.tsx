"use client";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { api } from "@/lib/api";

export default function IdCardPage() {
  const params = useParams();
  const id = params.id as string;
  const [data, setData] = useState<any>(null);
  useEffect(() => { api(`/api/students/${id}/id-card`).then(setData); }, [id]);
  if (!data) return <p>Loading...</p>;
  const s = data.student;
  return (
    <div className="max-w-sm mx-auto">
      <div className="card p-5 text-center">
        <h3 className="font-bold text-brand-800">{data.school_name}</h3>
        <p className="text-xs text-brand-500 mb-3">Student ID Card</p>
        <div className="w-24 h-24 mx-auto rounded-full bg-cream-200 grid place-items-center text-brand-600 mb-3">Photo</div>
        <p className="font-semibold">{s.name}</p>
        <p className="text-sm text-brand-600">ID: {s.student_code}</p>
        <p className="text-sm text-brand-600">Roll: {s.roll_number}</p>
        <p className="text-sm text-brand-600">Class: {data.class?.name} {data.class?.section}</p>
        <p className="text-sm text-brand-600">Session: {data.session}</p>
      </div>
      <button onClick={() => window.print()} className="mt-4 w-full btn btn-primary">Print</button>
    </div>
  );
}


