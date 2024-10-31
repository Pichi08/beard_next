import { HomeIcon } from "@primer/octicons-react";
import Link from "next/link";
import { ActiveLink } from "../active-link/ActiveLink";

const navItems = [
  {name:'About', path:'/about'},
  {name:'Contact', path:'/contact'},
//   {name:'Pricing', path:'/pricing'},
]

export const Navbar = () => {
  return (
    <nav className="flex bg-blue-800 bg-opacity-30 p-2 m-2  rounded">
        <Link href="/home" className="p-2 m-2 text-white">
          <HomeIcon className="mr-2" />
          <span>Home</span>
        </Link>
        <div className="flex flex-1"></div>

        {navItems.map(item => (
          <ActiveLink key={item.path} {...item} />
        ))}
    </nav>
  );
};
