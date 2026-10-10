import { PackageTransaction } from '../../../domain/entities/package-transaction.entity';
import { PackageTransactionResponseDto } from '../../dtos/package/package-transaction-response.dto';

export function toPackageTransactionResponse(
  t: PackageTransaction,
  currentPackagesDebt?: number,
): PackageTransactionResponseDto {
  return {
    id: t.id,
    customerId: t.customerId,
    customerName: t.customerName,
    type: t.type,
    quantity: t.quantity,
    userId: t.userId,
    userName: t.userName,
    notes: t.notes,
    createdAt: t.createdAt,
    ...(currentPackagesDebt !== undefined && { currentPackagesDebt }),
  };
}
