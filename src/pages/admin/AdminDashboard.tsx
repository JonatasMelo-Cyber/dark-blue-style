import { useAdmin } from "@/contexts/AdminContext";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { DollarSign, ShoppingCart, Users, TrendingUp, CheckCircle, XCircle, Clock } from "lucide-react";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from "recharts";

const AdminDashboard = () => {
  const { sales, employees } = useAdmin();

  const totalRevenue = sales.filter((s) => s.status === "Concluída").reduce((a, b) => a + b.total, 0);
  const totalSales = sales.length;
  const completed = sales.filter((s) => s.status === "Concluída").length;
  const pending = sales.filter((s) => s.status === "Pendente").length;
  const cancelled = sales.filter((s) => s.status === "Cancelada").length;

  const paymentData = [
    { name: "Cartão", value: sales.filter((s) => s.paymentMethod === "Cartão").length },
    { name: "PIX", value: sales.filter((s) => s.paymentMethod === "PIX").length },
    { name: "Boleto", value: sales.filter((s) => s.paymentMethod === "Boleto").length },
  ];

  const dailyData = sales.reduce((acc, sale) => {
    const day = sale.date.slice(8);
    const existing = acc.find((d) => d.day === day);
    if (existing) existing.total += sale.total;
    else acc.push({ day, total: sale.total });
    return acc;
  }, [] as { day: string; total: number }[]).sort((a, b) => a.day.localeCompare(b.day));

  const COLORS = ["hsl(216,80%,52%)", "hsl(142,70%,45%)", "hsl(220,60%,12%)"];

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">Dashboard</h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { label: "Receita Total", value: `R$ ${totalRevenue.toFixed(2)}`, icon: DollarSign, color: "text-accent" },
          { label: "Total de Vendas", value: totalSales, icon: ShoppingCart, color: "text-accent" },
          { label: "Funcionários", value: employees.length, icon: Users, color: "text-accent" },
          { label: "Taxa de Conversão", value: `${((completed / totalSales) * 100).toFixed(0)}%`, icon: TrendingUp, color: "text-accent" },
        ].map((stat) => (
          <Card key={stat.label}>
            <CardContent className="p-5 flex items-center gap-4">
              <div className="w-12 h-12 rounded-lg bg-accent/10 flex items-center justify-center">
                <stat.icon className={stat.color} size={22} />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">{stat.label}</p>
                <p className="text-xl font-bold">{stat.value}</p>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {[
          { label: "Concluídas", value: completed, icon: CheckCircle, cls: "text-green-500" },
          { label: "Pendentes", value: pending, icon: Clock, cls: "text-yellow-500" },
          { label: "Canceladas", value: cancelled, icon: XCircle, cls: "text-destructive" },
        ].map((s) => (
          <Card key={s.label}>
            <CardContent className="p-4 flex items-center gap-3">
              <s.icon className={s.cls} size={20} />
              <div>
                <p className="text-sm text-muted-foreground">{s.label}</p>
                <p className="text-lg font-bold">{s.value}</p>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader><CardTitle className="text-base">Vendas por Dia</CardTitle></CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={250}>
              <BarChart data={dailyData}>
                <XAxis dataKey="day" tick={{ fontSize: 12 }} />
                <YAxis tick={{ fontSize: 12 }} />
                <Tooltip formatter={(v: number) => `R$ ${v.toFixed(2)}`} />
                <Bar dataKey="total" fill="hsl(216,80%,52%)" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card>
          <CardHeader><CardTitle className="text-base">Métodos de Pagamento</CardTitle></CardHeader>
          <CardContent className="flex items-center justify-center">
            <ResponsiveContainer width="100%" height={250}>
              <PieChart>
                <Pie data={paymentData} cx="50%" cy="50%" innerRadius={60} outerRadius={90} dataKey="value" label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}>
                  {paymentData.map((_, i) => <Cell key={i} fill={COLORS[i]} />)}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default AdminDashboard;
