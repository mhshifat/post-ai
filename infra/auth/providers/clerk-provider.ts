import { AuthStrategy } from "../strategy";

export class ClerkProvider implements AuthStrategy {
  constructor() {}

  async signUp() {
    return Promise.resolve();
  }
  signIn() {
    return Promise.resolve();
  }
  signOut() {
    return Promise.resolve();
  }
  getSession() {
    return Promise.resolve();
  }
}