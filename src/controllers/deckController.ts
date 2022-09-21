import { Request, Response } from "express";
import { TDeck } from "../types/deckTypes";

import * as deckServices from "../services/deckServices";

export async function insertDeck(req: Request, res: Response) {
    const userId: number = Number(res.locals.retornoJwtVerify.id);
    const deck: TDeck = req.body;

    await deckServices.validateNewDeckNameForUser(deck, userId);
    const createdDeck = await deckServices.insertDeck(deck, userId);

    res.status(201).send(createdDeck);
}
