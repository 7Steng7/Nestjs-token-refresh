import { ApiProperty } from '@nestjs/swagger';

export class LoginDto {
  @ApiProperty({ description: 'Nombre completo', example: 'Un nombre completo de ejemplo' })
  email: string;

  @ApiProperty({ description: 'Contraseña', example: 'contraseña123!' })
  password: string;
}