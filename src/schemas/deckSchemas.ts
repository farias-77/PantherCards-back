import joi from "joi";
import { TDeck, TDeckResult } from "../types/deckTypes";

export const deckCreationSchema = joi.object<TDeck>({
    name: joi.string().required(),
});

export const deckQuestionsCreationSchema = joi.object({
    questions: joi
        .array()
        .min(1)
        .items(
            joi.object({
                question: joi.string().required(),
                answer: joi.string().required(),
            })
        )
        .required(),
    deckId: 4,
});

export const deckResultCreationSchema = joi.object<TDeckResult>({
    score: joi.number().min(0).required(),
    time: joi.number().min(0).required(),
});
