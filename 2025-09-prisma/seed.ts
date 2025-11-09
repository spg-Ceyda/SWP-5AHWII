import { PrismaClient }  from "./prisma/client/client.ts";

const prisma = new PrismaClient();

async function main() {

await prisma.question.deleteMany();
await prisma.answer.deleteMany();
await prisma.difficulty.deleteMany();
await prisma.category.deleteMany();
await prisma.type.deleteMany();

    await prisma.difficulty.createMany({
        data: [
            {level: "easy"},
            {level: "medium"},  
            {level: "difficult"},

        ]
    });

    await prisma.category.createMany({
        data: [
            {name: "politics", opentdb_id: 1},
            {name: "science", opentdb_id: 2},
            {name: "history", opentdb_id: 3},
            {name: "sports", opentdb_id: 4},
            {name: "maths", opentdb_id: 5},
            
        ]
    });

    await prisma.type.createMany({
        data: [
            {type: "open question"},
            {type: "closed question"},
            {type: "multiple choice"},
        ]
    });

    const easy = await prisma.difficulty.findFirst({ where: { level: "easy" } });
  const science = await prisma.category.findFirst({ where: { name: "science" } });
  const openType = await prisma.type.findFirst({ where: { type: "open question" } });

  const correct = await prisma.answer.create({ data: { answer: "Wasserstoff" } });
  const wrong1 = await prisma.answer.create({ data: { answer: "Helium" } });
  const wrong2 = await prisma.answer.create({ data: { answer: "Sauerstoff" } });

  await prisma.question.create({
    data: {
      question: "Welches ist das erste Element im Periodensystem?",
      difficultyId: easy!.id,
      categoryId: science!.id,
      typeId: openType!.id,
      correct_answer_id: correct.id,
      incorrect_answers: { connect: [{ id: wrong1.id }, { id: wrong2.id }] },
    },
  });
    
}
try {
    await main();
    console.log("Daten erfolgreich eingefügt.");
} catch (err) {
    console.error("Fehler beim Einfügen.", err);
} finally {
    await prisma.$disconnect();
}