import { Component, computed, input } from '@angular/core';
import { TranslatePipe } from '@ngx-translate/core';
import { AboutInfo } from '../../models/about-api.model';
import { ImageComponent } from "../../../../shared/components/image/image.component";

export interface ValuePanel {
  title: string;
  description: string;
  iconSvg: string | null;
}

@Component({
  selector: 'app-about-values',
  imports: [TranslatePipe, ImageComponent],
  templateUrl: './about-values.component.html',
})
export class AboutValuesComponent {
  readonly aboutData = input<AboutInfo | undefined>(undefined);

  readonly panels = computed<ValuePanel[]>(() => {
    const data = this.aboutData();

    const items: ValuePanel[] = [];
    if (data?.mission) {
      items.push({
        title: data.mission.title,
        description: data.mission.description,
        iconSvg: data.mission.image,
      });
    }
    if (data?.vision) {
      items.push({
        title: data.vision.title,
        description: data.vision.description,
        iconSvg: data.vision.image,
      });
    }
    if (data?.values) {
      items.push({
        title: data.values.title,
        description: data.values.description,
        iconSvg: data.values.image,
      });
    }

    return items;
  });
}
