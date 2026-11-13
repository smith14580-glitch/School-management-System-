"use client";
import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useAuth } from "@/lib/auth";
import Icon from "@/components/Icon";

const PERMISSIONS: Record<string, string[]> = {
  admin: ["*"],
  madam: ["students.view","students.manage","classes.view","classes.manage","subjects.view","subjects.manage","attendance.view","attendance.manage","tests.view","tests.manage","exams.view","exams.manage","results.view","results.manage","teachers.view","teachers.manage","promotion.manage","reports.view","whatsapp.send","timetable.view","timetable.manage","notices.view","notices.manage","calendar.view","calendar.manage","activitylog.view","settings.view","sessions.view"],
  account: ["fees.view","fees.manage","feetypes.manage","salaries.view","salaries.manage"],
  coordinator: ["students.view","classes.view","subjects.view","attendance.view","attendance.manage","tests.view","exams.view","results.view","results.manage","teachers.view","reports.view","whatsapp.send","timetable.view","notices.view","notices.manage","calendar.view"],
  teacher: ["students.view","classes.view","subjects.view","attendance.view","attendance.manage","tests.view","tests.manage","exams.view","results.view","results.enter","reports.view","timetable.view","notices.view","calendar.view"],
};

function can(role: string, perm: string | null) {
  if (!perm) return true;
  const perms = PERMISSIONS[role] || [];
  return perms.includes("*") || perms.includes(perm);
}

const NAV = [
  { group: null, items: [{ label: "Dashboard", path: "/dashboard", perm: null, icon: "home" }] },
  { group: "School", items: [
    { label: "Classes", path: "/classes", perm: "classes.view", icon: "building" },
    { label: "Students", path: "/students", perm: "students.view", icon: "users" },
    { label: "Teachers", path: "/teachers", perm: "teachers.view", icon: "badge" },
    { label: "Student Search", path: "/students/lookup", perm: "studentrecord.view", icon: "search" },
  ]},
  { group: "ID Cards", items: [
    { label: "All Students", path: "/id-cards", perm: "students.view", icon: "id" },
    { label: "By Class", path: "/id-cards/classes", perm: "students.view", icon: "id" },
  ]},
  { group: "Academics", items: [
    { label: "Attendance", path: "/attendance", perm: "attendance.view", icon: "check" },
    { label: "Daily Tests", path: "/tests", perm: "tests.view", icon: "pencil" },
    { label: "Exams", path: "/exams", perm: "exams.view", icon: "clipboard" },
    { label: "Results", path: "/results", perm: "results.view", icon: "award" },
  ]},
  { group: "Finance", items: [
    { label: "Fees", path: "/fees", perm: "fees.view", icon: "wallet" },
    { label: "Fee Types", path: "/fees/types", perm: "feetypes.manage", icon: "wallet" },
    { label: "Salary", path: "/salaries", perm: "salaries.view", icon: "cash" },
  ]},
  { group: "Coordination", items: [
    { label: "Reports", path: "/reports", perm: "reports.view", icon: "chart" },
    { label: "WhatsApp", path: "/whatsapp", perm: "whatsapp.send", icon: "chat" },
    { label: "Timetable", path: "/timetable", perm: "timetable.view", icon: "calendar" },
    { label: "Notices", path: "/notices", perm: "notices.view", icon: "megaphone" },
    { label: "Calendar", path: "/calendar", perm: "calendar.view", icon: "calendar" },
  ]},
  { group: "System", items: [
    { label: "Sessions", path: "/sessions", perm: "sessions.view", icon: "calendar" },
    { label: "Promotion", path: "/promotion", perm: "promotion.manage", icon: "arrow" },
    { label: "Users", path: "/users", perm: "users.manage", icon: "key" },
    { label: "Activity Log", path: "/activity-log", perm: "activitylog.view", icon: "list" },
    { label: "Backup", path: "/backup", perm: "backup.manage", icon: "download" },
    { label: "Settings", path: "/settings", perm: "settings.view", icon: "cog" },
  ]},
];

