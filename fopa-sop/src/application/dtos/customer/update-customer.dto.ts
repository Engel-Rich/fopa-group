import { ApiProperty } from '@nestjs/swagger';
import { IsObject, IsOptional, IsString, ValidateNested } from 'class-validator';
import { UpdateUserDto } from '../user/update-user.dto';
import { Type } from 'class-transformer';

export class UpdateCustomerDto {
  @ApiProperty({ example: 'Abidjan, Cocody', required: false })
  @IsOptional()
  @IsString()
  address?: string;
  @ApiProperty({ type: UpdateUserDto })
  @IsOptional()
  @IsObject()
  @ValidateNested()
  @Type(() => UpdateUserDto)
  user?: UpdateUserDto;
}
