"use client";

import { useEffect, useState } from "react";
import { Heart, Gift, MessageCircle, Package, Star, Sparkles, Truck, Clock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Confetti } from "@/components/confetti";
import { CountdownTimer } from "@/components/countdown-timer";
import type { LoveStyle, StyleScore } from "@/lib/quiz-data";
import { loveStyleDetails } from "@/lib/quiz-data";

interface ResultsSectionProps {
  userName: string;
  partnerName: string;
  styleScores: StyleScore[];
  onRestart: () => void;
}

export function ResultsSection({
  userName,
  partnerName,
  styleScores,
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

  const topStyles = styleScores.slice(0, 2);

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
              {userName}, Here Are {partnerName}{"'s"} Love Styles
            </span>
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-lg leading-relaxed text-muted-foreground">
            Based on your answers, here is how {partnerName} connects through each love style.
            The first two are their primary and secondary styles.
          </p>
        </div>

        {/* Top 2 Love Style Cards (Primary & Secondary) */}
        <div className="mb-8 flex flex-col gap-6">
          {topStyles.map((scoreItem, index) => {
            const info = loveStyleDetails[scoreItem.style];
            return (
              <div
                key={scoreItem.style}
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
                  <div className="flex-1">
                    <span className="text-xs font-bold uppercase tracking-wider text-muted-foreground">
                      {index === 0 ? "Primary Love Style" : "Secondary Love Style"}
                    </span>
                    <h3 className="font-serif text-xl font-bold text-foreground">
                      {info.name}
                    </h3>
                    <p className="text-xs text-muted-foreground">{info.tagline}</p>
                  </div>
                  <div className="flex flex-col items-center">
                    <span className="text-2xl font-bold" style={{ color: info.color }}>
                      {scoreItem.percentage}%
                    </span>
                    <Star
                      className="h-5 w-5"
                      style={{ color: info.color }}
                      fill={index === 0 ? info.color : "none"}
                    />
                  </div>
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

        {/* All Love Styles Breakdown */}
        <div
          className={`mb-12 rounded-2xl border border-border bg-card p-6 shadow-lg transition-all md:p-8 ${
            revealed ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"
          }`}
          style={{ transitionDelay: "800ms", transitionDuration: "600ms" }}
        >
          <h3 className="mb-2 text-center font-serif text-xl font-bold text-foreground">
            {partnerName}{"'s"} Full Love Style Breakdown
          </h3>
          <p className="mb-6 text-center text-sm text-muted-foreground">
            Here is how {partnerName} scores across all five love styles
          </p>
          <div className="flex flex-col gap-4">
            {styleScores.map((scoreItem, index) => {
              const info = loveStyleDetails[scoreItem.style];
              const isPrimaryOrSecondary = index < 2;
              return (
                <div key={scoreItem.style} className="flex flex-col gap-1.5">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div
                        className="h-3 w-3 rounded-full"
                        style={{ backgroundColor: info.color }}
                      />
                      <span className={`text-sm font-medium ${isPrimaryOrSecondary ? "text-foreground" : "text-muted-foreground"}`}>
                        {info.name}
                      </span>
                      {index === 0 && (
                        <span className="rounded-full bg-primary/10 px-2 py-0.5 text-xs font-bold text-primary">
                          Primary
                        </span>
                      )}
                      {index === 1 && (
                        <span className="rounded-full bg-accent/10 px-2 py-0.5 text-xs font-bold text-accent-foreground">
                          Secondary
                        </span>
                      )}
                    </div>
                    <span className={`text-sm font-bold ${isPrimaryOrSecondary ? "text-foreground" : "text-muted-foreground"}`}>
                      {scoreItem.percentage}%
                    </span>
                  </div>
                  <div className="h-3 overflow-hidden rounded-full bg-muted">
                    <div
                      className="h-full rounded-full transition-all duration-1000 ease-out"
                      style={{
                        width: revealed ? `${scoreItem.percentage}%` : "0%",
                        backgroundColor: info.color,
                        transitionDelay: `${1000 + index * 200}ms`,
                      }}
                    />
                  </div>
                  <p className="text-xs text-muted-foreground">{info.tagline}</p>
                </div>
              );
            })}
          </div>
        </div>

        {/* Countdown */}
        <div className="mb-10 rounded-2xl border border-border bg-card p-6 text-center shadow-lg md:p-8">
          <h3 className="mb-2 font-serif text-xl font-bold text-foreground">
            {"Valentine's Day is Coming!"}
          </h3>
          <p className="mb-6 text-sm text-muted-foreground">
            {"Don't wait \u2014 limited slots for personalized Valentine delivery"}
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
              <h4 className="mb-1 font-serif text-lg font-bold text-foreground">DIY</h4>
              <p className="mb-1 text-xs font-semibold text-primary">Self-Curated Love Experience</p>
              <p className="mb-4 flex-1 text-sm text-muted-foreground">
                Get a free personalized guide to craft the gift yourself
              </p>
              <a
                href={`https://wa.me/2349017691065?text=${encodeURIComponent(
                  `Hi TALE, my name is ${userName}. I just completed the quiz and found my partner’s top two love styles: ${loveStyleDetails[styleScores[0].style].name} and ${loveStyleDetails[styleScores[1].style].name}. I’d love to create something unforgettable with your DIY Love Experience.`
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

            {/* DWY - Most Popular (center) */}
            <div className="flex flex-col rounded-2xl border-2 border-primary bg-card p-6 text-center shadow-lg transition-all hover:-translate-y-1 hover:shadow-xl">
              <div className="mx-auto mb-1 rounded-full bg-primary px-3 py-0.5 text-xs font-bold text-primary-foreground">
                Most Popular
              </div>
              <div className="mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
                <MessageCircle className="h-6 w-6 text-primary" />
              </div>
              <h4 className="mb-1 font-serif text-lg font-bold text-foreground">
                DWY
              </h4>
              <p className="mb-1 text-xs font-semibold text-primary">Guided Love Experience</p>
              <p className="mb-4 flex-1 text-sm text-muted-foreground">
                Chat with our gift experts on WhatsApp for guided help
              </p>
              <a
                href={`https://wa.me/2349017691065?text=${encodeURIComponent(
                  `Hi TALE, my name is ${userName}. I just completed the quiz and found my partner’s top two love styles: ${loveStyleDetails[styleScores[0].style].name} and ${loveStyleDetails[styleScores[1].style].name}. I’d love your guidance to create something truly unforgettable for my partner this Valentine through your DWY: Guided Love Experience.`
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
                DFY
              </h4>
              <p className="mb-1 text-xs font-semibold text-primary">Ready Made Love Experience</p>
              <p className="mb-4 flex-1 text-sm text-muted-foreground">
                We handle everything — premium curated gift packages
              </p>
              <a
                href={`https://wa.me/2349017691065?text=${encodeURIComponent(
                  `Hi TALE, my name is ${userName}. I just completed the quiz and found my partner’s top two love styles: ${loveStyleDetails[styleScores[0].style].name} and ${loveStyleDetails[styleScores[1].style].name}. I’d love to have something unforgettable created for my partner through your DFY: Ready-Made Love Experience.`
                )}`}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full"
              >
                <Button variant="outline" className="w-full gap-2 bg-transparent">
                  <Package className="h-4 w-4" />
                  View Packages
                </Button>
              </a>
            </div>
          </div>
        </div>

        {/* Bonuses */}
        <div className="mb-10 rounded-2xl border border-accent/30 bg-accent/5 p-6 md:p-8">
          <div className="mb-4 text-center">
            <Sparkles className="mx-auto mb-3 h-8 w-8 text-accent" />
            <h3 className="font-serif text-xl font-bold uppercase tracking-wide text-foreground">
              Enjoy These Bonuses When You Curate Your Gift with TALE This Valentine
            </h3>
          </div>
          <div className="flex flex-col gap-4">
            <div className="flex items-start gap-3 rounded-xl border border-border bg-card p-4">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-primary/10">
                <Heart className="h-5 w-5 text-primary" />
              </div>
              <div>
                <h4 className="font-semibold text-foreground">TALE Special Reveal Note</h4>
                <p className="text-sm text-muted-foreground">
                  Every gift comes with a personalized TALE Reveal Note that explains {partnerName}{"'s"} love style to them in a beautiful, shareable format.
                </p>
              </div>
            </div>
            <div className="flex items-start gap-3 rounded-xl border border-border bg-card p-4">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-primary/10">
                <Truck className="h-5 w-5 text-primary" />
              </div>
              <div>
                <h4 className="font-semibold text-foreground">Exclusive Delivery Fee Discount</h4>
                <p className="text-sm text-muted-foreground">
                  Up to 50% off delivery fees for the first 5 orders.
                </p>
              </div>
            </div>
            <div className="flex items-start gap-3 rounded-xl border border-border bg-card p-4">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-primary/10">
                <Clock className="h-5 w-5 text-primary" />
              </div>
              <div>
                <h4 className="font-semibold text-foreground">Priority Delivery</h4>
                <p className="text-sm text-muted-foreground">
                  Priority delivery for the first 10 orders.
                </p>
              </div>
            </div>
          </div>
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
