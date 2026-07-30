import { Component, input, computed, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { TranslatePipe } from '@ngx-translate/core';
import { SOLUTIONS_DATA, SolutionDetail } from '../../services/solutions-data';
import { LanguageService } from '../../../../core/services/language.service';
import { ImageComponent } from '../../../../shared/components/image/image.component';

@Component({
  selector: 'app-other-services',
  imports: [RouterLink, TranslatePipe, ImageComponent],
  templateUrl: './other-services.component.html',
})
export class OtherServicesComponent {
  private readonly languageService = inject(LanguageService);
  readonly currentLang = this.languageService.currentLang;

  readonly currentSlug = input<string>('');

  readonly otherSolutions = computed<SolutionDetail[]>(() => {
    const slug = this.currentSlug();

    const civilGroup = ['civil-solutions', 'commercial-buildings', 'residential-buildings', 'industrial-buildings-warehouses', 'prefabricated-steel-structures'];
    const infraGroup = ['infrastructure-earthworks', 'grading-excavation', 'underground-utilities', 'roadworks-paving'];
    const mepGroup = ['mep-solutions', 'fire-fighting-systems', 'hvac-systems', 'plumbing'];
    const lowCurrentGroup = ['low-current-solutions', 'cctv-systems', 'data-network-solutions', 'access-control-systems', 'parking-management-systems', 'smart-home-solutions'];
    const fitOutGroup = ['fit-out-solutions'];
    const fmGroup = ['facility-management'];

    let currentGroup: string[] = [];
    if (civilGroup.includes(slug)) currentGroup = civilGroup;
    else if (infraGroup.includes(slug)) currentGroup = infraGroup;
    else if (mepGroup.includes(slug)) currentGroup = mepGroup;
    else if (lowCurrentGroup.includes(slug)) currentGroup = lowCurrentGroup;
    else if (fitOutGroup.includes(slug)) currentGroup = fitOutGroup;
    else if (fmGroup.includes(slug)) currentGroup = fmGroup;

    let related = SOLUTIONS_DATA.details.filter(s => s.slug !== slug && currentGroup.includes(s.slug));

    if (related.length < 4) {
      const mainSlugs = ['civil-solutions', 'fit-out-solutions', 'infrastructure-earthworks', 'low-current-solutions', 'facility-management'];
      const mains = SOLUTIONS_DATA.details.filter(s => 
        s.slug !== slug && 
        mainSlugs.includes(s.slug) && 
        !currentGroup.includes(s.slug)
      );
      related = [...related, ...mains];
    }

    return related.slice(0, 4);
  });
}
