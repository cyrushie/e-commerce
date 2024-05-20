import NavLinks from "@/components/navbar/navlinks";
import MobileLinks from "@/components/navbar/mobilelinks";

const Navbar = () => {
    return (
        <nav className="max-container flex justify-center items-center py-8 ">
            <div className="hidden md:block">
                <NavLinks />
            </div>
<div className="md:hidden">
    <MobileLinks />
</div>
        </nav>
    );
};

export default Navbar;
