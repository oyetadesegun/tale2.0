import Link from "next/link";
import prisma from "@/lib/prisma";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { DeleteQuestionButton } from "@/components/admin/delete-question-button";
import { HelpCircle, ChevronRight, Plus, Pencil } from "lucide-react";

export default async function AdminQuiz() {
  const questions = await prisma.quizQuestion.findMany({
    orderBy: { order: "asc" },
    include: { options: { orderBy: { order: "asc" } } },
  });

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold font-serif">Quiz Management</h1>
        <Link href="/admin/quiz/new">
          <Button className="gap-2">
            <Plus className="h-4 w-4" />
            Add New Question
          </Button>
        </Link>
      </div>

      <div className="grid gap-4">
        {questions.map((q) => (
          <Card key={q.id}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <div className="flex items-center gap-2">
                <Badge variant="secondary">{q.section}</Badge>
                <CardTitle className="text-lg">Question #{q.order}</CardTitle>
              </div>
              <div className="flex items-center gap-2">
                <Link href={`/admin/quiz/${q.id}/edit`}>
                  <Button variant="ghost" size="icon">
                    <Pencil className="h-4 w-4" />
                  </Button>
                </Link>
                <DeleteQuestionButton id={q.id} />
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-base font-medium mb-4">{q.question}</p>
              
              <div className="space-y-2 mt-4 pt-4 border-t border-border">
                <p className="text-xs font-semibold uppercase text-muted-foreground mb-2">Options</p>
                {q.options.map((opt) => (
                  <div key={opt.id} className="flex items-start gap-2 text-sm bg-secondary/20 p-2 rounded-md">
                    <ChevronRight className="h-4 w-4 mt-0.5 text-primary shrink-0" />
                    <div className="flex-1">
                      <p>{opt.label}</p>
                      <div className="flex gap-1 mt-1">
                        {opt.styles.split(",").map((s) => (
                          <Badge key={s} variant="outline" className="text-[9px] py-0">{s}</Badge>
                        ))}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
