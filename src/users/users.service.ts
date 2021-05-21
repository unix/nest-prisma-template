import { Injectable } from '@nestjs/common'
import { PrismaService } from '@/shared/services'
import { CreateUserBodyDTO } from '@/users/users'
import { PaginatiorType } from '@/shared/pagination.decorator'

@Injectable()
export class UsersService {
  constructor(private readonly prisma: PrismaService) {}

  async createUser({ email, name }: CreateUserBodyDTO) {
    return this.prisma.users.create({
      data: {
        email,
        name,
      },
    })
  }

  async findUserById(userId: number) {
    return this.prisma.users.findUnique({
      where: { id: userId },
    })
  }

  async findAllUsers(pagination: PaginatiorType) {
    return this.prisma.users.findMany({
      skip: pagination.skip,
      take: pagination.take,
    })
  }
}
