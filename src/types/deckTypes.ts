import { Decks, DeckQuestions } from "@prisma/client";

export type TDeckQuestion = {
    question: string;
    answer: string;
    deckId: number;
};

export type TDeck = {
    name: string;
};

export type TDeckWithQuestions = {
    name: string;
    userId: number;
    questions: TDeckQuestion[];
};
