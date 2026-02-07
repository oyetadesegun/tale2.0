"use client";

import React from "react";

import { useState } from "react";
import Image from "next/image";
import { Heart, ArrowRight, Sparkles, ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import type { RelationshipType } from "@/lib/quiz-data";

interface LeadData {
  id?: string;
  name: string;
  email: string;
  phone: string;
  recipientName: string;
  recipientLocation: string;
  relationshipType: RelationshipType;
}

interface HeroSectionProps {
  onStartQuiz: (data: LeadData) => void;
}

const relationshipOptions: RelationshipType[] = [
  "Romantic partner",
  "Friend",
  "Family member",
  "Myself",
];

export function HeroSection({ onStartQuiz }: HeroSectionProps) {
  const [formData, setFormData] = useState<LeadData>({
    name: "",
    email: "",
    phone: "",
    recipientName: "",
    recipientLocation: "",
    relationshipType: "Romantic partner",
  });
  const [errors, setErrors] = useState<Partial<Record<keyof LeadData, string>>>({});

  function validate(): boolean {
    const newErrors: Partial<Record<keyof LeadData, string>> = {};
    if (!formData.name.trim()) newErrors.name = "Your name is required";
    if (!formData.email.trim() || !/\S+@\S+\.\S+/.test(formData.email))
      newErrors.email = "Valid email is required";
    if (!formData.phone.trim()) newErrors.phone = "Phone number is required";
    if (formData.relationshipType !== "Myself" && !formData.recipientName.trim())
      newErrors.recipientName = "Their name is required";
    if (formData.relationshipType !== "Myself" && !formData.recipientLocation.trim())
      newErrors.recipientLocation = "Location is required";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (validate()) {
      const finalData = { ...formData };
      if (formData.relationshipType === "Myself") {
        finalData.recipientName = formData.name;
      }
      
      try {
        const response = await fetch("/api/leads", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(finalData),
        });
        
        if (response.ok) {
          const savedLead = await response.json();
          onStartQuiz(savedLead);
        } else {
          console.error("Failed to save lead");
          // Fallback to local state if API fails
          onStartQuiz(finalData);
        }
      } catch (error) {
        console.error("Error submitting lead:", error);
        onStartQuiz(finalData);
      }
    }
  }

  const isSelf = formData.relationshipType === "Myself";
  const recipientLabel = isSelf
    ? ""
    : formData.relationshipType === "Romantic partner"
      ? "Partner"
      : formData.relationshipType === "Friend"
        ? "Friend"
        : "Family Member";

  return (
    <section className="relative min-h-screen overflow-hidden">
      {/* Background image */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/images/hero-couple.jpg"
          alt="People exchanging thoughtful Valentine's gifts"
          fill
          className="object-cover opacity-15"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-b from-background/80 via-background/60 to-background" />
      </div>

      <div className="relative z-10 mx-auto flex max-w-6xl flex-col items-center gap-8 px-4 pb-16 pt-12 lg:flex-row lg:gap-12 lg:pb-24 lg:pt-20">
        {/* Left content */}
        <div className="flex-1 text-center lg:text-left">
          <div className="mb-4 inline-flex items-center gap-2 rounded-full bg-secondary px-4 py-2 text-sm font-medium text-secondary-foreground">
            <Heart className="h-4 w-4 fill-primary text-primary" />
            <span>TALE 2.0 Love Style Quiz</span>
          </div>

          <h1 className="mb-6 font-serif text-4xl font-bold leading-tight tracking-tight text-foreground md:text-5xl lg:text-6xl">
            <span className="text-balance">
              Figure Out the Perfect Gift for Your Loved One this Valentine{" "}
              <span className="text-primary">
                Without Guessing or Overspending
              </span>{" "}
              in Just 2 Minutes.
            </span>
          </h1>

          <div className="mb-6 flex flex-wrap items-center justify-center gap-6 text-sm text-muted-foreground lg:justify-start">
            <div className="flex items-center gap-2">
              <Sparkles className="h-4 w-4 text-accent" />
              <span>2-Minute Quiz</span>
            </div>
            <div className="flex items-center gap-2">
              <Heart className="h-4 w-4 text-primary" />
              <span>Personalized Results</span>
            </div>
            <div className="flex items-center gap-2">
              <ArrowRight className="h-4 w-4 text-accent" />
              <span>Gift Ideas Included</span>
            </div>
          </div>

          <p className="text-sm font-semibold text-primary">
            {"This Valentine, don't overthink or waste your money. Just intentional love that actually lands."}
          </p>
        </div>

        {/* Right form */}
        <div className="w-full max-w-md">
          <div
            className="rounded-2xl border border-border bg-card p-6 shadow-xl md:p-8"
            style={{ animation: "scale-in 0.5s ease-out" }}
          >
            <div className="mb-6 text-center">
              <h2 className="font-serif text-2xl font-bold text-foreground">
                Start Your Love Discovery
              </h2>
              <p className="mt-1 text-sm text-muted-foreground">
                Fill in the details to begin the quiz
              </p>
            </div>

            <form onSubmit={handleSubmit} className="flex flex-col gap-4">
              <div>
                <Label htmlFor="name" className="text-sm font-medium text-foreground">
                  Your Name
                </Label>
                <Input
                  id="name"
                  placeholder="e.g. John"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="mt-1 bg-background"
                />
                {errors.name && <p className="mt-1 text-xs text-destructive">{errors.name}</p>}
              </div>

              <div>
                <Label htmlFor="email" className="text-sm font-medium text-foreground">
                  Email Address
                </Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="john@example.com"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="mt-1 bg-background"
                />
                {errors.email && <p className="mt-1 text-xs text-destructive">{errors.email}</p>}
              </div>

              <div>
                <Label htmlFor="phone" className="text-sm font-medium text-foreground">
                  Phone Number
                </Label>
                <Input
                  id="phone"
                  type="tel"
                  placeholder="+234 800 000 0000"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  className="mt-1 bg-background"
                />
                {errors.phone && <p className="mt-1 text-xs text-destructive">{errors.phone}</p>}
              </div>

              {/* Relationship type dropdown */}
              <div>
                <Label htmlFor="relationshipType" className="text-sm font-medium text-foreground">
                  Who are you gifting?
                </Label>
                <div className="relative mt-1">
                  <select
                    id="relationshipType"
                    value={formData.relationshipType}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        relationshipType: e.target.value as RelationshipType,
                      })
                    }
                    className="h-10 w-full appearance-none rounded-md border border-input bg-background px-3 py-2 pr-10 text-sm text-foreground ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                  >
                    {relationshipOptions.map((option) => (
                      <option key={option} value={option}>
                        {option}
                      </option>
                    ))}
                  </select>
                  <ChevronDown className="pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                </div>
              </div>

              {/* Conditional fields - hide for "Myself" */}
              {!isSelf && (
                <>
                  <div>
                    <Label htmlFor="recipientName" className="text-sm font-medium text-foreground">
                      {`${recipientLabel}'s Name`}
                    </Label>
                    <Input
                      id="recipientName"
                      placeholder={`e.g. ${recipientLabel === "Partner" ? "Jane" : recipientLabel === "Friend" ? "Ada" : "Mum"}`}
                      value={formData.recipientName}
                      onChange={(e) =>
                        setFormData({ ...formData, recipientName: e.target.value })
                      }
                      className="mt-1 bg-background"
                    />
                    {errors.recipientName && (
                      <p className="mt-1 text-xs text-destructive">{errors.recipientName}</p>
                    )}
                  </div>

                  <div>
                    <Label htmlFor="recipientLocation" className="text-sm font-medium text-foreground">
                      {`${recipientLabel}'s Location`}
                    </Label>
                    <Input
                      id="recipientLocation"
                      placeholder="e.g. Lagos, Nigeria"
                      value={formData.recipientLocation}
                      onChange={(e) =>
                        setFormData({ ...formData, recipientLocation: e.target.value })
                      }
                      className="mt-1 bg-background"
                    />
                    {errors.recipientLocation && (
                      <p className="mt-1 text-xs text-destructive">{errors.recipientLocation}</p>
                    )}
                  </div>
                </>
              )}

              <Button
                type="submit"
                size="lg"
                className="mt-2 w-full bg-primary text-primary-foreground transition-all hover:brightness-110"
                style={{ animation: "pulse-glow 2s ease-in-out infinite" }}
              >
                <Heart className="mr-2 h-5 w-5" />
                Start the Quiz
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>

              <p className="text-center text-xs text-muted-foreground">
                Your data is secure. We never share your information.
              </p>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
