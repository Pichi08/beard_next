"use client"

import { IoCartOutline } from "react-icons/io5";
import { GoPerson } from "react-icons/go";
import { CiLogout } from "react-icons/ci";
import Link from "next/link";
import { ActiveLink } from "../active-link/ActiveLink";
import { useLogout } from "@/hooks/auth/useLogout";
import { useRouter } from "next/navigation";
import { useCurrentUser } from "@/hooks/auth/userCurrentUser";

const navItems = [
  { name: "Inicio", path: "/home" },
  { name: "Productos", path: "/products" },
  { name: "Blogs", path: "/blogs" },
  // { name: "Contacto", path: "/contacto" },
];

export const Navbar = () => {

  const {logout} = useLogout();
  const router = useRouter();
  const { user: currentUser } = useCurrentUser();

  const isLogged = currentUser!= null;

  return (
    <header className="top-0 shadow-md flex items-center justify-between px-1 py-2 z-30 bg-white">
      {/* Logo y enlace a /home */}
      <h1 className="text-xl font-bold text-green-600  ml-10">
        <Link href="/home">
          Beard
        </Link>
      </h1>

      {/* Menú de navegación */}
      <nav className="flex items-center space-x-1"> {/* Reducido el espacio aquí */}
        {navItems.map((item) => (
          <ActiveLink key={item.path} {...item}/>
        ))}
      </nav>

      {/* Iconos de carrito y usuario */}
      <div className="flex items-center space-x-1 mr-10">
        <Link href="/user">
           <GoPerson className="h-6 w-6 text-gray-700 hover:text-green-500 transition-colors duration-200" />
        </Link>
        <Link href="/cart">
          <IoCartOutline className="h-6 w-6 text-gray-700 hover:text-green-500 transition-colors duration-200" />
        </Link>
        {isLogged && (<button 
          onClick={() => {
          logout();
          router.push("/login");
          }
                }>
          <CiLogout className="h-6 w-6 text-gray-700 hover:text-green-500 transition-colors duration-200" strokeWidth="0.5" />
        </button>)}
      </div>
    </header>
  );
};
