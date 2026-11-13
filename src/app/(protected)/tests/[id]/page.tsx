"use client";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { api } from "@/lib/api";

export default function TestShowPage() {
  const params = useParams();
  const id = params.id as string;
  const [test, setTest] = useState<any>(null);
  const [students, setStudents] = useState<any[]>([]);
  const [marks, setMarks] = useState<Record<number, string>>({});
  const [remarks, setRemarks] = useState<Record<number, string>>({});

  useEffect(() => {
    api(`/api/tests/${id}`).then((d: any) => {
      setTest(d.test);
      api(`/api/classes/${d.test.class_id}/students`).then((st: any[]) => {
        setStudents(st);
        const m: Record<number, string> = {};
        const r: Record<number, string> = {};
        st.forEach((s) => { m[s.student_id] = ""; r[s.student_id] = ""; });
        (d.marks || []).forEach((mk: any) => { m[mk.student_id] = mk.marks_obtained ?? ""; r[mk.student_id] = mk.remarks || ""; });
        setMarks(m); setRemarks(r);
      });
    });
  }, [id]);

  async function save() {
    const items = students.map((s) => ({ student_id: s.student_id, marks_obtained: marks[s.student_id] === "" ? null : Number(marks[s.student_id]), remarks: remarks[s.student_id] || null }));
    await api(`/api/tests/${id}/marks`, { method: "POST", body: JSON.stringify({ marks: items }) });
    alert("Saved");
  }

  if (!test) return <p>Loading...</p>;
  return (
    <div>
      <h2 className="text-xl font-semibold mb-2">{test.title}</h2>
      <p className="text-sm text-slate-500 mb-4">Total marks: {test.total_marks}</p>
      <div className="table-wrap">
        <table className="w-full text-sm">
          <thead className="bg-navy-50"><tr><th className="text-left px-4 py-2">Roll</th><th className="text-left px-4 py-2">Name</th><th className="px-4 py-2">Marks</th><th className="px-4 py-2">Remarks</th></tr></thead>
          <tbody>
            {students.map((s) => (
              <tr key={s.student_id} className="border-t border-slate-100">
                <td className="px-4 py-2">{s.roll_number}</td>
                <td className="px-4 py-2">{s.name}</td>
                <td className="px-4 py-2 text-center">
                  <input value={marks[s.student_id] ?? ""} onChange={(e) => setMarks({ ...marks, [s.student_id]: e.target.value })} className="w-20 rounded-lg border border-slate-300 px-2 py-1 text-sm bg-white" />
                </td>
                <td className="px-4 py-2 text-center">
                  <input value={remarks[s.student_id] ?? ""} onChange={(e) => setRemarks({ ...remarks, [s.student_id]: e.target.value })} className="w-full rounded-lg border border-slate-300 px-2 py-1 text-sm bg-white" />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {students.length > 0 && <div className="p-4"><button onClick={save} className="btn btn-primary">Save Marks</button></div>}
      </div>
    </div>
  );
}



