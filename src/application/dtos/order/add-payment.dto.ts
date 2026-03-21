import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsEnum, IsNotEmpty, IsNumber, IsOptional, IsString, IsUUID, Min } from 'class-validator';
import { PaymentMethod } from '../../../domain/entities/payment.entity';

export class AddPaymentDto {
  @ApiProperty({ example: 'uuid-order-id' })
  @IsNotEmpty({ message: "L'ID de la commande est requis" })
  @IsUUID('4', { message: "L'ID de la commande doit être un UUID valide" })
  orderId: string;

  @ApiProperty({ example: 5000, minimum: 0.01 })
  @IsNotEmpty({ message: 'Le montant est requis' })
  @IsNumber({}, { message: 'Le montant doit être un nombre' })
  @Min(0.01, { message: 'Le montant doit être supérieur à 0' })
  amount: number;

  @ApiPropertyOptional({ enum: PaymentMethod, example: PaymentMethod.CASH })
  @IsOptional({ message: 'Le mode de paiement est requis' })
  @IsEnum(PaymentMethod, { message: 'Le mode de paiement doit être valide' })
  paymentMethod?: PaymentMethod | undefined = PaymentMethod.CASH;

  @ApiProperty({
    example: 'REF123456',
    required: false,
    description: 'Référence de transaction. Générée automatiquement pour CASH, obligatoire pour les autres modes de paiement',
  })
  @IsOptional()
  @IsString()
  reference?: string;
}
