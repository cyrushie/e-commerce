import Nav from "@/components/navbar/nav";

export const dynamic = 'force-dynamic'

export default function AdminLayout({
    children
}: {
    children: React.ReactNode;
}) {
    return (
        <div>
             <Nav>admin nav</Nav>
            {children}
        </div>
    );
}
