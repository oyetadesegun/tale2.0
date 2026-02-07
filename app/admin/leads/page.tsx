"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Eye, Search, ChevronLeft, ChevronRight, FileSpreadsheet, FileText, Trash2 } from "lucide-react";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";

export default function AdminLeads() {
  const [leads, setLeads] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [totalCount, setTotalCount] = useState(0);
  const pageSize = 10;

  const fetchLeads = async () => {
    setLoading(true);
    try {
      const response = await fetch(`/api/leads?page=${currentPage}&pageSize=${pageSize}&search=${search}`);
      const data = await response.json();
      setLeads(data.leads);
      setTotalPages(data.pagination.totalPages);
      setTotalCount(data.pagination.totalCount);
    } catch (error) {
      console.error("Failed to fetch leads:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      fetchLeads();
    }, 300);

    return () => clearTimeout(timer);
  }, [currentPage, search]);

  const handleExport = (type: 'csv' | 'excel') => {
    const endpoint = type === 'csv' ? '/api/admin/export/csv' : '/api/admin/export/excel';
    window.open(endpoint, '_blank');
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this lead?")) return;
    
    try {
      const response = await fetch(`/api/leads/${id}`, {
        method: 'DELETE',
      });
      
      if (response.ok) {
        toast.success("Lead deleted successfully");
        fetchLeads();
      } else {
        toast.error("Failed to delete lead");
      }
    } catch (error) {
      toast.error("An error occurred while deleting");
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold font-serif text-primary">Leads & Submissions</h1>
          <p className="text-muted-foreground mt-1">Manage and export your potential customer data.</p>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm" onClick={() => handleExport('csv')} className="gap-2">
            <FileText className="h-4 w-4" />
            CSV
          </Button>
          <Button variant="default" size="sm" onClick={() => handleExport('excel')} className="gap-2 bg-green-600 hover:bg-green-700 text-white border-none">
            <FileSpreadsheet className="h-4 w-4" />
            Excel
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="bg-primary/5 border-primary/10">
          <CardContent className="pt-6">
            <div className="text-2xl font-bold">{totalCount}</div>
            <p className="text-xs text-muted-foreground uppercase tracking-wider font-semibold">Total Leads</p>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle>All Leads</CardTitle>
          <div className="relative w-full max-w-sm">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search by name, email or phone..."
              className="pl-8"
              value={search}
              onChange={(e) => {
                setSearch(e.target.value);
                setCurrentPage(1); // Reset to first page on search
              }}
            />
          </div>
        </CardHeader>
        <CardContent>
          {loading ? (
            <div className="py-24 text-center text-muted-foreground">Loading leads...</div>
          ) : leads.length === 0 ? (
            <div className="py-24 text-center text-muted-foreground">No leads found.</div>
          ) : (
            <>
              <div className="rounded-md border">
                <Table>
                  <TableHeader>
                    <TableRow className="bg-muted/50">
                      <TableHead className="font-bold">Name</TableHead>
                      <TableHead className="font-bold">Contact Info</TableHead>
                      <TableHead className="font-bold">Recipient</TableHead>
                      <TableHead className="font-bold text-center">Status</TableHead>
                      <TableHead className="font-bold">Date</TableHead>
                      <TableHead className="text-right font-bold w-[120px]">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {leads.map((lead: any) => {
                      const completed = lead.responses.length > 0;
                      
                      return (
                        <TableRow key={lead.id} className="hover:bg-muted/30 transition-colors">
                          <TableCell className="font-medium">{lead.name}</TableCell>
                          <TableCell>
                            <div className="flex flex-col">
                              <span className="text-sm">{lead.email}</span>
                              <span className="text-xs text-muted-foreground">{lead.phone}</span>
                            </div>
                          </TableCell>
                          <TableCell>
                            <div className="flex flex-col">
                              <span>{lead.recipientName}</span>
                              <span className="text-xs text-primary/70">{lead.relationshipType}</span>
                            </div>
                          </TableCell>
                          <TableCell className="text-center">
                            {completed ? (
                              <Badge variant="default" className="bg-green-500 hover:bg-green-600 border-none">Completed</Badge>
                            ) : (
                              <Badge variant="secondary" className="bg-slate-200 text-slate-700 hover:bg-slate-300">Lead Only</Badge>
                            )}
                          </TableCell>
                          <TableCell className="text-xs text-muted-foreground whitespace-nowrap">
                            {new Date(lead.createdAt).toLocaleDateString(undefined, {
                              year: 'numeric',
                              month: 'short',
                              day: 'numeric'
                            })}
                          </TableCell>
                          <TableCell className="text-right">
                            <div className="flex justify-end gap-2">
                              <Link href={`/admin/leads/${lead.id}`}>
                                <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                                  <Eye className="h-4 w-4" />
                                  <span className="sr-only">View</span>
                                </Button>
                              </Link>
                              <Button 
                                variant="ghost" 
                                size="sm" 
                                className="h-8 w-8 p-0 text-destructive hover:text-destructive hover:bg-destructive/10"
                                onClick={() => handleDelete(lead.id)}
                              >
                                <Trash2 className="h-4 w-4" />
                                <span className="sr-only">Delete</span>
                              </Button>
                            </div>
                          </TableCell>
                        </TableRow>
                      );
                    })}
                  </TableBody>
                </Table>
              </div>
              
              <div className="flex items-center justify-between mt-4">
                <p className="text-sm text-muted-foreground">
                  Showing <span className="font-medium">{leads.length > 0 ? (currentPage - 1) * pageSize + 1 : 0}</span> to <span className="font-medium">{Math.min(currentPage * pageSize, totalCount)}</span> of <span className="font-medium">{totalCount}</span> leads
                </p>
                <div className="flex items-center gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                    disabled={currentPage === 1}
                  >
                    <ChevronLeft className="h-4 w-4 mr-1" /> Previous
                  </Button>
                  <div className="flex items-center gap-1">
                    {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                      <Button
                        key={page}
                        variant={currentPage === page ? "default" : "ghost"}
                        size="sm"
                        className="w-8"
                        onClick={() => setCurrentPage(page)}
                      >
                        {page}
                      </Button>
                    ))}
                  </div>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                    disabled={currentPage === totalPages}
                  >
                    Next <ChevronRight className="h-4 w-4 ml-1" />
                  </Button>
                </div>
              </div>
            </>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
