import { Component, input, output } from '@angular/core';
import { RouterLink } from '@angular/router';
import { ButtonComponent } from '../button/button.component';
import { IconName } from '../../models/icons.interface';
import { IconsComponent } from "../icons/icons.component";



@Component({
  selector: 'app-empty-state',
  imports: [RouterLink, ButtonComponent, IconsComponent],
  templateUrl: './empty-state.component.html',
})
export class EmptyStateComponent {
  readonly title = input<string>('No Data Available');
  readonly description = input<string>('There are currently no items to display in this section.');
  readonly badge = input<string>('STATUS // EMPTY_NODE');
  readonly icon = input<IconName>('orangeBuild');
  readonly actionLabel = input<string>('');
  readonly actionLink = input<string | any[] | undefined>(undefined);
  readonly compact = input<boolean>(false);
  readonly minHeight = input<string>('min-h-[280px]');
  readonly customClass = input<string>('');

  readonly actionClick = output<MouseEvent>();

  onActionClick(event: MouseEvent): void {
    this.actionClick.emit(event);
  }
}
