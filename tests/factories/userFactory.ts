import { faker } from "@faker-js/faker";
import jwt from "jsonwebtoken";

export function userFactory() {
    const password = faker.internet.password();
    return {
        email: faker.internet.email(),
        username: faker.internet.userName(),
        password,
        confirmPassword: password,
    };
}

export function tokenFactory(id: number) {
    const secretKey: string = String(process.env.JWT_SECRET);
    const token: string = jwt.sign({ id }, secretKey);

    return token;
}
