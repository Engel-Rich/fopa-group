export class OrderNumberGenerator {
  private static counter = 0;

  static generate(): string {
    const now = new Date();
    const year = now.getFullYear();
    const month = String(now.getMonth() + 1).padStart(2, '0');
    const day = String(now.getDate()).padStart(2, '0');
    const hours = String(now.getHours()).padStart(2, '0');
    const minutes = String(now.getMinutes()).padStart(2, '0');
    const seconds = String(now.getSeconds()).padStart(2, '0');

    this.counter = (this.counter + 1) % 10000;
    const counterStr = String(this.counter).padStart(4, '0');

    return `CMD-${year}${month}${day}-${hours}${minutes}${seconds}-${counterStr}`;
  }

  static resetCounter(): void {
    this.counter = 0;
  }
}
