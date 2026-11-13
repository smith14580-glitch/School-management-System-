"use client";
import { useEffect, useState } from "react";
import { api } from "@/lib/api";

export default function SettingsPage() {
  const [settings, setSettings] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState(true);
  useEffect(() => { api("/api/settings").then(setSettings).finally(() => setLoading(false)); }, []);
  async function save() { await api("/api/settings", { method: "POST", body: JSON.stringify(settings) }); alert("Saved"); }
  if (loading) return <p>Loading...</p>;
  return (
    <div>
      <h2 className="text-xl font-semibold mb-4">Settings</h2>
      <div className="space-y-3 card p-5 max-w-xl">
        {Object.keys(settings).map((k) => (
          <div key={k}>
            <label className="block text-sm font-medium mb-1.5">{k}</label>
            <input value={settings[k] || ""} onChange={(e) => setSettings({ ...settings, [k]: e.target.value })} className="w-full input" />
          </div>
        ))}
        <button onClick={save} className="btn btn-primary">Save</button>
      </div>
    </div>
  );
}


