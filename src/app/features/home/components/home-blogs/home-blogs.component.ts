import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { TranslatePipe } from '@ngx-translate/core';
import { ButtonComponent } from '../../../../shared/components/button/button.component';
import { MediaCardComponent } from '../../../../shared/components/media-card/media-card.component';

export interface HomeBlogPost {
  slug: string;
  title: string;
  desc: string;
  date: string;
  image: string;
}

@Component({
  selector: 'app-home-blogs',
  imports: [RouterLink, ButtonComponent, MediaCardComponent, TranslatePipe],
  templateUrl: './home-blogs.component.html',
})
export class HomeBlogsComponent {
  readonly blogs: HomeBlogPost[] = [
    {
      slug: 'decarbonizing-massive-structural-frameworks',
      title: 'Decarbonizing Massive Structural Frameworks',
      desc: 'How Maabany is pioneering the use of eco-efficient materials to cut construction carbon loads by 42%.',
      date: '12 July 2026',
      image: 'https://images.unsplash.com/photo-1541888946425-d81bb19240f5?auto=format&fit=crop&w=800&q=80',
    },
    {
      slug: 'integrating-real-time-ai-in-heavy-metrology',
      title: 'Integrating Real-time AI in Heavy Metrology',
      desc: 'Using laser-guided sensory arrays during foundation pours to detect microscopic alignment variations.',
      date: '10 July 2026',
      image: 'https://images.unsplash.com/photo-1581094288338-2314dddb7ece?auto=format&fit=crop&w=800&q=80',
    },
    {
      slug: 'the-future-of-hybrid-wood-steel-skyscraper-design',
      title: 'The Future of Hybrid Wood-Steel Skyscraper design',
      desc: 'Reviewing recent safety and structural stress evaluations of our Riyadh structural towers.',
      date: '08 July 2026',
      image: 'https://images.unsplash.com/photo-1503387762-592deb58ef4e?auto=format&fit=crop&w=800&q=80',
    },
  ];
}
