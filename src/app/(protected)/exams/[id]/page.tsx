"use client";
import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import { api } from "@/lib/api";

export default function ExamShowPage() {
  const params = useParams();
  const id = params.id as string;
  const [data, setData] = useState<any>(null);
  const [subjects, setSubjects] = useState<any[]>([]);
  const [subjectId, setSubjectId] = useState("");
  const [totalMarks, setTotalMarks] = useState(100);
  const [passingMarks, setPassingMarks] = useState(33);
  const [classSubjects, setClassSubjects] = useState<any[]>([]);

  async function load() {
    const d = await api(`/api/exams/${id}`);
    setData(d);
    // class subjects
    const cd = await api(`/api/classes/${d.exam.class_id}`);
    setClassSubjects(cd.subjects || []);
  }
  useEffect(() => { load(); }, [id]);

  async function addSubject() {
    if (!subjectId) return;
    await api(`/api/exams/${id}/subjects`, { method: "POST", body: JSON.stringify({ subject_id: Number(subjectId), total_marks: Number(totalMarks), passing_marks: Number(passingMarks) }) });
    load();
  }
  async function removeSubject(sid: number) {
    await api(`/api/exams/${id}/subjects/${sid}/delete`, { method: "POST" });
    load();
  }
  async function setStatus(status: string) {
    await api(`/api/exams/${id}/status?status=${status}`, { method: "POST" });
    load();
  }

  if (!data) return <p>Loading...</p>;
  return (
    <div>
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-semibold">{data.exam.name}</h2>
        <div className="flex gap-2">
          <Link href={`/results/exam/${id}`} className="rounded-lg border border-cream-400 px-3 py-2 text-sm">Results Roster</Link>
        </div>
      </div>
      <div className="mb-4 flex gap-2">
        <select value={subjectId} onChange={(e) => setSubjectId(e.target.value)} className="input">
          <option value="">Add subject</option>
          {classSubjects.map((s) => <option key={s.id} value={s.id}>{s.name}</option>)}
        </select>
        <input type="number" value={totalMarks} onChange={(e) => setTotalMarks(Number(e.target.value))} className="w-24 rounded-lg border border-cream-400 px-2 py-2 text-sm bg-white" placeholder="Total" />
        <input type="number" value={passingMarks} onChange={(e) => setPassingMarks(Number(e.target.value))} className="w-24 rounded-lg border border-cream-400 px-2 py-2 text-sm bg-white" placeholder="Pass" />
        <button onClick={addSubject} className="btn btn-primary">Add</button>
      </div>
      <div className="table-wrap mb-4">
        <table className="w-full text-sm">
          <thead className="bg-cream-200"><tr><th className="text-left px-4 py-2">Subject</th><th className="text-left px-4 py-2">Total</th><th className="text-left px-4 py-2">Pass</th><th className="px-4 py-2"></th></tr></thead>
          <tbody>
            {data.subjects.map((s: any) => (
              <tr key={s.id} className="border-t border-cream-200">
                <td className="px-4 py-2">{s.subject_name}</td>
                <td className="px-4 py-2">{s.total_marks}</td>
                <td className="px-4 py-2">{s.passing_marks}</td>
                <td className="px-4 py-2 text-right"><button onClick={() => removeSubject(s.subject_id)} className="text-xs text-rose-600 hover:underline">Remove</button></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="flex gap-2">
        <button onClick={() => setStatus("ongoing")} className="rounded-lg border border-cream-400 px-3 py-2 text-sm">Mark Ongoing</button>
        <button onClick={() => setStatus("completed")} className="rounded-lg border border-cream-400 px-3 py-2 text-sm">Mark Completed</button>
      </div>
    </div>
  );
}


