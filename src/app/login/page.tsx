"use client";

import { useLogin } from "@/hooks/auth/useLogin";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function LoginPage() {
    const [login, setLogin] = useState("");
    const [password, setPassword] = useState("");
    const router = useRouter();
    const { login: loginFunction } = useLogin();

    const onSubmit = async () => {
        console.log(login);
        console.log(password);
        if (login && password) {
            loginFunction(login, password)
                .then((res) => {
                    console.log(res);
                    router.push("/profile");
                })
                .catch((err) => {
                    alert("Invalid login or password");
                    setLogin("");
                    setPassword("");
                    console.log(err);
                });
        } else {
            alert("Please fill all fields");
        }
    };

    return (
        <div className="flex h-screen bg-white">
            {/* Imagen a la izquierda */}
            <div className="w-1/2 flex items-center justify-center">
                <img src="https://res.cloudinary.com/dapfvvlsy/image/upload/v1730695166/Group_1000005936_qruihs.png" alt="Login" className="w-full h-auto" />
            </div>
            {/* Formulario a la derecha */}
            <div className="w-1/2 flex flex-col items-center justify-center p-8">
                <h1 className="text-2xl font-bold mb-4 text-black">Iniciar Sesión</h1>
                <label className="mt-4 text-black"></label>
                <input
                    type="text"
                    placeholder="Correo"
                    value={login}
                    onChange={(e) => setLogin(e.target.value)}
                    className="w-80 border-b border-black text-black placeholder-gray-500 focus:outline-none focus:border-[#4CAF50] transition-colors"
                />

                <label className="mt-4 text-black"></label>
                <input
                    type="password"
                    placeholder="Contraseña"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-80 border-b border-black text-black placeholder-gray-500 focus:outline-none focus:border-[#4CAF50] transition-colors"
                />
             
                <button
                    onClick={onSubmit}
                    className="mt-4 p-2 bg-[#4CAF50] text-white rounded hover:bg-green-600 transition-all"
                >
                    Iniciar Sesión
                </button>
            </div>
        </div>
    );
}
