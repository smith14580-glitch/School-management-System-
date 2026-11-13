"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import { useAuth } from "@/lib/auth";
import { api } from "@/lib/api";
import Icon from "@/components/Icon";

export default function DashboardPage() {
  const { user } = useAuth();
  const [data, setData] = useState<any>(null);

  useEffect(() => {
    api("/api/dashboard/summary").then(setData).catch(() => setData(null));
  }, []);

  if (!data) return <p className="text-slate-500">Loading...</p>;

  const cards = [
    { label: "Students", value: data.students, icon: "users", color: "bg-blue-500" },
    { label: "Teachers", value: data.teachers, icon: "badge", color: "bg-green-500" },
    { label: "Classes", value: data.classes, icon: "building", color: "bg-purple-500" },
    { label: "Exams", value: data.exams, icon: "clipboard", color: "bg-orange-500" },
  ];

  const { present, absent } = data.attendance;
  const total = present + absent;
  const attPct = total > 0 ? Math.round((present / total) * 100) : 0;

  return (
    <div>
      <div className="mb-6">
        <h2 className="page-title">Welcome, {user?.name}</h2>
        <p className="page-sub">{user?.role_name}</p>
      </div>

      {/* Stat cards */}
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4 mb-8">
        {cards.map((c) => (
          <div key={c.label} className="stat-card">
            <div className="flex items-center justify-between">
              <span className={`stat-icon ${c.color}`}>
                <Icon name={c.icon} className="w-5 h-5" />
              </span>
            </div>
            <p className="stat-value">{c.value}</p>
            <p className="stat-label">{c.label}</p>
          </div>
        ))}
      </div>

      {/* Widgets grid */}
      <div className="grid gap-6 lg:grid-cols-3">
        {/* Today's Attendance */}
        <section className="card p-5 lg:col-span-2">
          <div className="widget-head">
            <h3 className="widget-title">Today's Attendance</h3>
            <span className="widget-gold-line" />
          </div>
          <div className="flex items-center gap-6">
            <div className="text-center">
              <p className="text-4xl font-bold text-navy-800">{attPct}%</p>
              <p className="text-xs text-slate-500 mt-1">Present</p>
            </div>
            <div className="flex-1 space-y-2">
              <div className="flex items-center justify-between text-sm">
                <span className="text-slate-500">Present</span>
                <span className="font-semibold text-green-600">{present}</span>
              </div>
              <div className="w-full bg-slate-100 rounded-full h-2">
                <div className="bg-green-500 h-2 rounded-full" style={{ width: `${attPct}%` }} />
              </div>
              <div className="flex items-center justify-between text-sm">
                <span className="text-slate-500">Absent</span>
                <span className="font-semibold text-red-600">{absent}</span>
              </div>
              <div className="w-full bg-slate-100 rounded-full h-2">
                <div className="bg-red-500 h-2 rounded-full" style={{ width: `${100 - attPct}%` }} />
              </div>
            </div>
          </div>
        </section>

        {/* Fee Collection */}
        <section className="card p-5">
          <div className="widget-head">
            <h3 className="widget-title">Fee Collection</h3>
            <span className="widget-gold-line" />
          </div>
          <div className="space-y-3 text-sm">
            <div className="flex justify-between">
              <span className="text-slate-500">Total Due</span>
              <span className="font-semibold text-navy-800">Rs. {data.fees.total_due}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-500">Collected</span>
              <span className="font-semibold text-green-600">Rs. {data.fees.total_paid}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-500">Balance</span>
              <span className="font-semibold text-amber-600">Rs. {data.fees.balance}</span>
            </div>
          </div>
        </section>

        {/* Upcoming Exams */}
        <section className="card p-5">
          <div className="widget-head">
            <h3 className="widget-title">Upcoming Exams</h3>
            <span className="widget-gold-line" />
          </div>
          <ul className="space-y-2 text-sm">
            {data.upcoming_exams.map((e: any) => (
              <li key={e.id} className="flex justify-between items-center">
                <span className="font-medium text-slate-700">{e.name}</span>
                <span className="text-xs text-slate-500">{e.start_date}</span>
              </li>
            ))}
            {data.upcoming_exams.length === 0 && <li className="text-slate-500 text-center py-4">No exams scheduled</li>}
          </ul>
        </section>

        {/* Recent Admissions */}
        <section className="card p-5">
          <div className="widget-head">
            <h3 className="widget-title">Recent Admissions</h3>
            <span className="widget-gold-line" />
          </div>
          <ul className="space-y-2 text-sm">
            {data.recent_students.map((s: any) => (
              <li key={s.id} className="flex justify-between items-center">
                <span className="font-medium text-slate-700">{s.name}</span>
                <span className="text-xs text-slate-500">{s.student_code}</span>
              </li>
            ))}
            {data.recent_students.length === 0 && <li className="text-slate-500 text-center py-4">No recent admissions</li>}
          </ul>
        </section>

        {/* Notices */}
        <section className="card p-5">
          <div className="widget-head">
            <h3 className="widget-title">Notices</h3>
            <span className="widget-gold-line" />
          </div>
          <ul className="space-y-2 text-sm">
            {data.notices.map((n: any) => (
              <li key={n.id}>
                <p className="font-medium text-slate-700">{n.title}</p>
                <p className="text-xs text-slate-500 mt-0.5">{n.body}</p>
              </li>
            ))}
            {data.notices.length === 0 && <li className="text-slate-500 text-center py-4">No notices</li>}
          </ul>
        </section>

        {/* Quick Actions */}
        <section className="card p-5 lg:col-span-3">
          <div className="widget-head">
            <h3 className="widget-title">Quick Actions</h3>
            <span className="widget-gold-line" />
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            <Link href="/students/create" className="btn btn-primary">Add Student</Link>
            <Link href="/attendance" className="btn btn-primary">Mark Attendance</Link>
            <Link href="/fees" className="btn btn-primary">Collect Fee</Link>
            <Link href="/notices/create" className="btn btn-primary">Add Notice</Link>
          </div>
        </section>
      </div>
    </div>
  );
}