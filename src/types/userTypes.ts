import { Users } from "@prisma/client";

export type TUser = Omit<Users, "id">;

export type TUsernameId = {
    id: number;
    username: string;
};
