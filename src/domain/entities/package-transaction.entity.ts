export enum PackageTransactionType {
  LEND = 'LEND',
  RETURN = 'RETURN',
}

export class PackageTransaction {
  id: string;
  customerId: string;
  type: PackageTransactionType;
  quantity: number;
  userId: string;
  notes?: string;
  createdAt: Date;

  constructor(
    customerId: string,
    type: PackageTransactionType,
    quantity: number,
    userId: string,
    notes?: string,
  ) {
    this.customerId = customerId;
    this.type = type;
    this.quantity = quantity;
    this.userId = userId;
    this.notes = notes;
    this.createdAt = new Date();
  }
}
