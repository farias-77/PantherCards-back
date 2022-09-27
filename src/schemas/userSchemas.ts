import joi from "joi";
import { TUser } from "../types/userTypes";

export const signUpSchema = joi.object({
    email: joi
        .string()
        .email()
        .required()
        .message("Por favor, insira um email válido"),
    username: joi
        .string()
        .required()
        .message("Por favor, insira um username válido"),
    password: joi.string().required().message("Por favor, insira uma senha"),
    confirmPassword: joi
        .string()
        .required()
        .message("Por favor, insira uma confirmação de senha"),
});

export const signInSchema = joi.object<TUser>({
    email: joi.string().email().required(),
    password: joi.string().required(),
});
