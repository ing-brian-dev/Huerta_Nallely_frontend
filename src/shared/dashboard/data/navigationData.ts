import { LayoutGrid, Sprout, ShoppingCart, Scissors, DollarSign, FlaskConical, Users, User, Truck, Apple } from "lucide-react";
import type { NavigationItem } from "../types";

export const navigation: NavigationItem[] = [
  { name: "Panel", href: "/dashboard", icon: LayoutGrid },
  { name: "Huertas", href: "/dashboard/orchards", icon: Sprout },
  { name: "Productos", href: "/dashboard/products", icon: Apple },
  { name: "Ventas", href: "/dashboard/sales", icon: ShoppingCart },
  { name: "Cosechas", href: "/dashboard/harvests", icon: Scissors },
  { name: "Gastos", href: "/dashboard/expenses", icon: DollarSign },
  { name: "Agroquimicos", href: "/dashboard/agrochemicals", icon: FlaskConical },
  { name: "Socios", href: "/dashboard/partners", icon: Users },
  { name: "Clientes", href: "/dashboard/customers", icon: User },
  { name: "Proveedores", href: "/dashboard/suppliers", icon: Truck },
];

export const ROUTE_TITLES: Record<string, string> = {
  dashboard: "Panel",
  orchards: "Huertas",
  products: "Productos",
  sales: "Ventas",
  harvests: "Cosechas",
  expenses: "Gastos",
  agrochemicals: "Agroquimicos",
  partners: "Socios",
  customers: "Clientes",
  suppliers: "Proveedores",
  profile: "Perfil",
};

export const ROUTE_DESCRIPTIONS: Record<string, string> = {
  dashboard: "Este es el resumen de Huerta Nayelly",
  orchards: "Administra tus huertas y parcelas",
  products: "Administra tus productos y sus variedades",
  sales: "Gestiona tus ventas y pedidos",
  harvests: "Registra y consulta tus cosechas",
  expenses: "Controla los gastos de la operación",
  agrochemicals: "Inventario y aplicaciones de agroquímicos",
  partners: "Administra a tus socios",
  customers: "Gestiona tu cartera de clientes",
  suppliers: "Gestiona tu proveedores",
  profile: "Gestiona tu perfil",
};