import { ApiProperty } from '@nestjs/swagger';

export class UpdateUserDto {
  @ApiProperty({ description: 'Nombre completo', example: 'Otro nombre completo de ejemplo', required: false })
  nameUser?: string;

  @ApiProperty({ description: 'Correo electrónico', example: 'otroCorreoEjemplo@example.com', required: false })
  email?: string;

  @ApiProperty({ description: 'Contraseña', example: 'NuevaContraseña123!', required: false })
  password?: string;

  @ApiProperty({ description: 'Usuario activo', example: true, required: false })
  activo?: boolean;
}