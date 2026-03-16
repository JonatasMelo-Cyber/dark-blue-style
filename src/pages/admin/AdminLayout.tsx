import { useState } from "react";
import { useAdmin } from "@/contexts/AdminContext";
import AdminLogin from "./AdminLogin";
import AdminDashboard from "./AdminDashboard";
import AdminEmployees from "./AdminEmployees";
import AdminSales from "./AdminSales";
import AdminReports from "./AdminReports";
import AdminSettings from "./AdminSettings";
import AdminSuppliers from "./AdminSuppliers";
import { Button } from "@/components/ui/button";
import { LayoutDashboard, Users, ShoppingCart, BarChart3, Settings, LogOut, Menu, X, ChevronLeft, Truck } from "lucide-react";
import { Link } from "react-router-dom";

const navItems = [
  { id: "dashboard", label: "Dashboard", icon: LayoutDashboard },
  { id: "employees", label: "Funcionários", icon: Users },
  { id: "suppliers", label: "Fornecedores", icon: Truck },
  { id: "sales", label: "Vendas", icon: ShoppingCart },
  { id: "reports", label: "Relatórios", icon: BarChart3 },
];

const AdminLayout = () => {
  const { isAdminLoggedIn, adminLogout } = useAdmin();
  const [activeTab, setActiveTab] = useState("dashboard");
  const [sidebarOpen, setSidebarOpen] = useState(true);

  if (!isAdminLoggedIn) return <AdminLogin />;

  const renderPage = () => {
    switch (activeTab) {
      case "employees": return <AdminEmployees />;
      case "suppliers": return <AdminSuppliers />;
      case "sales": return <AdminSales />;
      case "reports": return <AdminReports />;
      case "settings": return <AdminSettings />;
      default: return <AdminDashboard />;
    }
  };

  return (
    <div className="min-h-screen flex bg-background">
      {/* Sidebar */}
      <aside className={`${sidebarOpen ? "w-64" : "w-16"} bg-primary text-primary-foreground flex flex-col transition-all duration-300 shrink-0`}>
        <div className="h-16 flex items-center justify-between px-4 border-b border-primary-foreground/10">
          {sidebarOpen && <span className="font-bold text-lg tracking-wide">Nobile Admin</span>}
          <button onClick={() => setSidebarOpen(!sidebarOpen)} className="text-primary-foreground/70 hover:text-primary-foreground">
            {sidebarOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>

        <nav className="flex-1 py-4 space-y-1 px-2">
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm transition-colors ${
                activeTab === item.id
                  ? "bg-accent text-accent-foreground"
                  : "text-primary-foreground/60 hover:text-primary-foreground hover:bg-primary-foreground/5"
              }`}
            >
              <item.icon size={18} />
              {sidebarOpen && <span>{item.label}</span>}
            </button>
          ))}
        </nav>

        <div className="p-3 border-t border-primary-foreground/10 space-y-2">
          <Link to="/">
            <Button variant="ghost" className="w-full justify-start text-primary-foreground/60 hover:text-primary-foreground hover:bg-primary-foreground/5">
              <ChevronLeft size={16} className="mr-2" />
              {sidebarOpen && "Voltar ao Site"}
            </Button>
          </Link>
          <Button variant="ghost" onClick={adminLogout} className="w-full justify-start text-primary-foreground/60 hover:text-primary-foreground hover:bg-primary-foreground/5">
            <LogOut size={16} className="mr-2" />
            {sidebarOpen && "Sair"}
          </Button>
        </div>
      </aside>

      {/* Main */}
      <main className="flex-1 p-6 overflow-auto">
        {renderPage()}
      </main>
    </div>
  );
};

export default AdminLayout;
