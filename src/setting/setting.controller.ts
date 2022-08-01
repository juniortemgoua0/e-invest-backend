import { Body, Controller, Param, Put } from '@nestjs/common';
import { SettingService } from './setting.service';
import { UpdateSettingDto } from './dto/update-setting.dto';

@Controller('setting')
export class SettingController {
  constructor(private settingService: SettingService) {}

  @Put('settingId')
  updateSetting(
    @Param('settingId') settingId: string,
    @Body() updateSettingDto: UpdateSettingDto,
  ) {
    return this.settingService.updateSetting(settingId, updateSettingDto);
  }
}
