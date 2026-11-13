"use client";
import { api } from "@/lib/api";

export default function BackupPage() {
  async function dl(path: string, name: string) {
    const data = await api(path);
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a"); a.href = url; a.download = name; a.click();
  }
  return (
    <div>
      <h2 className="text-xl font-semibold mb-4">Backup & Export</h2>
      <div className="space-y-2">
        <button onClick={() => dl("/api/backup/export/students", "students.json")} className="btn btn-primary">Export Students</button>
        <button onClick={() => dl("/api/backup/export/fees", "fees.json")} className="btn btn-primary ml-2">Export Fees</button>
        <button onClick={() => dl("/api/backup/export/results", "results.json")} className="btn btn-primary ml-2">Export Results</button>
      </div>
    </div>
  );
}

