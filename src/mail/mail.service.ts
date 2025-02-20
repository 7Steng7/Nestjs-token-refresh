import { Injectable } from '@nestjs/common';
import * as nodemailer from 'nodemailer';

@Injectable()
export class MailService {
  private transporter;

  constructor() {
    this.transporter = nodemailer.createTransport({
      service: 'gmail', // Cambia según tu proveedor
      auth: {
        user: 'tu_correo@gmail.com',
        pass: 'tu_contraseña',
      },
    });
  }

  async sendPasswordResetEmail(email: string, token: string): Promise<void> {
    const resetUrl = `http://tudominio.com/reset-password?token=${token}`;

    await this.transporter.sendMail({
      from: 'tu_correo@gmail.com',
      to: email,
      subject: 'Recuperación de contraseña',
      text: `Haz clic en el siguiente enlace para restablecer tu contraseña: ${resetUrl}`,
      html: `<p>Haz clic en el siguiente enlace para restablecer tu contraseña: <a href="${resetUrl}">${resetUrl}</a></p>`,
    });
  }
}