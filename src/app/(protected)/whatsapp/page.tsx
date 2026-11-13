"use client";
import { useEffect, useState } from "react";
import { api } from "@/lib/api";

export default function WhatsAppPage() {
  const [students, setStudents] = useState<any[]>([]);
  useEffect(() => { api("/api/students").then(setStudents); }, []);
  return (
    <div>
      <h2 className="text-xl font-semibold mb-4">WhatsApp Reporting</h2>
      <div className="rounded-xl bg-cream-50 border border-cream-300 shadow-card overflow-hidden">
        <table className="w-full text-sm">
          <thead className="bg-cream-200"><tr><th className="text-left px-4 py-2">Name</th><th className="px-4 py-2">Links</th></tr></thead>
          <tbody>
            {students.map((s) => (
              <tr key={s.id} className="border-t border-cream-200">
                <td className="px-4 py-2">{s.name}</td>
                <td className="px-4 py-2 text-right flex gap-2 justify-end">
                  <a href="#" onClick={async (e) => { e.preventDefault(); const r: any = await api(`/api/whatsapp/students/${s.id}/weekly`); window.open(r.link, "_blank"); }} className="text-xs text-brand-600 hover:underline">Weekly</a>
                  <a href="#" onClick={async (e) => { e.preventDefault(); const r: any = await api(`/api/whatsapp/students/${s.id}/monthly`); window.open(r.link, "_blank"); }} className="text-xs text-brand-600 hover:underline">Monthly</a>
                  <a href="#" onClick={async (e) => { e.preventDefault(); const r: any = await api(`/api/whatsapp/students/${s.id}/fees`); window.open(r.link, "_blank"); }} className="text-xs text-brand-600 hover:underline">Fee</a>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
