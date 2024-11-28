import { prisma } from "../../../lib/prisma";

export async function GET(req) {
    // Simulate user session logic here.
    const user = await prisma.user.findFirst(); // Replace with session-based user lookup.
    if (!user) {
        return new Response(null, { status: 401 });
    }
    return new Response(JSON.stringify(user));
}
