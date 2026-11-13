"use client";
import { useEffect, useState } from "react";
import { api } from "@/lib/api";

export default function AttendancePage() {
  const [classes, setClasses] = useState<any[]>([]);
  const [classId, setClassId] = useState("");
  const [dateStr, setDateStr] = useState(new Date().toISOString().slice(0, 10));
  const [students, setStudents] = useState<any[]>([]);
  const [marks, setMarks] = useState<Record<number, string>>({});
  const [loading, setLoading] = useState(false);

  useEffect(() => { api("/api/classes").then(setClasses); }, []);

  async function loadStudents() {
    if (!classId) return;
    setLoading(true);
    const s = await api(`/api/classes/${classId}/students`);
    setStudents(s);
    const att = await api(`/api/attendance?class_id=${classId}&date_str=${dateStr}`);
    const m: Record<number, string> = {};
    s.forEach((st: any) => { m[st.student_id] = "present"; });
    att.forEach((a: any) => { m[a.student_id] = a.status; });
    setMarks(m);
    setLoading(false);
  }
  useEffect(() => { loadStudents(); }, [classId, dateStr]);

  async function save() {
    const items = students.map((s) => ({ student_id: s.student_id, class_id: Number(classId), date: dateStr, status: marks[s.student_id] || "present", remarks: null }));
    await api("/api/attendance", { method: "POST", body: JSON.stringify(items) });
    alert("Saved");
  }

  return (
    <div>
      <h2 className="text-xl font-semibold mb-4">Attendance</h2>
      <div className="mb-4 flex gap-2">
        <select value={classId} onChange={(e) => setClassId(e.target.value)} className="input">
          <option value="">Select class</option>
          {classes.map((c) => <option key={c.id} value={c.id}>{c.name} {c.section}</option>)}
        </select>
        <input type="date" value={dateStr} onChange={(e) => setDateStr(e.target.value)} className="input" />
      </div>
      {loading ? <p>Loading...</p> : (
        <div className="table-wrap">
          <table className="w-full text-sm">
            <thead className="bg-navy-50"><tr><th className="text-left px-4 py-2">Roll</th><th className="text-left px-4 py-2">Name</th><th className="px-4 py-2">Status</th></tr></thead>
            <tbody>
              {students.map((s) => (
                <tr key={s.student_id} className="border-t border-slate-100">
                  <td className="px-4 py-2">{s.roll_number}</td>
                  <td className="px-4 py-2">{s.name}</td>
                  <td className="px-4 py-2 text-center">
                    <select value={marks[s.student_id] || "present"} onChange={(e) => setMarks({ ...marks, [s.student_id]: e.target.value })} className="rounded-lg border border-slate-300 px-2 py-1 text-sm bg-white">
                      <option value="present">Present</option>
                      <option value="absent">Absent</option>
                      <option value="leave">Leave</option>
                      <option value="late">Late</option>
                    </select>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          {students.length > 0 && <div className="p-4"><button onClick={save} className="btn btn-primary">Save Attendance</button></div>}
        </div>
      )}
    </div>
  );
}



