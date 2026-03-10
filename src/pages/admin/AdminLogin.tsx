import { useState } from "react";
import { useAdmin } from "@/contexts/AdminContext";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Lock, Mail } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const AdminLogin = () => {
  const { adminLogin } = useAdmin();
  const { toast } = useToast();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (adminLogin(email, password)) {
      toast({ title: "Login realizado com sucesso!" });
    } else {
      toast({ title: "Credenciais inválidas", variant: "destructive" });
    }
  };

  return (
    <div className="min-h-screen bg-primary flex items-center justify-center p-4">
      <Card className="w-full max-w-md border-border/50 bg-card shadow-2xl">
        <CardHeader className="text-center space-y-2">
          <div className="mx-auto w-14 h-14 bg-accent/10 rounded-full flex items-center justify-center mb-2">
            <Lock className="text-accent" size={28} />
          </div>
          <CardTitle className="text-2xl font-bold">Painel Administrativo</CardTitle>
          <p className="text-sm text-muted-foreground">Nobile — Acesso restrito</p>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label>E-mail</Label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" size={16} />
                <Input placeholder="admin@nobile.com" value={email} onChange={(e) => setEmail(e.target.value)} className="pl-10" />
              </div>
            </div>
            <div className="space-y-2">
              <Label>Senha</Label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" size={16} />
                <Input type="password" placeholder="••••••" value={password} onChange={(e) => setPassword(e.target.value)} className="pl-10" />
              </div>
            </div>
            <Button type="submit" className="w-full">Entrar</Button>
          </form>
          <p className="text-xs text-muted-foreground text-center mt-4">Credenciais padrão: admin@nobile.com / admin123</p>
        </CardContent>
      </Card>
    </div>
  );
};

export default AdminLogin;
