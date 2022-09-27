import * as userRepositories from "../repositories/userRepository";
import { TUser } from "../types/userTypes";
import { Users } from "@prisma/client";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

export function validateConfirmPassword(
    password: string,
    confirmPassword: string
) {
    if (password !== confirmPassword) {
        throw {
            type: "unauthorized",
            message: "A senha e a confirmação de senha devem ser iguais",
        };
    }

    return;
}

export async function validateNewEmail(email: string) {
    const user: Users | null = await findByEmail(email);

    if (user) {
        throw {
            type: "conflict",
            message: "Esse email já está sendo utilizado",
        };
    }

    return;
}

export async function insertUser(user: TUser): Promise<Users> {
    const encryptedUser: TUser = {
        ...user,
        password: await encryptsPassword(user.password),
    };

    return await userRepositories.insertUser(encryptedUser);
}

export async function validatePassword(userBody: TUser) {
    const userDatabase: Users | null = await findByEmail(userBody.email);

    if (
        !userDatabase ||
        !(await bcrypt.compare(userBody.password, userDatabase.password))
    ) {
        throw { type: "unauthorized", message: "Credenciais inválidas" };
    }

    return;
}

export async function generateToken(email: string): Promise<string> {
    const user: Users | null = await findByEmail(email);

    const secretKey: string = String(process.env.JWT_SECRET);
    const token: string = user ? jwt.sign({ id: user.id }, secretKey) : "";

    return token;
}

export async function validateUserExists(userId: number) {
    const user: Users | null = await userRepositories.findById(userId);

    if (!user) {
        throw {
            type: "not found",
            message: "Não encontramos um usuário com esse id.",
        };
    }

    return;
}

export async function getUsernameById(
    userId: number
): Promise<string | undefined> {
    return await userRepositories.getUsernameById(userId);
}

export async function getUsersByInput(input: string): Promise<Users[]> {
    const users: Users[] = await userRepositories.getAllUsers();

    const usersByInput: Users[] = users.filter((user: Users) =>
        user.username.startsWith(input)
    );

    return usersByInput;
}

async function encryptsPassword(password: string): Promise<string> {
    const SALT: number = 10;
    const encryptedPassword: string = await bcrypt.hash(password, SALT);

    return encryptedPassword;
}

async function findByEmail(email: string): Promise<Users | null> {
    return await userRepositories.findByEmail(email);
}
