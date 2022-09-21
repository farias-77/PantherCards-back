import { Request, Response } from "express";
import { TDeck, TDeckQuestion } from "../types/deckTypes";

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
    const questions: TDeckQuestion[] = req.body;
    const deckId: number = questions[0].deckId;
}
