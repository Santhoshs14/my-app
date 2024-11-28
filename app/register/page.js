"use client";

import { useState } from "react";
import Input from "../../components/Input";
import Button from "../../components/Button";
import { useRouter } from "next/navigation";

export default function Register() {
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        age: "",
        number: "",
        password: "",
        confirmPassword: "",
    });
    const router = useRouter();

    const validateEmail = (email) => {
        return /\S+@\S+\.\S+/.test(email);
    };

    const validatePassword = (password) => {
        return /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/.test(password);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Validate form data
        if (!formData.name || !formData.email || !formData.age || !formData.number || !formData.password) {
            alert("All fields are required.");
            return;
        }

        if (!formData.email.includes("@")) {
            alert("Invalid email address.");
            return;
        }

        if (formData.age < 18) {
            alert("You must be 18 or older to register.");
            return;
        }

        const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{8,}$/;
        if (!passwordRegex.test(formData.password)) {
            alert(
                "Password must be at least 8 characters long and include a mix of uppercase, lowercase, numbers, and special characters."
            );
            return;
        }

        try {
            // Submit the data
            const response = await fetch("/api/register", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(formData),
            });

            if (response.ok) {
                console.log("Registration successful");
                router.push("/login");
            } else {
                const errorData = await response.json();
                alert(errorData.error || "Failed to register");
            }
        } catch (err) {
            console.error("Error during registration:", err);
            alert("Something went wrong.");
        }
    };


    return (
        <div className="max-w-md mx-auto mt-10 bg-white p-8 shadow-lg rounded-lg">
            <h1 className="text-3xl font-bold text-center text-blue-600">Register</h1>
            <form onSubmit={handleSubmit}>
                <Input
                    label="Name"
                    type="text"
                    onChange={(e) =>
                        setFormData({ ...formData, name: e.target.value })
                    }
                />
                <Input
                    label="Email"
                    type="email"
                    onChange={(e) =>
                        setFormData({ ...formData, email: e.target.value })
                    }
                />
                <Input
                    label="Age"
                    type="number"
                    onChange={(e) =>
                        setFormData({ ...formData, age: e.target.value })
                    }
                />
                <Input
                    label="Phone Number"
                    type="tel"
                    onChange={(e) =>
                        setFormData({ ...formData, number: e.target.value })
                    }
                />
                <Input
                    label="Password"
                    type="password"
                    onChange={(e) =>
                        setFormData({ ...formData, password: e.target.value })
                    }
                />
                <Input
                    label="Confirm Password"
                    type="password"
                    onChange={(e) =>
                        setFormData({ ...formData, confirmPassword: e.target.value })
                    }
                />
                <Button label="Register" />
            </form>
            <p className="mt-4 text-center">
                Already have an account?{" "}
                <a href="/login" className="text-blue-600 underline">
                    Login
                </a>
            </p>
        </div>
    );
}
