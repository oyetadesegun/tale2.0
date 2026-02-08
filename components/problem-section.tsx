"use client";

import { ShoppingBag, Frown, Gift, Heart, Lightbulb, Smile } from "lucide-react";

const problems = [
  {
    icon: ShoppingBag,
    title: "Generic Gifts",
    description: "You wander through stores grabbing anything, hoping it sticks. It never does.",
  },
  {
    icon: Frown,
    title: "Missed Reactions",
    description: "That forced smile when they open your gift? You know the difference.",
  },
  {
    icon: Gift,
    title: "Wasted Money",
    description: "Expensive doesn't mean meaningful. You spend more but connect less.",
  },
];

const solutions = [
  {
    icon: Heart,
    title: "Know Their Love Style",
    description: "Understand exactly how your loved one receives love and what gifts resonate.",
  },
  {
    icon: Lightbulb,
    title: "Personalized Ideas",
    description: "Get curated gift suggestions based on their unique Love Style profile.",
  },
  {
    icon: Smile,
    title: "Genuine Joy",
    description: "Watch their face light up because you finally got it right.",
  },
];

export function ProblemSection() {
  return (
    <section className="relative px-4 py-16 md:py-24">
      <div className="mx-auto max-w-5xl">
        {/* Header */}
        <div className="mb-16 text-center">
          <span className="mb-3 inline-block rounded-full bg-secondary px-4 py-1 text-sm font-medium text-secondary-foreground">
            The Problem
          </span>
          <h2 className="font-serif text-3xl font-bold text-foreground md:text-4xl">
            <span className="text-balance">
              {"Valentine's Gifting Shouldn't Feel Like a Guessing Game"}
            </span>
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-lg leading-relaxed text-muted-foreground">
            {"Every year, many people stress over finding the \"perfect\" gift because they keep seeing and browsing 1001 gift ideas. Does this sound familiar to you?"}
          </p>
        </div>

        {/* Before / After */}
        <div className="grid gap-12 md:grid-cols-2">
          {/* Before */}
          <div className="rounded-2xl border border-destructive/20 bg-destructive/5 p-6 md:p-8">
            <h3 className="mb-6 flex items-center gap-2 font-serif text-xl font-bold text-destructive">
              <Frown className="h-6 w-6" />
              You before TALE
            </h3>
            <div className="flex flex-col gap-5">
              {problems.map((item) => (
                <div key={item.title} className="flex gap-4">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-destructive/10">
                    <item.icon className="h-5 w-5 text-destructive" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-foreground">{item.title}</h4>
                    <p className="mt-1 text-sm leading-relaxed text-muted-foreground">
                      {item.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* After */}
          <div className="rounded-2xl border border-primary/20 bg-primary/5 p-6 md:p-8">
            <h3 className="mb-6 flex items-center gap-2 font-serif text-xl font-bold text-primary">
              <Smile className="h-6 w-6" />
              You after TALE
            </h3>
            <div className="flex flex-col gap-5">
              {solutions.map((item) => (
                <div key={item.title} className="flex gap-4">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-primary/10">
                    <item.icon className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-foreground">{item.title}</h4>
                    <p className="mt-1 text-sm leading-relaxed text-muted-foreground">
                      {item.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
