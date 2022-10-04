import { faker } from "@faker-js/faker";

export function deckFactory() {
    return {
        name: faker.lorem.words(2),
        isPrivate: faker.datatype.boolean(),
    };
}

export function questionsFactory() {
    return {
        questions: [
            {
                question: faker.lorem.words(5),
                answer: faker.lorem.words(3),
            },
            {
                question: faker.lorem.words(5),
                answer: faker.lorem.words(3),
            },
            {
                question: faker.lorem.words(5),
                answer: faker.lorem.words(3),
            },
        ],
    };
}

export function resultFactory() {
    return {
        score: faker.datatype.number({ min: 1 }),
        time: faker.datatype.number({ min: 1 }),
    };
}
