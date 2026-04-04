import { Injectable, Inject } from '@nestjs/common';
import type { IOrderRepository } from '../../../domain/repositories/order.repository.interface';
import { OrderListDto } from '../../dtos/order/order-list.dto';
import { OrderResponseDto } from '../../dtos/order/order-response.dto';
import { OrderStatus } from '../../../domain/entities/order.entity';

@Injectable()
export class ListOrdersUseCase {
  constructor(
    @Inject('IOrderRepository')
    private readonly orderRepository: IOrderRepository,
  ) { }

  async execute(
    page: number = 1,
    limit: number = 10,
    customerId?: string,
    status?: OrderStatus,
  ): Promise<OrderListDto> {
    const result = await this.orderRepository.findPaginated(
      page,
      limit,
      customerId,
      status,
    );

    const orders: OrderResponseDto[] = result.data.map((order) => ({
      id: order.id,
      orderNumber: order.orderNumber,
      customerId: order.customerId,
      customer: order.customer ? {
        id: order.customer.id,
        userId: order.customer.userId,
        address: order.customer!.address,
        currentDebt: order.customer.currentDebt,
        currentPackagesDebt: order.customer.currentPackagesDebt ?? 0,
        createdAt: order.customer.createdAt,
        updatedAt: order.customer.updatedAt,
        user: {
          id: order.customer.userId,
          name: order.customer.name,
          email: order.customer.email,
          phone: order.customer.phone,
          username: order.customer.username,
          role: order.customer.role,
          isActive: order.customer.isActive,
          createdAt: order.customer.createdAt,
          updatedAt: order.customer.updatedAt,
        }
      } : undefined,
      previousDebt: order.previousDebt,
      subtotal: order.subtotal,
      totalAmount: order.totalAmount,
      amountGiven: order.amountGiven,
      amountPaid: order.amountPaid,
      remainingDebt: order.remainingDebt,
      packages: order.packages,
      packagesReturned: order.packagesReturned,
      remainingPackages: order.remainingPackages,
      status: order.status,
      userId: order.userId,
      createdBy: order.createdByUser ? {
        id: order.createdByUser.id,
        name: order.createdByUser.name,
        email: order.createdByUser.email,
        phone: order.createdByUser.phone,
        username: order.createdByUser.username,
        role: order.createdByUser.role,
        isActive: order.createdByUser.isActive,
        createdAt: order.createdByUser.createdAt,
        updatedAt: order.createdByUser.updatedAt,
      } : undefined,

      items: order.items?.map((item) => ({
        id: item.id,
        orderId: item.orderId,
        productId: item.productId,
        name: item.name,
        quantity: item.quantity,        
        unitPrice: item.unitPrice,
        subtotal: item.subtotal,
        createdAt: item.createdAt,
      })),
      payments: order.payments?.map((payment) => ({
        id: payment.id,
        orderId: payment.orderId,
        amount: payment.amount,
        paymentMethod: payment.paymentMethod,
        reference: payment.reference,
        userId: payment.userId,
        createdAt: payment.createdAt,
      })),
      createdAt: order.createdAt,
      updatedAt: order.updatedAt,
    }));

    return {
      orders,
      total: result.total,
      page: result.page,
      limit: result.limit,
    };
  }
}
