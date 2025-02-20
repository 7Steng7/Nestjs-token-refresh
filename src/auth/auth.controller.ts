import {
    Controller,
    Post,
    Body,
    UseGuards,
    Req,
    Res,
    UnauthorizedException,
  } from '@nestjs/common';
  import { AuthService } from './auth.service';
  import { LoginDto } from './dtos/login.dto';
  import { RefreshTokenDto } from './dtos/refresh-token.dto';
  import { JwtAuthGuard } from './guards/jwt-auth.guard';
  import { Request, Response } from 'express';
  
  @Controller('auth')
  export class AuthController {
    constructor(private authService: AuthService) {}
  
    @Post('login')
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
    async refreshToken(@Body() refreshTokenDto: RefreshTokenDto) {
      return this.authService.refreshToken(refreshTokenDto.refreshToken);
    }
  
    @Post('logout')
    @UseGuards(JwtAuthGuard)
    async logout(@Req() req: Request, @Res() res: Response) {
      if (!req.user) {
        throw new UnauthorizedException('User not found');
      }
      const userId = req.user['sub'];
      await this.authService.logout(userId);
      res.clearCookie('refresh_token');
      return res.send({ message: 'Sesión cerrada correctamente' });
    }
  }