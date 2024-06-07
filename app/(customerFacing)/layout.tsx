import Nav from "@/components/navbar/nav";

export const dynamic = "force-dynamic";

export default function HomeLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <div>
            <Nav />
            {children}
        </div>
    );
}
