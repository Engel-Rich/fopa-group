import { ApiProperty } from '@nestjs/swagger';
import { PaymentMethod } from '../../../domain/entities/payment.entity';

export class PaymentResponseDto {
  @ApiProperty()
  id: string;

  @ApiProperty()
  orderId: string;

  @ApiProperty()
  amount: number;

  @ApiProperty({ enum: PaymentMethod })
  paymentMethod: PaymentMethod;

  @ApiProperty({ required: false })
  reference?: string;

  @ApiProperty()
  userId: string;

  @ApiProperty()
  createdAt: Date;
}
