import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { OrderStatus } from '../../../domain/entities/order.entity';
import { CustomerResponseDto } from '../customer/customer-response.dto';
import { OrderItemResponseDto } from './order-item-response.dto';
import { PaymentResponseDto } from './payment-response.dto';
import { UserResponseDto } from '../user/user-response.dto';

export class OrderResponseDto {
  @ApiProperty()
  id: string;

  @ApiProperty()
  orderNumber: string;

  @ApiProperty()
  customerId: string;

  @ApiProperty({ type: CustomerResponseDto, required: false })
  customer?: CustomerResponseDto;

  @ApiProperty()
  previousDebt: number;

  @ApiProperty()
  subtotal: number;

  @ApiProperty()
  totalAmount: number;

  @ApiProperty()
  amountGiven: number;

  @ApiProperty()
  amountPaid: number;

  @ApiProperty()
  remainingDebt: number;

  @ApiProperty({ description: 'Nombre d\'emballages (facultatif, défaut 0)' })
  packages: number;

  @ApiProperty({ description: 'Nombre d\'emballages restitués' })
  packagesReturned: number;

  @ApiProperty({ description: 'Nombre d\'emballages restants à restituer' })
  remainingPackages: number;

  @ApiProperty({ enum: OrderStatus })
  status: OrderStatus;

  @ApiProperty()
  userId: string;


  @ApiPropertyOptional({ type: UserResponseDto, required: false })
  createdBy?: UserResponseDto;

  @ApiProperty({ type: [OrderItemResponseDto], required: false })
  items?: OrderItemResponseDto[];

  @ApiProperty({ type: [PaymentResponseDto], required: false })
  payments?: PaymentResponseDto[];

  @ApiProperty()
  createdAt: Date;

  @ApiProperty()
  updatedAt: Date;
}


