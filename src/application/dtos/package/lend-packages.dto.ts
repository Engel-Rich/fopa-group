import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsInt, IsNotEmpty, IsOptional, IsString, IsUUID, Min } from 'class-validator';

export class LendPackagesDto {
  @ApiProperty({ example: 'uuid-customer-id' })
  @IsNotEmpty({ message: "L'ID du client est requis" })
  @IsUUID('4', { message: "L'ID du client doit être un UUID valide" })
  customerId: string;

  @ApiProperty({ example: 3, minimum: 1, description: "Nombre d'emballages à prêter" })
  @IsNotEmpty({ message: "Le nombre d'emballages est requis" })
  @IsInt({ message: "Le nombre d'emballages doit être un entier" })
  @Min(1, { message: "Le nombre d'emballages doit être supérieur à 0" })
  quantity: number;

  @ApiPropertyOptional({ example: 'Prêt lors de la livraison du 25/04' })
  @IsOptional()
  @IsString()
  notes?: string;
}
