
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
console.log("seeding immo ..");
async function seed() {
    

    const difficulty = await prisma.difficulty.createMany({
        data: [
            {level: "easy"},
            {level: "medium"},
            {level: "difficult"},

        ]
    });

    const category = await prisma.category.createMany({
        data: [
            {name: "politics", opentdb_id: 1},
            {name: "science", opentdb_id: 2},
            {name: "history", opentdb_id: 3},
            
        ]
    });

    const type = await prisma.type.createMany({
        data: [
            {type: "open question"},
            {type: "closed question"},
            {type: "multiple choice"},
        ]
    });
    
}
seed()
  .catch(e => console.error(e))
  .finally(() => prisma.$disconnect());