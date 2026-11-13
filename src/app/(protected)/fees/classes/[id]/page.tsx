"use client";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import { api } from "@/lib/api";

export default function ClassFeesPage() {
  const params = useParams();
  const classId = params.id as string;
  const [students, setStudents] = useState<any[]>([]);
  const [types, setTypes] = useState<any[]>([]);
  const [config, setConfig] = useState<any[]>([]);
  const [session, setSession] = useState<any>(null);
  const [sessions, setSessions] = useState<any[]>([]);
  const [sessionId, setSessionId] = useState("");

  useEffect(() => {
    api("/api/fee-types").then(setTypes);
    api("/api/sessions").then((s: any[]) => {
      setSessions(s);
      const cur = s.find((x) => x.is_current);
      if (cur) { setSessionId(String(cur.id)); }
    });
    api(`/api/classes/${classId}/students`).then(setStudents);
  }, [classId]);

  useEffect(() => {
    if (sessionId) api(`/api/class-fees/${classId}?session_id=${sessionId}`).then(setConfig);
  }, [classId, sessionId]);

  async function saveConfig() {
    const items = types.map((t) => {
      const existing = config.find((c) => c.fee_type_id === t.id);
      const amt = (document.getElementById(`amt-${t.id}`) as HTMLInputElement)?.value;
      return { fee_type_id: t.id, amount: Number(amt || (existing?.amount ?? 0)) };
    });
    await api(`/api/class-fees/${classId}?session_id=${sessionId}`, { method: "POST", body: JSON.stringify(items) });
    alert("Saved");
    api(`/api/class-fees/${classId}?session_id=${sessionId}`).then(setConfig);
  }

  async function generate(studentId: number) {
    await api(`/api/fees/students/${studentId}/generate?session_id=${sessionId}`, { method: "POST" });
    alert("Generated");
  }

  return (
    <div>
      <h2 className="text-xl font-semibold mb-4">Class Fees</h2>
      <div className="mb-4">
        <select value={sessionId} onChange={(e) => setSessionId(e.target.value)} className="input">
          {sessions.map((s) => <option key={s.id} value={s.id}>{s.year_label}</option>)}
        </select>
      </div>

      <section className="mb-6 card p-5">
        <h3 className="font-semibold mb-3">Fee Configuration</h3>
        <table className="w-full text-sm mb-3">
          <thead className="bg-navy-50"><tr><th className="text-left px-3 py-2">Fee Type</th><th className="text-left px-3 py-2">Amount</th></tr></thead>
          <tbody>
            {types.map((t) => {
              const existing = config.find((c) => c.fee_type_id === t.id);
              return (
                <tr key={t.id} className="border-t border-slate-100">
                  <td className="px-3 py-2">{t.name}</td>
                  <td className="px-3 py-2"><input id={`amt-${t.id}`} type="number" defaultValue={existing?.amount ?? 0} className="rounded-lg border border-slate-300 px-2 py-1 text-sm bg-white w-28" /></td>
                </tr>
              );
            })}
          </tbody>
        </table>
        <button onClick={saveConfig} className="btn btn-primary">Save Config</button>
      </section>

      <section className="table-wrap">
        <table className="w-full text-sm">
          <thead className="bg-navy-50"><tr><th className="text-left px-4 py-2">Roll</th><th className="text-left px-4 py-2">Name</th><th className="px-4 py-2"></th></tr></thead>
          <tbody>
            {students.map((s) => (
              <tr key={s.enrollment_id} className="border-t border-slate-100">
                <td className="px-4 py-2">{s.roll_number}</td>
                <td className="px-4 py-2">{s.name}</td>
                <td className="px-4 py-2 text-right flex gap-2 justify-end">
                  <button onClick={() => generate(s.student_id)} className="text-xs text-navy-600 hover:underline">Generate</button>
                  <Link href={`/fees/students/${s.student_id}`} className="text-xs text-navy-600 hover:underline">View</Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>
    </div>
  );
}



