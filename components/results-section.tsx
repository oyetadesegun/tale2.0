"use client";

import { useEffect, useState } from "react";
import { Heart, Gift, MessageCircle, Package, Star, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Confetti } from "@/components/confetti";
import { CountdownTimer } from "@/components/countdown-timer";
import type { LoveStyle } from "@/lib/quiz-data";
import { loveStyleDetails } from "@/lib/quiz-data";

interface ResultsSectionProps {
  userName: string;
  partnerName: string;
  topStyles: LoveStyle[];
  onRestart: () => void;
}

export function ResultsSection({
  userName,
  partnerName,
  topStyles,
  onRestart,
}: ResultsSectionProps) {
  const [showConfetti, setShowConfetti] = useState(true);
  const [revealed, setRevealed] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setRevealed(true), 500);
    const confettiTimer = setTimeout(() => setShowConfetti(false), 5000);
    return () => {
      clearTimeout(timer);
      clearTimeout(confettiTimer);
    };
  }, []);

  return (
    <section className="min-h-screen px-4 py-12 md:py-20">
      {showConfetti && <Confetti />}

      <div className="mx-auto max-w-3xl">
        {/* Header */}
        <div className="mb-10 text-center" style={{ animation: "scale-in 0.6s ease-out" }}>
          <div className="mb-4 inline-flex items-center gap-2 rounded-full bg-primary/10 px-5 py-2 text-sm font-semibold text-primary">
            <Sparkles className="h-5 w-5" />
            Results Revealed
          </div>
          <h2 className="font-serif text-3xl font-bold text-foreground md:text-4xl lg:text-5xl">
            <span className="text-balance">
              {userName}, Here Are {partnerName}{"'s"} Top Love Styles
            </span>
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-lg leading-relaxed text-muted-foreground">
            Based on your answers, {partnerName} connects most deeply through these love styles.
            Use this to make this Valentine truly special.
          </p>
        </div>

        {/* Love Style Cards */}
        <div className="mb-12 flex flex-col gap-6">
          {topStyles.map((style, index) => {
            const info = loveStyleDetails[style];
            return (
              <div
                key={style}
                className={`overflow-hidden rounded-2xl border border-border bg-card shadow-lg transition-all ${
                  revealed ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"
                }`}
                style={{
                  transitionDelay: `${index * 300}ms`,
                  transitionDuration: "600ms",
                }}
              >
                <div
                  className="flex items-center gap-3 px-6 py-4"
                  style={{ backgroundColor: info.color + "15" }}
                >
                  <div
                    className="flex h-10 w-10 items-center justify-center rounded-full text-primary-foreground"
                    style={{ backgroundColor: info.color }}
                  >
                    <Heart className="h-5 w-5" />
                  </div>
                  <div>
                    <span className="text-xs font-bold uppercase tracking-wider text-muted-foreground">
                      {index === 0 ? "Primary Love Style" : "Secondary Love Style"}
                    </span>
                    <h3 className="font-serif text-xl font-bold text-foreground">
                      {info.name}
                    </h3>
                    <p className="text-xs text-muted-foreground">{info.tagline}</p>
                  </div>
                  <Star
                    className="ml-auto h-6 w-6"
                    style={{ color: info.color }}
                    fill={index === 0 ? info.color : "none"}
                  />
                </div>

                <div className="px-6 py-5">
                  <p className="mb-4 leading-relaxed text-muted-foreground">
                    {info.description}
                  </p>
                  <div className="mb-4 rounded-xl border border-primary/20 bg-primary/5 px-4 py-3">
                    <p className="text-sm font-medium italic text-foreground">
                      Your gift should say: {info.giftMessage}
                    </p>
                  </div>
                  <div>
                    <h4 className="mb-2 flex items-center gap-2 text-sm font-bold text-foreground">
                      <Gift className="h-4 w-4 text-accent" />
                      Gift Ideas for {partnerName}
                    </h4>
                    <ul className="flex flex-col gap-2">
                      {info.giftIdeas.map((idea) => (
                        <li
                          key={idea}
                          className="flex items-start gap-2 text-sm text-muted-foreground"
                        >
                          <Heart className="mt-0.5 h-3 w-3 shrink-0 fill-primary text-primary" />
                          {idea}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Countdown */}
        <div className="mb-10 rounded-2xl border border-border bg-card p-6 text-center shadow-lg md:p-8">
          <h3 className="mb-2 font-serif text-xl font-bold text-foreground">
            {"Valentine's Day is Coming!"}
          </h3>
          <p className="mb-6 text-sm text-muted-foreground">
            {"Don't wait — limited slots for personalized Valentine delivery"}
          </p>
          <CountdownTimer />
        </div>

        {/* CTA Buttons */}
        <div className="mb-10">
          <h3 className="mb-6 text-center font-serif text-2xl font-bold text-foreground">
            Choose Your Path to the Perfect Gift
          </h3>

          <div className="grid gap-4 md:grid-cols-3">
            {/* DIY */}
            <div className="flex flex-col rounded-2xl border border-border bg-card p-6 text-center shadow-sm transition-all hover:-translate-y-1 hover:shadow-lg">
              <div className="mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-full bg-secondary">
                <Gift className="h-6 w-6 text-secondary-foreground" />
              </div>
              <h4 className="mb-1 font-serif text-lg font-bold text-foreground">DIY Guide</h4>
              <p className="mb-4 flex-1 text-sm text-muted-foreground">
                Get a free personalized guide to craft the gift yourself
              </p>
              <a
                href={`https://wa.me/2349017691065?text=${encodeURIComponent(
                  `Hi, I just finished the quiz. My love style is ${loveStyleDetails[topStyles[0]].name}. I'm interested in the DIY Guide. My name is ${userName}.`
                )}`}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full"
              >
                <Button variant="outline" className="w-full gap-2 bg-transparent">
                  <Gift className="h-4 w-4" />
                  Get Free Guide
                </Button>
              </a>
            </div>

            {/* DWY */}
            <div className="flex flex-col rounded-2xl border-2 border-primary bg-card p-6 text-center shadow-lg transition-all hover:-translate-y-1 hover:shadow-xl">
              <div className="mx-auto mb-1 rounded-full bg-primary px-3 py-0.5 text-xs font-bold text-primary-foreground">
                Most Popular
              </div>
              <div className="mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
                <MessageCircle className="h-6 w-6 text-primary" />
              </div>
              <h4 className="mb-1 font-serif text-lg font-bold text-foreground">
                Done-With-You
              </h4>
              <p className="mb-4 flex-1 text-sm text-muted-foreground">
                Chat with our gift experts on WhatsApp for guided help
              </p>
              <a
                href={`https://wa.me/2349017691065?text=${encodeURIComponent(
                  `Hi, I just finished the quiz. My love style is ${loveStyleDetails[topStyles[0]].name}. I'm interested in the Done-With-You service. My name is ${userName}.`
                )}`}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full"
              >
                <Button className="w-full gap-2 bg-primary text-primary-foreground hover:brightness-110">
                  <MessageCircle className="h-4 w-4" />
                  Chat on WhatsApp
                </Button>
              </a>
            </div>

            {/* DFY */}
            <div className="flex flex-col rounded-2xl border border-border bg-card p-6 text-center shadow-sm transition-all hover:-translate-y-1 hover:shadow-lg">
              <div className="mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-full bg-accent/20">
                <Package className="h-6 w-6 text-accent-foreground" />
              </div>
              <h4 className="mb-1 font-serif text-lg font-bold text-foreground">
                Done-For-You
              </h4>
              <p className="mb-4 flex-1 text-sm text-muted-foreground">
                We handle everything — premium curated gift packages
              </p>
              <a
                href={`https://wa.me/2349017691065?text=${encodeURIComponent(
                  `Hi, I just finished the quiz. My love style is ${loveStyleDetails[topStyles[0]].name}. I'm interested in the Done-For-You packages. My name is ${userName}.`
                )}`}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full"
              >
                <Button variant="outline" className="w-full gap-2 border-accent text-accent-foreground hover:bg-accent/10 bg-transparent">
                  <Package className="h-4 w-4" />
                  View Packages
                </Button>
              </a>
            </div>
          </div>
        </div>

        {/* Bonus */}
        <div className="mb-10 rounded-2xl border border-accent/30 bg-accent/5 p-6 text-center md:p-8">
          <Sparkles className="mx-auto mb-3 h-8 w-8 text-accent" />
          <h3 className="mb-2 font-serif text-xl font-bold text-foreground">
            Bonus: TALE Special Reveal Note
          </h3>
          <p className="mx-auto max-w-md text-sm leading-relaxed text-muted-foreground">
            Every gift comes with a personalized TALE Reveal Note that explains {partnerName}{"'s"} love
            style to them in a beautiful, shareable format — plus exclusive delivery discounts this February.
          </p>
        </div>

        {/* Restart */}
        <div className="text-center">
          <Button variant="ghost" onClick={onRestart} className="text-muted-foreground hover:text-foreground">
            Take the quiz again
          </Button>
        </div>
      </div>
    </section>
  );
}
