import joi from "joi";
import { TUser } from "../types/userTypes";

export const signUpSchema = joi.object({
    email: joi
        .string()
        .email()
        .messages({ "string.empty": "Por favor, insira um email válido" })
        .required(),
    username: joi
        .string()
        .messages({ "string.empty": "Por favor, insira um username válido" })
        .required(),
    password: joi
        .string()
        .messages({ "string.empty": "Por favor, insira uma senha" })
        .required(),
    confirmPassword: joi
        .string()
        .messages({
            "string.empty": "Por favor, insira uma confirmação de senha",
        })
        .required(),
});

export const signInSchema = joi.object<TUser>({
    email: joi.string().email().required(),
    password: joi.string().required(),
});
