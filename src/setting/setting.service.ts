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

  async createSetting(createSettingDto: UpdateSettingDto) {
    const setting = new this.settingModel({
      ...createSettingDto,
    });

    return setting.save();
  }

  async getSetting() {
    return (await this.settingModel.find())[0];
  }

  async updateSetting(updateSettingDto: UpdateSettingDto) {
    const settings = await this.settingModel.find();
    return this.settingModel.findByIdAndUpdate(
      settings[0]._id,
      { $set: { ...updateSettingDto } },
      { new: true, upsert: true },
    );
  }
}
