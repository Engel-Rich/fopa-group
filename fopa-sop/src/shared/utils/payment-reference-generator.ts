export class PaymentReferenceGenerator {
  private static counter = 0;

  static generate(paymentMethod: string): string {
    const now = new Date();
    const year = now.getFullYear();
    const month = String(now.getMonth() + 1).padStart(2, '0');
    const day = String(now.getDate()).padStart(2, '0');
    const hours = String(now.getHours()).padStart(2, '0');
    const minutes = String(now.getMinutes()).padStart(2, '0');
    const seconds = String(now.getSeconds()).padStart(2, '0');

    this.counter = (this.counter + 1) % 10000;
    const counterStr = String(this.counter).padStart(4, '0');

    // Préfixe selon le mode de paiement
    const prefix = this.getPrefixForPaymentMethod(paymentMethod);

    return `${prefix}-${year}${month}${day}-${hours}${minutes}${seconds}-${counterStr}`;
  }

  private static getPrefixForPaymentMethod(paymentMethod: string): string {
    switch (paymentMethod) {
      case 'CASH':
        return 'CASH';
      case 'MOBILE_MONEY':
        return 'MM';
      case 'BANK_TRANSFER':
        return 'BT';
      case 'OTHER':
        return 'PAY';
      case 'MANUAL_PACKAGE':
        return 'PKG';
      default:
        return 'PAY';
    }
  }

  static resetCounter(): void {
    this.counter = 0;
  }
}
