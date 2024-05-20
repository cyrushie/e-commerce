import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs));
}

export const links = [
    {
        label: "admin",
        href: "/admin"
    },
    {
        label: "products",
        href: "/admin/products"
    },
    {
        label: "customer",
        href: "/admin/customer"
    },
    {
        label: "sales",
        href: "/admin/sales"
    }
];

const currencyFormatter = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD"
});

export const formatCurrency = (data: number) => {
    return currencyFormatter.format(data);
};
