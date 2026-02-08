"use client";

import { useState, useRef, useCallback, useEffect } from "react";
import { FloatingHearts } from "@/components/floating-hearts";
import { HeroSection } from "@/components/hero-section";
import { ProblemSection } from "@/components/problem-section";
import { HowItWorksSection } from "@/components/how-it-works-section";
import { QuizSection } from "@/components/quiz-section";
import { ResultsSection } from "@/components/results-section";
import { Footer } from "@/components/footer";
import { ExitPopup } from "@/components/exit-popup";
import { calculateResults } from "@/lib/quiz-data";
import type { QuizAnswer, StyleScore, RelationshipType, QuizQuestion } from "@/lib/quiz-data";

type AppState = "landing" | "quiz" | "results";

interface LeadData {
  id?: string;
  name: string;
  email: string;
  phone: string;
  recipientName: string;
  recipientLocation: string;
  relationshipType: RelationshipType;
}

export default function Page() {
  const [appState, setAppState] = useState<AppState>("landing");
  const [leadData, setLeadData] = useState<LeadData | null>(null);
  const [styleScores, setStyleScores] = useState<StyleScore[]>([]);
  const [questions, setQuestions] = useState<QuizQuestion[]>([]);
  const quizRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    async function fetchQuestions() {
      try {
        const res = await fetch("/api/quiz/questions");
        if (res.ok) {
           const data = await res.json();
           if (Array.isArray(data)) {
             setQuestions(data);
           }
        }
      } catch (error) {
        console.error("Failed to fetch questions:", error);
      }
    }
    fetchQuestions();
  }, []);

  const handleStartQuiz = useCallback((data: LeadData) => {
    setLeadData(data);
    setAppState("quiz");
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  const handleQuizComplete = useCallback(async (answers: QuizAnswer[]) => {
    const results = calculateResults(answers);
    setStyleScores(results);

    // Save response if we have a lead ID
    if (leadData?.id) {
      try {
        await fetch("/api/quiz/responses", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            leadId: leadData.id,
            responses: answers,
            results: results.map(r => r.style),
          }),
        });
      } catch (error) {
        console.error("Failed to save quiz response:", error);
      }
    }

    setAppState("results");
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [leadData]);

  const handleRestart = useCallback(() => {
    setAppState("landing");
    setLeadData(null);
    setStyleScores([]);
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  const scrollToHero = useCallback(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  return (
    <main className="relative min-h-screen">
      <FloatingHearts />

      {appState === "landing" && (
        <>
          <HeroSection onStartQuiz={handleStartQuiz} />
          <ProblemSection />
          <HowItWorksSection />
          <ExitPopup onStartQuiz={scrollToHero} />
        </>
      )}

      {appState === "quiz" && leadData && (
        <div ref={quizRef}>
          <QuizSection
            userName={leadData.name}
            recipientName={leadData.recipientName}
            relationshipType={leadData.relationshipType}
            onComplete={handleQuizComplete}
            questions={questions.length > 0 ? questions : undefined}
          />
        </div>
      )}

      {appState === "results" && leadData && (
        <ResultsSection
          userName={leadData.name}
          partnerName={leadData.recipientName}
          styleScores={styleScores}
          onRestart={handleRestart}
        />
      )}

      <Footer />
    </main>
  );
}
