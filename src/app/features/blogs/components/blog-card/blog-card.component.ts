import { Component, input } from '@angular/core';
import { RouterLink } from '@angular/router';

import { ImageComponent } from '../../../../shared/components/image/image.component';

@Component({
  selector: 'app-blog-card',
  imports: [RouterLink, ImageComponent],
  templateUrl: './blog-card.component.html',
})
export class BlogCardComponent {
  readonly title = input.required<string>();
  readonly desc = input.required<string>();
  readonly image = input.required<string>();
  readonly date = input.required<string>();
  readonly link = input.required<string>();
  readonly category = input<string>();
}
