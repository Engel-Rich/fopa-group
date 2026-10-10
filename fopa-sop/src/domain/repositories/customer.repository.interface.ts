import { UpdateCustomerDto } from 'src/application/dtos/customer/update-customer.dto';
import { Customer } from '../entities/customer.entity';

export interface ICustomerRepository {
  create(customer: Customer, userId: string): Promise<Customer>;
  findById(id: string): Promise<Customer | null>;
  findByUserId(userId: string): Promise<Customer | null>;
  findByPhone(phone: string): Promise<Customer | null>;
  findAll(): Promise<Customer[]>;
  findActiveCustomers(): Promise<Customer[]>;
  update(id: string, updateCustomerDto: UpdateCustomerDto): Promise<Customer>;
  delete(id: string): Promise<void>;
  updateDebt(id: string, debt: number): Promise<Customer>;
  updatePackagesDebt(id: string, packagesDebt: number): Promise<Customer>;
  /**
   * Ajuste atomiquement la dette d'emballages (delta positif = prêt, négatif = retour).
   * Retourne null si le client n'existe pas ou si la dette deviendrait négative.
   */
  adjustPackagesDebt(id: string, delta: number): Promise<Customer | null>;
  findWithPackagesDebt(): Promise<Customer[]>;
}
