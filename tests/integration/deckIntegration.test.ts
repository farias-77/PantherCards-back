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
        const { body: signIn } = await server
            .post("/sign-in")
            .send({ email: user.email, password: user.password });

        const token = signIn.token;
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
        const { body: signIn } = await server
            .post("/sign-in")
            .send({ email: user.email, password: user.password });

        const token = signIn.token;
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

        const signUp = await server.post("/sign-up").send(user);
        const token = await userFactories.tokenFactory(signUp.body.id);

        const createdDeck = await server
            .post("/deck")
            .set({ Authorization: `Bearer ${token}` })
            .send(deck);

        const questions = deckFactories.questionsFactory();

        const result = await server
            .post(`/deck/questions/${createdDeck.body.id}`)
            .set({ Authorization: `Bearer ${token}` })
            .send(questions);

        expect(result.status).toBe(201);
        expect(result.body).toBeInstanceOf(Object);
    });
});

describe("Testa /GET em decks por id", () => {
    it("Testa com id válido -> deve retornar 200 e o deck", async () => {
        const deck = deckFactories.deckFactory();
        const user = userFactories.userFactory();

        const signUp = await server.post("/sign-up").send(user);
        const { body: signIn } = await server
            .post("/sign-in")
            .send({ email: user.email, password: user.password });
        const { body: createdDeck } = await server
            .post("/deck")
            .set({ Authorization: `Bearer ${signIn.token}` })
            .send(deck);

        const result = await server.get(`/deck/${createdDeck.id}`).send();

        expect(result.status).toBe(200);
        expect(result.body).toBeInstanceOf(Object);
    });
});
