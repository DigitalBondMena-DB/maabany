import { inject, Pipe, PipeTransform } from '@angular/core';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';

@Pipe({
  name: 'highlight',
})
export class HighlightPipe implements PipeTransform {
  private readonly sanitizer = inject(DomSanitizer);

  transform(value: string | null | undefined, query: string | null | undefined): SafeHtml {
    if (!value) return '';
    if (!query || !query.trim()) return value;

    const escapedQuery = query.trim().replace(/[-\/\\^$*+?.()|[\]{}]/g, '\\$&');
    const regex = new RegExp(`(${escapedQuery})`, 'gi');
    const highlighted = value.replace(
      regex,
      '<mark class="bg-[#EA8A22]/15 text-[#EA8A22] px-1 rounded font-semibold">$1</mark>'
    );

    return this.sanitizer.bypassSecurityTrustHtml(highlighted);
  }
}
