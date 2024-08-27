import { AiStrategy } from "./strategy";

export class AiService {
  private strategy: AiStrategy;

  constructor(strategy: AiStrategy) {
    this.strategy = strategy;
  }

  setStrategy(strategy: AiStrategy) {
    this.strategy = strategy;
  }

  get instance() {
    return this.strategy;
  }
}