import {Global, Module} from '@nestjs/common';
import {ConfigModule} from '@nestjs/config';
import {AuthModule} from './auth/auth.module';
import {MongooseModule} from "@nestjs/mongoose";
import {UserModule} from './user/user.module';
import {AppController} from "./app.controller";
import { BetModule } from './bet/bet.module';
import { PaymentModule } from './payment/payment.module';

@Global()
@Module({
    imports: [
        ConfigModule.forRoot({isGlobal: true}),
        MongooseModule.forRoot(process.env.MONGO_DB_URI),
        AuthModule,
        UserModule,
        BetModule,
        PaymentModule,
    ],
    exports: [ConfigModule],
  controllers: [AppController]
})
export class AppModule {

}
