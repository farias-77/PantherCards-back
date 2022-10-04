import supertest from "supertest";
import app from "../../src/app";
import { deckFactory } from "../factories/deckFactory";
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
});
