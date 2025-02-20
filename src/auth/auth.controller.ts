import { 
  Controller, 
  Post, 
  Body, 
  UseGuards, 
  Req, 
  Res, 
  UnauthorizedException, 
  Query 
} from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth, ApiBody, ApiQuery } from '@nestjs/swagger';
import { AuthService } from './auth.service';
import { LoginDto } from './dtos/login.dto';
import { RefreshTokenDto } from './dtos/refresh-token.dto';
import { JwtAuthGuard } from './guards/jwt-auth.guard';
import { Request, Response } from 'express';

@ApiTags('auth') // Categoriza este controlador en Swagger
@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('login')
  @ApiOperation({ summary: 'Iniciar sesión', description: 'Autentica a un usuario y devuelve tokens de acceso y refresco.' })
  @ApiResponse({ status: 200, description: 'Inicio de sesión exitoso' })
  @ApiResponse({ status: 401, description: 'Credenciales incorrectas' })
  @ApiBody({ type: LoginDto })
  async login(@Body() loginDto: LoginDto, @Res() res: Response) {
    const user = await this.authService.validateUser(loginDto.email, loginDto.password);
    if (!user) {
      throw new UnauthorizedException('Credenciales incorrectas');
    }

    const tokens = await this.authService.login(user);
    res.cookie('refresh_token', tokens.refreshToken, { httpOnly: true });
    return res.send({ email: loginDto.email, access_token: tokens.accessToken });
  }

  @Post('refresh-token')
  @ApiOperation({ summary: 'Refrescar token', description: 'Genera un nuevo token de acceso con un refresh token válido.' })
  @ApiResponse({ status: 200, description: 'Token refrescado correctamente' })
  @ApiResponse({ status: 401, description: 'Token de refresco inválido o expirado' })
  @ApiBody({ type: RefreshTokenDto })
  async refreshToken(@Body() refreshTokenDto: RefreshTokenDto) {
    return this.authService.refreshToken(refreshTokenDto.refreshToken);
  }

  @Post('logout')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Cerrar sesión', description: 'Invalida el token de acceso y elimina el refresh token.' })
  @ApiResponse({ status: 200, description: 'Sesión cerrada correctamente' })
  @ApiResponse({ status: 401, description: 'Usuario no autenticado' })
  async logout(@Req() req: Request, @Res() res: Response) {
    if (!req.user) {
      throw new UnauthorizedException('User not found');
    }
    const userId = req.user['sub'];
    await this.authService.logout(userId);
    res.clearCookie('refresh_token');
    return res.send({ message: 'Sesión cerrada correctamente' });
  }

  @Post('request-password-reset')
  @ApiOperation({ summary: 'Solicitar restablecimiento de contraseña', description: 'Envía un correo con un enlace para restablecer la contraseña.' })
  @ApiResponse({ status: 200, description: 'Correo de recuperación enviado' })
  @ApiBody({ schema: { properties: { email: { type: 'string', example: 'usuario@email.com' } } } })
  async requestPasswordReset(@Body('email') email: string) {
    await this.authService.requestPasswordReset(email);
    return { message: 'Correo de recuperación enviado' };
  }

  @Post('reset-password')
  @ApiOperation({ summary: 'Restablecer contraseña', description: 'Permite restablecer la contraseña usando un token válido.' })
  @ApiResponse({ status: 200, description: 'Contraseña restablecida correctamente' })
  @ApiResponse({ status: 400, description: 'Token inválido o expirado' })
  @ApiQuery({ name: 'token', type: 'string', description: 'Token de recuperación de contraseña' })
  @ApiBody({ schema: { properties: { newPassword: { type: 'string', example: 'NuevaContraseña123!' } } } })
  async resetPassword(
    @Query('token') token: string,
    @Body('newPassword') newPassword: string,
  ) {
    await this.authService.resetPassword(token, newPassword);
    return { message: 'Contraseña restablecida correctamente' };
  }
}