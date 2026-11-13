"use client";
import { useEffect, useState } from "react";
import { api } from "@/lib/api";

export default function PromotionPage() {
  const [classes, setClasses] = useState<any[]>([]);
  const [classId, setClassId] = useState("");
  const [students, setStudents] = useState<any[]>([]);
  const [selected, setSelected] = useState<number[]>([]);
  const [toClass, setToClass] = useState("");
  const [allClasses, setAllClasses] = useState<any[]>([]);

  useEffect(() => { api("/api/promotion").then((c) => { setClasses(c); setAllClasses(c); }); }, []);
  useEffect(() => { if (classId) api(`/api/promotion/classes/${classId}`).then(setStudents); }, [classId]);

  async function run() {
    await api(`/api/promotion/classes/${classId}/transfer`, { method: "POST", body: JSON.stringify({ to_class_id: toClass ? Number(toClass) : null, student_ids: selected }) });
    alert("Done");
    if (classId) api(`/api/promotion/classes/${classId}`).then(setStudents);
  }

  return (
    <div>
      <h2 className="text-xl font-semibold mb-4">Promotion</h2>
      <div className="mb-4 flex gap-2">
        <select value={classId} onChange={(e) => setClassId(e.target.value)} className="input">
          <option value="">From class</option>
          {classes.map((c) => <option key={c.id} value={c.id}>{c.name} {c.section}</option>)}
        </select>
        <select value={toClass} onChange={(e) => setToClass(e.target.value)} className="input">
          <option value="">To class (blank if final year)</option>
          {allClasses.map((c) => <option key={c.id} value={c.id}>{c.name} {c.section}</option>)}
        </select>
      </div>
      {students.length > 0 && (
        <div className="table-wrap">
          <table className="w-full text-sm">
            <thead className="bg-cream-200"><tr><th className="px-4 py-2"></th><th className="text-left px-4 py-2">Name</th><th className="text-left px-4 py-2">Roll</th></tr></thead>
            <tbody>
              {students.map((s) => (
                <tr key={s.student_id} className="border-t border-cream-200">
                  <td className="px-4 py-2"><input type="checkbox" checked={selected.includes(s.student_id)} onChange={(e) => setSelected(e.target.checked ? [...selected, s.student_id] : selected.filter((x) => x !== s.student_id))} /></td>
                  <td className="px-4 py-2">{s.name}</td>
                  <td className="px-4 py-2">{s.roll_number}</td>
                </tr>
              ))}
            </tbody>
          </table>
          <div className="p-4"><button onClick={run} className="btn btn-primary">Run Promotion</button></div>
        </div>
      )}
    </div>
  );
}


