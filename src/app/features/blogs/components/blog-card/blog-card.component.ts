import { Component, input } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-blog-card',
  imports: [RouterLink],
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
