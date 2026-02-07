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
import type { LoveStyle, QuizAnswer, RelationshipType } from "@/lib/quiz-data";
// import { calculateResults } from "@/lib/quiz-data";

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
  const [topStyles, setTopStyles] = useState<LoveStyle[]>([]);
  const quizRef = useRef<HTMLDivElement>(null);

  const handleStartQuiz = useCallback((data: LeadData) => {
    setLeadData(data);
    setAppState("quiz");
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  const handleQuizComplete = useCallback((answers: QuizAnswer[], results: LoveStyle[]) => {
    setTopStyles(results);
    setAppState("results");
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  const handleRestart = useCallback(() => {
    setAppState("landing");
    setLeadData(null);
    setTopStyles([]);
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

      {appState === "quiz" && leadData  && (
     
        <div ref={quizRef}>
          <QuizSection
            leadId={leadData.id}
            userName={leadData.name}
            recipientName={leadData.recipientName}
            relationshipType={leadData.relationshipType}
            onComplete={handleQuizComplete}
          />
        </div>
      )}

      {appState === "results" && leadData && (
        <ResultsSection
          userName={leadData.name}
          partnerName={leadData.recipientName}
          topStyles={topStyles}
          onRestart={handleRestart}
        />
      )}

      <Footer />
    </main>
  );
}
