import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from '../users/users.service';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async validateUser(email: string, password: string): Promise<any> {
    const user = await this.usersService.findByEmail(email);
    if (user && (await bcrypt.compare(password, user.password))) {
      if (user.activo) {
        const { password, ...result } = user;
        return result;
      }
      throw new UnauthorizedException('El usuario no está activo');
    }
    throw new UnauthorizedException('Credenciales incorrectas');
  }

  async login(user: any) {
    const payload = { email: user._doc.email, sub: user._doc._id };
    const accessToken = this.jwtService.sign(payload);
    const refreshToken = this.jwtService.sign(payload, { expiresIn: '1h' });
    return { payload, accessToken, refreshToken };
  }

  async refreshToken(refreshToken: string) {
    try {
      const payload = this.jwtService.verify(refreshToken);
      const user = await this.usersService.findOne(payload.sub);
      if (!user) {
        throw new UnauthorizedException('Usuario no encontrado');
      }
      const newPayload = { email: user.email, sub: user._id };
      const accessToken = this.jwtService.sign(newPayload);
      return { accessToken };
    } catch (error) {
      throw new UnauthorizedException('Refresh token inválido');
    }
  }

  async logout(userId: string) {
    // Aquí puedes implementar la lógica para invalidar el token (opcional)
    return { message: 'Sesión cerrada correctamente' };
  }
}