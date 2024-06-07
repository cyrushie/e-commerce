import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { FaEllipsisVertical } from "react-icons/fa6";
import PageHeader from "../_components/page-header";
import { db } from "@/lib/db";
import { formatCurrency } from "@/lib/utils";
import { DeleteDropDownItem } from "./_components/UserActions";

function getUsers() {
    return db.user.findMany({
        select: {
            id: true,
            email: true,
            order: { select: { priceInCents: true } },
        },
        orderBy: { createdAt: "desc" },
    })
}

export default function UsersPage() {
    return (
        <main className="max-container">
            <PageHeader>Customers</PageHeader>
            <UsersTable />
        </main>
    )
}

async function UsersTable() {
    const users = await getUsers()

    if (users.length === 0) return <p>No customers found</p>

    return (
        <Table>
            <TableHeader>
                <TableRow>
                    <TableHead>Email</TableHead>
                    <TableHead>Orders</TableHead>
                    <TableHead>Value</TableHead>
                    <TableHead className="w-0">
                        <span className="sr-only">Actions</span>
                    </TableHead>
                </TableRow>
            </TableHeader>
            <TableBody>
                {users.map((user: any) => (
                    <TableRow key={user.id}>
                        <TableCell>{user.email}</TableCell>
                        <TableCell>{user.order.length}</TableCell>
                        <TableCell>
                            {formatCurrency(
                                user.order.reduce((sum: any, o: any) => o.priceInCents + sum, 0) /
                                100
                            )}
                        </TableCell>
                        <TableCell className="text-center">
                            <DropdownMenu>
                                <DropdownMenuTrigger>
                                    <FaEllipsisVertical />
                                    <span className="sr-only">Actions</span>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent>
                                    <DeleteDropDownItem id={user.id} />
                                </DropdownMenuContent>
                            </DropdownMenu>
                        </TableCell>
                    </TableRow>
                ))}
            </TableBody>
        </Table>
    )
}