"use client";

import { useCurrentUser } from "@/hooks/auth/useCurrentUser";
import { useLogout } from "@/hooks/auth/useLogout";
import { useRouter } from "next/navigation";

export default function ProfilePage(){
    const {user: currentUser} = useCurrentUser();
    const {logout} = useLogout();
    const router = useRouter();
    return (
        <div className="flex flex-col items-center justify-center w-full h-full" >
            <h1>Profile Page</h1>
            <div className="font-semibold text-lg mt-4">
                You are logged in as {currentUser?.name}
            </div> 
            <button 
                onClick={() => {
                    logout();
                    router.push("/login");
                    }
                }
                className="mt-2 border border-solid  border-white py-2 px-4">
                Logout
            </button>
        </div>
    );
}