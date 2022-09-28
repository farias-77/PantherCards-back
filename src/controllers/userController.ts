import { Request, Response } from "express";
import { TUser, TUsernameId } from "../types/userTypes";

import * as userServices from "../services/userServices";

export async function signUp(req: Request, res: Response) {
    const user: TUser = {
        email: req.body.email,
        password: req.body.password,
        username: req.body.username,
    };
    const confirmPassword: string = req.body.confirmPassword;

    userServices.validateConfirmPassword(user.password, confirmPassword);
    await userServices.validateNewEmail(user.email);
    const createdUser = await userServices.insertUser(user);

    res.status(201).send(createdUser);
}

export async function signIn(req: Request, res: Response) {
    const user: TUser = req.body;

    await userServices.validatePassword(user);
    const token: string = await userServices.generateToken(user.email);

    res.status(200).send({ token });
}

export async function getUsers(req: Request, res: Response) {
    const username: string = req.params.username;

    const usersByInput: TUsernameId[] = await userServices.getUsersByInput(
        username
    );
    res.status(200).send(usersByInput);
}
