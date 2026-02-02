import { ApiProperty } from '@nestjs/swagger';
import { UserRole } from '../../../domain/entities/user.entity';

export class UserResponseDto {
  @ApiProperty()
  id: string;

  @ApiProperty()
  email?: string;

  @ApiProperty()
  name: string;

  @ApiProperty()
  phone?: string;

  @ApiProperty()
  username: string;

  @ApiProperty({ enum: UserRole })
  role: UserRole;

  @ApiProperty()
  isActive?: boolean;

  @ApiProperty()
  createdAt?: Date;

  @ApiProperty()
  updatedAt?: Date;
}
