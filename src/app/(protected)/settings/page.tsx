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
      <div className="space-y-3 rounded-xl bg-cream-50 border border-cream-300 p-5 shadow-card max-w-xl">
        {Object.keys(settings).map((k) => (
          <div key={k}>
            <label className="block text-sm font-medium mb-1.5">{k}</label>
            <input value={settings[k] || ""} onChange={(e) => setSettings({ ...settings, [k]: e.target.value })} className="w-full rounded-lg border border-cream-400 px-3.5 py-2.5 bg-white text-sm" />
          </div>
        ))}
        <button onClick={save} className="rounded-lg bg-brand-700 text-cream-50 px-4 py-2 text-sm">Save</button>
      </div>
    </div>
  );
}
