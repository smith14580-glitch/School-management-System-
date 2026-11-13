"use client";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { api } from "@/lib/api";

export default function TeacherSalaryPage() {
  const params = useParams();
  const id = params.id as string;
  const [records, setRecords] = useState<any[]>([]);
  const [year, setYear] = useState(new Date().getFullYear());
  const [month, setMonth] = useState(new Date().getMonth() + 1);
  const [basic, setBasic] = useState(0);
  const [allow, setAllow] = useState(0);
  const [ded, setDed] = useState(0);

  async function load() { setRecords(await api(`/api/salaries/teachers/${id}?year=${year}`)); }
  useEffect(() => { load(); }, [id, year]);

  async function generate() {
    await api(`/api/salaries/teachers/${id}/generate`, { method: "POST", body: JSON.stringify({ month, year, basic_salary: basic, allowances: allow, deductions: ded }) });
    load();
  }
  async function pay(rid: number) {
    const amt = prompt("Amount paid?");
    if (!amt) return;
    await api(`/api/salaries/records/${rid}/pay`, { method: "POST", body: JSON.stringify({ amount: Number(amt) }) });
    load();
  }

  return (
    <div>
      <h2 className="text-xl font-semibold mb-4">Salary</h2>
      <div className="mb-4 flex gap-2 items-end">
        <input type="number" value={month} onChange={(e) => setMonth(Number(e.target.value))} className="w-20 rounded-lg border border-cream-400 px-2 py-2 text-sm bg-white" placeholder="Month" />
        <input type="number" value={year} onChange={(e) => setYear(Number(e.target.value))} className="w-24 rounded-lg border border-cream-400 px-2 py-2 text-sm bg-white" placeholder="Year" />
        <input type="number" value={basic} onChange={(e) => setBasic(Number(e.target.value))} className="w-28 rounded-lg border border-cream-400 px-2 py-2 text-sm bg-white" placeholder="Basic" />
        <input type="number" value={allow} onChange={(e) => setAllow(Number(e.target.value))} className="w-24 rounded-lg border border-cream-400 px-2 py-2 text-sm bg-white" placeholder="Allow" />
        <input type="number" value={ded} onChange={(e) => setDed(Number(e.target.value))} className="w-24 rounded-lg border border-cream-400 px-2 py-2 text-sm bg-white" placeholder="Ded" />
        <button onClick={generate} className="btn btn-primary">Generate</button>
      </div>
      <div className="table-wrap">
        <table className="w-full text-sm">
          <thead className="bg-cream-200"><tr><th className="text-left px-4 py-2">Period</th><th className="text-left px-4 py-2">Net</th><th className="text-left px-4 py-2">Paid</th><th className="text-left px-4 py-2">Status</th><th className="px-4 py-2"></th></tr></thead>
          <tbody>
            {records.map((r) => (
              <tr key={r.id} className="border-t border-cream-200">
                <td className="px-4 py-2">{r.month}/{r.year}</td>
                <td className="px-4 py-2">{r.net_amount}</td>
                <td className="px-4 py-2">{r.paid_amount}</td>
                <td className="px-4 py-2">{r.status}</td>
                <td className="px-4 py-2 text-right">
                  {r.status !== "paid" && <button onClick={() => pay(r.id)} className="text-xs text-brand-600 hover:underline">Pay</button>}
                </td>
              </tr>
            ))}
            {records.length === 0 && <tr><td colSpan={5} className="px-4 py-6 text-center text-brand-500">No records</td></tr>}
          </tbody>
        </table>
      </div>
    </div>
  );
}


