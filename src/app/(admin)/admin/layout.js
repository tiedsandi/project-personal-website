import SidebarLayout from "@/components/sidebar-layout";
import AuthGuard from "../../../lib/auth-guard";

export default function AdminLayout({ children }) {
  return (
    <AuthGuard>
      <SidebarLayout>
        <main className="flex-1 p-6">{children}</main>
      </SidebarLayout>
    </AuthGuard>
  );
}
