import { Injectable, Inject } from '@nestjs/common';
import type { IOrderRepository } from '../../../domain/repositories/order.repository.interface';
import { NotFoundException } from '../../../shared/exceptions/business.exception';
import { OrderResponseDto } from '../../dtos/order/order-response.dto';

@Injectable()
export class GetOrderDetailsUseCase {
  constructor(
    @Inject('IOrderRepository')
    private readonly orderRepository: IOrderRepository,
  ) { }

  async execute(orderId: string): Promise<OrderResponseDto> {
    const order = await this.orderRepository.findById(orderId);
    if (!order) {
      throw new NotFoundException('Commande');
    }

    return {
      id: order.id,
      orderNumber: order.orderNumber,
      customerId: order.customerId,
      customer: order.customer
        ? {
          id: order.customer.id,
          userId: order.customer.userId,
          user: {
            id: order.customer.userId,
            name: order.customer.name,
            phone: order.customer.phone || undefined,
            email: order.customer.email || undefined,
            username: order.customer.username,
            role: order.customer.role,
            isActive: order.customer.isActive || true,
            createdAt: order.customer.createdAt,
            updatedAt: order.customer.updatedAt,
          },
          address: order.customer.address,
          currentDebt: order.customer.currentDebt,
          currentPackagesDebt: order.customer.currentPackagesDebt ?? 0,
          createdAt: order.customer.createdAt,
          updatedAt: order.customer.updatedAt,
        }
        : undefined,
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
      items: order.items
        ? order.items.map((item) => ({
          id: item.id,
          orderId: item.orderId,
          productId: item.productId,
          productName: item.productName,
          quantity: item.quantity,
          unitPrice: item.unitPrice,
          subtotal: item.subtotal,
          createdAt: item.createdAt,
        }))
        : undefined,
      payments: order.payments
        ? order.payments.map((payment) => ({
          id: payment.id,
          orderId: payment.orderId,
          amount: payment.amount,
          paymentMethod: payment.paymentMethod,
          reference: payment.reference,
          userId: payment.userId,
          createdAt: payment.createdAt,
        }))
        : undefined,
      createdAt: order.createdAt,
      updatedAt: order.updatedAt,
    };
  }
}
