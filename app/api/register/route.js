import bcrypt from "bcrypt";
import { prisma } from "@/lib/prisma";

export async function POST(req) {
    try {
        // Parse the incoming JSON request
        const { name, email, age, number, password } = await req.json();

        // Validation
        if (!name || !email || !age || !number || !password) {
            return new Response(
                JSON.stringify({ error: "All fields are required." }),
                { status: 400 }
            );
        }

        // Validate email format
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            return new Response(
                JSON.stringify({ error: "Invalid email format." }),
                { status: 400 }
            );
        }

        // Validate age
        const parsedAge = parseInt(age);
        if (isNaN(parsedAge) || parsedAge < 18) {
            return new Response(
                JSON.stringify({ error: "Age must be 18 or older." }),
                { status: 400 }
            );
        }

        // Validate password strength
        const passwordRegex =
            /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{8,}$/;
        if (!passwordRegex.test(password)) {
            return new Response(
                JSON.stringify({
                    error:
                        "Password must be at least 8 characters long and include a mix of uppercase, lowercase, numbers, and special characters.",
                }),
                { status: 400 }
            );
        }

        // Check if email already exists
        const existingUser = await prisma.user.findUnique({
            where: { email },
        });
        if (existingUser) {
            return new Response(
                JSON.stringify({ error: "Email is already registered." }),
                { status: 400 }
            );
        }

        // Hash the password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Create a new user in the database
        const newUser = await prisma.user.create({
            data: {
                name,
                email,
                age: parsedAge,
                number,
                password: hashedPassword,
            },
        });

        // Respond with success
        return new Response(JSON.stringify(newUser), { status: 201 });
    } catch (error) {
        console.error("Error during registration:", error);
        return new Response(
            JSON.stringify({ error: "Internal Server Error." }),
            { status: 500 }
        );
    }
}
