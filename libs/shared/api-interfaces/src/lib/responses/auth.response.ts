import { UserAccount } from "../interfaces/user.interface";

export interface SessionResponse {
    access_token: string;
    user: UserAccount;
}