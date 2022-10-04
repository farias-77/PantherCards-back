import { faker } from "@faker-js/faker";
import supertest from "supertest";
import app from "../../src/app";

import {
    deckFactory,
    questionsFactory,
    resultFactory,
} from "../factories/deckFactory";
import { tokenFactory, userFactory } from "../factories/userFactory";

const server = supertest(app);

describe("Testa /POST em /deck", () => {
    it("Testa com name válido -> deve retornar 201 e o deck criado", async () => {
        const deck = deckFactory();
        const user = userFactory();

        const { body: signUp } = await server.post("/sign-up").send(user);
        const token = await tokenFactory(signUp.id);

        const result = await server
            .post("/deck")
            .set("Authorization", `Bearer ${token}`)
            .send(deck);

        expect(result.status).toBe(201);
        expect(result.body).toBeInstanceOf(Object);
    });

    it("Testa com name inválido -> deve retornar 401", async () => {
        const deck = deckFactory();
        const user = userFactory();

        const { body: signUp } = await server.post("/sign-up").send(user);
        const token = await tokenFactory(signUp.id);

        await server
            .post("/deck")
            .set("Authorization", `Bearer ${token}`)
            .send(deck);

        const result = await server
            .post("/deck")
            .set("Authorization", `Bearer ${token}`)
            .send(deck);

        expect(result.status).toBe(401);
    });
});

describe("Testa /POST em /deck/questions/:deckId", () => {
    it("Testa com perguntas válidas", async () => {
        const deck = deckFactory();
        const user = userFactory();
        const questions = questionsFactory();

        const { body: signUp } = await server.post("/sign-up").send(user);
        const token = await tokenFactory(signUp.id);

        const { body: createdDeck } = await server
            .post("/deck")
            .set("Authorization", `Bearer ${token}`)
            .send(deck);

        const result = await server
            .post(`/deck/questions/${createdDeck.id}`)
            .set("Authorization", `Bearer ${token}`)
            .send(questions);

        expect(result.status).toBe(201);
        expect(result.body).toBeInstanceOf(Object);
    });
});

describe("Testa /GET em /deck/:deckId", () => {
    it("Testa com id válido -> deve retornar 200 e o deck", async () => {
        const deck = deckFactory();
        const user = userFactory();

        const { body: signUp } = await server.post("/sign-up").send(user);
        const token = await tokenFactory(signUp.id);

        const { body: createdDeck } = await server
            .post("/deck")
            .set("Authorization", `Bearer ${token}`)
            .send(deck);

        const result = await server
            .get(`/deck/${createdDeck.id}`)
            .set("Authorization", `Bearer ${token}`)
            .send();

        expect(result.status).toBe(200);
        expect(result.body).toBeInstanceOf(Object);
    });

    it("Testa com id inválido -> deve retornar 404", async () => {
        const user = userFactory();

        const { body: signUp } = await server.post("/sign-up").send(user);
        const token = await tokenFactory(signUp.id);

        const result = await server
            .get(`/deck/${faker.datatype.number()}`)
            .set("Authorization", `Bearer ${token}`)
            .send();

        expect(result.status).toBe(404);
    });
});

describe("Testa /GET em /deck/user/:userId", () => {
    it("Testa com id válido -> deve retornar 200 e um array de decks", async () => {
        const deck = deckFactory();
        const user = userFactory();

        const { body: signUp } = await server.post("/sign-up").send(user);
        const token = await tokenFactory(signUp.id);

        const result = await server
            .get(`/deck/user/${signUp.id}`)
            .set("Authorization", `Bearer ${token}`)
            .send();

        expect(result.status).toBe(200);
        expect(result.body).toBeInstanceOf(Object);
    });

    it("Testa com id inválido -> deve retornar 404", async () => {
        const deck = deckFactory();
        const user = userFactory();

        const { body: signUp } = await server.post("/sign-up").send(user);
        const token = await tokenFactory(signUp.id);

        const result = await server
            .get(`/deck/user/${signUp.id + 1}`)
            .set("Authorization", `Bearer ${token}`)
            .send();

        expect(result.status).toBe(404);
    });
});

describe("Testa /POST em /deck/result/:deckId", () => {
    it("Testa com body válido", async () => {
        const deck = deckFactory();
        const user = userFactory();
        const deckResult = resultFactory();

        const { body: signUp } = await server.post("/sign-up").send(user);
        const token = await tokenFactory(signUp.id);

        const { body: createdDeck } = await server
            .post("/deck")
            .set("Authorization", `Bearer ${token}`)
            .send(deck);

        const result = await server
            .post(`/deck/result/${createdDeck.id}`)
            .set("Authorization", `Bearer ${token}`)
            .send(deckResult);

        expect(result.status).toBe(201);
        expect(result.body).toBeInstanceOf(Object);
    });
});
