import { useState } from "react";
import { useAdmin } from "@/contexts/AdminContext";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { Settings, Store, Palette } from "lucide-react";

const AdminSettings = () => {
  const { toast } = useToast();
  const [storeName, setStoreName] = useState("Nobile");
  const [storeEmail, setStoreEmail] = useState("contato@nobile.com.br");
  const [primaryColor, setPrimaryColor] = useState("#0a1628");

  const handleSave = () => {
    toast({ title: "Configurações salvas com sucesso!" });
  };

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">Área Personalizada</h1>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="text-base flex items-center gap-2"><Store size={18} />Dados da Loja</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label>Nome da Loja</Label>
              <Input value={storeName} onChange={(e) => setStoreName(e.target.value)} />
            </div>
            <div className="space-y-2">
              <Label>E-mail de Contato</Label>
              <Input value={storeEmail} onChange={(e) => setStoreEmail(e.target.value)} />
            </div>
            <Button onClick={handleSave}>Salvar Alterações</Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-base flex items-center gap-2"><Palette size={18} />Personalização</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label>Cor Primária</Label>
              <div className="flex gap-3 items-center">
                <input type="color" value={primaryColor} onChange={(e) => setPrimaryColor(e.target.value)} className="w-10 h-10 rounded cursor-pointer border-0" />
                <Input value={primaryColor} onChange={(e) => setPrimaryColor(e.target.value)} className="flex-1" />
              </div>
            </div>
            <Button onClick={handleSave}>Aplicar Tema</Button>
          </CardContent>
        </Card>

        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle className="text-base flex items-center gap-2"><Settings size={18} />Informações do Sistema</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
              {[
                { label: "Versão", value: "1.0.0" },
                { label: "Framework", value: "React + Vite" },
                { label: "Estilo", value: "Tailwind CSS" },
                { label: "Banco de Dados", value: "localStorage" },
              ].map((info) => (
                <div key={info.label} className="bg-muted/50 rounded-lg p-3">
                  <p className="text-muted-foreground text-xs">{info.label}</p>
                  <p className="font-semibold">{info.value}</p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default AdminSettings;
