import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { ProductResponseDto } from './product-response.dto';

export class ProductWithConfigDto extends ProductResponseDto {
  @ApiPropertyOptional({
    description: 'Prix unitaire configuré pour ce client et ce produit',
    example: 950,
    nullable: true,
  })
  configuredUnitPrice?: number | null;

  @ApiProperty({
    description: 'Prix unitaire effectif utilisé par défaut (configuré sinon prix produit)',
    example: 950,
  })
  defaultUnitPrice: number;
}
