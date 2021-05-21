import { ArgumentMetadata, BadRequestException, Injectable, PipeTransform } from '@nestjs/common'

@Injectable()
export class PrimaryKeyPipe implements PipeTransform<string | number, number> {
  transform(value: string | number, metadata: ArgumentMetadata) {
    if (!value || Number.isNaN(+value)) {
      throw new BadRequestException('Missing parameter')
    }
    return +value
  }
}
