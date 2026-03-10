import { useState } from "react";
import { ChevronDown, ChevronUp } from "lucide-react";

const faqs = [
  { q: "Como faço para trocar ou devolver um produto?", a: "Você pode solicitar troca ou devolução em até 30 dias após o recebimento. O produto deve estar em perfeitas condições, com etiquetas e embalagem original. Entre em contato conosco para iniciar o processo." },
  { q: "Qual o prazo de entrega?", a: "O prazo varia de acordo com a região. Em média, de 3 a 10 dias úteis após a confirmação do pagamento. Ao finalizar a compra, o prazo exato será informado com base no seu CEP." },
  { q: "Quais formas de pagamento são aceitas?", a: "Aceitamos cartão de crédito (Visa, Master, Elo, Amex), PIX e boleto bancário. Compras com PIX têm aprovação imediata, enquanto boletos levam até 3 dias úteis para compensar." },
  { q: "Como saber meu tamanho correto?", a: "Cada produto possui uma tabela de medidas na página do catálogo. Recomendamos medir uma peça que você já possui e comparar com as medidas indicadas. Em caso de dúvida, opte pelo tamanho maior." },
  { q: "Posso cancelar meu pedido?", a: "Sim, desde que o pedido ainda não tenha sido enviado. Acesse sua conta ou entre em contato conosco para solicitar o cancelamento." },
  { q: "Como acompanho meu pedido?", a: "Após o envio, você receberá um e-mail com o código de rastreamento. Use-o no site da transportadora para acompanhar a entrega em tempo real." },
  { q: "Os produtos têm garantia?", a: "Todos os nossos produtos possuem garantia contra defeitos de fabricação por 90 dias. Caso identifique algum problema, entre em contato conosco." },
  { q: "Como crio minha conta?", a: "Clique no ícone de usuário no canto superior direito da página e selecione 'Registrar'. Preencha seus dados (nome, e-mail, senha e data de nascimento) e pronto!" },
];

const Help = () => {
  const [open, setOpen] = useState<number | null>(null);

  return (
    <div className="min-h-screen bg-background">
      <div className="bg-primary py-12">
        <div className="container mx-auto px-4">
          <h1 className="text-3xl font-bold text-primary-foreground">Central de Ajuda</h1>
          <p className="text-primary-foreground/60 mt-2">Encontre respostas para suas dúvidas</p>
        </div>
      </div>

      <div className="container mx-auto px-4 py-12 max-w-3xl">
        <h2 className="text-xl font-bold text-foreground mb-8">Perguntas Frequentes</h2>
        <div className="space-y-3">
          {faqs.map((faq, i) => (
            <div key={i} className="bg-card rounded-xl border border-border overflow-hidden">
              <button
                onClick={() => setOpen(open === i ? null : i)}
                className="w-full flex items-center justify-between p-5 text-left"
              >
                <span className="font-medium text-foreground text-sm pr-4">{faq.q}</span>
                {open === i ? (
                  <ChevronUp size={18} className="shrink-0 text-accent" />
                ) : (
                  <ChevronDown size={18} className="shrink-0 text-muted-foreground" />
                )}
              </button>
              {open === i && (
                <div className="px-5 pb-5 text-sm text-muted-foreground leading-relaxed animate-fade-in">
                  {faq.a}
                </div>
              )}
            </div>
          ))}
        </div>

        <div className="mt-12 bg-card rounded-xl border border-border p-8 text-center">
          <h3 className="text-lg font-bold text-foreground mb-2">Ainda precisa de ajuda?</h3>
          <p className="text-sm text-muted-foreground mb-1">Envie um e-mail para:</p>
          <p className="text-accent font-semibold"><p className="text-accent font-semibold">contato@nobile.com.br</p></p>
          <p className="text-xs text-muted-foreground mt-3">Respondemos em até 24 horas úteis</p>
        </div>
      </div>
    </div>
  );
};

export default Help;
