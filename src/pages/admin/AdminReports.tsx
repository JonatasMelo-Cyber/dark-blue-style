import { useAdmin } from "@/contexts/AdminContext";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { BarChart, Bar, LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from "recharts";
import { TrendingUp, DollarSign, Target, Award } from "lucide-react";

const AdminReports = () => {
  const { sales } = useAdmin();

  const completed = sales.filter((s) => s.status === "Concluída");
  const totalRevenue = completed.reduce((a, b) => a + b.total, 0);
  const avgTicket = completed.length ? totalRevenue / completed.length : 0;

  const productCount: Record<string, number> = {};
  sales.forEach((s) => s.items.forEach((i) => {
    productCount[i.productName] = (productCount[i.productName] || 0) + i.quantity;
  }));
  const topProducts = Object.entries(productCount)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 5)
    .map(([name, qty]) => ({ name: name.length > 20 ? name.slice(0, 20) + "…" : name, qty }));

  const dailyRevenue = completed.reduce((acc, sale) => {
    const day = sale.date;
    const existing = acc.find((d) => d.date === day);
    if (existing) existing.revenue += sale.total;
    else acc.push({ date: day, revenue: sale.total });
    return acc;
  }, [] as { date: string; revenue: number }[]).sort((a, b) => a.date.localeCompare(b.date));

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">Relatório de Desempenho</h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { label: "Receita Total", value: `R$ ${totalRevenue.toFixed(2)}`, icon: DollarSign },
          { label: "Ticket Médio", value: `R$ ${avgTicket.toFixed(2)}`, icon: Target },
          { label: "Vendas Concluídas", value: completed.length, icon: TrendingUp },
          { label: "Produto Top", value: topProducts[0]?.name || "—", icon: Award },
        ].map((s) => (
          <Card key={s.label}>
            <CardContent className="p-5 flex items-center gap-4">
              <div className="w-12 h-12 rounded-lg bg-accent/10 flex items-center justify-center">
                <s.icon className="text-accent" size={22} />
              </div>
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
          <CardHeader><CardTitle className="text-base">Receita Diária</CardTitle></CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={280}>
              <LineChart data={dailyRevenue}>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(220,15%,88%)" />
                <XAxis dataKey="date" tick={{ fontSize: 11 }} />
                <YAxis tick={{ fontSize: 11 }} />
                <Tooltip formatter={(v: number) => `R$ ${v.toFixed(2)}`} />
                <Line type="monotone" dataKey="revenue" stroke="hsl(216,80%,52%)" strokeWidth={2} dot={{ r: 4 }} />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card>
          <CardHeader><CardTitle className="text-base">Produtos Mais Vendidos</CardTitle></CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={280}>
              <BarChart data={topProducts} layout="vertical">
                <XAxis type="number" tick={{ fontSize: 11 }} />
                <YAxis dataKey="name" type="category" width={120} tick={{ fontSize: 11 }} />
                <Tooltip />
                <Bar dataKey="qty" fill="hsl(220,60%,12%)" radius={[0, 4, 4, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default AdminReports;
