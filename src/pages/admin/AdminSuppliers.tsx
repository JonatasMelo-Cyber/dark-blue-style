import { useState } from "react";
import { useAdmin, Supplier } from "@/contexts/AdminContext";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { Truck, Plus, Trash2 } from "lucide-react";
import { categories } from "@/data/products";

const AdminSuppliers = () => {
  const { suppliers, addSupplier, removeSupplier } = useAdmin();
  const { toast } = useToast();
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState({
    companyName: "",
    cnpj: "",
    productBrand: "",
    productName: "",
    category: "",
    price: "",
  });

  const formatCNPJ = (value: string) => {
    const nums = value.replace(/\D/g, "").slice(0, 14);
    return nums
      .replace(/^(\d{2})(\d)/, "$1.$2")
      .replace(/^(\d{2})\.(\d{3})(\d)/, "$1.$2.$3")
      .replace(/\.(\d{3})(\d)/, ".$1/$2")
      .replace(/(\d{4})(\d)/, "$1-$2");
  };

  const handleSubmit = () => {
    if (!form.companyName || !form.cnpj || !form.productBrand || !form.productName || !form.category || !form.price) {
      toast({ title: "Preencha todos os campos", variant: "destructive" });
      return;
    }
    addSupplier({
      companyName: form.companyName,
      cnpj: form.cnpj,
      productBrand: form.productBrand,
      productName: form.productName,
      category: form.category,
      price: parseFloat(form.price),
    });
    setForm({ companyName: "", cnpj: "", productBrand: "", productName: "", category: "", price: "" });
    setShowForm(false);
    toast({ title: "Fornecedor cadastrado com sucesso!" });
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">Fornecedores</h1>
        <Button onClick={() => setShowForm(!showForm)}>
          <Plus size={16} className="mr-2" />
          Novo Fornecedor
        </Button>
      </div>

      {showForm && (
        <Card>
          <CardHeader>
            <CardTitle className="text-base flex items-center gap-2">
              <Truck size={18} /> Cadastrar Fornecedor
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              <div className="space-y-2">
                <Label>Nome da Empresa</Label>
                <Input value={form.companyName} onChange={(e) => setForm({ ...form, companyName: e.target.value })} placeholder="Ex: Têxtil Brasil Ltda" />
              </div>
              <div className="space-y-2">
                <Label>CNPJ</Label>
                <Input value={form.cnpj} onChange={(e) => setForm({ ...form, cnpj: formatCNPJ(e.target.value) })} placeholder="00.000.000/0000-00" />
              </div>
              <div className="space-y-2">
                <Label>Marca do Produto</Label>
                <Input value={form.productBrand} onChange={(e) => setForm({ ...form, productBrand: e.target.value })} placeholder="Ex: Urban Co" />
              </div>
              <div className="space-y-2">
                <Label>Nome do Produto</Label>
                <Input value={form.productName} onChange={(e) => setForm({ ...form, productName: e.target.value })} placeholder="Ex: Camiseta Básica Premium" />
              </div>
              <div className="space-y-2">
                <Label>Categoria</Label>
                <Select value={form.category} onValueChange={(v) => setForm({ ...form, category: v })}>
                  <SelectTrigger>
                    <SelectValue placeholder="Selecione" />
                  </SelectTrigger>
                  <SelectContent>
                    {categories.map((c) => (
                      <SelectItem key={c} value={c}>{c}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label>Preço (R$)</Label>
                <Input type="number" step="0.01" value={form.price} onChange={(e) => setForm({ ...form, price: e.target.value })} placeholder="0.00" />
              </div>
            </div>
            <div className="flex gap-3 mt-4">
              <Button onClick={handleSubmit}>Cadastrar</Button>
              <Button variant="outline" onClick={() => setShowForm(false)}>Cancelar</Button>
            </div>
          </CardContent>
        </Card>
      )}

      <Card>
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>ID</TableHead>
                <TableHead>Empresa</TableHead>
                <TableHead>CNPJ</TableHead>
                <TableHead>Marca</TableHead>
                <TableHead>Produto</TableHead>
                <TableHead>Categoria</TableHead>
                <TableHead>Preço</TableHead>
                <TableHead className="w-12"></TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {suppliers.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={8} className="text-center text-muted-foreground py-8">
                    Nenhum fornecedor cadastrado
                  </TableCell>
                </TableRow>
              ) : (
                suppliers.map((s) => (
                  <TableRow key={s.id}>
                    <TableCell className="font-mono text-xs">{s.id}</TableCell>
                    <TableCell className="font-medium">{s.companyName}</TableCell>
                    <TableCell className="text-xs">{s.cnpj}</TableCell>
                    <TableCell>{s.productBrand}</TableCell>
                    <TableCell>{s.productName}</TableCell>
                    <TableCell>{s.category}</TableCell>
                    <TableCell>R$ {s.price.toFixed(2)}</TableCell>
                    <TableCell>
                      <Button variant="ghost" size="icon" onClick={() => removeSupplier(s.id)} className="text-destructive hover:text-destructive">
                        <Trash2 size={16} />
                      </Button>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
};

export default AdminSuppliers;
