import { EmailStrategy } from "./strategy";

export class EmailService {
  private strategy: EmailStrategy;

  constructor(strategy: EmailStrategy) {
    this.strategy = strategy;
  }

  setStrategy(strategy: EmailStrategy) {
    this.strategy = strategy;
  }

  async sendEmail(to: string, subject: string, body: string): Promise<void> {
    await this.strategy.sendEmail(to, subject, body);
  }
}