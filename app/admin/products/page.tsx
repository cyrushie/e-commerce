import PageHeader from "../_components/page-header.tsx";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import ProductsTable from "../_components/products-table.tsx";

const AdminPrductsPage = () => {
    return (
        <div className="max-container">
            <div className=" flex justify-between items-center gap-4 mb-8">
                <PageHeader>Products</PageHeader>

                <Button asChild>
                    <Link href="/admin/products/new">Add Product</Link>
                </Button>
            </div>

            <ProductsTable />
        </div>
    );
};

export default AdminPrductsPage;
