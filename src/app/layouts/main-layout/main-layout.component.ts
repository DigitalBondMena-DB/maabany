import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from '../../shared/components/header/header.component';
import { FooterComponent } from '../../shared/components/footer/footer.component';
import { ScrollProgressComponent } from '../../shared/components/scroll-progress/scroll-progress.component';

@Component({
  selector: 'app-main-layout',
  imports: [RouterOutlet, HeaderComponent, FooterComponent, ScrollProgressComponent],
  template: `
    <div class="relative min-h-screen bg-white text-neutral-900 selection:bg-primary selection:text-white">
      <!-- Fixed Scroll Progress Bar -->
      <app-scroll-progress></app-scroll-progress>

      <!-- Header -->
      <app-header></app-header>

      <!-- Main Page Content Outlet -->
      <main class="overflow-x-clip">
        <router-outlet></router-outlet>
      </main>

      <!-- Footer -->
      <app-footer></app-footer>
    </div>
  `,
})
export class MainLayoutComponent {
}
