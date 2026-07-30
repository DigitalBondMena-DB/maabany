import { Component, input, computed } from '@angular/core';
import { ContactFormComponent } from '../../../home/components/contact-section/contact-form/contact-form.component';
import { OtherServicesComponent } from '../other-services/other-services.component';
import { SOLUTIONS_DATA, SolutionDetail } from '../../services/solutions-data';
import { WhyChooseUsComponent } from "../../../home/components/why-choose-us/why-choose-us.component";

@Component({
  selector: 'app-solution-details',
  imports: [
    ContactFormComponent,
    OtherServicesComponent,
    WhyChooseUsComponent
  ],
  templateUrl: './solution-details.component.html',
})
export class SolutionDetailsComponent {
  readonly slug = input.required<string>();

  readonly currentSolution = computed<SolutionDetail>(() => {
    const s = this.slug();
    const found = SOLUTIONS_DATA.details.find(d => d.slug === s);
    if (found) return found;

    return {
      slug: s,
      title: s.replace(/-/g, ' ').toUpperCase(),
      desc: 'Engineering solutions built to international quality and safety standards.',
      aboutTitle: `About ${s.replace(/-/g, ' ')}`,
      aboutDesc: 'Maabany delivers comprehensive civil engineering and construction services tailored to residential, commercial, and industrial developments with precision, quality, and the highest safety standards.',
      image: 'https://images.unsplash.com/photo-1541888946425-d81bb19240f5?auto=format&fit=crop&w=1200&q=80',
    };
  });
}
