"use client";

import { links } from "@/lib/utils";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { usePathname } from "next/navigation";

const NavLinks = () => {
    const path = usePathname();

    return (
        <div className="flex space-x-4 ">
            {links.map(link => {
                return (
                    <Button
                        className=" capitalize "
                        variant={path === link.href ? "default" : "link"}
                        key={link.label}
                    >
                        <Link
                            className="text-foreground"
                            href={link.href}
                            asChild
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
