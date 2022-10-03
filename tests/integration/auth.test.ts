import { prisma } from "../../src/config/database";
import { faker } from "@faker-js/faker";
import supertest from "supertest";
import app from "../../src/app";

beforeEach(async () => {
    await prisma.$executeRaw`TRUNCATE TABLE deckResults;`;
    await prisma.$executeRaw`TRUNCATE TABLE deckQuestions;`;
    await prisma.$executeRaw`TRUNCATE TABLE decks;`;
    await prisma.$executeRaw`TRUNCATE TABLE users;`;
});

afterAll(async () => {
    await prisma.$disconnect();
});

const server = supertest(app);

describe("Testa SignUp", () => {
    it("Testa com body correto -> deve retornar 201 e o usuário criado", async () => {
        const password = faker.internet.password();

        const user = {
            email: faker.internet.email(),
            username: faker.internet.userName(),
            password: password,
            confirmPassword: password,
        };

        const result = await server.post("/sign-up").send(user);

        expect(result.status).toBe(201);
        expect(result.body).toBeInstanceOf(Object);
    });
});
