import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'padZero',
})
export class PadZeroPipe implements PipeTransform {
  /**
   * Formats a number or string with leading zeros to reach the desired length.
   * @param value Number or numeric string to format
   * @param length Desired total string length (default is 2)
   */
  transform(value: number | string | null | undefined, length: number = 2): string {
    if (value === null || value === undefined || value === '') {
      return '';
    }

    const num = Number(value);
    if (isNaN(num)) {
      return String(value);
    }

    return String(num).padStart(length, '0');
  }
}
