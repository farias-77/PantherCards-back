import { DeckQuestions, DeckResults, Decks } from "@prisma/client";
import * as deckRepositories from "../repositories/deckRepository";
import {
    TDeck,
    TDeckQuestion,
    TDeckResult,
    TDeckWithQuestions,
} from "../types/deckTypes";

export async function insertDeck(deck: TDeck, userId: number) {
    return await deckRepositories.insertDeck(deck, userId);
}

export async function validateNewDeckNameForUser(deck: TDeck, userId: number) {
    const deckByName: Decks | null =
        await deckRepositories.getDeckByNameAndUserId(deck, userId);

    if (deckByName) {
        throw {
            type: "unauthorized",
            message: "Você já tem um deck com esse nome!",
        };
    }

    return;
}

export async function validateDeckBelongsToUser(
    deckId: number,
    userId: number
) {
    const deck: Decks | null = await getDeckById(deckId);

    if (deck?.userId !== userId) {
        throw {
            type: "unauthorized",
            message:
                "Você não pode criar uma pergunta em um deck que não é seu!",
        };
    }

    return;
}

export async function validateDeckExists(deckId: number) {
    const deck: Decks | null = await getDeckById(deckId);

    if (!deck) {
        throw {
            type: "not found",
            message: "Não existe um deck com esse id!",
        };
    }

    return;
}

export async function insertQuestions(
    questions: TDeckQuestion[],
    deckId: number
) {
    questions.forEach(
        async (question: TDeckQuestion) =>
            await insertQuestion(question, deckId)
    );

    return;
}

export async function getDeckWithQuestions(
    deckId: number
): Promise<TDeckWithQuestions> {
    const deck: Decks | null = await getDeckById(deckId);
    const deckQuestions: DeckQuestions[] = await getDeckQuestions(deckId);
    console.log(deckQuestions);
    const deckWQuestions: TDeckWithQuestions = {
        id: deck?.id,
        name: deck?.name,
        userId: deck?.userId,
        questions: deckQuestions,
    };

    return deckWQuestions;
}

export async function getDecksByUserId(userId: number) {
    return await deckRepositories.getDecksByUserId(userId);
}

export async function insertDeckResult(
    deckResult: TDeckResult,
    deckId: number,
    userId: number
): Promise<DeckResults> {
    return await deckRepositories.insertDeckResult(deckResult, deckId, userId);
}

export async function getDeckResults(deckId: number) {
    return await deckRepositories.getDeckResults(deckId);
}

async function insertQuestion(
    question: TDeckQuestion,
    deckId: number
): Promise<DeckQuestions> {
    const createdQuestion: DeckQuestions =
        await deckRepositories.insertDeckQuestion(question, deckId);

    return createdQuestion;
}

async function getDeckById(deckId: number): Promise<Decks | null> {
    return await deckRepositories.getDeckById(deckId);
}

async function getDeckQuestions(deckId: number): Promise<DeckQuestions[]> {
    return await deckRepositories.getDeckQuestions(deckId);
}
