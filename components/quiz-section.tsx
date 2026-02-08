import { useState, useEffect } from "react";
import { ArrowLeft, ArrowRight, Heart, Check, Lightbulb, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import type { LoveStyle, QuizAnswer, RelationshipType } from "@/lib/quiz-data";
import { calculateResults } from "@/lib/quiz-data";

interface QuizSectionProps {
  leadId: string;
  userName: string;
  recipientName: string;
  relationshipType: RelationshipType;
  onComplete: (answers: QuizAnswer[], results: LoveStyle[]) => void;
}

export function QuizSection({
  leadId,
  userName,
  recipientName,
  relationshipType,
  onComplete,
}: QuizSectionProps) {
  const [questions, setQuestions] = useState<any[]>([]);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    async function fetchQuestions() {
      try {
        const response = await fetch("/api/quiz/questions");
        const data = await response.json();
        setQuestions(data);
        setAnswers(data.map((q: any) => ({ 
          questionId: q.id, 
          selectedStyles: [], 
          freeText: "", 
          _selectedIndices: [] 
        })));
        setLoading(false);
      } catch (error) {
        console.error("Error fetching questions:", error);
      }
    }
    fetchQuestions();
  }, []);

  if (loading || questions.length === 0) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  const question = questions[currentQuestion];
  const progress = ((currentQuestion + 1) / questions.length) * 100;
  const isLastQuestion = currentQuestion === questions.length - 1;
  const currentAnswer = answers[currentQuestion];

  // Section tracking
  const currentSection = question.section;
  const sectionStart = questions.findIndex((q) => q.section === currentSection);
  const questionInSection = currentQuestion - sectionStart + 1;
  const sectionTotal = questions.filter((q) => q.section === currentSection).length;

  // Personalize text: replace {name}, {them}, {their}, {they} placeholders
  function personalize(text: string): string {
    const isSelf = relationshipType === "Myself";
    return text
      .replace(/\{name\}/g, recipientName)
      .replace(/\{them\}/g, isSelf ? "you" : "them")
      .replace(/\{their\}/g, isSelf ? "your" : "their")
      .replace(/\{they\}/g, isSelf ? "you" : "they");
  }

  function handleToggleOption(optionIndex: number) {
    const option = question.options[optionIndex];
    const newAnswers = [...answers];

    if (question.maxSelect === 1) {
      newAnswers[currentQuestion] = {
        ...currentAnswer,
        selectedStyles: option.styles as LoveStyle[],
        _selectedIndices: [optionIndex],
      };
    } else {
      const selectedIndices: number[] = currentAnswer._selectedIndices || [];

      if (selectedIndices.includes(optionIndex)) {
        const newIndices = selectedIndices.filter((i) => i !== optionIndex);
        const newStyles = newIndices.flatMap((i) => question.options[i].styles);
        newAnswers[currentQuestion] = {
          ...currentAnswer,
          selectedStyles: newStyles as LoveStyle[],
          _selectedIndices: newIndices,
        };
      } else if (selectedIndices.length < question.maxSelect) {
        const newIndices = [...selectedIndices, optionIndex];
        const newStyles = newIndices.flatMap((i) => question.options[i].styles);
        newAnswers[currentQuestion] = {
          ...currentAnswer,
          selectedStyles: newStyles as LoveStyle[],
          _selectedIndices: newIndices,
        };
      }
    }

    setAnswers(newAnswers);
  }

  function handleFreeTextChange(text: string) {
    const newAnswers = [...answers];
    newAnswers[currentQuestion] = { ...currentAnswer, freeText: text };
    setAnswers(newAnswers);
  }

  function isOptionSelected(optionIndex: number): boolean {
    const indices: number[] = currentAnswer._selectedIndices || [];
    return indices.includes(optionIndex);
  }

  function canProceed(): boolean {
    // If not required, we can always proceed
    if (question.required === false) return true;

    // For free text, check if text exists
    if (question.type === "freetext") {
      return !!currentAnswer.freeText && currentAnswer.freeText.trim().length > 0;
    }

    // For choice, check if selection exists
    return currentAnswer.selectedStyles.length > 0;
  }

  async function handleNext() {
    if (!canProceed()) return;
    if (isLastQuestion) {
      setSubmitting(true);
      const results = calculateResults(answers);
      
      try {
        await fetch("/api/quiz/responses", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            leadId,
            responses: answers,
            results: results,
          }),
        });
      } catch (error) {
        console.error("Error saving quiz response:", error);
      } finally {
        onComplete(answers, results);
        setSubmitting(false);
      }
    } else {
      setCurrentQuestion(currentQuestion + 1);
    }
  }

  function handlePrevious() {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1);
    }
  }

  const personalizedQuestion = personalize(question.question);
  const contextHint = personalize(question.contextHint[relationshipType]);

  return (
    <section className="min-h-screen bg-secondary/30 px-4 py-12 md:py-20">
      <div className="mx-auto max-w-2xl">
        {/* Header */}
        <div className="mb-8 text-center">
          <div className="mb-2 inline-flex items-center gap-2 rounded-full bg-primary/10 px-4 py-1 text-sm font-medium text-primary">
            <Heart className="h-4 w-4 fill-primary" />
            <span>
              Question {currentQuestion + 1} of {questions.length}
            </span>
          </div>
          <p className="text-sm text-muted-foreground">
            {userName}, think about {recipientName} as you answer...
          </p>
        </div>

        {/* Progress bar */}
        <div className="mb-4 overflow-hidden rounded-full bg-muted">
          <div
            className="h-3 rounded-full bg-primary transition-all duration-500 ease-out"
            style={{ width: `${progress}%` }}
          />
        </div>

        {/* Section label */}
        <div className="mb-6 flex items-center justify-between text-xs font-semibold uppercase tracking-wider text-muted-foreground">
          <span className="rounded-full bg-muted px-3 py-1">
            {currentSection}
          </span>
          <span>
            {questionInSection} of {sectionTotal} in section
          </span>
        </div>

        {/* Question card */}
        <div
          className="rounded-2xl border border-border bg-card p-6 shadow-lg md:p-8"
          style={{ animation: "scale-in 0.3s ease-out" }}
          key={currentQuestion}
        >
          {/* Context hint — the imagination/scene-setter */}
          <div className="mb-5 flex gap-3 rounded-xl border border-accent/20 bg-accent/5 p-4">
            <Lightbulb className="mt-0.5 h-5 w-5 shrink-0 text-accent" />
            <p className="text-sm leading-relaxed text-muted-foreground italic">
              {contextHint}
            </p>
          </div>

          <h3 className="mb-2 font-serif text-xl font-bold leading-relaxed text-foreground md:text-2xl">
            {personalizedQuestion}
          </h3>

          {question.type === "choice" && question.maxSelect > 1 && (
            <p className="mb-5 text-sm text-muted-foreground">
              Choose up to {question.maxSelect}
            </p>
          )}
          {question.type === "choice" && question.maxSelect === 1 && (
            <p className="mb-5 text-sm text-muted-foreground">Choose one</p>
          )}

          {question.type === "choice" ? (
            <div className="flex flex-col gap-3">
              {question.options.map((option: any, index: number) => {
                const selected = isOptionSelected(index);
                return (
                  <button
                    key={option.label}
                    onClick={() => handleToggleOption(index)}
                    className={`flex w-full items-start gap-3 rounded-xl border-2 p-4 text-left transition-all ${
                      selected
                        ? "border-primary bg-primary/10 shadow-md"
                        : "border-border bg-background hover:border-primary/40 hover:bg-primary/5"
                    }`}
                  >
                    <span
                      className={`flex h-7 w-7 shrink-0 items-center justify-center rounded-full text-sm font-bold ${
                        selected
                          ? "bg-primary text-primary-foreground"
                          : "bg-muted text-muted-foreground"
                      }`}
                    >
                      {selected ? (
                        <Check className="h-4 w-4" />
                      ) : (
                        String.fromCharCode(65 + index)
                      )}
                    </span>
                    <span
                      className={`text-sm font-medium leading-relaxed md:text-base ${
                        selected ? "text-foreground" : "text-muted-foreground"
                      }`}
                    >
                      {option.label}
                    </span>
                  </button>
                );
              })}
            </div>
          ) : (
            <div className="mt-4">
              <Textarea
                placeholder={`Share anything extra about ${recipientName} that could help us suggest the perfect gift... (optional)`}
                value={currentAnswer.freeText || ""}
                onChange={(e) => handleFreeTextChange(e.target.value)}
                className="min-h-32 resize-none bg-background text-sm leading-relaxed"
              />
              <p className="mt-2 text-xs text-muted-foreground">
                This is optional but helps us personalize even further.
              </p>
            </div>
          )}
        </div>

        {/* Navigation */}
        <div className="mt-6 flex items-center justify-between">
          <Button
            variant="outline"
            onClick={handlePrevious}
            disabled={currentQuestion === 0}
            className="gap-2 bg-transparent"
          >
            <ArrowLeft className="h-4 w-4" />
            Back
          </Button>

          <span className="text-sm font-medium text-muted-foreground">
            {Math.round(progress)}% complete
          </span>

          <Button
            onClick={handleNext}
            disabled={!canProceed() || submitting}
            className="gap-2 bg-primary text-primary-foreground hover:brightness-110"
          >
            {submitting ? (
              <Loader2 className="h-4 w-4 animate-spin" />
            ) : isLastQuestion ? (
              "See Results"
            ) : (
              "Next"
            )}
            {!submitting && (isLastQuestion ? (
              <Heart className="h-4 w-4" />
            ) : (
              <ArrowRight className="h-4 w-4" />
            ))}
          </Button>
        </div>
      </div>
    </section>
  );
}
