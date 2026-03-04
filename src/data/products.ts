export interface Product {
  id: number;
  name: string;
  category: string;
  brand: string;
  colors: string[];
  sizes: string[];
  basePrice: number;
  sizePriceModifier: Record<string, number>;
  description: string;
  rating: number;
  reviews: number;
  image: string;
}

const unsplashImg = (id: string) => `https://images.unsplash.com/${id}?w=600&h=750&fit=crop`;

export const products: Product[] = [
  // Camisetas
  { id: 1, name: "Camiseta Básica Premium", category: "Camisetas", brand: "Urban Co", colors: ["Preto", "Branco", "Azul Marinho", "Cinza"], sizes: ["P", "M", "G", "GG", "XG"], basePrice: 89.90, sizePriceModifier: { P: 0, M: 0, G: 10, GG: 15, XG: 20 }, description: "Camiseta de algodão egípcio com caimento perfeito. Ideal para o dia a dia.", rating: 4.8, reviews: 234, image: unsplashImg("photo-1521572163474-6864f9cf17ab") },
  { id: 2, name: "Camiseta Polo Slim", category: "Camisetas", brand: "Heritage", colors: ["Branco", "Azul", "Verde", "Bordô"], sizes: ["P", "M", "G", "GG"], basePrice: 129.90, sizePriceModifier: { P: 0, M: 0, G: 10, GG: 20 }, description: "Polo slim fit com tecido piquet de alta qualidade.", rating: 4.6, reviews: 158, image: unsplashImg("photo-1586790170083-2f9ceadc732d") },
  { id: 3, name: "Camiseta Oversized Street", category: "Camisetas", brand: "Volt", colors: ["Preto", "Cinza", "Off-White"], sizes: ["M", "G", "GG", "XG"], basePrice: 109.90, sizePriceModifier: { M: 0, G: 0, GG: 10, XG: 15 }, description: "Modelagem oversized com tecido pesado 220g. Estilo streetwear.", rating: 4.5, reviews: 89, image: unsplashImg("photo-1618354691373-d851c5c3a990") },
  { id: 4, name: "Camiseta Dry Fit Esportiva", category: "Camisetas", brand: "Apex", colors: ["Preto", "Azul Royal", "Cinza"], sizes: ["P", "M", "G", "GG"], basePrice: 99.90, sizePriceModifier: { P: 0, M: 0, G: 10, GG: 15 }, description: "Tecido tecnológico com absorção de suor. Perfeita para treinos.", rating: 4.7, reviews: 312, image: unsplashImg("photo-1581655353564-df123a1eb820") },
  // Calças
  { id: 5, name: "Calça Jeans Slim Fit", category: "Calças", brand: "Heritage", colors: ["Azul Escuro", "Azul Claro", "Preto"], sizes: ["38", "40", "42", "44", "46"], basePrice: 199.90, sizePriceModifier: { "38": 0, "40": 0, "42": 10, "44": 15, "46": 25 }, description: "Jeans premium com elastano para maior conforto e mobilidade.", rating: 4.7, reviews: 189, image: unsplashImg("photo-1542272604-787c3835535d") },
  { id: 6, name: "Calça Chino Casual", category: "Calças", brand: "Urban Co", colors: ["Bege", "Azul Marinho", "Verde Militar", "Preto"], sizes: ["38", "40", "42", "44", "46"], basePrice: 179.90, sizePriceModifier: { "38": 0, "40": 0, "42": 10, "44": 15, "46": 20 }, description: "Chino em sarja de algodão. Versatilidade do casual ao semi-formal.", rating: 4.5, reviews: 145, image: unsplashImg("photo-1473966968600-fa801b869a1a") },
  { id: 7, name: "Calça Jogger Cargo", category: "Calças", brand: "Volt", colors: ["Preto", "Verde Militar", "Cinza"], sizes: ["P", "M", "G", "GG"], basePrice: 159.90, sizePriceModifier: { P: 0, M: 0, G: 10, GG: 15 }, description: "Jogger com bolsos cargo e punho elástico. Conforto com estilo.", rating: 4.4, reviews: 98, image: unsplashImg("photo-1624378439575-d8705ad7ae80") },
  { id: 8, name: "Calça Social Alfaiataria", category: "Calças", brand: "Heritage", colors: ["Preto", "Azul Marinho", "Cinza Grafite"], sizes: ["38", "40", "42", "44", "46"], basePrice: 249.90, sizePriceModifier: { "38": 0, "40": 0, "42": 10, "44": 20, "46": 30 }, description: "Alfaiataria moderna com caimento impecável. Para ocasiões especiais.", rating: 4.9, reviews: 76, image: unsplashImg("photo-1594938298603-c8148c4dae35") },
  // Jaquetas
  { id: 9, name: "Jaqueta Bomber Clássica", category: "Jaquetas", brand: "Volt", colors: ["Preto", "Verde Militar", "Azul Marinho"], sizes: ["P", "M", "G", "GG"], basePrice: 349.90, sizePriceModifier: { P: 0, M: 0, G: 20, GG: 30 }, description: "Bomber em nylon com forro acolchoado. Ícone do estilo urbano.", rating: 4.8, reviews: 167, image: unsplashImg("photo-1551028719-00167b16eac5") },
  { id: 10, name: "Jaqueta Jeans Destroyed", category: "Jaquetas", brand: "Urban Co", colors: ["Azul Médio", "Azul Escuro"], sizes: ["P", "M", "G", "GG"], basePrice: 279.90, sizePriceModifier: { P: 0, M: 0, G: 15, GG: 25 }, description: "Jaqueta jeans com detalhes destroyed e lavagem especial.", rating: 4.3, reviews: 92, image: unsplashImg("photo-1576871337632-b9aef4c17ab9") },
  { id: 11, name: "Jaqueta Corta-Vento", category: "Jaquetas", brand: "Apex", colors: ["Preto", "Azul Royal", "Cinza"], sizes: ["P", "M", "G", "GG", "XG"], basePrice: 229.90, sizePriceModifier: { P: 0, M: 0, G: 10, GG: 20, XG: 30 }, description: "Leve e impermeável. Ideal para atividades ao ar livre.", rating: 4.6, reviews: 203, image: unsplashImg("photo-1591047139829-d91aecb6caea") },
  { id: 12, name: "Blazer Casual Slim", category: "Jaquetas", brand: "Heritage", colors: ["Azul Marinho", "Preto", "Cinza"], sizes: ["P", "M", "G", "GG"], basePrice: 399.90, sizePriceModifier: { P: 0, M: 0, G: 20, GG: 30 }, description: "Blazer desestruturado para looks casuais elegantes.", rating: 4.7, reviews: 64, image: unsplashImg("photo-1507679799987-c73779587ccf") },
  // Bermudas
  { id: 13, name: "Bermuda Sarja Chino", category: "Bermudas", brand: "Urban Co", colors: ["Bege", "Azul Marinho", "Branco", "Preto"], sizes: ["38", "40", "42", "44", "46"], basePrice: 129.90, sizePriceModifier: { "38": 0, "40": 0, "42": 10, "44": 15, "46": 20 }, description: "Bermuda chino em sarja com caimento reto. Elegância no verão.", rating: 4.5, reviews: 178, image: unsplashImg("photo-1565084888279-aca607ecce0c") },
  { id: 14, name: "Bermuda Moletom Comfort", category: "Bermudas", brand: "Volt", colors: ["Cinza", "Preto", "Azul Marinho"], sizes: ["P", "M", "G", "GG"], basePrice: 99.90, sizePriceModifier: { P: 0, M: 0, G: 10, GG: 15 }, description: "Moletom leve com bolsos laterais. Máximo conforto.", rating: 4.3, reviews: 112, image: unsplashImg("photo-1591195853828-11db59a44f6b") },
  { id: 15, name: "Short Esportivo Running", category: "Bermudas", brand: "Apex", colors: ["Preto", "Azul", "Cinza"], sizes: ["P", "M", "G", "GG"], basePrice: 89.90, sizePriceModifier: { P: 0, M: 0, G: 5, GG: 10 }, description: "Short com forro interno e tecido ultra leve para corrida.", rating: 4.6, reviews: 245, image: unsplashImg("photo-1562886877-aaaa5c16396e") },
  { id: 16, name: "Bermuda Jeans Classic", category: "Bermudas", brand: "Heritage", colors: ["Azul Escuro", "Azul Claro"], sizes: ["38", "40", "42", "44"], basePrice: 149.90, sizePriceModifier: { "38": 0, "40": 0, "42": 10, "44": 15 }, description: "Bermuda jeans de corte clássico com lavagem premium.", rating: 4.4, reviews: 87, image: unsplashImg("photo-1560243563-062bfc001d68") },
  // Moletons
  { id: 17, name: "Moletom Canguru Essential", category: "Moletons", brand: "Urban Co", colors: ["Preto", "Cinza", "Azul Marinho"], sizes: ["P", "M", "G", "GG", "XG"], basePrice: 189.90, sizePriceModifier: { P: 0, M: 0, G: 10, GG: 20, XG: 30 }, description: "Moletom canguru com capuz em fleece macio. Essencial no inverno.", rating: 4.7, reviews: 289, image: unsplashImg("photo-1556821840-3a63f95609a7") },
  { id: 18, name: "Moletom Zip Minimal", category: "Moletons", brand: "Heritage", colors: ["Preto", "Cinza Mescla", "Azul Escuro"], sizes: ["P", "M", "G", "GG"], basePrice: 219.90, sizePriceModifier: { P: 0, M: 0, G: 15, GG: 25 }, description: "Moletom com zíper e design minimalista. Acabamento premium.", rating: 4.8, reviews: 134, image: unsplashImg("photo-1578768079470-5a93894a5c2c") },
  { id: 19, name: "Moletom Oversized Street", category: "Moletons", brand: "Volt", colors: ["Preto", "Off-White", "Cinza"], sizes: ["M", "G", "GG", "XG"], basePrice: 199.90, sizePriceModifier: { M: 0, G: 0, GG: 15, XG: 20 }, description: "Oversized com estampa minimalista nas costas. Tendência urbana.", rating: 4.5, reviews: 76, image: unsplashImg("photo-1614975059251-992f11792571") },
  { id: 20, name: "Moletom Crew Neck Classic", category: "Moletons", brand: "Apex", colors: ["Cinza", "Preto", "Bordô"], sizes: ["P", "M", "G", "GG"], basePrice: 169.90, sizePriceModifier: { P: 0, M: 0, G: 10, GG: 20 }, description: "Crew neck clássico em algodão pesado. Atemporal e versátil.", rating: 4.6, reviews: 198, image: unsplashImg("photo-1609873814058-a8928924184a") },
];

export const categories = ["Camisetas", "Calças", "Jaquetas", "Bermudas", "Moletons"];
export const brands = ["Urban Co", "Heritage", "Volt", "Apex"];
export const allColors = ["Preto", "Branco", "Azul Marinho", "Cinza", "Azul", "Azul Escuro", "Azul Claro", "Bege", "Verde", "Verde Militar", "Bordô", "Off-White", "Cinza Mescla", "Cinza Grafite", "Azul Médio", "Azul Royal"];
