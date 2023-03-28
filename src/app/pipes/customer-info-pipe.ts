import { Pipe, PipeTransform } from '@angular/core';
import { Customer } from '../models/customer.model';

@Pipe({ name: 'customerInfo' })
export class customerInfoPipe implements PipeTransform {
  transform(obj?: Customer): string {
    if (!obj) {
      return '';
    }

    return `${obj.fullName} (${obj.birthYear})`;
  }
}
