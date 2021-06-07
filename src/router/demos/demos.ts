import { IsNotEmpty, IsString, MaxLength } from 'class-validator'

export class CreateDemosBodyDTO {
  @MaxLength(100, { message: 'Exceeding length limits' })
  @IsString({ message: 'The content must be a string' })
  @IsNotEmpty({ message: 'Missing content' })
  content: string
}
