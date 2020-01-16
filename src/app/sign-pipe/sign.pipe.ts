import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'sign'
})
export class SignPipe implements PipeTransform {

  transform(value: number): string {
    return `${value > 0 ? '+' : ''}${value}`;
  }

}