export default function Shell({ children }: { children: React.ReactNode }) {
  const { user, logout } = useAuth();
  const pathname = usePathname();
  const role = user?.role || "";
  const [open, setOpen] = useState(false);

  const sidebar = (
    <nav className="flex flex-col h-full bg-navy-800 text-slate-100">
      <div className="flex items-center gap-3 px-5 h-16 border-b border-navy-900/60 shrink-0">
        <span className="grid place-items-center w-10 h-10 rounded-xl bg-gold-500 text-navy-900 font-bold text-lg shadow">
          {(user?.name || "?")[0].toUpperCase()}
        </span>
        <div className="min-w-0">
          <p className="font-semibold text-white truncate">{user?.name}</p>
          <p className="text-xs text-gold-300 truncate">{user?.role_name}</p>
        </div>
      </div>
      <div className="flex-1 overflow-y-auto px-3 py-4 space-y-5">
        {NAV.map((g, gi) => {
          const items = g.items.filter((i) => can(role, i.perm));
          if (!items.length) return null;
          return (
            <div key={gi}>
              {g.group && <p className="px-3 pb-1 text-[11px] font-semibold uppercase tracking-widest text-gold-500">{g.group}</p>}
              <ul className="space-y-0.5">
                {items.map((it) => {
                  const active = pathname === it.path || pathname.startsWith(it.path + "/");
                  return (
                    <li key={it.path}>
                      <Link href={it.path} onClick={() => setOpen(false)}
                        className={`flex items-center gap-3 rounded-lg px-3 py-2 text-sm transition border-l-[3px] ${active ? "bg-navy-700/60 border-gold-500 text-white font-semibold" : "border-transparent text-slate-300 hover:bg-navy-700/40 hover:text-white"}`}>
                        <Icon name={it.icon} className="w-[18px] h-[18px] shrink-0" />
                        <span className="truncate">{it.label}</span>
                      </Link>
                    </li>
                  );
                })}
              </ul>
            </div>
          );
        })}
      </div>
      <div className="border-t border-navy-900/60 p-3 shrink-0">
        <button onClick={logout} className="flex w-full items-center gap-3 rounded-lg px-3 py-2 text-sm text-slate-300 hover:bg-navy-700/40 hover:text-white transition border-l-[3px] border-transparent hover:border-gold-500">
          <Icon name="logout" className="w-[18px] h-[18px]" />
          <span>Sign out</span>
        </button>
      </div>
    </nav>
  );

  return (
    <div className="min-h-screen bg-page text-slate-800">
      {/* Mobile top bar */}
      <header className="lg:hidden sticky top-0 z-30 flex items-center gap-3 h-14 px-4 bg-surface border-b border-slate-200 shadow-sm">
        <button onClick={() => setOpen(true)} className="grid place-items-center w-9 h-9 rounded-lg text-navy-700 hover:bg-slate-100" aria-label="Open menu">
          <Icon name="menu" className="w-5 h-5" />
        </button>
        <h1 className="text-base font-semibold truncate text-navy-800">School Management System</h1>
        <span className="ml-auto text-xs px-2 py-1 rounded-full bg-gold-100 text-gold-700 border border-gold-200">{user?.role_name}</span>
      </header>

      {/* Mobile drawer */}
      {open && (
        <div className="lg:hidden fixed inset-0 z-40">
          <div className="absolute inset-0 bg-navy-900/60" onClick={() => setOpen(false)} />
          <div className="absolute inset-y-0 left-0 w-72 bg-navy-800 shadow-2xl">{sidebar}</div>
          <button onClick={() => setOpen(false)} className="absolute top-3 right-3 grid place-items-center w-9 h-9 rounded-lg bg-surface text-navy-700" aria-label="Close menu">
            <Icon name="close" className="w-5 h-5" />
          </button>
        </div>
      )}

      <div className="lg:flex">
        <aside className="hidden lg:block w-64 bg-navy-800 text-slate-100 shrink-0 sticky top-0 h-screen">{sidebar}</aside>
        <div className="flex-1 min-w-0 flex flex-col">
          <header className="hidden lg:flex sticky top-0 z-20 items-center gap-3 h-16 px-6 bg-surface border-b border-slate-200 shadow-sm">
            <h1 className="text-lg font-semibold truncate text-navy-800">School Management System</h1>
            <div className="ml-auto flex items-center gap-3">
              <span className="text-xs px-2.5 py-1 rounded-full bg-gold-100 text-gold-700 border border-gold-200 font-medium">{user?.role_name}</span>
              <div className="grid place-items-center w-9 h-9 rounded-full bg-navy-700 text-white text-sm font-semibold shadow">
                {(user?.name || "?")[0].toUpperCase()}
              </div>
            </div>
          </header>
          <main className="flex-1 p-4 sm:p-6 max-w-7xl w-full">{children}</main>
        </div>
      </div>
    </div>
  );
}