import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsObject, IsOptional, IsString, IsUUID, ValidateNested } from 'class-validator';
import { CreateUserDto } from '../user/create-user.dto';
import { Type } from 'class-transformer';

export class CreateCustomerDto {

  @ApiProperty({ example: 'Abidjan, Cocody', required: false })
  @IsOptional()
  @IsString()
  address?: string;

  @ApiProperty({ type: CreateUserDto })
  @IsNotEmpty({ message: "Les données de l'utilisateur sont requises" })
  @IsObject()
  @ValidateNested()
  @Type(() => CreateUserDto)
  user: CreateUserDto;
}
