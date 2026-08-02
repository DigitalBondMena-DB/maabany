import { Component, input, output, computed } from '@angular/core';

@Component({
  selector: 'app-pagination',
  imports: [],
  templateUrl: './pagination.component.html',
})
export class PaginationComponent {
  readonly currentPage = input<number>(1);
  readonly totalPages = input<number>(1);
  readonly ariaLabel = input<string>('Pagination navigation');

  readonly pageChange = output<number>();

  readonly paginationRange = computed(() => {
    const total = this.totalPages();
    const current = this.currentPage();
    const range: (number | string)[] = [];
    const maxVisiblePages = 3;

    if (total <= 5) {
      for (let i = 1; i <= total; i++) range.push(i);
    } else {
      if (current <= maxVisiblePages) {
        for (let i = 1; i <= 4; i++) range.push(i);
        range.push('...');
        range.push(total);
      } else if (current > total - maxVisiblePages) {
        range.push(1);
        range.push('...');
        for (let i = total - 3; i <= total; i++) range.push(i);
      } else {
        range.push(1);
        range.push('...');
        range.push(current - 1);
        range.push(current);
        range.push(current + 1);
        range.push('...');
        range.push(total);
      }
    }
    return range;
  });

  onSelectPage(page: number): void {
    if (page >= 1 && page <= this.totalPages() && page !== this.currentPage()) {
      this.pageChange.emit(page);
    }
  }
}
