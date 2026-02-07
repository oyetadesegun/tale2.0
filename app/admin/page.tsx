// import prisma  from "@/lib/prisma";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Users, ClipboardList, CheckCircle } from "lucide-react";
import { useEffect, useState } from "react";

export default function AdminDashboard() {
  const [totalLeads, setTotalLeads] = useState(0);
  const [totalResponses, setTotalResponses] = useState(0);
  
  useEffect(() => {
    const fetchLeads = async () => {
      const response = await fetch("/api/leads");
      const leads = await response.json();
      setTotalLeads(leads.length);
      setTotalResponses(leads.filter((lead: any) => lead.responses.length > 0).length);
    };
    fetchLeads();
  }, []);
  // Calculate completion rate
  const completionRate = totalLeads > 0 ? (totalResponses / totalLeads) * 100 : 0;

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold font-serif">Admin Overview</h1>
      
      <div className="grid gap-4 md:grid-cols-3">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Leads</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalLeads}</div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Quiz Completions</CardTitle>
            <ClipboardList className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalResponses}</div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Completion Rate</CardTitle>
            <CheckCircle className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{completionRate.toFixed(1)}%</div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Recent Activity</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-muted-foreground">
            Select a section from the sidebar to manage leads or the quiz content.
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
