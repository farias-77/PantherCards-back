import joi from "joi";
import { TDeck } from "../types/deckTypes";

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
                deckId: joi.number().required(),
            })
        )
        .required(),
});
