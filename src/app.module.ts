import {Global, Module} from '@nestjs/common';
import {ConfigModule} from '@nestjs/config';
import {AuthModule} from './auth/auth.module';
import {MongooseModule} from "@nestjs/mongoose";
import {UserModule} from './user/user.module';
import {AppController} from "./app.controller";

@Global()
@Module({
    imports: [
        ConfigModule.forRoot({isGlobal: true}),
        MongooseModule.forRoot(process.env.MONGO_DB_URI),
        AuthModule,
        UserModule,
    ],
    exports: [ConfigModule],
  controllers: [AppController]
})
export class AppModule {

}
