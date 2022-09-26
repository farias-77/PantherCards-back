import { Decks, DeckQuestions } from "@prisma/client";

export type TDeckQuestion = {
    question: string;
    answer: string;
};

export type TDeck = {
    name: string;
};

export type TDeckWithQuestions = {
    id: number | undefined;
    name: string | undefined;
    userId: number | undefined;
    questions: DeckQuestions[];
};

export type TDeckResult = {
    score: number;
    time: number;
};
