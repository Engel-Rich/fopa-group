import { ApiProperty } from '@nestjs/swagger';
import { UserResponseDto } from '../user/user-response.dto';

export class CustomerResponseDto {
  @ApiProperty()
  id: string;

  @ApiProperty()
  userId: string;

  @ApiProperty({ type: UserResponseDto })
  user?: UserResponseDto;

  @ApiProperty({ required: false })
  address?: string;

  @ApiProperty()
  currentDebt: number;

  @ApiProperty({ description: 'Dette d\'emballages (nombre restant à restituer)' })
  currentPackagesDebt: number;

  @ApiProperty()
  createdAt: Date;

  @ApiProperty()
  updatedAt: Date;
}
