"use client";
import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { api } from "@/lib/api";

export default function ResultEntryPage() {
  const params = useParams();
  const examId = params.examId as string;
  const studentId = params.studentId as string;
  const router = useRouter();
  const [data, setData] = useState<any>(null);
  const [marks, setMarks] = useState<Record<number, string>>({});
  const [absent, setAbsent] = useState<Record<number, boolean>>({});
  const [remarks, setRemarks] = useState("");

  useEffect(() => {
    api(`/api/exam-results/exam/${examId}/student/${studentId}`).then((d: any) => {
      setData(d);
      const m: Record<number, string> = {};
      const a: Record<number, boolean> = {};
      d.subjects.forEach((s: any) => {
        m[s.subject_id] = s.marks_obtained !== null ? String(s.marks_obtained) : "";
        a[s.subject_id] = s.is_absent;
      });
      setMarks(m);
      setAbsent(a);
      setRemarks(d.summary?.remarks || "");
    });
  }, [examId, studentId]);

  async function save(finalize = false) {
    const marksArr = data.subjects.map((s: any) => ({
      subject_id: s.subject_id,
      marks_obtained: marks[s.subject_id] === "" ? null : Number(marks[s.subject_id]),
      is_absent: absent[s.subject_id] || false,
    }));
    await api(`/api/exam-results/exam/${examId}/student/${studentId}`, { method: "POST", body: JSON.stringify({ marks: marksArr, remarks }) });
    if (finalize) {
      await api(`/api/exam-results/exam/${examId}/student/${studentId}/finalize`, { method: "POST" });
    }
    alert(finalize ? "Finalized" : "Saved");
    router.push(`/results/exam/${examId}`);
  }

  if (!data) return <p>Loading...</p>;
  return (
    <div>
      <h2 className="text-xl font-semibold mb-2">Result Entry</h2>
      <p className="text-sm text-slate-500 mb-4">{data.exam.name}</p>
      <div className="card p-5 mb-4">
        <table className="w-full text-sm">
          <thead className="bg-navy-50"><tr><th className="text-left px-4 py-2">Subject</th><th className="text-left px-4 py-2">Total</th><th className="px-4 py-2">Marks</th><th className="px-4 py-2">Absent</th></tr></thead>
          <tbody>
            {data.subjects.map((s: any) => (
              <tr key={s.subject_id} className="border-t border-slate-100">
                <td className="px-4 py-2">{s.subject_name}</td>
                <td className="px-4 py-2">{s.total_marks}</td>
                <td className="px-4 py-2 text-center">
                  <input value={marks[s.subject_id] ?? ""} onChange={(e) => setMarks({ ...marks, [s.subject_id]: e.target.value })} className="w-20 rounded-lg border border-slate-300 px-2 py-1 text-sm bg-white" />
                </td>
                <td className="px-4 py-2 text-center">
                  <input type="checkbox" checked={absent[s.subject_id] || false} onChange={(e) => setAbsent({ ...absent, [s.subject_id]: e.target.checked })} />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <div className="mt-3">
          <label className="block text-sm font-medium mb-1.5">Remarks</label>
          <textarea value={remarks} onChange={(e) => setRemarks(e.target.value)} className="w-full input" />
        </div>
        {data.summary && (
          <div className="mt-3 text-sm">
            <p>Percentage: {data.summary.percentage?.toFixed(1)}% | Grade: {data.summary.grade} | Status: {data.summary.result_status}</p>
            <p>Attendance: {data.summary.attendance_present}/{data.summary.attendance_total}</p>
          </div>
        )}
        <div className="mt-4 flex gap-2">
          <button onClick={() => save(false)} className="btn btn-primary">Save</button>
          <button onClick={() => save(true)} className="rounded-lg border border-slate-300 px-4 py-2 text-sm">Finalize</button>
        </div>
      </div>
    </div>
  );
}



