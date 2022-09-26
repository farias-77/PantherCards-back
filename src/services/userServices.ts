import { Users } from "@prisma/client";
import * as userRepositories from "../repositories/userRepository";

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
