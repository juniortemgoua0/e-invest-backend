import { Module } from '@nestjs/common';
import { SettingController } from './setting.controller';
import { SettingService } from './setting.service';
import { MongooseModule } from '@nestjs/mongoose';
import { ModelName } from '../helpers';
import { SettingSchema } from './schema/setting.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: ModelName.SETTING, schema: SettingSchema },
    ]),
  ],
  controllers: [SettingController],
  providers: [SettingService],
})
export class SettingModule {}
