import { useAdmin } from "@/contexts/AdminContext";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";

const statusColor = (s: string) => {
  if (s === "Concluída") return "bg-green-500/10 text-green-600 border-green-500/20";
  if (s === "Pendente") return "bg-yellow-500/10 text-yellow-600 border-yellow-500/20";
  return "bg-red-500/10 text-red-600 border-red-500/20";
};

const AdminSales = () => {
  const { sales } = useAdmin();

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">Histórico de Vendas</h1>

      <Card>
        <CardHeader><CardTitle className="text-base">Todas as Vendas</CardTitle></CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>ID</TableHead>
                <TableHead>Cliente</TableHead>
                <TableHead>Itens</TableHead>
                <TableHead>Total</TableHead>
                <TableHead>Pagamento</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Data</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {sales.map((sale) => (
                <TableRow key={sale.id}>
                  <TableCell className="font-mono text-xs">{sale.id}</TableCell>
                  <TableCell>{sale.customerName}</TableCell>
                  <TableCell className="max-w-[200px]">
                    {sale.items.map((i, idx) => (
                      <span key={idx} className="text-xs block">{i.quantity}x {i.productName} ({i.size}/{i.color})</span>
                    ))}
                  </TableCell>
                  <TableCell className="font-semibold">R$ {sale.total.toFixed(2)}</TableCell>
                  <TableCell>{sale.paymentMethod}</TableCell>
                  <TableCell>
                    <Badge variant="outline" className={statusColor(sale.status)}>{sale.status}</Badge>
                  </TableCell>
                  <TableCell>{sale.date}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
};

export default AdminSales;
