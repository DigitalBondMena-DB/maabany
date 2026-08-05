import { Component, input, computed } from '@angular/core';
import { TranslatePipe } from '@ngx-translate/core';
import { ProjectDetailsData } from '../../models/projects-api.model';

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
  readonly projectDetails = input<ProjectDetailsData>();
  readonly customItems = input<MetricItem[]>();

  readonly items = computed<MetricItem[]>(() => {
    if (this.customItems()) {
      return this.customItems()!;
    }
    const p = this.projectDetails();
    if (!p) return [];

    const result: MetricItem[] = [];
    if (p.Location) {
      result.push({ label: 'Location', value: p.Location, icon: 'location' });
    }
    if (p.industry_title) {
      result.push({ label: 'Category', value: p.industry_title, icon: 'category' });
    }
    if (p['Completion Year']) {
      result.push({ label: 'Completion Year', value: p['Completion Year'], icon: 'calendar' });
    }
    if (p['Project Status']) {
      result.push({ label: 'Project Status', value: p['Project Status'], icon: 'status', type: 'status' });
    }

    return result;
  });
}
