import { Link } from "react-router-dom";

const Footer = () => (
  <footer className="bg-primary text-primary-foreground/70 py-12">
    <div className="container mx-auto px-4">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div>
          <h3 className="text-lg font-bold text-primary-foreground mb-3">
            VANGUARD<span className="text-accent">.</span>
          </h3>
          <p className="text-sm leading-relaxed">Moda masculina com estilo e qualidade. Vista-se com confiança.</p>
        </div>
        <div>
          <h4 className="font-semibold text-primary-foreground mb-3 text-sm">NAVEGAÇÃO</h4>
          <div className="space-y-2 text-sm">
            <Link to="/" className="block hover:text-primary-foreground transition-colors">Home</Link>
            <Link to="/catalogo" className="block hover:text-primary-foreground transition-colors">Catálogo</Link>
            <Link to="/ajuda" className="block hover:text-primary-foreground transition-colors">Ajuda</Link>
          </div>
        </div>
        <div>
          <h4 className="font-semibold text-primary-foreground mb-3 text-sm">CONTATO</h4>
          <p className="text-sm">contato@vanguard.com.br</p>
          <p className="text-sm mt-1">(11) 9999-9999</p>
        </div>
      </div>
      <div className="border-t border-primary-foreground/10 mt-8 pt-6 text-center text-xs">
        © 2026 VANGUARD. Todos os direitos reservados.
      </div>
    </div>
  </footer>
);

export default Footer;
