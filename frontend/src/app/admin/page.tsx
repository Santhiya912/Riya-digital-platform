import AdminDashboard from "@/components/sections/AdminDashboard";

export const metadata = { title: "Admin | Riyadvi", robots: { index: false } };

export default function AdminPage() {
  return (
    <main className="mx-auto max-w-7xl px-6 pb-24 pt-32">
      <AdminDashboard />
    </main>
  );
}