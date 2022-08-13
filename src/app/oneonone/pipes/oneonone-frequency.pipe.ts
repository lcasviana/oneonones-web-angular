import { Pipe, PipeTransform } from '@angular/core';

const mapValueToString = new Map(Object.entries({
  7: 'Weekly',
  15: 'Semimonthly',
  30: 'Monthly',
  60: 'Bimonthly',
  90: 'Trimonthly',
  180: 'Semiyearly',
  365: 'Yearly',
  999: 'Occasionally',
}).map(([key, value]) => [Number(key), value]));

@Pipe({ name: 'frequency' })
export class OneononeFrequencyPipe implements PipeTransform {
  transform(value: number): string {
    return mapValueToString.get(value)!;
  }
}