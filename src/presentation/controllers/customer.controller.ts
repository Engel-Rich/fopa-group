import {
  Controller,
  Get,
  Post,
  Put,
  Body,
  Param,
  Query,
  UseGuards,
} from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth, ApiQuery } from '@nestjs/swagger';
import { CreateCustomerUseCase } from '../../application/usecases/customer/create-customer.usecase';
import { ListCustomersUseCase } from '../../application/usecases/customer/list-customers.usecase';
import { UpdateCustomerUseCase } from '../../application/usecases/customer/update-customer.usecase';
import { CreateCustomerDto } from '../../application/dtos/customer/create-customer.dto';
import { UpdateCustomerDto } from '../../application/dtos/customer/update-customer.dto';
import { CustomerResponseDto } from '../../application/dtos/customer/customer-response.dto';
import { JwtAuthGuard } from '../guards/jwt-auth.guard';
import { RolesGuard } from '../guards/roles.guard';
import { Roles } from '../decorators/roles.decorator';
import { UserRole } from '../../domain/entities/user.entity';

@ApiTags('Customers')
@Controller('customers')
@UseGuards(JwtAuthGuard, RolesGuard)
@ApiBearerAuth()
export class CustomerController {
  constructor(
    private readonly createCustomerUseCase: CreateCustomerUseCase,
    private readonly listCustomersUseCase: ListCustomersUseCase,
    private readonly updateCustomerUseCase: UpdateCustomerUseCase,
  ) { }

  @Post()
  @Roles(UserRole.ADMIN, UserRole.CAISSIERE)
  @ApiOperation({ summary: 'Créer un client' })
  @ApiResponse({ status: 201, description: 'Client créé', type: CustomerResponseDto })
  async create(@Body() dto: CreateCustomerDto): Promise<CustomerResponseDto> {
    return this.createCustomerUseCase.execute(dto);
  }

  @Get()
  @Roles(UserRole.ADMIN, UserRole.CAISSIERE)
  @ApiOperation({ summary: 'Liste tous les clients' })
  @ApiQuery({ name: 'activeOnly', required: false, type: Boolean })
  @ApiResponse({ status: 200, description: 'Liste des clients', type: [CustomerResponseDto] })
  async findAll(@Query('activeOnly') activeOnly?: string): Promise<CustomerResponseDto[]> {
    const active = activeOnly === 'true';
    return this.listCustomersUseCase.execute(active);
  }

  @Put(':id')
  @Roles(UserRole.ADMIN, UserRole.CAISSIERE)
  @ApiOperation({ summary: 'Mettre à jour un client' })
  @ApiResponse({ status: 200, description: 'Client mis à jour', type: CustomerResponseDto })
  async update(
    @Param('id') id: string,
    @Body() dto: UpdateCustomerDto,
  ): Promise<CustomerResponseDto> {
    return this.updateCustomerUseCase.execute(id, dto);
  }
}
