"use client";
import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import { api } from "@/lib/api";

export default function ClassShowPage() {
  const params = useParams();
  const id = params.id as string;
  const router = useRouter();
  const [data, setData] = useState<any>(null);
  const [students, setStudents] = useState<any[]>([]);
  const [subjectName, setSubjectName] = useState("");
  const [newSubjectCode, setNewSubjectCode] = useState("");

  async function load() {
    const d = await api(`/api/classes/${id}`);
    setData(d);
    const s = await api(`/api/classes/${id}/students`);
    setStudents(s);
  }
  useEffect(() => { load().catch(console.error); }, [id]);

  async function addSubject() {
    if (!subjectName.trim()) return;
    await api(`/api/classes/${id}/subjects`, { method: "POST", body: JSON.stringify({ name: subjectName, code: newSubjectCode || null }) });
    setSubjectName(""); setNewSubjectCode("");
    load();
  }
  async function toggleSubject(sid: number) {
    await api(`/api/classes/${id}/subjects/${sid}/status`, { method: "POST" });
    load();
  }
  async function deleteSubject(sid: number) {
    if (!confirm("Delete subject?")) return;
    await api(`/api/classes/${id}/subjects/${sid}/delete`, { method: "POST" });
    load();
  }

  if (!data) return <p>Loading...</p>;
  return (
    <div>
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-semibold">{data.class.name} {data.class.section ? `/ ${data.class.section}` : ""}</h2>
        <div className="flex gap-2">
          <Link href={`/classes/${id}/edit`} className="rounded-lg border border-cream-400 px-3 py-2 text-sm">Edit</Link>
          <Link href={`/classes/${id}/students/add`} className="rounded-lg bg-brand-700 text-cream-50 px-3 py-2 text-sm">+ Add Student</Link>
        </div>
      </div>

      <section className="mb-6 rounded-xl bg-cream-50 border border-cream-300 p-5 shadow-card">
        <h3 className="font-semibold mb-3">Subjects</h3>
        <div className="flex gap-2 mb-3">
          <input value={subjectName} onChange={(e) => setSubjectName(e.target.value)} placeholder="Subject name" className="rounded-lg border border-cream-400 px-3 py-2 text-sm bg-white" />
          <input value={newSubjectCode} onChange={(e) => setNewSubjectCode(e.target.value)} placeholder="Code" className="rounded-lg border border-cream-400 px-3 py-2 text-sm bg-white w-24" />
          <button onClick={addSubject} className="rounded-lg bg-brand-700 text-cream-50 px-3 py-2 text-sm">Add</button>
        </div>
        <ul className="divide-y divide-cream-200">
          {data.subjects.map((s: any) => (
            <li key={s.id} className="py-2 flex items-center justify-between">
              <span>{s.name} {s.code ? `(${s.code})` : ""} {!s.is_active && <span className="text-xs text-rose-600">inactive</span>}</span>
              <div className="flex gap-2">
                <button onClick={() => toggleSubject(s.id)} className="text-xs text-brand-600 hover:underline">{s.is_active ? "Deactivate" : "Activate"}</button>
                <button onClick={() => deleteSubject(s.id)} className="text-xs text-rose-600 hover:underline">Delete</button>
              </div>
            </li>
          ))}
          {data.subjects.length === 0 && <li className="py-2 text-brand-500 text-sm">No subjects</li>}
        </ul>
      </section>

      <section className="rounded-xl bg-cream-50 border border-cream-300 p-5 shadow-card">
        <h3 className="font-semibold mb-3">Students ({students.length})</h3>
        <table className="w-full text-sm">
          <thead className="bg-cream-200"><tr>
            <th className="text-left px-3 py-2">Roll</th><th className="text-left px-3 py-2">Name</th>
            <th className="text-left px-3 py-2">Guardian</th><th className="text-left px-3 py-2">Status</th><th className="px-3 py-2"></th>
          </tr></thead>
          <tbody>
            {students.map((s) => (
              <tr key={s.enrollment_id} className="border-t border-cream-200">
                <td className="px-3 py-2">{s.roll_number}</td>
                <td className="px-3 py-2"><Link href={`/students/${s.student_id}`} className="text-brand-600 hover:underline">{s.name}</Link></td>
                <td className="px-3 py-2">{s.father_guardian_name}</td>
                <td className="px-3 py-2">{s.status}</td>
                <td className="px-3 py-2 text-right flex gap-2 justify-end">
                  <Link href={`/classes/${id}/students/${s.enrollment_id}/transfer`} className="text-xs text-brand-600 hover:underline">Transfer</Link>
                  <button onClick={async () => { if (confirm("Remove student from class?")) { await api(`/api/class-students/${s.enrollment_id}/remove`, { method: "POST" }); load(); } }} className="text-xs text-rose-600 hover:underline">Remove</button>
                </td>
              </tr>
            ))}
            {students.length === 0 && <tr><td colSpan={5} className="px-3 py-6 text-center text-brand-500">No students</td></tr>}
          </tbody>
        </table>
        <div className="mt-3">
          <button onClick={async () => {
            const r: any = await api(`/api/classes/${id}/export`);
            const blob = new Blob([JSON.stringify(r.rows, null, 2)], { type: "application/json" });
            const url = URL.createObjectURL(blob);
            const a = document.createElement("a"); a.href = url; a.download = "roster.json"; a.click();
          }} className="text-sm text-brand-600 hover:underline">Download roster</button>
        </div>
      </section>
    </div>
  );
}
