import { Inject, Injectable } from '@nestjs/common';
import { UpdateSettingDto } from './dto/update-setting.dto';
import { InjectModel } from '@nestjs/mongoose';
import { ModelName } from '../helpers';
import { Model } from 'mongoose';
import { SettingDocument } from './schema/setting.schema';

@Injectable()
export class SettingService {
  constructor(
    @InjectModel(ModelName.SETTING)
    private readonly settingModel: Model<SettingDocument>,
  ) {}

  async updateSetting(settingId: string, updateSettingDto: UpdateSettingDto) {
    return this.settingModel.findByIdAndUpdate(
      settingId,
      { $set: { ...updateSettingDto } },
      { new: true, upsert: true },
    );
  }
}
