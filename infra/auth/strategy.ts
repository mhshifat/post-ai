export interface AuthStrategy {
  signUp: () => Promise<void>;
  signIn: () => Promise<void>;
  signOut: () => Promise<void>;
  getSession: () => Promise<any>;
}