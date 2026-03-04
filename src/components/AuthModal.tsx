import { useState } from "react";
import { X } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import { useToast } from "@/hooks/use-toast";

interface AuthModalProps {
  open: boolean;
  onClose: () => void;
}

const AuthModal = ({ open, onClose }: AuthModalProps) => {
  const [mode, setMode] = useState<"login" | "register">("login");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [birthDate, setBirthDate] = useState("");
  const { login, register } = useAuth();
  const { toast } = useToast();

  if (!open) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (mode === "login") {
      const success = login(email, password);
      if (success) {
        toast({ title: "Login realizado com sucesso!" });
        onClose();
      } else {
        toast({ title: "E-mail ou senha incorretos", variant: "destructive" });
      }
    } else {
      if (!name || !email || !password || !birthDate) {
        toast({ title: "Preencha todos os campos", variant: "destructive" });
        return;
      }
      const success = register({ name, email, password, birthDate });
      if (success) {
        toast({ title: "Conta criada com sucesso!" });
        onClose();
      } else {
        toast({ title: "E-mail já cadastrado", variant: "destructive" });
      }
    }
  };

  const reset = () => {
    setEmail(""); setPassword(""); setName(""); setBirthDate("");
  };

  return (
    <div className="fixed inset-0 z-50 bg-foreground/40 flex items-center justify-center p-4" onClick={onClose}>
      <div
        className="bg-card rounded-xl shadow-2xl w-full max-w-md p-8 relative animate-fade-in"
        onClick={(e) => e.stopPropagation()}
      >
        <button onClick={onClose} className="absolute top-4 right-4 text-muted-foreground hover:text-foreground">
          <X size={20} />
        </button>

        <h2 className="text-2xl font-bold text-foreground mb-1">
          {mode === "login" ? "Entrar" : "Criar Conta"}
        </h2>
        <p className="text-sm text-muted-foreground mb-6">
          {mode === "login" ? "Acesse sua conta VANGUARD" : "Junte-se à VANGUARD"}
        </p>

        <form onSubmit={handleSubmit} className="space-y-4">
          {mode === "register" && (
            <>
              <input
                type="text"
                placeholder="Nome completo"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full px-4 py-3 rounded-lg bg-secondary text-foreground placeholder:text-muted-foreground border border-border focus:outline-none focus:ring-2 focus:ring-accent text-sm"
              />
              <input
                type="date"
                placeholder="Data de nascimento"
                value={birthDate}
                onChange={(e) => setBirthDate(e.target.value)}
                className="w-full px-4 py-3 rounded-lg bg-secondary text-foreground border border-border focus:outline-none focus:ring-2 focus:ring-accent text-sm"
              />
            </>
          )}
          <input
            type="email"
            placeholder="E-mail"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full px-4 py-3 rounded-lg bg-secondary text-foreground placeholder:text-muted-foreground border border-border focus:outline-none focus:ring-2 focus:ring-accent text-sm"
          />
          <input
            type="password"
            placeholder="Senha"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full px-4 py-3 rounded-lg bg-secondary text-foreground placeholder:text-muted-foreground border border-border focus:outline-none focus:ring-2 focus:ring-accent text-sm"
          />
          <button
            type="submit"
            className="w-full py-3 rounded-lg bg-accent text-accent-foreground font-semibold text-sm hover:opacity-90 transition-opacity"
          >
            {mode === "login" ? "Entrar" : "Criar Conta"}
          </button>
        </form>

        <p className="text-center text-sm text-muted-foreground mt-6">
          {mode === "login" ? "Não tem conta? " : "Já tem conta? "}
          <button
            onClick={() => { setMode(mode === "login" ? "register" : "login"); reset(); }}
            className="text-accent font-semibold hover:underline"
          >
            {mode === "login" ? "Registrar" : "Entrar"}
          </button>
        </p>
      </div>
    </div>
  );
};

export default AuthModal;
