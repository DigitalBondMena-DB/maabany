import { Component, input, computed } from '@angular/core';
import { TranslatePipe } from '@ngx-translate/core';
import { ProjectItem } from '../../services/projects-data';

export interface MetricItem {
  label: string;
  value: string;
  icon?: 'location' | 'category' | 'calendar' | 'status' | 'clock' | 'user' | 'update';
  type?: 'standard' | 'status';
}

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
      background-color: var(--color-primary, #EA8A22);
      transition: width 0.5s ease-in-out;
    }

    .address-item:hover .address-header::before {
      width: 50%;
    }
  `
})
export class ProjectMetricsComponent {
  readonly project = input<ProjectItem>();
  readonly customItems = input<MetricItem[]>();

  readonly items = computed<MetricItem[]>(() => {
    if (this.customItems()) {
      return this.customItems()!;
    }
    const p = this.project();
    if (!p) return [];
    return [
      { label: 'Location', value: p.location, icon: 'location' },
      { label: 'Category', value: p.category, icon: 'category' },
      { label: 'Completion Year', value: p.year, icon: 'calendar' },
      { label: 'Project Status', value: 'Delivered Successfully', icon: 'status', type: 'status' },
    ];
  });
}
