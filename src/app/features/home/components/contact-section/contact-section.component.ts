import { Component, signal, input } from '@angular/core';
import { ContactFormComponent } from './contact-form/contact-form.component';
import { ContactBranchesComponent, BranchCode } from './contact-branches/contact-branches.component';
import { HomeBranch } from '../../models/home-api.model';

import { TranslatePipe } from '@ngx-translate/core';

@Component({
  selector: 'app-contact-section',
  imports: [ContactFormComponent, ContactBranchesComponent, TranslatePipe],
  templateUrl: './contact-section.component.html',
})
export class ContactSectionComponent {
  readonly branchesData = input<HomeBranch[]>();
  readonly selectedBranch = signal<BranchCode>('SA');


  onBranchSelect(branch: BranchCode): void {
    this.selectedBranch.set(branch);
  }
}
