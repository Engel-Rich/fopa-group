import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { APP_GUARD, APP_FILTER } from '@nestjs/core';
import { getDatabaseConfig } from './infrastructure/config/database.config';
import { JwtAuthGuard } from './presentation/guards/jwt-auth.guard';
import { GlobalExceptionFilter } from './shared/exceptions/global-exception.filter';
import { AuthModule } from './infrastructure/modules/auth.module';
import { UserModule } from './infrastructure/modules/user.module';
import { CategoryModule } from './infrastructure/modules/category.module';
import { ProductModule } from './infrastructure/modules/product.module';
import { StockModule } from './infrastructure/modules/stock.module';
import { CustomerModule } from './infrastructure/modules/customer.module';
import { OrderModule } from './infrastructure/modules/order.module';
import { ReportModule } from './infrastructure/modules/report.module';
import { AdminSeedService } from './infrastructure/database/seeds/admin.seed';
import { UserEntity } from './infrastructure/database/entities/user.entity';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: getDatabaseConfig,
      inject: [ConfigService],
    }),
    TypeOrmModule.forFeature([UserEntity]),
    AuthModule,
    UserModule,
    CategoryModule,
    ProductModule,
    StockModule,
    CustomerModule,
    OrderModule,
    ReportModule,
  ],
  providers: [
    {
      provide: APP_GUARD,
      useClass: JwtAuthGuard,
    },
    {
      provide: APP_FILTER,
      useClass: GlobalExceptionFilter,
    },
    AdminSeedService,
  ],
})
export class AppModule { }
