import { prisma } from "../../src/config/database";
import { faker } from "@faker-js/faker";
import supertest from "supertest";
import app from "../../src/app";

import * as deckFactories from "../factories/deckFactory";
import * as userFactories from "../factories/userFactory";

const server = supertest(app);

describe("Testa /POST de decks", () => {
    it("Testa com name válido -> deve retornar 201 e o deck criado", async () => {
        const deck = deckFactories.deckFactory();
        const user = userFactories.userFactory();

        console.log(user);

        const signUp = await server.post("/sign-up").send(user);
        const signIn = await server
            .post("/sign-in")
            .send({ email: user.email, password: user.password });
        console.log(signUp.status);

        const result = await server
            .post("/deck")
            .set({ Authorization: `Bearer ${signIn.body.token}` })
            .send(deck);

        expect(result.status).toBe(201);
        expect(result.body).toBeInstanceOf(Object);
    });
});
