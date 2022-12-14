import * as userRepositories from "../repositories/userRepository";
import { TUser, TUsernameId } from "../types/userTypes";
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

    return true;
}

export async function validateNewEmail(email: string) {
    const user: Users | null = await findByEmail(email);

    if (user) {
        throw {
            type: "conflict",
            message: "Esse email já está sendo utilizado",
        };
    }

    return true;
}

export async function validateNewUsername(username: string) {
    const user: Users | null = await userRepositories.findByUsername(username);

    if (user) {
        throw {
            type: "conflict",
            message: "Esse username já está sendo utilizado",
        };
    }

    return true;
}

export async function insertUser(user: TUser): Promise<Users> {
    const encryptedUser: TUser = {
        ...user,
        password: await encryptsPassword(user.password),
    };

    return await userRepositories.insertUser(encryptedUser);
}

export async function validatePassword(userBody: TUser): Promise<Users> {
    const userDatabase: Users | null = await findByEmail(userBody.email);

    if (
        !userDatabase ||
        !(await bcrypt.compare(userBody.password, userDatabase.password))
    ) {
        throw { type: "unauthorized", message: "Credenciais inválidas" };
    }

    return userDatabase;
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

    return true;
}

export async function getUsernameById(
    userId: number
): Promise<string | undefined> {
    return await userRepositories.getUsernameById(userId);
}

export async function getUsersByInput(input: string): Promise<TUsernameId[]> {
    const users: Users[] = await userRepositories.getAllUsers();

    const usersByInput: Users[] = users.filter((user: Users) => {
        const lowerCaseUser = user.username.toLowerCase();

        return lowerCaseUser.startsWith(input);
    });

    const usersByInputNoPassword: TUsernameId[] = usersByInput.map(
        (user: Users) => {
            return { id: user.id, username: user.username };
        }
    );

    return usersByInputNoPassword;
}

async function encryptsPassword(password: string): Promise<string> {
    const SALT: number = 10;
    const encryptedPassword: string = await bcrypt.hash(password, SALT);

    return encryptedPassword;
}

export async function findByEmail(email: string): Promise<Users | null> {
    return await userRepositories.findByEmail(email);
}
