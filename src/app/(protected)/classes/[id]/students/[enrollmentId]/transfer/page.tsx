"use client";
import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { api } from "@/lib/api";

export default function TransferPage() {
  const params = useParams();
  const classId = params.id as string;
  const enrollmentId = params.enrollmentId as string;
  const router = useRouter();
  const [classes, setClasses] = useState<any[]>([]);
  const [toClass, setToClass] = useState("");
  const [sessions, setSessions] = useState<any[]>([]);
  const [toSession, setToSession] = useState("");
  const [error, setError] = useState("");
  useEffect(() => {
    api("/api/classes").then(setClasses);
    api("/api/sessions").then(setSessions);
  }, []);
  async function submit(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    try {
      await api(`/api/class-students/${enrollmentId}/transfer`, { method: "POST", body: JSON.stringify({ to_class_id: Number(toClass), to_session_id: toSession ? Number(toSession) : null }) });
      router.push(`/classes/${classId}`);
    } catch (err: any) { setError(err.message); }
  }
  return (
    <div className="max-w-xl">
      <h2 className="text-xl font-semibold mb-4">Transfer Student</h2>
      {error && <div className="mb-4 text-sm text-rose-600">{error}</div>}
      <form onSubmit={submit} className="space-y-4 card p-5">
        <select value={toClass} onChange={(e) => setToClass(e.target.value)} required className="w-full input">
          <option value="">To class</option>
          {classes.map((c) => <option key={c.id} value={c.id}>{c.name} {c.section}</option>)}
        </select>
        <select value={toSession} onChange={(e) => setToSession(e.target.value)} className="w-full input">
          <option value="">Session (current)</option>
          {sessions.map((s) => <option key={s.id} value={s.id}>{s.year_label}</option>)}
        </select>
        <button className="btn btn-primary">Transfer</button>
      </form>
    </div>
  );
}



