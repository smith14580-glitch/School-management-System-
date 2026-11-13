"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { api } from "@/lib/api";

export default function CreateTeacherPage() {
  const router = useRouter();
  const [form, setForm] = useState<any>({ name: "", contact: "", whatsapp_number: "", email: "", cnic: "", qualification: "", address: "", joining_date: "", basic_salary: 0, status: "active", username: "", password: "" });
  const [error, setError] = useState("");
  async function submit(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    try {
      const t: any = await api("/api/teachers", { method: "POST", body: JSON.stringify(form) });
      router.push(`/teachers/${t.id}`);
    } catch (err: any) { setError(err.message); }
  }
  return (
    <div className="max-w-2xl">
      <h2 className="text-xl font-semibold mb-4">Add Teacher</h2>
      {error && <div className="mb-4 text-sm text-rose-600">{error}</div>}
      <form onSubmit={submit} className="grid gap-3 sm:grid-cols-2 card p-5">
        <input placeholder="Name" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} required className="input" />
        <input placeholder="Contact" value={form.contact} onChange={(e) => setForm({ ...form, contact: e.target.value })} className="input" />
        <input placeholder="WhatsApp" value={form.whatsapp_number} onChange={(e) => setForm({ ...form, whatsapp_number: e.target.value })} className="input" />
        <input placeholder="Email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} className="input" />
        <input placeholder="CNIC" value={form.cnic} onChange={(e) => setForm({ ...form, cnic: e.target.value })} className="input" />
        <input placeholder="Qualification" value={form.qualification} onChange={(e) => setForm({ ...form, qualification: e.target.value })} className="input" />
        <input placeholder="Address" value={form.address} onChange={(e) => setForm({ ...form, address: e.target.value })} className="input sm:col-span-2" />
        <input type="date" value={form.joining_date} onChange={(e) => setForm({ ...form, joining_date: e.target.value })} className="input" />
        <input type="number" placeholder="Basic salary" value={form.basic_salary} onChange={(e) => setForm({ ...form, basic_salary: Number(e.target.value) })} className="input" />
        <input placeholder="Login username (optional)" value={form.username} onChange={(e) => setForm({ ...form, username: e.target.value })} className="input" />
        <input placeholder="Login password (optional)" value={form.password} onChange={(e) => setForm({ ...form, password: e.target.value })} className="input" />
        <button className="sm:col-span-2 btn btn-primary">Add Teacher</button>
      </form>
    </div>
  );
}


