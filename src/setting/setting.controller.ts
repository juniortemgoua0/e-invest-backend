import { Body, Controller, Param, Post, Put, Get } from '@nestjs/common';
import { SettingService } from './setting.service';
import { UpdateSettingDto } from './dto/update-setting.dto';

@Controller('setting')
export class SettingController {
  constructor(private settingService: SettingService) {}

  @Get()
  getSetting() {
    return this.settingService.getSetting();
  }

  @Post()
  createSetting(@Body() createSettingDto: UpdateSettingDto) {
    return this.settingService.createSetting(createSettingDto);
  }

  @Put()
  updateSetting(@Body() updateSettingDto: UpdateSettingDto) {
    return this.settingService.updateSetting(updateSettingDto);
  }
}
