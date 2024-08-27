import { ClerkProvider } from "./providers";
import { AuthService } from "./service";

export const authService = new AuthService(new ClerkProvider());