import { Component, input } from '@angular/core';
import { RouterLink } from '@angular/router';
import { TranslatePipe } from '@ngx-translate/core';

@Component({
  selector: 'app-page-hero',
  imports: [RouterLink, TranslatePipe],
  templateUrl: './page-hero.component.html',
})
export class PageHeroComponent {
  readonly title = input<string>('');
  readonly titleHighlight = input<string>('');
  readonly categoryBadge = input<string>('');
  readonly description = input<string>('');
  readonly heroImage = input<string>('https://images.unsplash.com/photo-1541888946425-d81bb19240f5?auto=format&fit=crop&w=1920&q=80');
}
