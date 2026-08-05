import { Component, computed, input } from '@angular/core';
import { TranslatePipe } from '@ngx-translate/core';
import { FloatingWireframeComponent } from '../../../../shared/components/floating-wireframe/floating-wireframe.component';
import { ImageComponent } from "../../../../shared/components/image/image.component";
import { AboutInfoWhyChooseUs, WhyChooseUsSection } from '../../models/about-api.model';

export interface AdvantageItem {
  title: string;
  description: string | null;
  image: string | null;
}

@Component({
  selector: 'app-about-why-choose-us',
  imports: [TranslatePipe, FloatingWireframeComponent, ImageComponent],
  templateUrl: './about-why-choose-us.component.html',
})
export class AboutWhyChooseUsComponent {
  readonly whyChooseUsData = input<WhyChooseUsSection | undefined>(undefined);
  readonly aboutInfoWhyChooseUs = input<AboutInfoWhyChooseUs | undefined>(undefined);
  readonly title = computed(() => this.whyChooseUsData()?.title || this.aboutInfoWhyChooseUs()?.title || '');
  readonly description = computed(() => this.whyChooseUsData()?.description || this.aboutInfoWhyChooseUs()?.description || '');
  readonly sectionImage = computed(() => this.aboutInfoWhyChooseUs()?.image || this.whyChooseUsData()?.image || 'https://images.unsplash.com/photo-1531834685032-c34bf0d84c77?auto=format&fit=crop&w=800&q=80');
  readonly cards = computed<AdvantageItem[]>(() => {
    const dataCards = this.whyChooseUsData()?.cards;
    if (dataCards && dataCards.length > 0) {
      return dataCards.map((card) => ({
        title: card.title,
        description: card.description,
        image: card.image || card.icon || null,
      }));
    }

    const infoPoints = this.aboutInfoWhyChooseUs()?.points;
    if (infoPoints && infoPoints.length > 0) {
      return infoPoints.map((point) => ({
        title: point.title,
        description: point.description,
        image: point.icon || null,
      }));
    }

    return [];
  });
}
