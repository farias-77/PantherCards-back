import { faker } from "@faker-js/faker";

export function userFactory() {
    const password = faker.internet.password();
    return {
        email: faker.internet.email(),
        username: faker.internet.userName(),
        password,
        confirmPassword: password,
    };
}
