import { Component, input } from '@angular/core';
import { IconName, Icons } from '../../models/icons.interface';

@Component({
  selector: 'app-icons',
  templateUrl: './icons.component.html',
  host: {
    class: 'inline-flex items-center justify-center shrink-0',
  },
})
export class IconsComponent {
  readonly icon = input.required<IconName>();
  readonly width = input.required<number>();
  readonly height = input.required<number>();
  readonly classes = input<string>('');
  readonly iconArch: Icons = {
    search: '/icons/search-icon.svg',
  };
}
