"use client";

import { useEffect, useState, useCallback } from "react";
import { Heart, X, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

interface ExitPopupProps {
  onStartQuiz: () => void;
}

export function ExitPopup({ onStartQuiz }: ExitPopupProps) {
  const [show, setShow] = useState(false);
  const [dismissed, setDismissed] = useState(false);

  const handleMouseLeave = useCallback(
    (e: MouseEvent) => {
      if (e.clientY < 10 && !dismissed) {
        setShow(true);
      }
    },
    [dismissed]
  );

  useEffect(() => {
    document.addEventListener("mouseleave", handleMouseLeave);
    return () => document.removeEventListener("mouseleave", handleMouseLeave);
  }, [handleMouseLeave]);

  function handleDismiss() {
    setShow(false);
    setDismissed(true);
  }

  function handleStartQuiz() {
    setShow(false);
    setDismissed(true);
    onStartQuiz();
  }

  if (!show) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-foreground/50 p-4 backdrop-blur-sm">
      <div
        className="relative w-full max-w-md rounded-2xl border border-border bg-card p-8 shadow-2xl"
        style={{ animation: "scale-in 0.3s ease-out" }}
      >
        <button
          onClick={handleDismiss}
          className="absolute right-4 top-4 flex h-8 w-8 items-center justify-center rounded-full bg-muted text-muted-foreground transition-colors hover:bg-primary hover:text-primary-foreground"
          aria-label="Close popup"
        >
          <X className="h-4 w-4" />
        </button>

        <div className="text-center">
          <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-primary/10">
            <Heart className="h-8 w-8 fill-primary text-primary" />
          </div>

          <h3 className="mb-2 font-serif text-2xl font-bold text-foreground">
            {"Wait! Don't Leave Yet"}
          </h3>

          <p className="mb-6 text-sm leading-relaxed text-muted-foreground">
            Take the 2-min quiz to unlock personalized gift ideas for your partner this
            Valentine{"'s"} Day. It{"'s"} free and takes just 2 minutes!
          </p>

          <Button
            onClick={handleStartQuiz}
            size="lg"
            className="w-full gap-2 bg-primary text-primary-foreground hover:brightness-110"
            style={{ animation: "pulse-glow 2s ease-in-out infinite" }}
          >
            <Heart className="h-5 w-5" />
            Start the Quiz Now
            <ArrowRight className="h-5 w-5" />
          </Button>

          <button
            onClick={handleDismiss}
            className="mt-3 text-xs text-muted-foreground transition-colors hover:text-foreground"
          >
            No thanks, I already know what to get
          </button>
        </div>
      </div>
    </div>
  );
}
