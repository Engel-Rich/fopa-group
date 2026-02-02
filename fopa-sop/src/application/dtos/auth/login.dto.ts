import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class LoginDto {
  @ApiProperty({ example: 'admin' })
  @IsNotEmpty({ message: "Le nom d'utilisateur est requis" })
  @IsString()
  username: string;

  @ApiProperty({ example: 'password123' })
  @IsNotEmpty({ message: 'Le mot de passe est requis' })
  @IsString()
  password: string;
}
