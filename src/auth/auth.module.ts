import {Global, Module} from '@nestjs/common';
import {AuthController} from './auth.controller';
import {AuthService} from './auth.service';
import {JwtModule} from "@nestjs/jwt";
import {PassportModule} from "@nestjs/passport";
import {LocalStrategy} from "./security/strategy/local.strategy";
import {LocalAuthGuard} from "./security/guard/local-auth.guard";
import {JwtAuthGuard} from "./security/guard/jwt-auth.guard";
import {JwtStrategy} from "./security/strategy/jwt.strategy";
import {ConfigModule} from "@nestjs/config";
import {RolesGuard} from "./security/guard/roles.guard";

@Global()
@Module({
    imports: [
        PassportModule,
        ConfigModule.forRoot({isGlobal: true}),
        JwtModule.register({
            secret: process.env.JWT_SECRET,
            signOptions: {expiresIn: "1d"}
        }),
    ],
    exports: [RolesGuard, JwtAuthGuard],
    controllers: [AuthController],
    providers: [AuthService, LocalStrategy, LocalAuthGuard, JwtAuthGuard, JwtStrategy, RolesGuard]
})
export class AuthModule {
}
