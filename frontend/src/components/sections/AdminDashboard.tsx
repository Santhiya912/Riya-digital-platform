"use client";
import { useEffect, useState, useCallback } from "react";

const API = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";

type Item = Record<string, any>;

const tabs = [
  { key: "contacts", label: "Enquiries", cols: ["name", "email", "phone", "company", "requirement"] },
  { key: "consultations", label: "Consultations", cols: ["name", "email", "phone", "company", "preferredDate"] },
  { key: "health-checkups", label: "Health Checkups", cols: ["business.name", "business.email", "business.phone", "business.industry"] },
  { key: "lead-magnets", label: "Lead Magnet", cols: ["name", "company", "email", "phone"] },
  { key: "applications", label: "Applications", cols: ["name", "email", "phone", "position", "resumeUrl"] },
];

const get = (o: Item, path: string) => path.split(".").reduce((a, k) => a?.[k], o) ?? "";

const input =
  "w-full rounded-lg border border-white/10 bg-surface-2 px-4 py-3 text-sm text-white outline-none focus:border-gold";

export default function AdminDashboard() {
  const [token, setToken] = useState("");
  const [ready, setReady] = useState(false);
  const [error, setError] = useState("");
  const [stats, setStats] = useState<Record<string, number>>({});
  const [active, setActive] = useState("contacts");
  const [items, setItems] = useState<Item[]>([]);

  useEffect(() => {
    try {
      setToken(sessionStorage.getItem("admin_token") || "");
    } catch {}
    setReady(true);
  }, []);

  const api = useCallback(
    async (path: string, init?: RequestInit) => {
      const res = await fetch(`${API}/api/admin/${path}`, {
        ...init,
        headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
      });
      if (res.status === 401) {
        sessionStorage.removeItem("admin_token");
        setToken("");
      }
      return res.json();
    },
    [token]
  );

  useEffect(() => {
    if (!token) return;
    api("stats").then((r) => r.success && setStats(r.stats));
  }, [token, api]);

  useEffect(() => {
    if (!token) return;
    api(active).then((r) => setItems(r.success ? r.items : []));
  }, [token, active, api]);

  async function login(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError("");
    const data = Object.fromEntries(new FormData(e.currentTarget));
    try {
      const res = await fetch(`${API}/api/admin/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      }).then((r) => r.json());
      if (res.success) {
        sessionStorage.setItem("admin_token", res.token);
        setToken(res.token);
      } else setError(res.message);
    } catch {
      setError("Cannot reach the server.");
    }
  }

  async function updateStatus(id: string, status: string) {
    const r = await api(`${active}/${id}`, { method: "PATCH", body: JSON.stringify({ status }) });
    if (r.success) setItems((p) => p.map((i) => (i._id === id ? { ...i, status } : i)));
  }

  if (!ready) return null;

  if (!token) {
    return (
      <form onSubmit={login} className="mx-auto max-w-sm space-y-4 rounded-2xl border border-white/10 bg-surface p-8">
        <h1 className="font-display text-2xl font-bold">Admin Login</h1>
        <input name="email" type="email" placeholder="Email" className={input} required />
        <input name="password" type="password" placeholder="Password" className={input} required />
        {error && <p className="text-sm text-red-400">{error}</p>}
        <button className="w-full rounded-full bg-gold py-3 font-semibold text-black hover:bg-gold-light">
          Login
        </button>
      </form>
    );
  }

  const tab = tabs.find((t) => t.key === active)!;
  const hasStatus = active !== "lead-magnets";
  const total = Object.values(stats).reduce((a, b) => a + b, 0);

  return (
    <div>
      <div className="flex items-center justify-between">
        <h1 className="font-display text-3xl font-bold">Dashboard</h1>
        <button
          onClick={() => {
            sessionStorage.removeItem("admin_token");
            setToken("");
          }}
          className="text-sm text-muted hover:text-gold"
        >
          Logout
        </button>
      </div>

      <div className="mt-8 grid grid-cols-2 gap-4 md:grid-cols-6">
        <div className="rounded-xl border border-gold/40 p-4">
          <p className="font-display text-2xl font-bold text-gold">{total}</p>
          <p className="text-xs text-muted">Total leads</p>
        </div>
        {tabs.map((t) => (
          <div key={t.key} className="rounded-xl border border-white/10 bg-surface p-4">
            <p className="font-display text-2xl font-bold">{stats[t.key] ?? 0}</p>
            <p className="text-xs text-muted">{t.label}</p>
          </div>
        ))}
      </div>

      <div className="mt-10 flex flex-wrap gap-2">
        {tabs.map((t) => (
          <button
            key={t.key}
            onClick={() => setActive(t.key)}
            className={`rounded-full border px-4 py-1.5 text-sm ${
              active === t.key ? "border-gold bg-gold text-black" : "border-white/20 text-muted hover:border-gold/60"
            }`}
          >
            {t.label}
          </button>
        ))}
      </div>

      <div className="mt-6 overflow-x-auto rounded-xl border border-white/10">
        <table className="w-full text-left text-sm">
          <thead className="bg-surface-2 text-xs uppercase text-muted">
            <tr>
              {tab.cols.map((c) => (
                <th key={c} className="px-4 py-3">{c.split(".").pop()}</th>
              ))}
              <th className="px-4 py-3">Date</th>
              {hasStatus && <th className="px-4 py-3">Status</th>}
            </tr>
          </thead>
          <tbody>
            {items.length === 0 && (
              <tr><td className="px-4 py-6 text-muted" colSpan={8}>No records yet.</td></tr>
            )}
            {items.map((it) => (
              <tr key={it._id} className="border-t border-white/10">
                {tab.cols.map((c) => (
                  <td key={c} className="max-w-[220px] truncate px-4 py-3 text-muted">{String(get(it, c))}</td>
                ))}
                <td className="whitespace-nowrap px-4 py-3 text-muted">
                  {new Date(it.createdAt).toLocaleDateString("en-IN")}
                </td>
                {hasStatus && (
                  <td className="px-4 py-3">
                    <select
                      value={it.status || "new"}
                      onChange={(e) => updateStatus(it._id, e.target.value)}
                      className="rounded border border-white/20 bg-black px-2 py-1 text-xs"
                    >
                      {["new", "contacted", "closed"].map((s) => (
                        <option key={s} value={s}>{s}</option>
                      ))}
                    </select>
                  </td>
                )}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}