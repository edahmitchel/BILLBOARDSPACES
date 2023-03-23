import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import {
    JwtModule
} from '@nestjs/jwt';
import { UserSchema, User } from "./user.schema";
import { jwtConstants } from "src/strategy/constant";
import { UserController } from "./user.controller";
import { UserService } from "./user.service";
import { HashService } from "./hash.service";
import { AuthService } from "src/auth/auth.service";
import { JwtStrategy } from "src/strategy/jwt.strategy";
import { LocalStrategy } from "src/strategy/local.strategy";

@Module({
    imports: [
        MongooseModule.forFeature([{
            name: User.name,
            schema: UserSchema
        }]),
        JwtModule.register({
            secret: jwtConstants.secret,
            signOptions: {
                expiresIn: '60d'
            },
        }),
    ],
    controllers: [UserController],
    providers: [UserService, HashService, AuthService, JwtStrategy, LocalStrategy],
    exports: [UserService],
})
export class UserModule { }