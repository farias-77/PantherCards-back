import { prisma } from "../../src/config/database";
import { faker } from "@faker-js/faker";
import supertest from "supertest";
import app from "../../src/app";

beforeEach(async () => {
    await prisma.$executeRaw`DELETE FROM "deckResults";`;
    await prisma.$executeRaw`DELETE FROM "deckQuestions";`;
    await prisma.$executeRaw`DELETE FROM decks;`;
    await prisma.$executeRaw`DELETE FROM users;`;
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

    it("Testa com pasword !== confirmPassword -> deve retornar 401", async () => {
        const user = {
            email: faker.internet.email(),
            username: faker.internet.userName(),
            password: "password",
            confirmPassword: "confirmPassword",
        };

        const result = await server.post("/sign-up").send(user);

        expect(result.status).toBe(401);
    });

    it("Testa com email repetido -> deve retornar 409", async () => {
        const password = faker.internet.password();
        const email = faker.internet.email();

        const user1 = {
            email,
            username: faker.internet.userName(),
            password: password,
            confirmPassword: password,
        };

        const user2 = {
            email,
            username: faker.internet.userName(),
            password: password,
            confirmPassword: password,
        };

        await server.post("/sign-up").send(user1);
        const result = await server.post("/sign-up").send(user2);

        expect(result.status).toBe(409);
    });

    it("Testa com username repetido -> deve retornar 409", async () => {
        const password = faker.internet.password();
        const username = faker.internet.userName();

        const user1 = {
            email: faker.internet.email(),
            username,
            password: password,
            confirmPassword: password,
        };

        const user2 = {
            email: faker.internet.email(),
            username,
            password: password,
            confirmPassword: password,
        };

        await server.post("/sign-up").send(user1);
        const result = await server.post("/sign-up").send(user2);

        expect(result.status).toBe(409);
    });
});

describe("Testa SignIn", () => {
    it("Testa com credenciais válidas -> deve retornar 200 e token", async () => {
        const password = faker.internet.password();
        const email = faker.internet.email();

        const user = {
            email,
            username: faker.internet.userName(),
            password: password,
            confirmPassword: password,
        };

        const credentials = {
            email,
            password,
        };

        await server.post("/sign-up").send(user);
        const result = await server.post("/sign-in").send(credentials);

        expect(result.status).toBe(200);
        expect(result.body).toBeInstanceOf(Object);
    });

    it("Testa com credenciais inválidas -> deve retornar 401", async () => {
        const credentials = {
            email: faker.internet.email(),
            password: faker.internet.password(),
        };

        const result = await server.post("/sign-in").send(credentials);

        expect(result.status).toBe(401);
    });
});

describe("Testa GetUsersByInput", () => {
    it("Testa com input", async () => {
        const username = faker.internet.userName();

        const result = await server.get(`/user/${username}`).send();

        expect(result.status).toBe(200);
        expect(result.body).toBeInstanceOf(Array);
    });
});
