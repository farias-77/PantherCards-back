import { DeckQuestions, DeckResults, Decks } from "@prisma/client";
import * as deckRepositories from "../repositories/deckRepository";
import {
    TDeck,
    TDeckQuestion,
    TDeckResult,
    TDeckWithQuestions,
    TDeckWUsername,
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
            message: "Você não alterar um deck que não é seu!",
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

export async function validatePrivateDeck(deckId: number, userId: number) {
    const deck: Decks | null = await getDeckById(deckId);

    if (deck?.isPrivate && deck.userId !== userId) {
        throw {
            type: "unauthorized",
            message: "Você não tem permissão para esse deck!",
        };
    }

    return;
}

export async function insertQuestions(
    questions: TDeckQuestion[],
    deckId: number
) {
    return deckRepositories.insertDeckQuestionsArray(questions, deckId);
}

export async function getDeckWithQuestions(deckId: number) {
    const deck = await getDeckById(deckId);
    const deckQuestions: DeckQuestions[] = await getDeckQuestions(deckId);

    const deckWQuestions = {
        ...deck,
        questions: deckQuestions,
    };

    return deckWQuestions;
}

export async function getDecksByUserId(userId: number) {
    return await deckRepositories.getDecksByUserId(userId);
}

export function filterPrivateDecks(decks: Decks[]) {
    return decks.filter((deck: Decks) => !deck.isPrivate);
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

export async function deleteDeckById(deckId: number) {
    await deckRepositories.deleteQuestionsByDeckId(deckId);
    await deckRepositories.deleteDeckById(deckId);

    return;
}

async function getDeckById(deckId: number): Promise<Decks | null> {
    return await deckRepositories.getDeckById(deckId);
}

async function getDeckQuestions(deckId: number): Promise<DeckQuestions[]> {
    return await deckRepositories.getDeckQuestions(deckId);
}
