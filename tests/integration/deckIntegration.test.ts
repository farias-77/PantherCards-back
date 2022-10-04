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

        const signUp = await server.post("/sign-up").send(user);
        const token = userFactories.tokenFactory(signUp.body.id);

        const result = await server
            .post("/deck")
            .set({ Authorization: `Bearer ${token}` })
            .send(deck);

        expect(result.status).toBe(201);
        expect(result.body).toBeInstanceOf(Object);
    });

    it("Testa com name repetido -> deve retornar 401", async () => {
        const deck = deckFactories.deckFactory();
        const user = userFactories.userFactory();

        const signUp = await server.post("/sign-up").send(user);
        const token = userFactories.tokenFactory(signUp.body.id);
        await server
            .post("/deck")
            .set({ Authorization: `Bearer ${token}` })
            .send(deck);

        const result = await server
            .post("/deck")
            .set({ Authorization: `Bearer ${token}` })
            .send(deck);

        expect(result.status).toBe(401);
    });
});

describe("Testa /POST de deckQuestions", () => {
    it("Testa com perguntas válidas -> deve retornar 201 e o deck criado", async () => {
        const deck = deckFactories.deckFactory();
        const user = userFactories.userFactory();

        await server.post("/sign-up").send(user);
        const signIn = await server
            .post("/sign-in")
            .send({ email: user.email, password: user.password });

        const createdDeck = await server
            .post("/deck")
            .set({ Authorization: `Bearer ${signIn.body.token}` })
            .send(deck);

        const questions = deckFactories.questionsFactory();

        const result = await server
            .post(`/deck/questions/${createdDeck.body.id}`)
            .set({ Authorization: `Bearer ${signIn.body.token}` })
            .send(questions);

        expect(result.status).toBe(201);
        expect(result.body).toBeInstanceOf(Array);
    });
});
