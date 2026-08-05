import { inject } from '@angular/core';
import { Routes } from '@angular/router';
import { LanguageService } from './core/services/language.service';
import { langGuard } from './core/guards/lang.guard';
import { thankYouGuard } from './core/guards/thank-you.guard';
import { MainLayoutComponent } from './layouts/main-layout/main-layout.component';

export const routes: Routes = [
  {
    path: ':lang',
    canActivate: [langGuard],
    component: MainLayoutComponent,
    children: [
      {
        path: '',
        loadChildren: () => import('./features/home/home.routes').then(m => m.HOME_ROUTES)
      },
      {
        path: 'about',
        loadComponent: () => import('./features/about/about.component').then(m => m.AboutComponent)
      },
      {
        path: 'solutions',
        loadComponent: () => import('./features/solutions/solutions.component').then(m => m.SolutionsComponent)
      },
      {
        path: 'solutions/:slug1',
        loadComponent: () => import('./features/solutions/solutions.component').then(m => m.SolutionsComponent)
      },
      {
        path: 'solutions/:slug1/:slug2',
        loadComponent: () => import('./features/solutions/solutions.component').then(m => m.SolutionsComponent)
      },
      {
        path: 'solutions/:slug1/:slug2/:slug3',
        loadComponent: () => import('./features/solutions/solutions.component').then(m => m.SolutionsComponent)
      },
      {
        path: 'projects',
        loadComponent: () => import('./features/projects/projects.component').then(m => m.ProjectsComponent)
      },
      {
        path: 'projects/:slug',
        loadComponent: () => import('./features/projects/components/project-details/project-details.component').then(m => m.ProjectDetailsComponent)
      },
      {
        path: 'industries',
        loadComponent: () => import('./features/industries/industries.component').then(m => m.IndustriesComponent)
      },
      {
        path: 'industries/:slug',
        loadComponent: () => import('./features/industries/components/industry-details/industry-details.component').then(m => m.IndustryDetailsComponent)
      },
      {
        path: 'clients-partners',
        loadComponent: () => import('./features/clients-partners/clients-partners.component').then(m => m.ClientsPartnersComponent)
      },
      {
        path: 'blogs',
        loadComponent: () => import('./features/blogs/blogs.component').then(m => m.BlogsComponent)
      },
      {
        path: 'blogs/:slug',
        loadComponent: () => import('./features/blogs/components/blog-details/blog-details.component').then(m => m.BlogDetailsComponent)
      },
      {
        path: 'contact-us',
        loadComponent: () => import('./features/contact-us/contact-us.component').then(m => m.ContactUsComponent)
      },
      {
        path: 'request-quote',
        loadComponent: () => import('./features/request-quote/request-quote.component').then(m => m.RequestQuoteComponent)
      },
      {
        path: 'privacy-policy',
        loadComponent: () => import('./features/privacy-policy/privacy-policy.component').then(m => m.PrivacyPolicyComponent)
      },
      {
        path: 'search',
        loadComponent: () => import('./features/search/search.component').then(m => m.SearchComponent)
      },
      {
        path: 'thank-you',
        canActivate: [thankYouGuard],
        loadComponent: () => import('./features/thank-you/thank-you.component').then(m => m.ThankYouComponent)
      }
    ]
  },
  {
    path: '',
    pathMatch: 'full',
    redirectTo: () => {
      const languageService = inject(LanguageService);
      const defaultLang = languageService.getBrowserOrSavedLang();
      return `${defaultLang}`;
    }
  },
  {
    path: '**',
    redirectTo: () => {
      const languageService = inject(LanguageService);
      const defaultLang = languageService.getBrowserOrSavedLang();
      return `${defaultLang}`;
    }
  }
];
