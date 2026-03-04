import { useState } from "react";
import { Star, ShoppingCart, Check } from "lucide-react";
import { Product } from "@/data/products";
import { useCart } from "@/contexts/CartContext";
import { useToast } from "@/hooks/use-toast";

interface ProductCardProps {
  product: Product;
}

const ProductCard = ({ product }: ProductCardProps) => {
  const [selectedSize, setSelectedSize] = useState(product.sizes[0]);
  const [selectedColor, setSelectedColor] = useState(product.colors[0]);
  const [added, setAdded] = useState(false);
  const { addItem } = useCart();
  const { toast } = useToast();

  const price = product.basePrice + (product.sizePriceModifier[selectedSize] || 0);

  const handleAdd = () => {
    addItem({
      product,
      size: selectedSize,
      color: selectedColor,
      quantity: 1,
      price,
    });
    setAdded(true);
    toast({ title: `${product.name} adicionado ao carrinho!` });
    setTimeout(() => setAdded(false), 1500);
  };

  const colorMap: Record<string, string> = {
    Preto: "#111", Branco: "#fff", "Azul Marinho": "#1a2744", Cinza: "#888",
    Azul: "#2563eb", "Azul Escuro": "#1e3a5f", "Azul Claro": "#93c5fd",
    Bege: "#d4b896", Verde: "#22c55e", "Verde Militar": "#4b5320",
    Bordô: "#800020", "Off-White": "#f5f0e8", "Cinza Mescla": "#a0a0a0",
    "Cinza Grafite": "#36454f", "Azul Médio": "#4a7fb5", "Azul Royal": "#1e40af",
  };

  return (
    <div className="group bg-card rounded-xl border border-border overflow-hidden hover:shadow-xl transition-all duration-300">
      <div className="relative aspect-[3/4] overflow-hidden bg-secondary">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          loading="lazy"
        />
        <div className="absolute top-3 right-3 bg-primary/80 backdrop-blur-sm text-primary-foreground text-xs px-2 py-1 rounded-full font-medium">
          {product.brand}
        </div>
      </div>

      <div className="p-4 space-y-3">
        <div>
          <h3 className="font-semibold text-foreground text-sm leading-tight">{product.name}</h3>
          <p className="text-xs text-muted-foreground mt-1 line-clamp-2">{product.description}</p>
        </div>

        {/* Rating */}
        <div className="flex items-center gap-1">
          {Array.from({ length: 5 }).map((_, i) => (
            <Star
              key={i}
              size={12}
              className={i < Math.floor(product.rating) ? "fill-accent text-accent" : "text-border"}
            />
          ))}
          <span className="text-xs text-muted-foreground ml-1">({product.reviews})</span>
        </div>

        {/* Size */}
        <div>
          <p className="text-xs text-muted-foreground mb-1">Tamanho</p>
          <div className="flex flex-wrap gap-1">
            {product.sizes.map((s) => (
              <button
                key={s}
                onClick={() => setSelectedSize(s)}
                className={`text-xs px-2 py-1 rounded border transition-colors ${
                  selectedSize === s
                    ? "bg-primary text-primary-foreground border-primary"
                    : "border-border text-muted-foreground hover:border-foreground"
                }`}
              >
                {s}
              </button>
            ))}
          </div>
        </div>

        {/* Color */}
        <div>
          <p className="text-xs text-muted-foreground mb-1">Cor: {selectedColor}</p>
          <div className="flex flex-wrap gap-1.5">
            {product.colors.map((c) => (
              <button
                key={c}
                onClick={() => setSelectedColor(c)}
                title={c}
                className={`w-5 h-5 rounded-full border-2 transition-all ${
                  selectedColor === c ? "border-accent scale-110" : "border-border"
                }`}
                style={{ backgroundColor: colorMap[c] || "#ccc" }}
              />
            ))}
          </div>
        </div>

        {/* Price + Add */}
        <div className="flex items-center justify-between pt-2 border-t border-border">
          <span className="text-lg font-bold text-foreground">
            R$ {price.toFixed(2).replace(".", ",")}
          </span>
          <button
            onClick={handleAdd}
            className={`p-2 rounded-lg transition-all ${
              added
                ? "bg-success text-success-foreground"
                : "bg-accent text-accent-foreground hover:opacity-90"
            }`}
          >
            {added ? <Check size={18} /> : <ShoppingCart size={18} />}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
