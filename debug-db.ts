import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  const questions = await prisma.quizQuestion.findMany({
    include: { options: true },
  });
  console.log("Total questions in DB:", questions.length);
  if (questions.length > 0) {
    console.log(
      "First question example:",
      JSON.stringify(questions[0], null, 2),
    );
  }
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect());
