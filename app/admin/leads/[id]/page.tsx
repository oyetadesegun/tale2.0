"use client";
import { notFound } from "next/navigation";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ArrowLeft, User, Mail, Phone, MapPin, Heart, ClipboardCheck } from "lucide-react";
import Link from "next/link";
import { useEffect, useState, use as useReact } from "react";

interface Lead {
  id: string;
  name: string;
  email: string;
  phone: string;
  recipientName: string;
  recipientLocation: string;
  relationshipType: string;
  createdAt: string;
  responses: {
    id: string;
    results: string;
    answers: {
      selectedStyles: any;
      freeText: any;
      id: string;
      question: {
        id: string;
        question: string;
        order: number;
      };
      // score: number;
    }[];
  }[];
}

export default function LeadDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = useReact(params);
  const [lead, setLead] = useState<Lead | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    const fetchLead = async () => {
      try {
        const response = await fetch(`/api/leads/${id}`);
        if (!response.ok) {
          if (response.status === 404) {
            setError(true);
          }
          throw new Error("Failed to fetch lead");
        }
        const data = await response.json();
        setLead(data);
      } catch (err) {
        console.error(err);
        setError(true);
      } finally {
        setLoading(false);
      }
    };
    fetchLead();
  }, [id]);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
      </div>
    );
  }

  if (error || !lead) {
    notFound();
  }

  const response = lead.responses[0];
  const topStyles = response?.results.split(",") || [];

  return (
    <div className="space-y-6 max-w-5xl mx-auto">
      <div className="flex items-center gap-4">
        <Link href="/admin/leads">
          <Button variant="outline" size="icon">
            <ArrowLeft className="h-4 w-4" />
          </Button>
        </Link>
        <h1 className="text-3xl font-bold font-serif">Lead Details</h1>
      </div>

      <div className="grid gap-6 md:grid-cols-3">
        {/* Profile Card */}
        <Card className="md:col-span-1">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <User className="h-5 w-5 text-primary" />
              Basic Info
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-1">
              <p className="text-xs font-semibold uppercase text-muted-foreground">Name</p>
              <p className="font-medium">{lead.name}</p>
            </div>
            <div className="space-y-1">
              <p className="text-xs font-semibold uppercase text-muted-foreground">Email</p>
              <div className="flex items-center gap-2">
                <Mail className="h-4 w-4 text-muted-foreground" />
                <p className="text-sm">{lead.email}</p>
              </div>
            </div>
            <div className="space-y-1">
              <p className="text-xs font-semibold uppercase text-muted-foreground">Phone</p>
              <div className="flex items-center gap-2">
                <Phone className="h-4 w-4 text-muted-foreground" />
                <p className="text-sm">{lead.phone}</p>
              </div>
            </div>
            <hr className="border-border" />
            <div className="space-y-1">
              <p className="text-xs font-semibold uppercase text-muted-foreground">Recipient</p>
              <div className="flex items-center gap-2">
                <Heart className="h-4 w-4 text-primary fill-primary" />
                <p className="text-sm font-medium">{lead.recipientName}</p>
              </div>
              <p className="text-xs text-muted-foreground ml-6">Relationship: {lead.relationshipType}</p>
            </div>
            <div className="space-y-1">
              <p className="text-xs font-semibold uppercase text-muted-foreground">Location</p>
              <div className="flex items-center gap-2">
                <MapPin className="h-4 w-4 text-muted-foreground" />
                <p className="text-sm">{lead.recipientLocation}</p>
              </div>
            </div>
            <div className="pt-4">
              <p className="text-xs text-muted-foreground">
                Captured on: {new Date(lead.createdAt).toLocaleString()}
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Quiz Results Card */}
        <Card className="md:col-span-2">
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="flex items-center gap-2">
                <ClipboardCheck className="h-5 w-5 text-primary" />
                Quiz Performance
              </CardTitle>
              {response ? (
                <Badge className="bg-green-500">Completed</Badge>
              ) : (
                <Badge variant="secondary">Incomplete</Badge>
              )}
            </div>
          </CardHeader>
          <CardContent className="space-y-6">
            {response && (
              <>
                <div className="space-y-2">
                  <p className="text-sm font-semibold uppercase text-muted-foreground">Calculated Love Styles</p>
                  <div className="flex flex-wrap gap-2">
                    {topStyles.map((style) => (
                      <Badge key={style} className="px-3 py-1 text-sm bg-primary/10 text-primary border-primary/20 hover:bg-primary/20">
                        {style}
                      </Badge>
                    ))}
                  </div>
                </div>

                <div className="space-y-4 pt-4">
                  <p className="text-sm font-semibold uppercase text-muted-foreground border-b pb-2">Questions & Answers</p>
                  {response.answers
                    .sort((a, b) => (a.question?.order || 0) - (b.question?.order || 0))
                    .map((answer, index) => (
                    <div key={answer.id} className="space-y-2 pb-4 border-b border-border last:border-0 border-dashed">
                      <div className="flex items-start gap-3">
                        <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-secondary text-xs font-bold">
                          {index + 1}
                        </span>
                        <div className="space-y-1">
                          <p className="text-sm font-medium leading-tight">
                            {answer.question?.question.replace(/\{name\}/g, lead.recipientName) || "Question deleted"}
                          </p>
                          <div className="flex flex-wrap gap-1 mt-2">
                            {answer.selectedStyles ? (
                              answer.selectedStyles.split(",").map((s : any) => (
                                <Badge key={s} variant="outline" className="text-[10px] bg-secondary/30">
                                  {s}
                                </Badge>
                              ))
                            ) : answer.freeText ? (
                              <p className="text-sm italic font-serif bg-secondary/20 p-3 rounded-md border-l-2 border-primary w-full">
                                "{answer.freeText}"
                              </p>
                            ) : (
                              <p className="text-sm text-muted-foreground italic">No answer provided</p>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </>
            )}
            {!response && (
              <div className="flex flex-col items-center justify-center py-12 text-center space-y-2">
                <ClipboardCheck className="h-12 w-12 text-muted-foreground opacity-20" />
                <p className="text-muted-foreground">This user hasn't completed the quiz yet.</p>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
