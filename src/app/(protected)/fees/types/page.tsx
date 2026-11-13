"use client";
import { useEffect, useState } from "react";
import { api } from "@/lib/api";

export default function FeeTypesPage() {
  const [types, setTypes] = useState<any[]>([]);
  const [form, setForm] = useState({ name: "", default_amount: 0, is_recurring_monthly: true, is_active: true });
  async function load() { setTypes(await api("/api/fee-types")); }
  useEffect(() => { load(); }, []);
  async function add() {
    await api("/api/fee-types", { method: "POST", body: JSON.stringify(form) });
    setForm({ name: "", default_amount: 0, is_recurring_monthly: true, is_active: true });
    load();
  }
  async function toggle(id: number) { await api(`/api/fee-types/${id}/status`, { method: "POST" }); load(); }
  async function del(id: number) { if (confirm("Delete?")) { await api(`/api/fee-types/${id}/delete`, { method: "POST" }); load(); } }
  return (
    <div>
      <h2 className="text-xl font-semibold mb-4">Fee Types</h2>
      <div className="mb-4 flex gap-2">
        <input placeholder="Name" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} className="rounded-lg border border-cream-400 px-3 py-2 text-sm bg-white" />
        <input type="number" placeholder="Amount" value={form.default_amount} onChange={(e) => setForm({ ...form, default_amount: Number(e.target.value) })} className="rounded-lg border border-cream-400 px-3 py-2 text-sm bg-white w-28" />
        <button onClick={add} className="rounded-lg bg-brand-700 text-cream-50 px-3 py-2 text-sm">Add</button>
      </div>
      <div className="rounded-xl bg-cream-50 border border-cream-300 shadow-card overflow-hidden">
        <table className="w-full text-sm">
          <thead className="bg-cream-200"><tr><th className="text-left px-4 py-2">Name</th><th className="text-left px-4 py-2">Amount</th><th className="text-left px-4 py-2">Recurring</th><th className="px-4 py-2"></th></tr></thead>
          <tbody>
            {types.map((t) => (
              <tr key={t.id} className="border-t border-cream-200">
                <td className="px-4 py-2">{t.name}</td>
                <td className="px-4 py-2">{t.default_amount}</td>
                <td className="px-4 py-2">{t.is_recurring_monthly ? "Yes" : "No"}</td>
                <td className="px-4 py-2 text-right flex gap-2 justify-end">
                  <button onClick={() => toggle(t.id)} className="text-xs text-brand-600 hover:underline">{t.is_active ? "Deactivate" : "Activate"}</button>
                  <button onClick={() => del(t.id)} className="text-xs text-rose-600 hover:underline">Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
