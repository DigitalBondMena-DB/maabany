import { Component, input } from '@angular/core';
import { TranslatePipe } from '@ngx-translate/core';

import { WhyChooseUsSection } from '../../models/clients-partners-api.model';
import { ImageComponent } from '../../../../shared/components/image/image.component';

@Component({
  selector: 'app-clients-why-choose-us',
  imports: [TranslatePipe, ImageComponent],
  templateUrl: './why-choose-us.component.html',
})
export class WhyChooseUsComponent {
  readonly data = input.required<WhyChooseUsSection>();
}
