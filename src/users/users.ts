import { IsEmail, IsNotEmpty, IsOptional, MaxLength, MinLength } from 'class-validator'

export class CreateUserBodyDTO {
  @MaxLength(20, { message: 'exceeds length' })
  @MinLength(3, { message: 'username too short' })
  @IsNotEmpty({ message: 'username missing' })
  name: string

  @IsEmail({}, { message: 'must be an email address' })
  @IsOptional()
  email?: string
}
