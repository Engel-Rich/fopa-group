export declare class PaymentReferenceGenerator {
    private static counter;
    static generate(paymentMethod: string): string;
    private static getPrefixForPaymentMethod;
    static resetCounter(): void;
}
