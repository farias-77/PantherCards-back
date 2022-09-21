import { Decks, DeckQuestions } from "@prisma/client";

export type TDeckQuestion = {
  question: string;
  answer: string;
  deckId: number;
};

export type TDeck = {
  name: string;
  userId: number;
  DeckQuestions: TDeckQuestion[];
};
