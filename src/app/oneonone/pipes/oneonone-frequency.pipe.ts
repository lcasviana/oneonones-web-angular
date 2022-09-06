import { Pipe, PipeTransform } from '@angular/core';
import { Frequency } from '../models/frequency.enum';

@Pipe({ name: 'frequency' })
export class OneononeFrequencyPipe implements PipeTransform {
  transform(value: number): string {
    const description = Frequency[value];
    if (!description) throw 'Invalid frequency value.'
    return description;
  }
}