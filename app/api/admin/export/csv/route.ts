// app/api/admin/export/csv/route.ts
import { NextResponse } from 'next/server';
import prisma  from '@/lib/prisma';
import { stringify } from 'csv-stringify/sync';

export async function GET() {
  try {
    const leads = await prisma.lead.findMany({
      include: {
        responses: true,
      },
      orderBy: {
        createdAt: 'desc',
      },
    });

    // Format data for CSV
    const csvData = leads.map(lead => ({
      ID: lead.id,
      Name: lead.name,
      Email: lead.email,
      Phone: lead.phone,
      Recipient: lead.recipientName,
      Location: lead.recipientLocation,
      Relationship: lead.relationshipType,
      'Quiz Completed': lead.responses.length > 0 ? 'Yes' : 'No',
      'Created At': new Date(lead.createdAt).toLocaleString(),
    }));

    // Convert to CSV
    const csv = stringify(csvData, {
      header: true,
      columns: Object.keys(csvData[0] || {}),
    });

    // Return as downloadable file
    return new NextResponse(csv, {
      headers: {
        'Content-Type': 'text/csv',
        'Content-Disposition': 'attachment; filename="leads.csv"',
      },
    });
  } catch (error) {
    console.error('Export error:', error);
    return NextResponse.json(
      { error: 'Failed to export data' },
      { status: 500 }
    );
  }
}