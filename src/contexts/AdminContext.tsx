import React, { createContext, useContext, useState, ReactNode } from "react";

export interface Employee {
  id: string;
  name: string;
  email: string;
  cpf: string;
  password: string;
  role: string;
  createdAt: string;
}

export interface Supplier {
  id: string;
  companyName: string;
  cnpj: string;
  productBrand: string;
  productName: string;
  category: string;
  price: number;
}

export interface Sale {
  id: string;
  customerName: string;
  items: { productName: string; quantity: number; price: number; size: string; color: string }[];
  total: number;
  paymentMethod: string;
  status: "Concluída" | "Pendente" | "Cancelada";
  date: string;
}

interface AdminContextType {
  isAdminLoggedIn: boolean;
  adminLogin: (email: string, password: string) => boolean;
  adminLogout: () => void;
  employees: Employee[];
  addEmployee: (emp: Omit<Employee, "id" | "createdAt">) => void;
  removeEmployee: (id: string) => void;
  sales: Sale[];
  suppliers: Supplier[];
  addSupplier: (s: Omit<Supplier, "id">) => void;
  removeSupplier: (id: string) => void;
}

const AdminContext = createContext<AdminContextType | undefined>(undefined);

const defaultSales: Sale[] = [
  { id: "V001", customerName: "Carlos Silva", items: [{ productName: "Camiseta Básica Premium", quantity: 2, price: 89.90, size: "M", color: "Preto" }], total: 179.80, paymentMethod: "Cartão", status: "Concluída", date: "2026-03-09" },
  { id: "V002", customerName: "Rafael Costa", items: [{ productName: "Calça Slim Fit", quantity: 1, price: 199.90, size: "G", color: "Azul Marinho" }], total: 209.90, paymentMethod: "PIX", status: "Concluída", date: "2026-03-08" },
  { id: "V003", customerName: "Lucas Mendes", items: [{ productName: "Jaqueta Bomber", quantity: 1, price: 349.90, size: "GG", color: "Preto" }], total: 364.90, paymentMethod: "Boleto", status: "Pendente", date: "2026-03-07" },
  { id: "V004", customerName: "André Oliveira", items: [{ productName: "Bermuda Cargo", quantity: 3, price: 129.90, size: "M", color: "Verde" }], total: 389.70, paymentMethod: "Cartão", status: "Concluída", date: "2026-03-06" },
  { id: "V005", customerName: "Felipe Santos", items: [{ productName: "Polo Clássica", quantity: 1, price: 149.90, size: "P", color: "Branco" }], total: 149.90, paymentMethod: "PIX", status: "Cancelada", date: "2026-03-05" },
  { id: "V006", customerName: "Gustavo Lima", items: [{ productName: "Moletom Oversized", quantity: 1, price: 219.90, size: "G", color: "Cinza" }], total: 229.90, paymentMethod: "Cartão", status: "Concluída", date: "2026-03-04" },
  { id: "V007", customerName: "Bruno Almeida", items: [{ productName: "Camisa Social Slim", quantity: 2, price: 179.90, size: "M", color: "Branco" }], total: 359.80, paymentMethod: "PIX", status: "Concluída", date: "2026-03-03" },
  { id: "V008", customerName: "Thiago Pereira", items: [{ productName: "Camiseta Estampada", quantity: 1, price: 99.90, size: "GG", color: "Preto" }], total: 114.90, paymentMethod: "Cartão", status: "Concluída", date: "2026-03-02" },
];

const defaultAdmin: Employee = {
  id: "ADM001",
  name: "Administrador",
  email: "admin@nobile.com",
  cpf: "000.000.000-00",
  password: "admin123",
  role: "Administrador",
  createdAt: "2026-01-01",
};

export const AdminProvider = ({ children }: { children: ReactNode }) => {
  const [isAdminLoggedIn, setIsAdminLoggedIn] = useState(() => {
    return localStorage.getItem("adminLoggedIn") === "true";
  });

  const [employees, setEmployees] = useState<Employee[]>(() => {
    const saved = localStorage.getItem("employees");
    return saved ? JSON.parse(saved) : [defaultAdmin];
  });

  const [sales] = useState<Sale[]>(() => {
    const saved = localStorage.getItem("sales");
    return saved ? JSON.parse(saved) : defaultSales;
  });

  const adminLogin = (email: string, password: string) => {
    const found = employees.find((e) => e.email === email && e.password === password);
    if (found) {
      setIsAdminLoggedIn(true);
      localStorage.setItem("adminLoggedIn", "true");
      return true;
    }
    return false;
  };

  const adminLogout = () => {
    setIsAdminLoggedIn(false);
    localStorage.removeItem("adminLoggedIn");
  };

  const addEmployee = (emp: Omit<Employee, "id" | "createdAt">) => {
    const newEmp: Employee = {
      ...emp,
      id: `EMP${String(employees.length + 1).padStart(3, "0")}`,
      createdAt: new Date().toISOString().split("T")[0],
    };
    const updated = [...employees, newEmp];
    setEmployees(updated);
    localStorage.setItem("employees", JSON.stringify(updated));
  };

  const removeEmployee = (id: string) => {
    if (id === "ADM001") return;
    const updated = employees.filter((e) => e.id !== id);
    setEmployees(updated);
    localStorage.setItem("employees", JSON.stringify(updated));
  };

  return (
    <AdminContext.Provider value={{ isAdminLoggedIn, adminLogin, adminLogout, employees, addEmployee, removeEmployee, sales }}>
      {children}
    </AdminContext.Provider>
  );
};

export const useAdmin = () => {
  const ctx = useContext(AdminContext);
  if (!ctx) throw new Error("useAdmin must be used within AdminProvider");
  return ctx;
};
