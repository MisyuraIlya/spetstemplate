import { Controller, Get, Post, Body, Patch, Param, Delete, Query, NotFoundException } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Controller('api/auth/users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  async create(@Body() createUserDto: CreateUserDto) {
    const user = await this.userService.createUser(createUserDto);
    return { data: { ...user.toObject(), id: user._id } };
  }

  @Get()
  async findAll(
    @Query('page') page: number = 1,
    @Query('perPage') perPage: number = 10,
    @Query('sort') sort: string = 'name',
    @Query('order') order: string = 'asc'
  ) {
    const { data, total } = await this.userService.findAllUsers(page, perPage, sort, order);
    return { data, total };
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    const user = await this.userService.findOneUser(id);
    if (!user) {
      throw new NotFoundException(`User with ID ${id} not found`);
    }
    return { data: { ...user.toObject(), id: user._id } };
  }

  @Patch(':id')
  async update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    const user = await this.userService.updateUser(id, updateUserDto);
    if (!user) {
      throw new NotFoundException(`User with ID ${id} not found`);
    }
    return { data: { ...user.toObject(), id: user._id } };
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    await this.userService.deleteUser(id);
    return { data: { id } };
  }
}
