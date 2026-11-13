"use client";
import { useEffect, useState } from "react";
import { api } from "@/lib/api";

export default function ActivityLogPage() {
  const [logs, setLogs] = useState<any[]>([]);
  useEffect(() => { api("/api/activity-log").then(setLogs); }, []);
  return (
    <div>
      <h2 className="text-xl font-semibold mb-4">Activity Log</h2>
      <div className="table-wrap">
        <table className="w-full text-sm">
          <thead className="bg-cream-200"><tr><th className="text-left px-4 py-2">Action</th><th className="text-left px-4 py-2">Target</th><th className="text-left px-4 py-2">Description</th><th className="text-left px-4 py-2">When</th></tr></thead>
          <tbody>
            {logs.map((l) => (
              <tr key={l.id} className="border-t border-cream-200">
                <td className="px-4 py-2">{l.action}</td>
                <td className="px-4 py-2">{l.target_table} {l.target_id}</td>
                <td className="px-4 py-2">{l.description}</td>
                <td className="px-4 py-2">{l.created_at}</td>
              </tr>
            ))}
            {logs.length === 0 && <tr><td colSpan={4} className="px-4 py-6 text-center text-brand-500">No activity</td></tr>}
          </tbody>
        </table>
      </div>
    </div>
  );
}

