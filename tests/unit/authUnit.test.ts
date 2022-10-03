import { faker } from "@faker-js/faker";
import { jest } from "@jest/globals";

import * as userRepositories from "../../src/repositories/userRepository";
import * as userServices from "../../src/services/userServices";

beforeEach(async () => {
    jest.resetAllMocks();
});

describe("Testa service validateConfirmPassword", () => {
    it("Testa com valores iguais", () => {
        const password = faker.internet.password();

        const result = userServices.validateConfirmPassword(password, password);

        expect(result).toBe(true);
    });
});

describe("Testa service insertUser", () => {
    it("Testa com body válido", async () => {
        const user = {
            email: faker.internet.email(),
            username: faker.internet.userName(),
            password: faker.internet.password(),
        };

        jest.spyOn(userRepositories, "insertUser").mockResolvedValue({
            id: faker.datatype.number(),
            email: faker.internet.email(),
            username: faker.internet.userName(),
            password: faker.internet.password(),
        });

        const result = await userServices.insertUser(user);

        expect(result).toBeInstanceOf(Object);
    });
});
