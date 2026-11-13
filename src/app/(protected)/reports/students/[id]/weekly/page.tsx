"use client";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { api } from "@/lib/api";

export default function WeeklyReportPage() {
  const params = useParams();
  const id = params.id as string;
  const [data, setData] = useState<any>(null);
  useEffect(() => { api(`/api/reports/students/${id}/weekly`).then(setData); }, [id]);
  if (!data) return <p>Loading...</p>;
  return (
    <div>
      <h2 className="text-xl font-semibold mb-4">Weekly Report - {data.student?.name}</h2>
      <div className="rounded-xl bg-cream-50 border border-cream-300 p-5 shadow-card">
        <h3 className="font-semibold mb-2">Attendance (last 7 days)</h3>
        <ul className="text-sm">
          {(data.attendance || []).map((a: any, i: number) => <li key={i}>{a.date}: {a.status}</li>)}
        </ul>
      </div>
    </div>
  );
}
