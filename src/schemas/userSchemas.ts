import joi from "joi";
import { TUser } from "../types/userTypes";

export const signUpSchema = joi.object({
    email: joi.string().email().required(),
    username: joi.string().required(),
    password: joi.string().required(),
    confirmPassword: joi.string().required(),
});

export const signInSchema = joi.object<TUser>({
    email: joi.string().email().required(),
    password: joi.string().required(),
});
