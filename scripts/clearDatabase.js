const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function clearDatabase() {
    try {
        // Delete all users
        await prisma.user.deleteMany();
        console.log("Database cleared successfully!");
    } catch (error) {
        console.error("Error clearing database:", error);
    } finally {
        await prisma.$disconnect();
    }
}

clearDatabase();
