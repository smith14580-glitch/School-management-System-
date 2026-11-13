"use client";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { api } from "@/lib/api";

export default function StudentFeesPage() {
  const params = useParams();
  const studentId = params.id as string;
  const [data, setData] = useState<any>(null);
  const [sessions, setSessions] = useState<any[]>([]);
  const [sessionId, setSessionId] = useState("");
  useEffect(() => {
    api("/api/sessions").then((s: any[]) => {
      setSessions(s);
      const cur = s.find((x) => x.is_current);
      if (cur) setSessionId(String(cur.id));
    });
  }, []);
  useEffect(() => {
    if (sessionId) api(`/api/fees/students/${studentId}?session_id=${sessionId}`).then(setData);
  }, [studentId, sessionId]);

  async function pay(recordId: number) {
    const amt = prompt("Amount paid?");
    if (!amt) return;
    await api(`/api/fees/records/${recordId}/pay`, { method: "POST", body: JSON.stringify({ amount_paid: Number(amt), payment_method: "cash" }) });
    api(`/api/fees/students/${studentId}?session_id=${sessionId}`).then(setData);
  }

  if (!data) return <p>Loading...</p>;
  return (
    <div>
      <h2 className="text-xl font-semibold mb-2">Fees - {data.student?.name}</h2>
      <div className="mb-4">
        <select value={sessionId} onChange={(e) => setSessionId(e.target.value)} className="input">
          {sessions.map((s) => <option key={s.id} value={s.id}>{s.year_label}</option>)}
        </select>
      </div>
      <div className="table-wrap">
        <table className="w-full text-sm">
          <thead className="bg-navy-50"><tr><th className="text-left px-4 py-2">Month</th><th className="text-left px-4 py-2">Fee Type</th><th className="text-left px-4 py-2">Due</th><th className="text-left px-4 py-2">Paid</th><th className="text-left px-4 py-2">Status</th><th className="px-4 py-2"></th></tr></thead>
          <tbody>
            {(data.records || []).map((r: any) => (
              <tr key={r.id} className="border-t border-slate-100">
                <td className="px-4 py-2">{r.month}/{r.year}</td>
                <td className="px-4 py-2">{r.fee_type_name}</td>
                <td className="px-4 py-2">{r.amount_due}</td>
                <td className="px-4 py-2">{r.amount_paid}</td>
                <td className="px-4 py-2">{r.status}</td>
                <td className="px-4 py-2 text-right">
                  {r.status !== "paid" && <button onClick={() => pay(r.id)} className="text-xs text-navy-600 hover:underline">Pay</button>}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}


