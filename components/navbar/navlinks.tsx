"use client";

import { adminLinks, homeLinks } from "@/lib/utils";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { usePathname } from "next/navigation";

const NavLinks = ({ admin }: { admin: boolean }) => {
    const path = usePathname();

    const links = admin ? adminLinks : homeLinks

    return (
        <div className="flex space-x-4 ">
            {links.map(link => {
                return (
                    <Button
                        className=" capitalize "
                        variant={path === link.href ? "default" : "link"}
                        key={link.label}
                        asChild
                    >
                        <Link
                            className="text-foreground"
                            href={link.href}
                        >
                            {link.label}
                        </Link>
                    </Button>
                );
            })}
        </div>
    );
};

export default NavLinks;
