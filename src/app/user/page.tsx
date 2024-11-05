"use client";

import { useCurrentUser } from "@/hooks/auth/userCurrentUser";
import { Navbar } from "@/components/nav-bar/NavBar";
import Footer from "@/components/footer/Footer";
import { useRouter } from "next/navigation";
import { useProfile } from "@/hooks/profile/useProfile";
import { useEffect, useState } from "react";

export default function ProfilePage() {
    const router = useRouter();
    const { user: currentUser, isLoading: isUserLoading } = useCurrentUser(); // Assume useCurrentUser provides isLoading
    const { profileData } = useProfile();
    const [isProfileLoading, setIsProfileLoading] = useState(true);

    useEffect(() => {
        // Redirect to login only after confirming that the user isn't loading and is indeed null
        if (!isUserLoading && !currentUser) {
            router.push("/login");
        }
    }, [isUserLoading, currentUser, router]);

    useEffect(() => {
        if (profileData) {
            setIsProfileLoading(false);
        }
    }, [profileData]);

    if (isUserLoading || isProfileLoading) {
        return <div>Loading...</div>; // Optional loading spinner or message
    }

    const redirectToEdit = () => {
        // router.push("/edit-profile");
    };

    return (
        <div className="flex flex-col bg-gray-50 w-full min-h-screen">
            <Navbar />
            <div className="font-[sans-serif] p-8 mx-auto max-w-5xl">
                <h2 className="text-gray-800 text-3xl font-bold mb-6">My Account</h2>

                <div className="bg-white p-8 rounded-lg shadow-md mb-8">
                    <h3 className="text-gray-700 text-xl font-semibold mb-6">Personal Information</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {[
                            { label: "First Name", value: profileData?.name || "" },
                            { label: "Last Name", value: profileData?.lastname || "" },
                            { label: "Email", value: profileData?.email || "" },
                            { label: "Mobile No.", value: profileData?.phone || "" },
                        ].map((field, index) => (
                            <div key={index} className="p-4 bg-gray-100 rounded-md">
                                <label className="text-gray-600 text-sm font-medium">{field.label}</label>
                                <p className="text-gray-800 text-lg">{field.value}</p>
                            </div>
                        ))}
                    </div>
                    <div className="mt-6 flex justify-end">
                        <button 
                            type="button" 
                            onClick={redirectToEdit}
                            className="py-2 px-8 text-sm font-semibold tracking-wider rounded-md text-white bg-blue-500 hover:bg-blue-600 focus:outline-none transition-all"
                        >
                            Edit Profile
                        </button>
                    </div>
                </div>

                <div className="bg-white p-8 rounded-lg shadow-md mb-8">
                    <h3 className="text-gray-700 text-xl font-semibold mb-6">Order History</h3>
                    {/* {profileData.orderHistory?.length > 0 ? (
                        <ul className="divide-y divide-gray-200">
                            {profileData.orderHistory.map((order, index) => (
                                <li key={index} className="py-6 flex justify-between items-center">
                                    <div>
                                        <p className="text-gray-800 font-medium">Order #{order.id}</p>
                                        <p className="text-gray-600 text-sm">Placed on {order.date}</p>
                                    </div>
                                    <div>
                                        <p className="text-gray-800 font-medium">{order.total}</p>
                                        <p className={`text-sm ${order.status === 'Delivered' ? 'text-green-600' : 'text-yellow-600'}`}>{order.status}</p>
                                    </div>
                                </li>
                            ))}
                        </ul>
                    ) : ( */}
                        <p className="text-gray-600">You have no orders yet.</p>
                    {/* )} */}
                </div>
            </div>
            <Footer />
        </div>
    );
}
