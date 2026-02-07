import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { leadId, responses, results } = body;

    const quizResponse = await prisma.quizResponse.create({
      data: {
        leadId,
        results: results.join(","),
        answers: {
          create: responses.map((r: any) => ({
            questionId: r.questionId,
            selectedStyles: r.selectedStyles.join(","),
            freeText: r.freeText || null,
          })),
        },
      },
    });

    return NextResponse.json(quizResponse);
  } catch (error) {
    console.error("Error capturing quiz response:", error);
    return NextResponse.json(
      { error: "Failed to capture quiz response" },
      { status: 500 },
    );
  }
}
