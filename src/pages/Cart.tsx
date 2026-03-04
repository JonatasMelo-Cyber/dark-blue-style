import { useState } from "react";
import { Link } from "react-router-dom";
import { Trash2, ShoppingBag, CreditCard, QrCode, FileText, ChevronRight } from "lucide-react";
import { useCart } from "@/contexts/CartContext";
import { useAuth } from "@/contexts/AuthContext";
import { useToast } from "@/hooks/use-toast";

type PaymentMethod = "cartao" | "pix" | "boleto" | null;

const Cart = () => {
  const { items, removeItem, clearCart, total } = useCart();
  const { user } = useAuth();
  const { toast } = useToast();

  const [step, setStep] = useState<"cart" | "payment" | "done">("cart");
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>(null);
  const [cardNumber, setCardNumber] = useState("");
  const [cardName, setCardName] = useState("");
  const [cardExpiry, setCardExpiry] = useState("");
  const [cardCvv, setCardCvv] = useState("");
  const [cep, setCep] = useState("");

  const handlePay = (e: React.FormEvent) => {
    e.preventDefault();
    if (!paymentMethod) {
      toast({ title: "Selecione uma forma de pagamento", variant: "destructive" });
      return;
    }
    if (!cep) {
      toast({ title: "Informe o CEP de entrega", variant: "destructive" });
      return;
    }
    if (paymentMethod === "cartao" && (!cardNumber || !cardName || !cardExpiry || !cardCvv)) {
      toast({ title: "Preencha os dados do cartão", variant: "destructive" });
      return;
    }
    setStep("done");
    clearCart();
  };

  if (items.length === 0 && step !== "done") {
    return (
      <div className="min-h-[70vh] flex flex-col items-center justify-center gap-4">
        <ShoppingBag size={48} className="text-muted-foreground" />
        <h2 className="text-2xl font-bold text-foreground">Carrinho vazio</h2>
        <p className="text-muted-foreground">Adicione itens do catálogo</p>
        <Link to="/catalogo" className="bg-accent text-accent-foreground px-6 py-3 rounded-lg font-semibold text-sm hover:opacity-90 transition-opacity">
          Ir ao Catálogo
        </Link>
      </div>
    );
  }

  if (step === "done") {
    return (
      <div className="min-h-[70vh] flex flex-col items-center justify-center gap-4 text-center px-4">
        <div className="w-16 h-16 rounded-full bg-success flex items-center justify-center mb-2">
          <ShoppingBag size={28} className="text-success-foreground" />
        </div>
        <h2 className="text-2xl font-bold text-foreground">Compra realizada!</h2>
        <p className="text-muted-foreground max-w-md">
          {paymentMethod === "pix" && "Um QR Code PIX foi gerado. Efetue o pagamento em até 30 minutos."}
          {paymentMethod === "boleto" && "O boleto foi gerado e enviado para seu e-mail. Pague em até 3 dias úteis."}
          {paymentMethod === "cartao" && "Pagamento aprovado no cartão. Seu pedido está sendo preparado."}
        </p>
        <p className="text-sm text-muted-foreground">Status: <span className="text-success font-semibold">Confirmado</span></p>
        <Link to="/catalogo" className="bg-accent text-accent-foreground px-6 py-3 rounded-lg font-semibold text-sm mt-4 hover:opacity-90 transition-opacity">
          Continuar Comprando
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="bg-primary py-8">
        <div className="container mx-auto px-4">
          <h1 className="text-2xl font-bold text-primary-foreground">
            {step === "cart" ? "Carrinho" : "Pagamento"}
          </h1>
          <div className="flex items-center gap-2 mt-2 text-primary-foreground/50 text-sm">
            <span className={step === "cart" ? "text-accent font-semibold" : ""}>Carrinho</span>
            <ChevronRight size={14} />
            <span className={step === "payment" ? "text-accent font-semibold" : ""}>Pagamento</span>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        {step === "cart" && (
          <div className="max-w-3xl mx-auto">
            <div className="space-y-4">
              {items.map((item, idx) => (
                <div key={idx} className="flex gap-4 bg-card rounded-xl border border-border p-4">
                  <img src={item.product.image} alt={item.product.name} className="w-20 h-24 object-cover rounded-lg" />
                  <div className="flex-1 min-w-0">
                    <h3 className="font-semibold text-foreground text-sm">{item.product.name}</h3>
                    <p className="text-xs text-muted-foreground mt-1">
                      Tamanho: {item.size} · Cor: {item.color}
                    </p>
                    <p className="text-sm font-bold text-foreground mt-2">
                      R$ {item.price.toFixed(2).replace(".", ",")}
                    </p>
                  </div>
                  <button
                    onClick={() => removeItem(idx)}
                    className="text-destructive hover:text-destructive/80 transition-colors self-center"
                  >
                    <Trash2 size={18} />
                  </button>
                </div>
              ))}
            </div>

            <div className="mt-8 bg-card rounded-xl border border-border p-6">
              <div className="flex items-center justify-between mb-4">
                <span className="text-muted-foreground">Subtotal ({items.length} itens)</span>
                <span className="text-xl font-bold text-foreground">R$ {total.toFixed(2).replace(".", ",")}</span>
              </div>
              <button
                onClick={() => {
                  if (!user) {
                    toast({ title: "Faça login para continuar", variant: "destructive" });
                    return;
                  }
                  setStep("payment");
                }}
                className="w-full py-3 bg-accent text-accent-foreground font-semibold rounded-lg hover:opacity-90 transition-opacity text-sm"
              >
                Finalizar Compra
              </button>
            </div>
          </div>
        )}

        {step === "payment" && (
          <form onSubmit={handlePay} className="max-w-lg mx-auto space-y-6">
            {/* Payment method */}
            <div>
              <h3 className="font-semibold text-foreground mb-3">Forma de Pagamento</h3>
              <div className="grid grid-cols-3 gap-3">
                {([
                  { id: "cartao" as const, label: "Cartão", icon: CreditCard },
                  { id: "pix" as const, label: "PIX", icon: QrCode },
                  { id: "boleto" as const, label: "Boleto", icon: FileText },
                ]).map(({ id, label, icon: Icon }) => (
                  <button
                    key={id}
                    type="button"
                    onClick={() => setPaymentMethod(id)}
                    className={`flex flex-col items-center gap-2 p-4 rounded-xl border-2 transition-all text-sm ${
                      paymentMethod === id
                        ? "border-accent bg-accent/10 text-accent"
                        : "border-border text-muted-foreground hover:border-foreground"
                    }`}
                  >
                    <Icon size={22} />
                    {label}
                  </button>
                ))}
              </div>
            </div>

            {/* Card details */}
            {paymentMethod === "cartao" && (
              <div className="space-y-3">
                <input placeholder="Número do cartão" value={cardNumber} onChange={(e) => setCardNumber(e.target.value)} className="w-full px-4 py-3 rounded-lg bg-secondary text-foreground border border-border text-sm focus:outline-none focus:ring-2 focus:ring-accent" />
                <input placeholder="Nome no cartão" value={cardName} onChange={(e) => setCardName(e.target.value)} className="w-full px-4 py-3 rounded-lg bg-secondary text-foreground border border-border text-sm focus:outline-none focus:ring-2 focus:ring-accent" />
                <div className="grid grid-cols-2 gap-3">
                  <input placeholder="Validade (MM/AA)" value={cardExpiry} onChange={(e) => setCardExpiry(e.target.value)} className="w-full px-4 py-3 rounded-lg bg-secondary text-foreground border border-border text-sm focus:outline-none focus:ring-2 focus:ring-accent" />
                  <input placeholder="CVV" value={cardCvv} onChange={(e) => setCardCvv(e.target.value)} className="w-full px-4 py-3 rounded-lg bg-secondary text-foreground border border-border text-sm focus:outline-none focus:ring-2 focus:ring-accent" />
                </div>
              </div>
            )}

            {paymentMethod === "pix" && (
              <div className="bg-secondary rounded-xl p-6 text-center">
                <QrCode size={80} className="mx-auto text-foreground mb-3" />
                <p className="text-sm text-muted-foreground">O QR Code será gerado após confirmar o pedido</p>
              </div>
            )}

            {paymentMethod === "boleto" && (
              <div className="bg-secondary rounded-xl p-6 text-center">
                <FileText size={48} className="mx-auto text-foreground mb-3" />
                <p className="text-sm text-muted-foreground">O boleto será enviado para seu e-mail após confirmar</p>
              </div>
            )}

            {/* CEP */}
            <div>
              <label className="text-sm font-medium text-foreground mb-1 block">CEP de Entrega</label>
              <input
                placeholder="00000-000"
                value={cep}
                onChange={(e) => setCep(e.target.value)}
                className="w-full px-4 py-3 rounded-lg bg-secondary text-foreground border border-border text-sm focus:outline-none focus:ring-2 focus:ring-accent"
              />
            </div>

            {/* Total */}
            <div className="bg-card rounded-xl border border-border p-4 flex items-center justify-between">
              <span className="text-muted-foreground text-sm">Total</span>
              <span className="text-xl font-bold text-foreground">R$ {total.toFixed(2).replace(".", ",")}</span>
            </div>

            <div className="flex gap-3">
              <button type="button" onClick={() => setStep("cart")} className="flex-1 py-3 rounded-lg border border-border text-foreground text-sm font-medium hover:bg-secondary transition-colors">
                Voltar
              </button>
              <button type="submit" className="flex-1 py-3 rounded-lg bg-accent text-accent-foreground font-semibold text-sm hover:opacity-90 transition-opacity">
                Confirmar Pagamento
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};

export default Cart;
