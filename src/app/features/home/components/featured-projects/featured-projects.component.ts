import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { TranslatePipe } from '@ngx-translate/core';
import { FloatingWireframeComponent } from '../../../../shared/components/floating-wireframe/floating-wireframe.component';
import { ButtonComponent } from '../../../../shared/components/button/button.component';
import { MediaCardComponent } from '../../../../shared/components/media-card/media-card.component';

export interface ProjectItem {
  name: string;
  category: string;
  image: string;
  desc: string;
}

@Component({
  selector: 'app-featured-projects',
  imports: [RouterLink, FloatingWireframeComponent, ButtonComponent, MediaCardComponent, TranslatePipe],
  templateUrl: './featured-projects.component.html',
})
export class FeaturedProjectsComponent {
  readonly projects: ProjectItem[] = [
    {
      name: 'Riyadh Commercial Tower',
      category: 'Structural Concrete',
      image: 'https://images.unsplash.com/photo-1541888946425-d81bb19240f5?auto=format&fit=crop&w=800&q=80',
      desc: 'High-rise structural framework with advanced post-tensioned slabs and heavy industrial foundations.',
    },
    {
      name: 'Red Sea Resort Infrastructure',
      category: 'Civil & MEP',
      image: 'https://images.unsplash.com/photo-1590381105924-c72589b9ef3f?auto=format&fit=crop&w=800&q=80',
      desc: 'Sustainable coastal civil works, MEP grid connections, and turnkey luxury hospitality integration.',
    },
    {
      name: 'NEOM Logistics Hub',
      category: 'Steel Structure',
      image: 'https://images.unsplash.com/photo-1581094288338-2314dddb7ece?auto=format&fit=crop&w=800&q=80',
      desc: 'Heavy industrial prefabricated steel trusses, high-span cladding, and automated logistics infrastructure.',
    },
  ];
}
