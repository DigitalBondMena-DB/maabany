import { Component, input } from '@angular/core';
import { IconsComponent } from '../../../../shared/components/icons/icons.component';
import { FloatingWireframeComponent } from '../../../../shared/components/floating-wireframe/floating-wireframe.component';
import { IconName } from '../../../../shared/models/icons.interface';
import { HomeStandard } from '../../models/home-api.model';
import { ImageComponent } from "../../../../shared/components/image/image.component";
import { EmptyStateComponent } from "../../../../shared/components/empty-state/empty-state.component";
import { PadZeroPipe } from '../../../../shared/pipes/pad-zero-pipe';
import { ScrollRevealDirective, ScrollDirection } from '../../../../shared/directives/scroll-reveal.directive';

import { TranslatePipe } from '@ngx-translate/core';

export interface WhyChooseUsReason {
  num: string;
  title: string;
  desc: string;
  icon: IconName;
}

@Component({
  selector: 'app-why-choose-us',
  imports: [IconsComponent, FloatingWireframeComponent, ImageComponent, EmptyStateComponent, PadZeroPipe, TranslatePipe, ScrollRevealDirective],
  templateUrl: './why-choose-us.component.html',
})
export class WhyChooseUsComponent {
  readonly standardsData = input<HomeStandard[]>();
  readonly revealDirection = input<ScrollDirection>('bottom');
  readonly revealDelay = input<number>(0);
}

