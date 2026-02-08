import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function GET() {
  try {
    const questions = await prisma.quizQuestion.findMany({
      orderBy: { order: "asc" },
      include: { options: { orderBy: { order: "asc" } } },
    });
    return NextResponse.json(questions);
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to fetch quiz content" },
      { status: 500 },
    );
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const {
      question,
      section,
      order,
      type,
      maxSelect,
      isRequired,
      contextHint,
      options,
    } = body;

    const newQuestion = await prisma.quizQuestion.create({
      data: {
        question,
        section,
        order: parseInt(order),
        type,
        type,
        maxSelect: parseInt(maxSelect),
        isRequired,
        contextHint: JSON.stringify(contextHint),
        options: {
          create: options.map((opt: any, index: number) => ({
            label: opt.label,
            styles: opt.styles,
            order: index + 1,
          })),
        },
      },
      include: { options: true },
    });

    return NextResponse.json(newQuestion);
  } catch (error) {
    console.error("Error creating question:", error);
    return NextResponse.json(
      { error: "Failed to create question" },
      { status: 500 },
    );
  }
}

export async function PUT(request: Request) {
  try {
    const body = await request.json();
    const {
      id,
      question,
      section,
      order,
      type,
      maxSelect,
      isRequired,
      contextHint,
      options,
    } = body;

    const questionId = parseInt(id);

    // Update the question and its options in a transaction
    const updated = await prisma.$transaction(async (tx) => {
      // Delete existing options
      await tx.quizOption.deleteMany({
        where: { questionId: questionId },
      });

      // Update question and create new options
      return await tx.quizQuestion.update({
        where: { id: questionId },
        data: {
          question,
          section,
          order: parseInt(order),
          type,
          type,
          maxSelect: parseInt(maxSelect),
          isRequired,
          contextHint: JSON.stringify(contextHint),
          options: {
            create: options.map((opt: any, index: number) => ({
              label: opt.label,
              styles: opt.styles,
              order: index + 1,
            })),
          },
        },
        include: { options: true },
      });
    });

    return NextResponse.json(updated);
  } catch (error) {
    console.error("Error updating question:", error);
    return NextResponse.json(
      { error: "Failed to update question" },
      { status: 500 },
    );
  }
}

export async function DELETE(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get("id");

    if (!id) {
      return NextResponse.json({ error: "ID is required" }, { status: 400 });
    }

    await prisma.quizQuestion.delete({
      where: { id: parseInt(id) },
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Error deleting question:", error);
    return NextResponse.json(
      { error: "Failed to delete question" },
      { status: 500 },
    );
  }
}
