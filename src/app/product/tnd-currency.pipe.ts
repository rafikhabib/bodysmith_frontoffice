import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'tndCurrency'
})
export class TndCurrencyPipe implements PipeTransform {
  transform(value: number): string {
    return value.toLocaleString('fr-TN', { style: 'currency', currency: 'TND' });
  }
}
