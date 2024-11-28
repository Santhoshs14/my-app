"use client";

import { useState } from "react";
import Input from "../../components/Input";
import Button from "../../components/Button";
import { useRouter } from "next/navigation";

export default function Login() {
    const [formData, setFormData] = useState({
        email: "",
        password: "",
    });
    const router = useRouter();

    const handleSubmit = async (e) => {
        e.preventDefault();

        const response = await fetch("/api/login", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(formData),
        });

        if (response.ok) {
            router.push("/dashboard");
        } else {
            alert("Invalid login credentials.");
        }
    };

    return (
        <div className="max-w-md mx-auto mt-10">
            <h1 className="text-2xl font-bold">Login</h1>
            <form onSubmit={handleSubmit}>
                <Input
                    label="Email"
                    type="email"
                    onChange={(e) =>
                        setFormData({ ...formData, email: e.target.value })
                    }
                />
                <Input
                    label="Password"
                    type="password"
                    onChange={(e) =>
                        setFormData({ ...formData, password: e.target.value })
                    }
                />
                <Button label="Login" />
            </form>
            <p className="mt-4">
                Don’t have an account? <a href="/register">Register</a>
            </p>
        </div>
    );
}
