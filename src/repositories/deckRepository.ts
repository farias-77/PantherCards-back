import { DeckQuestions, Decks } from "@prisma/client";
import { prisma } from "../config/database";
import { TDeck, TDeckQuestion } from "../types/deckTypes";

export async function insertDeck(deck: TDeck, userId: number): Promise<Decks> {
    const createdDeck: Decks = await prisma.decks.create({
        data: {
            name: deck.name,
            userId,
        },
    });

    return createdDeck;
}

export async function insertDeckQuestion(
    deckQuestion: TDeckQuestion
): Promise<DeckQuestions> {
    const createdQuestion: DeckQuestions = await prisma.deckQuestions.create({
        data: deckQuestion,
    });

    return createdQuestion;
}

export async function getDeck(id: number): Promise<Decks | null> {
    const deck: Decks | null = await prisma.decks.findFirst({
        where: { id },
    });

    return deck;
}

export async function getDeckQuestions(
    deckId: number
): Promise<DeckQuestions[]> {
    const deckQuestions: DeckQuestions[] = await prisma.deckQuestions.findMany({
        where: { deckId },
    });

    return deckQuestions;
}

export async function getDeckByName(deck: TDeck): Promise<Decks | null> {
    const deckByName: Decks | null = await prisma.decks.findFirst({
        where: { name: deck.name },
    });

    return deckByName;
}
