"use client";

import { ClipboardList, Sparkles, Gift, ArrowDown } from "lucide-react";

const steps = [
  {
    icon: ClipboardList,
    number: "01",
    title: "Take the Quiz",
    description:
      "Answer 10 quick, fun questions about your loved one's preferences. It takes just 2 minutes.",
  },
  {
    icon: Sparkles,
    number: "02",
    title: "See Personalized Gift Ideas",
    description:
      "We reveal their top 2 Love Styles with curated, meaningful gift recommendations.",
  },
  {
    icon: Gift,
    number: "03",
    title: "Act Fast & Gift",
    description:
      "Choose from DIY, Done-With-You, or Done-For-You options and make this Valentine unforgettable.",
  },
];

export function HowItWorksSection() {
  return (
    <section className="bg-secondary/50 px-4 py-16 md:py-24">
      <div className="mx-auto max-w-5xl">
        <div className="mb-16 text-center">
          <span className="mb-3 inline-block rounded-full bg-card px-4 py-1 text-sm font-medium text-secondary-foreground">
            How It Works
          </span>
          <h2 className="font-serif text-3xl font-bold text-foreground md:text-4xl">
            <span className="text-balance">
              3 Simple Steps to the Perfect Valentine Gift
            </span>
          </h2>
        </div>

        <div className="flex flex-col items-center gap-4 md:flex-row md:items-start md:gap-6">
          {steps.map((step, index) => (
            <div key={step.number} className="flex flex-1 flex-col items-center">
              <div className="group flex w-full flex-col items-center rounded-2xl border border-border bg-card p-6 text-center shadow-sm transition-all hover:-translate-y-1 hover:shadow-lg md:p-8">
                <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-primary text-primary-foreground shadow-md">
                  <step.icon className="h-8 w-8" />
                </div>
                <span className="mb-2 text-sm font-bold text-accent">
                  Step {step.number}
                </span>
                <h3 className="mb-2 font-serif text-xl font-bold text-foreground">
                  {step.title}
                </h3>
                <p className="text-sm leading-relaxed text-muted-foreground">
                  {step.description}
                </p>
              </div>
              {index < steps.length - 1 && (
                <ArrowDown className="my-3 h-6 w-6 text-primary md:hidden" />
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
