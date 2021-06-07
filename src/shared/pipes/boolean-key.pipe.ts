import { ArgumentMetadata, Injectable, PipeTransform } from '@nestjs/common'

@Injectable()
export class BooleanKeyPipe implements PipeTransform<string | number, boolean> {
  transform(value: string | number, metadata: ArgumentMetadata) {
    return Boolean(value) && value !== 'undefined' && value !== '0'
  }
}
