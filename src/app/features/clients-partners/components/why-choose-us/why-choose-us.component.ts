import { Component, input } from '@angular/core';
import { TranslatePipe } from '@ngx-translate/core';

import { WhyChooseUsSection } from '../../models/clients-partners-api.model';
import { ImageComponent } from '../../../../shared/components/image/image.component';
import { ScrollRevealDirective, ScrollDirection } from '../../../../shared/directives/scroll-reveal.directive';

@Component({
  selector: 'app-clients-why-choose-us',
  imports: [TranslatePipe, ImageComponent, ScrollRevealDirective],
  templateUrl: './why-choose-us.component.html',
})
export class WhyChooseUsComponent {
  readonly data = input.required<WhyChooseUsSection>();
  readonly revealDirection = input<ScrollDirection>('right');
  readonly revealDelay = input<number>(0);
}

