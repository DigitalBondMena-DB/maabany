import { Component, signal } from '@angular/core';
import { ContactFormComponent } from './contact-form/contact-form.component';
import { ContactBranchesComponent, BranchCode } from './contact-branches/contact-branches.component';

@Component({
  selector: 'app-contact-section',
  imports: [ContactFormComponent, ContactBranchesComponent],
  templateUrl: './contact-section.component.html',
})
export class ContactSectionComponent {
  readonly selectedBranch = signal<BranchCode>('SA');

  onBranchSelect(branch: BranchCode): void {
    this.selectedBranch.set(branch);
  }
}
