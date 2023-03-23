import { BadRequestException, Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { CreateUserDto } from "./create-user.dto";
import { HashService } from "./hash.service";
import {
    User,
    UserDocument
} from './user.schema';

@Injectable()
export class UserService {
    constructor(@InjectModel(User.name) private userModel: Model<UserDocument>, private hashService: HashService) { }
    async getUserByUsername(username: string) {
        return this.userModel.findOne({
            username
        })
            .exec();
    }
    async registerUser(createUserDto: CreateUserDto) {
        // validate DTO
        const createUser = new this.userModel(createUserDto);
        // check if user exists
        const user = await this.getUserByUsername(createUser.username);
        if (user) {
            throw new BadRequestException();
        }
        // Hash Password
        createUser.password = await this.hashService.hashPassword(createUser.password);

        return createUser.save();
    }
}