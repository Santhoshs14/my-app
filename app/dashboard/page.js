"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function Dashboard() {
    const [userData, setUserData] = useState(null);
    const router = useRouter();

    useEffect(() => {
        const fetchData = async () => {
            const response = await fetch("/api/user");
            if (response.ok) {
                const data = await response.json();
                setUserData(data);
            } else {
                router.push("/login");
            }
        };

        fetchData();
    }, []);

    const handleLogout = async () => {
        await fetch("/api/logout", { method: "POST" });
        router.push("/login");
    };

    if (!userData) return <p>Loading...</p>;

    return (
        <div className="max-w-md mx-auto mt-10 bg-white p-8 shadow-lg rounded-lg">
            <h1 className="text-3xl font-bold text-center text-green-600">Dashboard</h1>
            <div className="mt-6 space-y-4">
                <p>
                    <strong>Name:</strong> {userData.name}
                </p>
                <p>
                    <strong>Email:</strong> {userData.email}
                </p>
                <p>
                    <strong>Age:</strong> {userData.age}
                </p>
                <p>
                    <strong>Phone Number:</strong> {userData.number}
                </p>
            </div>
            <button
                onClick={handleLogout}
                className="w-full px-4 py-2 mt-6 text-white bg-red-500 rounded-md"
            >
                Logout
            </button>
        </div>
    );
}
