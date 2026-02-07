import prisma from "@/lib/prisma";

export async function GET(request: Request, { params }: { params: { id: string } }) {
  const lead = await prisma.lead.findUnique({
    where: { id: params.id },
    include: {
      responses: {
        include: {
          answers: {
            include: {
              question: true,
            },
          },
        },
      },
    },
  });
}