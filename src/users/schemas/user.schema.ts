import { Document } from 'mongoose';
import { Prop, Schema as NestSchema, SchemaFactory } from '@nestjs/mongoose';
import { ApiProperty } from '@nestjs/swagger';

@NestSchema({ timestamps: true })
export class User extends Document {
  @ApiProperty({ description: 'Nombre completo', example: 'Un nombre completo ejemplo' })
  @Prop({ required: true, unique: true })
  nameUser: string;

  @ApiProperty({ description: 'Correo electrónico', example: 'nombreEjemplo@example.com' })
  @Prop({ required: true, unique: true })
  email: string;

  @ApiProperty({ description: 'Contraseña', example: 'Unacontraseña!' })
  @Prop({ required: true })
  password: string;

  @ApiProperty({ description: 'Usuario activo', example: true })
  @Prop({ default: true })
  activo: boolean;
}

export const UserSchema = SchemaFactory.createForClass(User);