import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'load',
})
export class LoadPipe implements PipeTransform {
  transform(value: any, text: string = '...'): any {
    return value === null || value === undefined ? text : value;
  }
}
