import bcrypt from "bcryptjs";
import { prisma } from "../../../lib/prisma";
import { NextResponse } from "next/server";

export async function POST(req) {
    const { email, password } = await req.json();

    const user = await prisma.user.findUnique({ where: { email } });

    if (!user || !(await bcrypt.compare(password, user.password))) {
        return new Response(JSON.stringify({ error: "Invalid credentials" }), {
            status: 401,
        });
    }

    // Here you'd set cookies/session; simplified for now.
    return NextResponse.json({ success: true });
}
