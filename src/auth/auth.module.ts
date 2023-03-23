import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import {
    JwtModule
} from '@nestjs/jwt';
import { User, UserSchema } from "src/user/user.schema";
import { jwtConstants } from "src/strategy/constant";
import { AuthController } from "./auth.controller";
import { AuthService } from "./auth.service";
import { UserService } from "src/user/user.service";
import { LocalStrategy } from "src/strategy/local.strategy";
import { HashService } from "src/user/hash.service";
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
    controllers: [AuthController],
    providers: [AuthService, UserService, LocalStrategy, HashService],
})
export class AuthModule { }