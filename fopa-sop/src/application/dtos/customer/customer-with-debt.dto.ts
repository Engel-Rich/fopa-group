import { ApiProperty } from '@nestjs/swagger';
import { CustomerResponseDto } from './customer-response.dto';

export class CustomerWithDebtDto extends CustomerResponseDto {
  @ApiProperty({ description: 'Liste des commandes non soldées' })
  unpaidOrders: any[];
}
