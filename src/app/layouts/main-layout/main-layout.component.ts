import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from '../../shared/components/header/header.component';
import { FooterComponent } from '../../shared/components/footer/footer.component';

@Component({
  selector: 'app-main-layout',
  imports: [RouterOutlet, HeaderComponent, FooterComponent],
  template: `
    <div class="relative min-h-screen bg-white text-neutral-900 selection:bg-[#EA8A22] selection:text-white">
      <!-- Header -->
      <app-header></app-header>

      <!-- Main Page Content Outlet -->
      <main>
        <router-outlet></router-outlet>
      </main>

      <!-- Footer -->
      <app-footer></app-footer>
    </div>
  `,
})
export class MainLayoutComponent {
}
