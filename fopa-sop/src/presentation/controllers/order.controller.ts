import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Query,
  UseGuards,
} from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth, ApiQuery } from '@nestjs/swagger';
import { CreateOrderUseCase } from '../../application/usecases/order/create-order.usecase';
import { AddPaymentUseCase } from '../../application/usecases/order/add-payment.usecase';
import { GetOrderDetailsUseCase } from '../../application/usecases/order/get-order-details.usecase';
import { ListOrdersUseCase } from '../../application/usecases/order/list-orders.usecase';
import { CreateOrderDto } from '../../application/dtos/order/create-order.dto';
import { AddPaymentDto } from '../../application/dtos/order/add-payment.dto';
import { OrderResponseDto } from '../../application/dtos/order/order-response.dto';
import { OrderListDto } from '../../application/dtos/order/order-list.dto';
import { PaymentResponseDto } from '../../application/dtos/order/payment-response.dto';
import { JwtAuthGuard } from '../guards/jwt-auth.guard';
import { RolesGuard } from '../guards/roles.guard';
import { Roles } from '../decorators/roles.decorator';
import { CurrentUser } from '../decorators/current-user.decorator';
import { UserRole } from '../../domain/entities/user.entity';
import { OrderStatus } from '../../domain/entities/order.entity';

@ApiTags('Orders')
@Controller('orders')
@UseGuards(JwtAuthGuard, RolesGuard)
@ApiBearerAuth()
export class OrderController {
  constructor(
    private readonly createOrderUseCase: CreateOrderUseCase,
    private readonly addPaymentUseCase: AddPaymentUseCase,
    private readonly getOrderDetailsUseCase: GetOrderDetailsUseCase,
    private readonly listOrdersUseCase: ListOrdersUseCase,
  ) { }

  @Get()
  @Roles(UserRole.ADMIN, UserRole.CAISSIERE)
  @ApiOperation({ summary: 'Liste des commandes avec pagination' })
  @ApiQuery({ name: 'page', required: false, type: Number, description: 'Numéro de page (défaut: 1)' })
  @ApiQuery({ name: 'limit', required: false, type: Number, description: 'Nombre d\'éléments par page (défaut: 10)' })
  @ApiQuery({ name: 'customerId', required: false, type: String, description: 'Filtrer par ID du client' })
  @ApiQuery({ name: 'status', required: false, enum: OrderStatus, description: 'Filtrer par statut de la commande' })
  @ApiResponse({ status: 200, description: 'Liste paginée des commandes', type: OrderListDto })
  async findAll(
    @Query('page') page?: string,
    @Query('limit') limit?: string,
    @Query('customerId') customerId?: string,
    @Query('status') status?: OrderStatus,
  ): Promise<OrderListDto> {
    const pageNumber = page ? parseInt(page, 10) : 1;
    const limitNumber = limit ? parseInt(limit, 10) : 10;
    return this.listOrdersUseCase.execute(pageNumber, limitNumber, customerId, status);
  }

  @Post()
  @Roles(UserRole.ADMIN, UserRole.CAISSIERE)
  @ApiOperation({ summary: 'Créer une commande' })
  @ApiResponse({ status: 201, description: 'Commande créée', type: OrderResponseDto })
  async create(
    @Body() dto: CreateOrderDto,
    @CurrentUser() user: any,
  ): Promise<OrderResponseDto> {
    // logue current user
    console.log('current user', user);
    const response = await this.createOrderUseCase.execute(dto, user.id);
    return await this.getOrderDetailsUseCase.execute(response.id);
  }

  @Get(':id')
  @Roles(UserRole.ADMIN, UserRole.CAISSIERE)
  @ApiOperation({ summary: 'Obtenir les détails d\'une commande' })
  @ApiResponse({ status: 200, description: 'Détails de la commande', type: OrderResponseDto })
  async findOne(@Param('id') id: string): Promise<OrderResponseDto> {
    return this.getOrderDetailsUseCase.execute(id);
  }

  @Post(':id/payments')
  @Roles(UserRole.ADMIN, UserRole.CAISSIERE)
  @ApiOperation({ summary: 'Ajouter un paiement à une commande' })
  @ApiResponse({ status: 201, description: 'Paiement ajouté', type: PaymentResponseDto })
  async addPayment(
    @Body() dto: AddPaymentDto,
    @CurrentUser() user: any,
  ): Promise<PaymentResponseDto> {
    return this.addPaymentUseCase.execute(dto, user.id);
  }
}
