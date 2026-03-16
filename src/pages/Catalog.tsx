import { useState, useMemo } from "react";
import { useSearchParams } from "react-router-dom";
import { Search, SlidersHorizontal, X } from "lucide-react";
import { products, categories, brands, allColors } from "@/data/products";
import ProductCard from "@/components/ProductCard";

const Catalog = () => {
  const [searchParams] = useSearchParams();
  const initialCategory = searchParams.get("categoria") || "";

  const [search, setSearch] = useState("");
  const [category, setCategory] = useState(initialCategory);
  const [brand, setBrand] = useState("");
  const [color, setColor] = useState("");
  const [size, setSize] = useState("");
  const [showFilters, setShowFilters] = useState(false);

  const allSizes = useMemo(() => {
    const set = new Set<string>();
    products.forEach((p) => p.sizes.forEach((s) => set.add(s)));
    return Array.from(set);
  }, []);

  const filtered = useMemo(() => {
    return products.filter((p) => {
      if (search && !p.name.toLowerCase().includes(search.toLowerCase()) && !p.description.toLowerCase().includes(search.toLowerCase())) return false;
      if (category && p.category !== category) return false;
      if (brand && p.brand !== brand) return false;
      if (color && !p.colors.includes(color)) return false;
      if (size && !p.sizes.includes(size)) return false;
      return true;
    });
  }, [search, category, brand, color, size]);

  const hasFilters = category || brand || color || size;

  const clearFilters = () => {
    setCategory(""); setBrand(""); setColor(""); setSize(""); setSearch("");
  };

  const FilterSelect = ({ label, value, onChange, options }: { label: string; value: string; onChange: (v: string) => void; options: string[] }) => (
    <div>
      <label className="text-xs font-medium text-muted-foreground mb-1 block">{label}</label>
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full px-3 py-2 rounded-lg bg-secondary text-foreground border border-border text-sm focus:outline-none focus:ring-2 focus:ring-accent"
      >
        <option value="">Todos</option>
        {options.map((o) => (
          <option key={o} value={o}>{o}</option>
        ))}
      </select>
    </div>
  );

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="bg-primary py-12">
        <div className="container mx-auto px-4">
          <h1 className="text-3xl font-bold text-primary-foreground mb-4">Catálogo</h1>
          <div className="relative max-w-lg">
            <Search size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
            <input
              type="text"
              placeholder="Buscar produtos..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-10 pr-4 py-3 rounded-lg bg-card text-foreground border-none text-sm focus:outline-none focus:ring-2 focus:ring-accent"
            />
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        {/* Mobile filter toggle */}
        <button
          onClick={() => setShowFilters(!showFilters)}
          className="md:hidden flex items-center gap-2 mb-4 text-sm font-medium text-foreground"
        >
          <SlidersHorizontal size={16} /> Filtros
        </button>

        <div className="flex gap-8">
          {/* Filters sidebar */}
          <aside className={`${showFilters ? "block" : "hidden"} md:block w-full md:w-56 shrink-0 space-y-4`}>
            <div className="flex items-center justify-between">
              <h3 className="font-semibold text-foreground text-sm">Filtros</h3>
              {hasFilters && (
                <button onClick={clearFilters} className="text-xs text-accent hover:underline flex items-center gap-1">
                  <X size={12} /> Limpar
                </button>
              )}
            </div>
            <FilterSelect label="Categoria" value={category} onChange={setCategory} options={categories} />
            <FilterSelect label="Marca" value={brand} onChange={setBrand} options={brands} />
            <FilterSelect label="Tamanho" value={size} onChange={setSize} options={allSizes} />
            <FilterSelect label="Cor" value={color} onChange={setColor} options={allColors} />
          </aside>

          {/* Products grid */}
          <div className="flex-1">
            {/* Destaques */}
            <div className="mb-10">
              <h2 className="text-2xl font-bold text-foreground mb-6">Destaques</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {products.filter((_, i) => [0, 4, 8, 16].includes(i)).map((p) => (
                  <ProductCard key={p.id} product={p} />
                ))}
              </div>
            </div>

            {/* Todos os produtos */}
            <h2 className="text-2xl font-bold text-foreground mb-4">Todos os Produtos</h2>
            <p className="text-sm text-muted-foreground mb-6">{filtered.length} produto(s) encontrado(s)</p>
            {filtered.length === 0 ? (
              <div className="text-center py-20">
                <p className="text-lg font-semibold text-foreground">Nenhum produto encontrado</p>
                <p className="text-sm text-muted-foreground mt-2">Tente ajustar os filtros</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {filtered.map((p) => (
                  <ProductCard key={p.id} product={p} />
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Catalog;
