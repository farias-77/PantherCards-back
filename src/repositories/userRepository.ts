import { prisma } from "../config/database";
import { Users } from "@prisma/client";
import { TUser } from "../types/userTypes";

export async function findByEmail(email: string): Promise<Users | null> {
    return await prisma.users.findFirst({
        where: {
            email,
        },
    });
}

export async function insertUser(user: TUser): Promise<Users> {
    const createdUser: Users = await prisma.users.create({
        data: user,
    });

    return createdUser;
}

export async function findById(userId: number): Promise<Users | null> {
    return await prisma.users.findFirst({ where: { id: userId } });
}

export async function getUsernameById(
    userId: number
): Promise<string | undefined> {
    const user: Users | null = await prisma.users.findFirst({
        where: { id: userId },
    });

    return user?.username;
}

export async function getAllUsers(): Promise<Users[]> {
    return await prisma.users.findMany();
}
