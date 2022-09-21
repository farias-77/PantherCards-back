import { TDeck, TDeckQuestion, TDeckWithQuestions } from "../types/deckTypes";
import { DeckQuestions } from "@prisma/client";
import { Request, Response } from "express";

import * as deckServices from "../services/deckServices";

export async function insertDeck(req: Request, res: Response) {
    const userId: number = Number(res.locals.retornoJwtVerify.id);
    const deck: TDeck = req.body;

    await deckServices.validateNewDeckNameForUser(deck, userId);
    const createdDeck = await deckServices.insertDeck(deck, userId);

    res.status(201).send(createdDeck);
}

export async function insertQuestions(req: Request, res: Response) {
    const userId: number = Number(res.locals.retornoJwtVerify.id);
    const deckId: number = req.body.deckId;
    const questions: TDeckQuestion[] = req.body.questions;

    await deckServices.validateDeckExists(deckId);
    await deckServices.validateDeckBelongsToUser(deckId, userId);
    await deckServices.insertQuestions(questions, deckId);
    const createdQuestions: TDeckWithQuestions =
        await deckServices.getDeckWithQuestions(deckId);

    res.status(201).send(createdQuestions);
}
