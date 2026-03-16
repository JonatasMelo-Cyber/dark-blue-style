import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { ShoppingCart, User, Menu, X } from "lucide-react";
import { useCart } from "@/contexts/CartContext";
import { useAuth } from "@/contexts/AuthContext";
import AuthModal from "./AuthModal";

const Navbar = () => {
  const { items } = useCart();
  const { user, logout } = useAuth();
  const location = useLocation();
  const [authOpen, setAuthOpen] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [showUserMenu, setShowUserMenu] = useState(false);

  const links = [
    { to: "/", label: "Home" },
    { to: "/catalogo", label: "Catálogo" },
    { to: "/ajuda", label: "Ajuda" },
  ];

  const isActive = (path: string) => location.pathname === path;

  return (
    <>
      <nav className="sticky top-0 z-50 bg-primary border-b border-navy-light/30">
        <div className="w-full px-6 md:px-10 h-16 flex items-center justify-between">
          <Link to="/" className="text-xl font-bold tracking-wider text-primary-foreground">
            Nobile
          </Link>

          {/* Desktop nav */}
          <div className="hidden md:flex items-center gap-8">
            {links.map((l) => (
              <Link
                key={l.to}
                to={l.to}
                className={`text-sm font-medium tracking-wide transition-colors ${
                  isActive(l.to) ? "text-accent" : "text-primary-foreground/70 hover:text-primary-foreground"
                }`}
              >
                {l.label.toUpperCase()}
              </Link>
            ))}
          </div>

          <div className="flex items-center gap-4">
            {/* User button */}
            <div className="relative">
              <button
                onClick={() => user ? setShowUserMenu(!showUserMenu) : setAuthOpen(true)}
                className="text-primary-foreground/70 hover:text-primary-foreground transition-colors relative"
              >
                <User size={20} />
                {user && (
                  <span className="absolute -top-1 -right-1 w-2 h-2 bg-accent rounded-full" />
                )}
              </button>
              {showUserMenu && user && (
                <div className="absolute right-0 top-10 bg-card border border-border rounded-lg shadow-lg p-4 min-w-[200px] animate-fade-in">
                  <p className="text-sm font-semibold text-foreground">{user.name}</p>
                  <p className="text-xs text-muted-foreground mb-3">{user.email}</p>
                  <button
                    onClick={() => { logout(); setShowUserMenu(false); }}
                    className="text-sm text-destructive hover:underline"
                  >
                    Sair
                  </button>
                </div>
              )}
            </div>

            {/* Cart */}
            <Link to="/carrinho" className="text-primary-foreground/70 hover:text-primary-foreground transition-colors relative">
              <ShoppingCart size={20} />
              {items.length > 0 && (
                <span className="absolute -top-2 -right-2 bg-accent text-accent-foreground text-xs w-5 h-5 rounded-full flex items-center justify-center font-bold">
                  {items.length}
                </span>
              )}
            </Link>

            {/* Mobile menu toggle */}
            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className="md:hidden text-primary-foreground/70"
            >
              {mobileOpen ? <X size={22} /> : <Menu size={22} />}
            </button>
          </div>
        </div>

        {/* Mobile nav */}
        {mobileOpen && (
          <div className="md:hidden bg-primary border-t border-navy-light/30 animate-fade-in">
            {links.map((l) => (
              <Link
                key={l.to}
                to={l.to}
                onClick={() => setMobileOpen(false)}
                className={`block px-6 py-3 text-sm font-medium ${
                  isActive(l.to) ? "text-accent" : "text-primary-foreground/70"
                }`}
              >
                {l.label}
              </Link>
            ))}
          </div>
        )}
      </nav>

      <AuthModal open={authOpen} onClose={() => setAuthOpen(false)} />
    </>
  );
};

export default Navbar;
