import { Decks, DeckQuestions } from "@prisma/client";

export type TDeckQuestion = {
    question: string;
    answer: string;
};

export type TDeck = {
    name: string;
    isPrivate: boolean;
};

export type TDeckWithQuestions = {
    id: number | undefined;
    name: string | undefined;
    userId: number | undefined;
    username: string | undefined;
    questions: DeckQuestions[];
};

export type TDeckResult = {
    score: number;
    time: number;
};

export type TDeckWUsername = {
    id: number;
    name: string;
    user: { username: string };
    userId: number;
};
