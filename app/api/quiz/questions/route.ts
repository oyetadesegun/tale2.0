import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const questions = await prisma.quizQuestion.findMany({
      orderBy: {
        order: "asc",
      },
      include: {
        options: {
          orderBy: {
            order: "asc",
          },
        },
      },
    });

    // Parse contextHint back to object
    const formattedQuestions = questions.map((q) => ({
      ...q,
      contextHint: JSON.parse(q.contextHint),
      options: q.options.map((o) => ({
        ...o,
        styles: o.styles.split(","),
      })),
    }));

    return NextResponse.json(formattedQuestions);
  } catch (error) {
    console.error("Error fetching quiz questions:", error);
    return NextResponse.json(
      { error: "Failed to fetch quiz questions" },
      { status: 500 },
    );
  }
}
