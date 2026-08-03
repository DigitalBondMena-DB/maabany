import { Component, input, output, signal } from '@angular/core';
import { TranslatePipe } from '@ngx-translate/core';

export interface TocItem {
  id: string;
  title: string;
  level?: number;
}

@Component({
  selector: 'app-table-of-contents',
  imports: [TranslatePipe],
  templateUrl: './table-of-contents.component.html',
})
export class TableOfContentsComponent {
  readonly items = input.required<TocItem[]>();
  readonly activeId = input<string>('');
  readonly mobileTitle = input<string>('Document Chapters');

  readonly itemClick = output<string>();
  readonly expanded = signal<boolean>(false);

  toggleMobile(): void {
    this.expanded.update(v => !v);
  }

  onSelect(id: string, event: Event): void {
    event.preventDefault();
    this.expanded.set(false);
    this.itemClick.emit(id);
  }
}
