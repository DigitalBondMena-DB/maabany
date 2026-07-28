import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { FloatingWireframeComponent } from '../../../../shared/components/floating-wireframe/floating-wireframe.component';

export interface ProjectItem {
  name: string;
  category: string;
  desc: string;
  image: string;
}

@Component({
  selector: 'app-featured-projects',
  imports: [RouterLink, FloatingWireframeComponent],
  template: `
    <section id="projects" class="bg-white relative z-10 py-12 md:py-20 lg:py-24">
      <div class="absolute inset-e-12 top-12 w-80 h-80 opacity-15 pointer-events-none hidden xl:block">
        <app-floating-wireframe shape="octahedron" color="#142b52"></app-floating-wireframe>
      </div>

      <div
        class="max-w-350 mx-auto relative z-10"
        style="padding-left: var(--outer-padding-x); padding-right: var(--outer-padding-x);"
      >
        <div class="mb-16 space-y-2">
          <span class="text-[#142b52] font-mono text-xs uppercase font-bold tracking-widest block">
            Structural Footprint
          </span>
          <h2 class="text-3xl md:text-5xl font-black text-neutral-900 uppercase tracking-tight">Featured Projects</h2>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          @for (proj of projects; track proj.name) {
            <div
              routerLink="/projects"
              class="bg-white border border-neutral-200 rounded-3xl overflow-hidden group hover:border-[#EA8A22]/40 hover:shadow-2xl transition-all cursor-pointer flex flex-col"
            >
              <div class="h-64 overflow-hidden relative">
                <div
                  class="absolute top-4 left-4 z-20 bg-white/90 backdrop-blur-md px-3 py-1 rounded-full border border-neutral-200"
                >
                  <span class="text-[10px] font-mono text-[#142b52] font-bold uppercase">{{ proj.category }}</span>
                </div>
                <img
                  [src]="proj.image"
                  [alt]="proj.name"
                  class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
              </div>
              <div class="p-6 flex-1 flex flex-col justify-between">
                <div class="space-y-2">
                  <h3 class="text-lg font-bold text-neutral-900 group-hover:text-[#EA8A22] transition-colors uppercase">
                    {{ proj.name }}
                  </h3>
                  <p class="text-xs text-neutral-600">{{ proj.desc }}</p>
                </div>
              </div>
            </div>
          }
        </div>

        <div class="mt-16 flex justify-center">
          <a
            routerLink="/projects"
            class="group flex items-center justify-center gap-2 px-8 py-4 border border-[#EA8A22] text-[#EA8A22] font-mono text-xs font-bold uppercase tracking-widest rounded-full hover:bg-[#EA8A22] hover:text-white transition-all"
          >
            <span>Explore All Projects</span> →
          </a>
        </div>
      </div>
    </section>
  `,
})
export class FeaturedProjectsComponent {
  readonly projects: ProjectItem[] = [
    {
      name: 'Riyadh Financial Plaza II',
      category: 'Commercial',
      desc: '92-story commercial tower with high-efficiency MEP & seismic dampening.',
      image: 'https://images.unsplash.com/photo-1541888946425-d81bb19240f5?auto=format&fit=crop&w=800&q=80',
    },
    {
      name: 'NEOM Metropolitan Link',
      category: 'Infrastructure',
      desc: 'High-speed transit hub and bridge infrastructure network.',
      image: 'https://images.unsplash.com/photo-1504307651254-35680f356dfd?auto=format&fit=crop&w=400&q=80',
    },
    {
      name: 'Cairo Smart Tech Park',
      category: 'MEP',
      desc: 'Tier-4 data center & intelligent BMS automation.',
      image: 'https://images.unsplash.com/photo-1581092921461-eab62e97a780?auto=format&fit=crop&w=800&q=80',
    },
  ];
}
