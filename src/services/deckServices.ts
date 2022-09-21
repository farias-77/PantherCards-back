import { Decks } from "@prisma/client";
import * as deckRepositories from "../repositories/deckRepository";
import { TDeck, TDeckQuestion } from "../types/deckTypes";

export async function insertDeck(deck: TDeck, userId: number) {
    return await deckRepositories.insertDeck(deck, userId);
}

export async function validateNewDeckNameForUser(deck: TDeck, userId: number) {
    const deckByName: Decks | null = await deckRepositories.getDeckByName(deck);

    if (deckByName) {
        throw {
            type: "unauthorized",
            message: "Você já tem um deck com esse nome!",
        };
    }

    return;
}
