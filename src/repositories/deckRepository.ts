import { DeckQuestions, DeckResults, Decks } from "@prisma/client";
import { prisma } from "../config/database";
import { TDeck, TDeckQuestion, TDeckResult } from "../types/deckTypes";

export async function insertDeck(deck: TDeck, userId: number): Promise<Decks> {
    const createdDeck: Decks = await prisma.decks.create({
        data: {
            name: deck.name,
            userId,
            isPrivate: deck.isPrivate,
        },
    });

    return createdDeck;
}

export async function insertDeckQuestion(
    deckQuestion: TDeckQuestion,
    deckId: number
): Promise<DeckQuestions> {
    const createdQuestion: DeckQuestions = await prisma.deckQuestions.create({
        data: {
            question: deckQuestion.question,
            answer: deckQuestion.answer,
            deckId,
        },
    });

    return createdQuestion;
}

export async function insertDeckQuestionsArray(
    deckQuestions: TDeckQuestion[],
    deckId: number
) {
    const questions = deckQuestions.map((question: TDeckQuestion) => {
        return { ...question, deckId };
    });

    return await prisma.deckQuestions.createMany({ data: questions });
}

export async function getDeckById(id: number) {
    const deck = await prisma.decks.findFirst({
        where: { id },
        include: { user: { select: { username: true } } },
    });

    return deck;
}

export async function getDecksByUserId(userId: number): Promise<Decks[]> {
    return await prisma.decks.findMany({ where: { userId } });
}

export async function getDeckQuestions(
    deckId: number
): Promise<DeckQuestions[]> {
    const deckQuestions: DeckQuestions[] = await prisma.deckQuestions.findMany({
        where: { deckId },
    });

    return deckQuestions;
}

export async function getDeckByNameAndUserId(
    deck: TDeck,
    userId: number
): Promise<Decks | null> {
    const deckByName: Decks | null = await prisma.decks.findFirst({
        where: { name: deck.name, userId },
    });

    return deckByName;
}

export async function insertDeckResult(
    deckResult: TDeckResult,
    deckId: number,
    userId: number
): Promise<DeckResults> {
    const createdDeckResult: DeckResults = await prisma.deckResults.create({
        data: {
            userId,
            deckId,
            score: deckResult.score,
            time: deckResult.time,
        },
    });

    return createdDeckResult;
}

export async function getDeckResults(deckId: number): Promise<DeckResults[]> {
    return await prisma.deckResults.findMany({
        where: { deckId },
        include: {
            user: { select: { username: true } },
        },
        orderBy: [
            {
                score: "desc",
            },
            {
                time: "asc",
            },
        ],
        take: 10,
    });
}

export async function deleteQuestionsByDeckId(deckId: number) {
    return await prisma.deckQuestions.deleteMany({ where: { deckId } });
}

export async function deleteDeckById(deckId: number) {
    return await prisma.decks.delete({ where: { id: deckId } });
}
