import { Pipe, PipeTransform } from '@angular/core';

const frequencyDescriptions: Map<number, string> = new Map([
  [7, 'Weekly'],
  [15, 'Semimonthly'],
  [30, 'Monthly'],
  [60, 'Bimonthly'],
  [90, 'Trimonthly'],
  [180, 'Semiyearly'],
  [365, 'Yearly'],
  [999, 'Occasionally'],
]);

@Pipe({ name: 'frequency' })
export class OneononeFrequencyPipe implements PipeTransform {
  transform(value: number): string {
    const description = frequencyDescriptions.get(value);
    if (!description) throw 'Invalid frequency value.'
    return description;
  }
}