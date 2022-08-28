import { IsNumber, IsOptional } from 'class-validator';

export class PaginationDto {
  @IsNumber()
  @IsOptional()
  pageSize: number;

  @IsNumber()
  @IsOptional()
  pageIndex: number;
}
