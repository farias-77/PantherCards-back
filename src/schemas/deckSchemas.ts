import joi from "joi";
import { TDeck, TDeckResult } from "../types/deckTypes";

export const deckCreationSchema = joi.object<TDeck>({
    name: joi
        .string()
        .messages({ "string.empty": "Por favor, insira um nome para o deck" })
        .required(),
    isPrivate: joi.boolean().required(),
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
        .messages({ "array.min": "Você deve enviar no mínimo uma pergunta" })
        .required(),
});

export const deckResultCreationSchema = joi.object<TDeckResult>({
    score: joi.number().min(0).required(),
    time: joi.number().min(0).required(),
});
