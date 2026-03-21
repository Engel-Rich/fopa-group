import { ApiProperty } from '@nestjs/swagger';
import { UserRole } from '../../../domain/entities/user.entity';

export class UserInfoDto {
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
  isActive: boolean;
}

export class AuthResponseDto {
  @ApiProperty()
  accessToken: string;

  @ApiProperty()
  refreshToken: string;

  @ApiProperty({ type: UserInfoDto })
  user: UserInfoDto;
}
