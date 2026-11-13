"use client";
import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { api } from "@/lib/api";

export default function EditStudentPage() {
  const params = useParams();
  const id = params.id as string;
  const router = useRouter();
  const [form, setForm] = useState<any>(null);
  useEffect(() => {
    api(`/api/students/${id}`).then((s: any) => setForm({
      name: s.name, father_guardian_name: s.father_guardian_name, dob: s.dob || "", gender: s.gender || "",
      contact: s.contact || "", whatsapp_number: s.whatsapp_number || "", address: s.address || "",
      previous_school: s.previous_school || "", admission_date: s.admission_date || "", status: s.status,
      class_id: s.class_id, academic_session_id: s.academic_session_id, roll_number: s.roll_number || "",
    }));
  }, [id]);
  if (!form) return <p>Loading...</p>;
  async function submit(e: React.FormEvent) {
    e.preventDefault();
    await api(`/api/students/${id}`, { method: "POST", body: JSON.stringify({ ...form, class_id: Number(form.class_id), academic_session_id: form.academic_session_id ? Number(form.academic_session_id) : null, roll_number: form.roll_number ? Number(form.roll_number) : null }) });
    router.push(`/students/${id}`);
  }
  return (
    <div className="max-w-2xl">
      <h2 className="text-xl font-semibold mb-4">Edit Student</h2>
      <form onSubmit={submit} className="grid gap-3 sm:grid-cols-2 rounded-xl bg-cream-50 border border-cream-300 p-5 shadow-card">
        <input value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} className="rounded-lg border border-cream-400 px-3 py-2 text-sm bg-white" />
        <input value={form.father_guardian_name} onChange={(e) => setForm({ ...form, father_guardian_name: e.target.value })} className="rounded-lg border border-cream-400 px-3 py-2 text-sm bg-white" />
        <input type="date" value={form.dob} onChange={(e) => setForm({ ...form, dob: e.target.value })} className="rounded-lg border border-cream-400 px-3 py-2 text-sm bg-white" />
        <select value={form.gender} onChange={(e) => setForm({ ...form, gender: e.target.value })} className="rounded-lg border border-cream-400 px-3 py-2 text-sm bg-white">
          <option value="">Gender</option><option value="male">Male</option><option value="female">Female</option><option value="other">Other</option>
        </select>
        <input value={form.contact} onChange={(e) => setForm({ ...form, contact: e.target.value })} className="rounded-lg border border-cream-400 px-3 py-2 text-sm bg-white" placeholder="Contact" />
        <input value={form.whatsapp_number} onChange={(e) => setForm({ ...form, whatsapp_number: e.target.value })} className="rounded-lg border border-cream-400 px-3 py-2 text-sm bg-white" placeholder="WhatsApp" />
        <input value={form.address} onChange={(e) => setForm({ ...form, address: e.target.value })} className="rounded-lg border border-cream-400 px-3 py-2 text-sm bg-white sm:col-span-2" placeholder="Address" />
        <button className="sm:col-span-2 rounded-lg bg-brand-700 text-cream-50 px-4 py-2 text-sm">Save</button>
      </form>
    </div>
  );
}
