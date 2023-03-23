import { Injectable } from "@nestjs/common/decorators";
import { PassportStrategy } from "@nestjs/passport";
import { ExtractJwt } from "passport-jwt";
import { jwtConstants } from "./constant";
import {
    Strategy
} from 'passport-local';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
    constructor() {
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            ignoreExpiration: false,
            secretOrKey: jwtConstants.secret,
        });
    }

    async validate(payload: any) {
        return {
            userId: payload.sub,
            username: payload.username
        };
    }
}