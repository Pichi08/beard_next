"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import  style from "./ActiveLink.module.css";

interface Props {
    path: string;
    name: string;
}

export const  ActiveLink = ({ path, name }: Props) => {
    const pathName = usePathname();
    console.log(pathName, path);
    return (
        <Link 
        className={`p-2 m-2 text-white ${style.link} ${pathName === path ? style.active : ""}`}
        href={path} prefetch={true}>{name}</Link>
    );
};