import { ArgumentMetadata, Injectable, PipeTransform } from '@nestjs/common';

@Injectable()
export class UppercasePipe implements PipeTransform<string, string> {
  transform(value: string, metadata: ArgumentMetadata): string {
    console.log('value', value)
    console.log('metadata.type', metadata.type)
    console.log('-----------------------------')

    if (!value)
      return value;

    return value.toUpperCase();
  }
}