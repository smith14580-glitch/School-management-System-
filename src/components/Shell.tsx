"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useAuth } from "@/lib/auth";

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
    { label: "Student Record Search", path: "/students/lookup", perm: "studentrecord.view", icon: "search" },
  ]},
  { group: "ID Card", items: [
    { label: "All Students ID Cards", path: "/id-cards", perm: "students.view", icon: "id" },
    { label: "All Class ID Cards", path: "/id-cards/classes", perm: "students.view", icon: "id" },
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
    { label: "Academic Sessions", path: "/sessions", perm: "sessions.view", icon: "calendar" },
    { label: "Promotion", path: "/promotion", perm: "promotion.manage", icon: "arrow" },
    { label: "User Accounts", path: "/users", perm: "users.manage", icon: "key" },
    { label: "Activity Log", path: "/activity-log", perm: "activitylog.view", icon: "list" },
    { label: "Backup & Export", path: "/backup", perm: "backup.manage", icon: "download" },
    { label: "Settings", path: "/settings", perm: "settings.view", icon: "cog" },
  ]},
];

export default function Shell({ children }: { children: React.ReactNode }) {
  const { user, logout } = useAuth();
  const pathname = usePathname();
  const role = user?.role || "";
  return (
    <div className="min-h-screen lg:flex bg-cream-100 text-brand-900">
      <aside className="w-64 bg-brand-700 text-cream-50 shrink-0 hidden lg:block">
        <div className="flex items-center gap-3 px-5 h-16 border-b border-brand-800/40">
          <span className="grid place-items-center w-9 h-9 rounded-lg bg-cream-100 text-brand-700 font-bold">{(user?.name || "?")[0]}</span>
          <span className="font-semibold truncate">{user?.name}</span>
        </div>
        <nav className="px-3 py-4 space-y-5 overflow-y-auto h-[calc(100vh-4rem)]">
          {NAV.map((g, gi) => {
            const items = g.items.filter((i) => can(role, i.perm));
            if (!items.length) return null;
            return (
              <div key={gi}>
                {g.group && <p className="px-3 pb-1 text-[11px] font-semibold uppercase tracking-wider text-brand-300">{g.group}</p>}
                <ul className="space-y-1">
                  {items.map((it) => {
                    const active = pathname === it.path;
                    return (
                      <li key={it.path}>
                        <Link href={it.path} className={`flex items-center gap-3 rounded-lg px-3 py-2 text-sm transition ${active ? "bg-cream-100 text-brand-800 font-semibold" : "text-cream-200 hover:bg-brand-800 hover:text-cream-50"}`}>
                          <span>{it.label}</span>
                        </Link>
                      </li>
                    );
                  })}
                </ul>
              </div>
            );
          })}
        </nav>
        <div className="border-t border-brand-800/40 p-3">
          <p className="text-xs text-brand-300 mb-2">{user?.role_name}</p>
          <button onClick={logout} className="w-full text-left text-sm text-cream-200 hover:text-cream-50 px-3 py-2 rounded-lg hover:bg-brand-800">Sign out</button>
        </div>
      </aside>
      <div className="flex-1 min-w-0 flex flex-col">
        <header className="sticky top-0 z-20 flex items-center gap-3 h-16 px-4 sm:px-6 bg-cream-50/95 backdrop-blur border-b border-cream-300">
          <h1 className="text-base sm:text-lg font-semibold truncate">School Management System</h1>
          <div className="ml-auto text-sm text-brand-700">{user?.role_name}</div>
        </header>
        <main className="flex-1 p-4 sm:p-6 max-w-7xl w-full">{children}</main>
      </div>
    </div>
  );
}
