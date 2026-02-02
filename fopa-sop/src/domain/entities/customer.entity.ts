import { User, UserRole } from './user.entity';

export class Customer extends User {
  userId: string;
  address?: string;
  currentDebt: number;
  currentPackagesDebt: number;

  constructor(
    name: string,
    password: string,
    username: string,
    address?: string,
    userId?: string,
    email?: string,
    phone?: string,
  ) {
    super(name, password, username, phone, UserRole
      .CLIENT, email);
    if (userId) {
      this.userId = userId;
    }
    this.address = address;
    this.currentDebt = 0;
    this.currentPackagesDebt = 0;
  }

  updateDebt(amount: number): void {
    this.currentDebt = amount;
    this.updatedAt = new Date();
  }

  updatePackagesDebt(count: number): void {
    this.currentPackagesDebt = count;
    this.updatedAt = new Date();
  }
}
