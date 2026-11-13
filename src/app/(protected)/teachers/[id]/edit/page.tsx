"use client";
import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { api } from "@/lib/api";

export default function EditTeacherPage() {
  const params = useParams();
  const id = params.id as string;
  const router = useRouter();
  const [form, setForm] = useState<any>(null);
  useEffect(() => {
    api(`/api/teachers/${id}`).then((t: any) => setForm({
      name: t.name, contact: t.contact || "", whatsapp_number: t.whatsapp_number || "", email: t.email || "",
      cnic: t.cnic || "", qualification: t.qualification || "", address: t.address || "",
      joining_date: t.joining_date || "", basic_salary: t.basic_salary, status: t.status,
    }));
  }, [id]);
  if (!form) return <p>Loading...</p>;
  async function submit(e: React.FormEvent) {
    e.preventDefault();
    await api(`/api/teachers/${id}`, { method: "POST", body: JSON.stringify(form) });
    router.push(`/teachers/${id}`);
  }
  return (
    <div className="max-w-2xl">
      <h2 className="text-xl font-semibold mb-4">Edit Teacher</h2>
      <form onSubmit={submit} className="grid gap-3 sm:grid-cols-2 rounded-xl bg-cream-50 border border-cream-300 p-5 shadow-card">
        <input value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} className="rounded-lg border border-cream-400 px-3 py-2 text-sm bg-white" />
        <input value={form.contact} onChange={(e) => setForm({ ...form, contact: e.target.value })} className="rounded-lg border border-cream-400 px-3 py-2 text-sm bg-white" placeholder="Contact" />
        <input value={form.whatsapp_number} onChange={(e) => setForm({ ...form, whatsapp_number: e.target.value })} className="rounded-lg border border-cream-400 px-3 py-2 text-sm bg-white" placeholder="WhatsApp" />
        <input value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} className="rounded-lg border border-cream-400 px-3 py-2 text-sm bg-white" placeholder="Email" />
        <input value={form.cnic} onChange={(e) => setForm({ ...form, cnic: e.target.value })} className="rounded-lg border border-cream-400 px-3 py-2 text-sm bg-white" placeholder="CNIC" />
        <input value={form.qualification} onChange={(e) => setForm({ ...form, qualification: e.target.value })} className="rounded-lg border border-cream-400 px-3 py-2 text-sm bg-white" placeholder="Qualification" />
        <input type="date" value={form.joining_date} onChange={(e) => setForm({ ...form, joining_date: e.target.value })} className="rounded-lg border border-cream-400 px-3 py-2 text-sm bg-white" />
        <input type="number" value={form.basic_salary} onChange={(e) => setForm({ ...form, basic_salary: Number(e.target.value) })} className="rounded-lg border border-cream-400 px-3 py-2 text-sm bg-white" />
        <button className="sm:col-span-2 rounded-lg bg-brand-700 text-cream-50 px-4 py-2 text-sm">Save</button>
      </form>
    </div>
  );
}
