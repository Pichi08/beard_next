import { HomeIcon } from "@primer/octicons-react";
import Link from "next/link";
import { ActiveLink } from "../active-link/ActiveLink";

const navItems = [
  { name: "Inicio", path: "/home" },
  { name: "Productos", path: "/products" },
  { name: "Blogs", path: "/blogs" },
  { name: "Contacto", path: "/contacto" },
];

export const Navbar = () => {
  return (
    <header className="top-0 bg-opacity-0 shadow-md flex items-center justify-between px-1 py-2 z-30">
      {/* Logo y enlace a /home */}
      <h1 className="text-xl font-bold text-green-600">
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
      <div className="flex items-center space-x-1">
          <HomeIcon className="h-6 w-6 text-gray-700 hover:text-green-500 transition-colors duration-200" />
          <HomeIcon className="h-6 w-6 text-gray-700 hover:text-green-500 transition-colors duration-200" />
      </div>
    </header>
  );
};
