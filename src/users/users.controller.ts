import {
    Controller,
    Get,
    Post,
    Body,
    Param,
    Put,
    Delete,
    NotFoundException,
  } from '@nestjs/common';
  import { UsersService } from './users.service';
  import { CreateUserDto } from './dtos/create-user.dto';
  import { UpdateUserDto } from './dtos/update-user.dto';
  import {
    ApiTags,
    ApiOperation,
    ApiResponse,
    ApiBody,
    ApiParam,
  } from '@nestjs/swagger';
  
  @ApiTags('users')
  @Controller('users')
  export class UsersController {
    constructor(private readonly usersService: UsersService) {}
  
    @ApiOperation({ summary: 'Obtener todos los usuarios' })
    @ApiResponse({ status: 200, description: 'Usuarios encontrados' })
    @Get()
    async findAll() {
      return this.usersService.findAll();
    }
  
    @ApiOperation({ summary: 'Obtener un usuario por ID' })
    @ApiResponse({ status: 200, description: 'Usuario encontrado' })
    @ApiResponse({ status: 404, description: 'Usuario no encontrado' })
    @ApiParam({ name: 'id', description: 'ID del usuario', type: String })
    @Get(':id')
    async findOne(@Param('id') id: string) {
      const user = await this.usersService.findOne(id);
      if (!user) {
        throw new NotFoundException('Usuario no encontrado');
      }
      return user;
    }

    @ApiOperation({ summary: 'Obtener un usuario por correo electrónico' })
    @ApiResponse({ status: 200, description: 'Usuario encontrado' })
    @ApiResponse({ status: 404, description: 'Usuario no encontrado' })
    @Get('email/:email')
    async findByEmail(@Param('email') email: string) {
      return this.usersService.findByEmail(email);
    }
 
    @ApiOperation({ summary: 'Crear un nuevo usuario' })
    @ApiResponse({ status: 201, description: 'Usuario creado' })
    @ApiBody({ type: CreateUserDto })
    @Post()
    async create(@Body() createUserDto: CreateUserDto) {
      return this.usersService.create(createUserDto);
    }
  
    @ApiOperation({ summary: 'Actualizar un usuario por ID' })
    @ApiResponse({ status: 200, description: 'Usuario actualizado' })
    @ApiResponse({ status: 404, description: 'Usuario no encontrado' })
    @ApiParam({ name: 'id', description: 'ID del usuario', type: String })
    @ApiBody({ type: UpdateUserDto })
    @Put(':id')
    async update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
      const updatedUser = await this.usersService.update(id, updateUserDto);
      if (!updatedUser) {
        throw new NotFoundException('Usuario no encontrado');
      }
      return updatedUser;
    }
  
    @ApiOperation({ summary: 'Eliminar un usuario por ID' })
    @ApiResponse({ status: 200, description: 'Usuario eliminado' })
    @ApiResponse({ status: 404, description: 'Usuario no encontrado' })
    @ApiParam({ name: 'id', description: 'ID del usuario', type: String })
    @Delete(':id')
    async remove(@Param('id') id: string) {
      const deletedUser = await this.usersService.remove(id);
      if (!deletedUser) {
        throw new NotFoundException('Usuario no encontrado');
      }
      return deletedUser;
    }
  }