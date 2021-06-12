import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'navbarTrim'
})
export class NavbarTrimPipe implements PipeTransform {

  transform(value: any, ...args: unknown[]): unknown {
    let lower = value.toLowerCase()
    let data = lower.replace(/ +/g, '-')
    return data;
  }

}
