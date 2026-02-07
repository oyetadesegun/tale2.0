// app/api/admin/export/excel/route.ts
import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import * as XLSX from "xlsx";

export async function GET() {
  try {
    const leads = await prisma.lead.findMany({
      include: {
        responses: true,
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    // Format data for Excel
    const data = leads.map((lead) => ({
      ID: lead.id,
      Name: lead.name,
      Email: lead.email,
      Phone: lead.phone,
      "Recipient Name": lead.recipientName,
      "Recipient Location": lead.recipientLocation,
      Relationship: lead.relationshipType,
      "Quiz Completed": lead.responses.length > 0 ? "Yes" : "No",
      Results: lead.responses.length > 0 ? lead.responses[0].results : "",
      "Created At": new Date(lead.createdAt).toLocaleString(),
    }));

    // Create workbook and worksheet
    const worksheet = XLSX.utils.json_to_sheet(data);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Leads");

    // Generate buffer
    const buffer = XLSX.write(workbook, { type: "buffer", bookType: "xlsx" });

    // Return as downloadable file
    return new NextResponse(buffer, {
      headers: {
        "Content-Type":
          "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
        "Content-Disposition": 'attachment; filename="leads.xlsx"',
      },
    });
  } catch (error) {
    console.error("Excel Export error:", error);
    return NextResponse.json(
      { error: "Failed to export Excel data" },
      { status: 500 },
    );
  }
}
