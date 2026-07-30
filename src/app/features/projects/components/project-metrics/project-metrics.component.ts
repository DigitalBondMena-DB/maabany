import { Component, input } from '@angular/core';
import { TranslatePipe } from '@ngx-translate/core';
import { ProjectItem } from '../../services/projects-data';

@Component({
  selector: 'app-project-metrics',
  imports: [TranslatePipe],
  templateUrl: './project-metrics.component.html',
  styles: `
    .address-item .address-header::before {
      content: '';
      position: absolute;
      bottom: 0;
      left: 0;
      width: 0;
      height: 2px;
      background-color: #EA8A22;
      transition: width 0.5s ease-in-out;
    }

    .address-item:hover .address-header::before {
      width: 50%;
    }
  `
})
export class ProjectMetricsComponent {
  readonly project = input.required<ProjectItem>();
}
