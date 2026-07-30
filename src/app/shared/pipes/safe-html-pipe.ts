import { inject, Pipe, PipeTransform } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';

@Pipe({
  name: 'safeHtml',
})
export class SafeHtmlPipe implements PipeTransform {
  private readonly sanitizer = inject(DomSanitizer);
  transform(value: unknown, ...args: unknown[]): unknown {
    return this.sanitizer.bypassSecurityTrustHtml(value as string);
  }
}
