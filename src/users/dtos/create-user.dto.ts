import { ApiProperty } from '@nestjs/swagger';

export class CreateUserDto {
  @ApiProperty({ description: 'Nombre completo', example: 'Un nombre completo de ejemplo' })
  nameUser: string;

  @ApiProperty({ description: 'Correo electrónico', example: 'correoEjemplo@example.com' })
  email: string;

  @ApiProperty({ description: 'Contraseña', example: 'contraseña123!' })
  password: string;
}