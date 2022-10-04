import { prisma } from "../../src/config/database";
import { faker } from "@faker-js/faker";
import supertest from "supertest";
import app from "../../src/app";

const server = supertest(app);

describe("Testa /POST de decks", () => {
    it("Testa com name válido -> deve retornar 201 e o deck criado", async () => {
        const deck = {
            name: faker.lorem.word(),
            isPrivate: faker.datatype.boolean(),
        };

        const result = await server.post("/deck").send(deck);

        expect(result.status).toBe(201);
        expect(result.body).toBeInstanceOf(Object);
    });
});
