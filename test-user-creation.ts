import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

async function testUserCreation() {
  const email = `test-${Date.now()}@example.com`;
  const password = "password123";
  const name = "Test User";

  console.log("Starting user creation test...");
  console.log("Email:", email);

  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    console.log("Password hashed successfully.");

    const userCount = await prisma.user.count();
    console.log("Current user count:", userCount);

    const user = await prisma.user.create({
      data: {
        email,
        password: hashedPassword,
        name,
        role: userCount === 0 ? "admin" : "user",
      },
    });

    console.log("User created successfully:", JSON.stringify(user, null, 2));
  } catch (error) {
    console.error("User creation failed!");
    console.error(error);
  } finally {
    await prisma.$disconnect();
  }
}

testUserCreation();
