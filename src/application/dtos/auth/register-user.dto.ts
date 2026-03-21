import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsEmail, IsEnum, IsNotEmpty, IsOptional, IsString, MinLength } from 'class-validator';
import { UserRole } from '../../../domain/entities/user.entity';

export class RegisterUserDto {
  @ApiPropertyOptional({ example: 'admin@example.com' })
  @IsOptional({ message: "L'email est requis" })
  @IsEmail({}, { message: "L'email doit être valide" })
  email?: string;

  @ApiProperty({ example: 'John Doe' })
  @IsNotEmpty({ message: 'Le nom est requis' })
  @IsString()
  name: string;

  @ApiProperty({ example: '+2250123456789' })
  @IsNotEmpty({ message: 'Le téléphone est requis' })
  @IsString()
  phone: string;

  @ApiProperty({ example: 'admin' })
  @IsNotEmpty({ message: "Le nom d'utilisateur est requis" })
  @IsString()
  username: string;

  @ApiProperty({ example: 'password123', minLength: 6 })
  @IsNotEmpty({ message: 'Le mot de passe est requis' })
  @IsString()
  @MinLength(6, { message: 'Le mot de passe doit contenir au moins 6 caractères' })
  password: string;

  @ApiProperty({ enum: UserRole, example: UserRole.ADMIN })
  @IsNotEmpty({ message: 'Le rôle est requis' })
  @IsEnum(UserRole, { message: 'Le rôle doit être ADMIN, CAISSIERE ou CLIENT' })
  role: UserRole;
}
