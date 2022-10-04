import { faker } from "@faker-js/faker";

export function deckFactory() {
    return {
        name: faker.lorem.words(2),
        isPrivate: faker.datatype.boolean(),
    };
}
