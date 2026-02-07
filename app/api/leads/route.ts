import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const {
      name,
      email,
      phone,
      recipientName,
      recipientLocation,
      relationshipType,
    } = body;

    const lead = await prisma.lead.create({
      data: {
        name,
        email,
        phone,
        recipientName,
        recipientLocation,
        relationshipType,
      },
    });

    return NextResponse.json(lead);
  } catch (error) {
    console.error("Error creating lead:", error);
    return NextResponse.json(
      { error: "Failed to create lead" },
      { status: 500 },
    );
  }
}
