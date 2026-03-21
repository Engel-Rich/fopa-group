import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsEmail, IsEnum, IsNotEmpty, IsOptional, IsString, MinLength } from 'class-validator';
import { UserRole } from '../../../domain/entities/user.entity';

export class CreateUserDto {
  @ApiPropertyOptional({ example: 'user@example.com' })
  @IsOptional()
  @IsEmail({}, { message: "L'email doit être valide" })
  email?: string;

  @ApiProperty({ example: 'Jane Doe' })
  @IsNotEmpty({ message: 'Le nom est requis' })
  @IsString()
  name: string;

  @ApiProperty({ example: '+2250123456789' })
  @IsNotEmpty({ message: 'Le téléphone est requis' })
  @IsString()
  phone: string;

  @ApiProperty({ example: 'jane_doe' })
  @IsNotEmpty({ message: "Le nom d'utilisateur est requis" })
  @IsString()
  username: string;

  @ApiProperty({ example: 'password123', minLength: 6 })
  @IsNotEmpty({ message: 'Le mot de passe est requis' })
  @IsString()
  @MinLength(6, { message: 'Le mot de passe doit contenir au moins 6 caractères' })
  password: string;

  @ApiPropertyOptional({ enum: UserRole, example: UserRole.CAISSIERE })
  @IsOptional({ message: 'Le rôle est requis' })
  @IsEnum(UserRole, { message: 'Le rôle doit être ADMIN, CAISSIERE ou CLIENT' })
  role?: UserRole | undefined = UserRole.CLIENT;

  constructor(name: string, phone: string, username: string, password: string, role: UserRole, email?: string) {
    this.email = email;
    this.name = name;
    this.phone = phone;
    this.username = username;
    this.password = password;
    this.role = role;
  }
}
