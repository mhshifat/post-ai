import { GmailProvider } from "./providers";
import { EmailService } from "./service";

export const mailService = new EmailService(new GmailProvider());