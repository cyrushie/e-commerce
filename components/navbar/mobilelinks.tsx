"use client";

import { links } from "@/lib/utils";
import {
    Sheet,
    SheetTrigger,
    SheetContent,
    SheetFooter,
    SheetClose
} from "@/components/ui/sheet";
import { IoMenu } from "react-icons/io5";
import { Button } from "@/components/ui/button";
import { usePathname } from "next/navigation";
import Link from "next/link";

const MobileLinks = () => {
    const path = usePathname();

    return (
        <Sheet>
            <SheetTrigger asChild>
                <Button variant="outline" size="icon">
                    <IoMenu className="h-5 w-5" />
                </Button>
            </SheetTrigger>
            <SheetContent>
                <div
                    className="flex flex-col items-center justify-center mt-8
                space-y-4"
                >
                    {links.map(link => (
                        <SheetClose asChild key={link.label}>
                            <Button
                                className=" capitalize text-foreground "
                                variant={
                                    path === link.href ? "default" : "link"
                                }
                                asChild
                            >
                                <Link className="" href={link.href}>
                                    {link.label}
                                </Link>
                            </Button>
                        </SheetClose>
                    ))}
                </div>
            </SheetContent>
        </Sheet>
    );
};

export default MobileLinks;
