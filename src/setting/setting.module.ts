import { Module, Global } from '@nestjs/common';
import { SettingController } from './setting.controller';
import { SettingService } from './setting.service';
import { MongooseModule } from '@nestjs/mongoose';
import { ModelName } from '../helpers';
import { SettingSchema } from './schema/setting.schema';

@Global()
@Module({
  imports: [
    MongooseModule.forFeature([
      { name: ModelName.SETTING, schema: SettingSchema },
    ]),
  ],
  controllers: [SettingController],
  providers: [SettingService],
  exports: [MongooseModule, SettingService],
})
export class SettingModule {}
