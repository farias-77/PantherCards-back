import { prisma } from "../../src/config/database";
import supertest from "supertest";

beforeEach(async () => {
    await prisma.$executeRaw`TRUNCATE TABLE deckResults;`;
    await prisma.$executeRaw`TRUNCATE TABLE deckQuestions;`;
    await prisma.$executeRaw`TRUNCATE TABLE decks;`;
    await prisma.$executeRaw`TRUNCATE TABLE users;`;
});

afterAll(async () => {
    await prisma.$disconnect();
});
