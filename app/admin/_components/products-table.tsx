import {
    Table,
    TableHeader,
    TableRow,
    TableHead,
    TableBody,
    TableCell
} from "@/components/ui/table";
import { db } from "@/lib/db";
import { formatCurrency } from "@/lib/utils";
import { FaRegCircleCheck } from "react-icons/fa6";
import { Badge } from "@/components/ui/badge";
import { DropdownMenu, DropdownMenuItem, DropdownMenuContent, DropdownMenuTrigger, DropdownMenuSeparator } from "@/components/ui/dropdown-menu";
import { FiXCircle } from "react-icons/fi";
import { FaEllipsisVertical } from "react-icons/fa6";
import Link from "next/link";
import AvailabilityToggleDropdownItem from "./availability-toggle-dropdown-item";
import DeleteDropdownItem from "./delete-dropdown-item";

interface ProductProps {
    id: string;
    name: string;
    priceInCents: number;
    isAvailableForPurchase: boolean;
    _count: {
        order: number;
    };
}

const ProductsTable = async () => {

    const products = await db.product.findMany({
        select: {
            id: true,
            name: true,
            priceInCents: true,
            isAvailableForPurchase: true,
            _count: { select: { order: true } }
        },
        orderBy: {
            name: "asc",
        },
    })

    if (products.length === 0) return <p className="mx-auto text-lg font-semibold text-center">No Products Available</p>

    return (
        <Table>
            <TableHeader>
                <TableRow>
                    <TableHead className="w-0">
                        <span className="sr-only">Available for Purchase</span>
                    </TableHead>
                    <TableHead>Name</TableHead>
                    <TableHead>Price</TableHead>
                    <TableHead>Orders</TableHead>
                    <TableHead className="w-0">
                        <span className="sr-only">Actions</span>
                    </TableHead>
                </TableRow>
            </TableHeader>

            <TableBody>
                {
                    products.map((product: ProductProps) => (
                        <TableRow key={product.id}>
                            <TableCell className="w-0">

                                <Badge variant={product.isAvailableForPurchase ? 'success' : 'destructive'}>
                                    {product.isAvailableForPurchase ?
                                        <>
                                            <FaRegCircleCheck />
                                            <span className="sr-only">Available</span>
                                        </>
                                        :
                                        <>
                                            <FiXCircle />
                                            <span className="sr-only">Unavailable</span>
                                        </>
                                    }
                                </Badge>
                            </TableCell>
                            <TableCell>{product.name}</TableCell>
                            <TableCell>{formatCurrency(product.priceInCents / 100)}</TableCell>
                            <TableCell>{product._count.order}</TableCell>
                            <TableCell className="w-0">
                                <DropdownMenu>
                                    <DropdownMenuTrigger >
                                        <span className="sr-only">Actions</span>
                                        <FaEllipsisVertical />
                                    </DropdownMenuTrigger>
                                    <DropdownMenuContent>
                                        <DropdownMenuItem asChild>
                                            <a download href={`/admin/products/${product.id}/download`}>Download</a>
                                        </DropdownMenuItem>
                                        <DropdownMenuItem asChild>
                                            <Link href={`/admin/products/${product.id}/edit`}>Edit</Link>
                                        </DropdownMenuItem>
                                        <AvailabilityToggleDropdownItem id={product.id} isAvailableForPurchase={product.isAvailableForPurchase} />
                                        <DropdownMenuSeparator />
                                        <DeleteDropdownItem id={product.id} disabled={!!product._count.order} />
                                    </DropdownMenuContent>
                                </DropdownMenu>
                            </TableCell>
                        </TableRow>
                    ))
                }
            </TableBody>
        </Table>
    );
};

export default ProductsTable;
