import prisma from "@/lib/prisma";
import { notFound } from "next/navigation";
import { QuestionForm } from "@/components/admin/question-form";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";

export default async function EditQuestionPage({
  params,
}: {
  params: { id: string };
}) {
  const question = await prisma.quizQuestion.findUnique({
    where: { id: parseInt(params.id) },
    include: { options: true },
  });

  if (!question) {
    notFound();
  }

  return (
    <div className="space-y-6 max-w-5xl mx-auto">
      <div className="flex items-center gap-4">
        <Link href="/admin/quiz">
          <Button variant="outline" size="icon">
            <ArrowLeft className="h-4 w-4" />
          </Button>
        </Link>
        <h1 className="text-3xl font-bold font-serif">Edit Question #{question.order}</h1>
      </div>

      <QuestionForm initialData={question} />
    </div>
  );
}
