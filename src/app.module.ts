import { Global, Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { AuthModule } from './auth/auth.module';
import { MongooseModule, MongooseModuleFactoryOptions } from '@nestjs/mongoose';
import { UserModule } from './user/user.module';
import { AppController } from './app.controller';
import { BetModule } from './bet/bet.module';
import { PaymentModule } from './payment/payment.module';
import { SettingModule } from './setting/setting.module';
import { AdminModule } from './admin/admin.module';

@Global()
@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: '../.env',
    }),
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (
        configService: ConfigService,
      ): MongooseModuleFactoryOptions => {
        return {
          uri: configService.get<string>('MONGO_DB_URI'),
        };
      },
      inject: [ConfigService],
    }),
    AuthModule,
    UserModule,
    BetModule,
    PaymentModule,
    SettingModule,
    AdminModule,
  ],
  exports: [ConfigModule],
  controllers: [AppController],
})
export class AppModule {}
