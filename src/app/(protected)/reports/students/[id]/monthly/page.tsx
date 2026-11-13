"use client";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { api } from "@/lib/api";

export default function MonthlyReportPage() {
  const params = useParams();
  const id = params.id as string;
  const [data, setData] = useState<any>(null);
  useEffect(() => { api(`/api/reports/students/${id}/monthly`).then(setData); }, [id]);
  if (!data) return <p>Loading...</p>;
  return (
    <div>
      <h2 className="text-xl font-semibold mb-4">Monthly Report - {data.student?.name}</h2>
      <div className="card p-5">
        <h3 className="font-semibold mb-2">Attendance (last 30 days)</h3>
        <ul className="text-sm">
          {(data.attendance || []).map((a: any, i: number) => <li key={i}>{a.date}: {a.status}</li>)}
        </ul>
      </div>
    </div>
  );
}

