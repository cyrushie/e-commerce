import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const adminLinks = [
  {
    label: "admin",
    href: "/admin",
  },
  {
    label: "products",
    href: "/admin/products",
  },
  {
    label: "customers",
    href: "/admin/users",
  },
  {
    label: "sales",
    href: "/admin/orders",
  },
];

export const homeLinks = [
  {
    label: "Home",
    href: "/",
  },
  {
    label: "products",
    href: "/products",
  },
  {
    label: "My Orders",
    href: "/orders",
  },
];

const currencyFormatter = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
});

export const formatCurrency = (data: number) => {
  return currencyFormatter.format(data);
};

export function wait(duration: number) {
  return new Promise((resolve) => setTimeout(resolve, duration));
}
