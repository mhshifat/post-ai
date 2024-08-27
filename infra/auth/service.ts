import { AuthStrategy } from "./strategy";

export class AuthService {
  private strategy: AuthStrategy;

  constructor(strategy: AuthStrategy) {
    this.strategy = strategy;
  }

  setStrategy(strategy: AuthStrategy) {
    this.strategy = strategy;
  }

  get auth() {
    return this.strategy;
  }
}