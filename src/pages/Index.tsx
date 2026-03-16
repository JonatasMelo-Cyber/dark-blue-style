import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import heroBanner from "@/assets/hero-banner.jpg";
import { products } from "@/data/products";
import ProductCard from "@/components/ProductCard";

const Index = () => {
  const featured = products.filter((_, i) => [0, 4, 8, 16].includes(i));

  return (
    <div>
      {/* Hero */}
      <section className="relative h-[85vh] min-h-[500px] overflow-hidden">
        <img src={heroBanner} alt="Moda masculina Nobile" className="absolute inset-0 w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-r from-primary/90 via-primary/60 to-transparent" />
        <div className="relative container mx-auto px-4 h-full flex items-center">
          <div className="max-w-lg">
            <p className="text-accent font-semibold text-sm tracking-widest mb-3 animate-fade-in">NOVA COLEÇÃO 2026</p>
            <h1 className="text-5xl md:text-6xl font-bold text-primary-foreground leading-tight mb-4 animate-fade-in" style={{ animationDelay: "0.1s" }}>
              Estilo que<br />define você
            </h1>
            <p className="text-primary-foreground/70 text-lg mb-8 animate-fade-in" style={{ animationDelay: "0.2s" }}>
              Descubra peças premium para o homem moderno. Qualidade, design e atitude em cada detalhe.
            </p>
            <Link
              to="/catalogo"
              className="inline-flex items-center gap-2 bg-accent text-accent-foreground px-8 py-4 rounded-lg font-semibold hover:opacity-90 transition-opacity animate-fade-in"
              style={{ animationDelay: "0.3s" }}
            >
              Ver Catálogo <ArrowRight size={18} />
            </Link>
          </div>
        </div>
      </section>

      {/* Categories */}
      <section className="py-20 bg-secondary">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-foreground text-center mb-12">Categorias</h2>
          <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
            {["Camisetas", "Calças", "Jaquetas", "Bermudas", "Moletons"].map((cat) => (
              <Link
                key={cat}
                to={`/catalogo?categoria=${cat}`}
                className="bg-accent/10 rounded-xl p-6 text-center border border-accent/20 hover:border-accent hover:shadow-lg transition-all group"
              >
                <p className="font-semibold text-foreground group-hover:text-accent transition-colors">{cat}</p>
                <p className="text-xs text-muted-foreground mt-1">
                  {products.filter((p) => p.category === cat).length} produtos
                </p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Featured */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between mb-12">
            <h2 className="text-3xl font-bold text-foreground">Destaques</h2>
            <Link to="/catalogo" className="text-accent text-sm font-semibold hover:underline flex items-center gap-1">
              Ver todos <ArrowRight size={14} />
            </Link>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {featured.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Index;
