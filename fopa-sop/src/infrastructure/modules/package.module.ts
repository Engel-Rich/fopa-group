import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PackageController } from '../../presentation/controllers/package.controller';
import { LendPackagesUseCase } from '../../application/usecases/package/lend-packages.usecase';
import { ReturnPackagesUseCase } from '../../application/usecases/package/return-packages.usecase';
import { GetPackagesDebtUseCase } from '../../application/usecases/package/get-packages-debt.usecase';
import { GetPackagesHistoryUseCase } from '../../application/usecases/package/get-packages-history.usecase';
import { PackageTransactionRepository } from '../repositories/package-transaction.repository';
import { CustomerRepository } from '../repositories/customer.repository';
import { PackageTransactionEntity } from '../database/entities/package-transaction.entity';
import { CustomerEntity } from '../database/entities/customer.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([PackageTransactionEntity, CustomerEntity]),
  ],
  controllers: [PackageController],
  providers: [
    LendPackagesUseCase,
    ReturnPackagesUseCase,
    GetPackagesDebtUseCase,
    GetPackagesHistoryUseCase,
    {
      provide: 'IPackageTransactionRepository',
      useClass: PackageTransactionRepository,
    },
    {
      provide: 'ICustomerRepository',
      useClass: CustomerRepository,
    },
  ],
})
export class PackageModule {}
