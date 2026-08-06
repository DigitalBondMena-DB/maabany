import { Component, signal, input } from '@angular/core';
import { ContactFormComponent } from './contact-form/contact-form.component';
import { ContactBranchesComponent, BranchCode } from './contact-branches/contact-branches.component';
import { HomeBranch } from '../../models/home-api.model';
import { ScrollRevealDirective, ScrollDirection } from '../../../../shared/directives/scroll-reveal.directive';

import { TranslatePipe } from '@ngx-translate/core';

@Component({
  selector: 'app-contact-section',
  imports: [ContactFormComponent, ContactBranchesComponent, TranslatePipe, ScrollRevealDirective],
  templateUrl: './contact-section.component.html',
})
export class ContactSectionComponent {
  readonly branchesData = input<HomeBranch[]>();
  readonly selectedBranch = signal<BranchCode>('SA');
  readonly revealDirection = input<ScrollDirection>('right');
  readonly revealDelay = input<number>(0);

  onBranchSelect(branch: BranchCode): void {
    this.selectedBranch.set(branch);
  }
}

