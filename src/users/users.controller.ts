import { Body, Controller, Get, Param, Post } from '@nestjs/common'
import { UsersService } from './users.service'
import { CreateUserBodyDTO } from './users'
import { PrimaryKeyPipe } from '@/shared/pipes'
import { Pagination, PaginatiorType } from '@/shared/pagination.decorator'

@Controller('users')
export class UsersController {
  constructor(private usersSecvice: UsersService) {}

  @Post('/')
  async createUser(@Body() user: CreateUserBodyDTO) {
    return await this.usersSecvice.createUser(user)
  }

  @Get('/:uid')
  async getUser(@Param('uid', PrimaryKeyPipe) userId: number) {
    return await this.usersSecvice.findUserById(userId)
  }

  /**
   * Set parameters in Request headers to paginate:
   * headers = {
   *   page: number
   *   pre_page: number
   * }
   */
  @Get('/')
  async getAllUsers(@Pagination() pagination: PaginatiorType) {
    return await this.usersSecvice.findAllUsers(pagination)
  }
}
