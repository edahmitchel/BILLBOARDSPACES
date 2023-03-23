import { User } from "./user.entity";

export class ReturnUserDto {
    readonly username: string;

    constructor(user: User) {
        this.username = user.username;
    }
}
