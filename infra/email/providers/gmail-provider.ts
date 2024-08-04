import { EmailStrategy } from "../strategy";
import nodemailer from 'nodemailer';

export class GmailProvider implements EmailStrategy {
  private transporter: nodemailer.Transporter;

  constructor() {
    // Create a transporter using Gmail service
    this.transporter = nodemailer.createTransport({
      port: +process.env.MAIL_PORT!,
      host: process.env.MAIL_HOST,
    });
  }

  async sendEmail(to: string, subject: string, body: string): Promise<void> {
    const mailOptions: nodemailer.SendMailOptions = {
      from: process.env.GMAIL_USER, // Sender address
      to, // List of recipients
      subject, // Subject line
      text: body, // Plain text body
    };

    try {
      await this.transporter.sendMail(mailOptions);
      console.log(`Email sent to ${to} with subject "${subject}"`);
    } catch (error) {
      console.error(`Failed to send email to ${to}:`, error);
    }
  }
}