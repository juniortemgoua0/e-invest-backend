import { GetUsersStatus } from '../../helpers/enums/get-users-status.enum';
import { IsEnum, IsOptional } from 'class-validator';

export class GetUsersDto {
  @IsEnum(GetUsersStatus)
  @IsOptional()
  status: GetUsersStatus;
}
