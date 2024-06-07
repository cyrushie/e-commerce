import NavLinks from "@/components/navbar/navlinks";
import MobileLinks from "@/components/navbar/mobilelinks";

const Navbar = ({ admin = false }: { admin?: boolean }) => {
  return (
    <nav className="max-container flex justify-center items-center py-8 ">
      <div className="hidden md:block">
        <NavLinks admin={admin} />
      </div>
      <div className="md:hidden">
        <MobileLinks admin={admin} />
      </div>
    </nav>
  );
};

export default Navbar;
