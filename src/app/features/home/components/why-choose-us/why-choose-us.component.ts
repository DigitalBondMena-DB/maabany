import { Component } from '@angular/core';

@Component({
  selector: 'app-why-choose-us',
  imports: [],
  template: `
    <section class="py-24 bg-slate-950 text-white">
      <div class="max-w-7xl mx-auto px-6">
        <!-- Header -->
        <div class="text-center max-w-3xl mx-auto mb-16">
          <span class="text-amber-400 font-bold tracking-wider text-sm uppercase mb-3 block">Why Maabany Engineering</span>
          <h2 class="text-3xl md:text-5xl font-extrabold tracking-tight mb-6">
            Constructing Future Pillars with Uncompromising Precision
          </h2>
          <p class="text-slate-400 text-lg font-light leading-relaxed">
            From smart city blueprints in NEOM to commercial landmarks in Cairo and infrastructure networks in Benghazi, we combine localized regional knowledge with world-class engineering standards.
          </p>
        </div>

        <!-- Cards Grid -->
        <div class="grid md:grid-cols-3 gap-8">
          <!-- Card 1 -->
          <div class="p-8 rounded-2xl bg-gradient-to-b from-slate-900 to-slate-900/60 border border-slate-800 hover:border-amber-500/50 transition-all duration-300 group">
            <div class="w-14 h-14 rounded-xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-400 font-extrabold text-2xl mb-6 group-hover:scale-110 transition-transform">
              01
            </div>
            <h3 class="text-xl font-bold mb-3 text-white">Turnkey EPC Execution</h3>
            <p class="text-slate-400 font-light leading-relaxed">
              Complete engineering, procurement, and construction cycle handled under a single unified management structure for zero delay risk.
            </p>
          </div>

          <!-- Card 2 -->
          <div class="p-8 rounded-2xl bg-gradient-to-b from-slate-900 to-slate-900/60 border border-slate-800 hover:border-amber-500/50 transition-all duration-300 group">
            <div class="w-14 h-14 rounded-xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-400 font-extrabold text-2xl mb-6 group-hover:scale-110 transition-transform">
              02
            </div>
            <h3 class="text-xl font-bold mb-3 text-white">Smart Building Integration</h3>
            <p class="text-slate-400 font-light leading-relaxed">
              Embedded IoT networks, automated climate control, high-efficiency MEP distribution, and real-time sensory health monitoring.
            </p>
          </div>

          <!-- Card 3 -->
          <div class="p-8 rounded-2xl bg-gradient-to-b from-slate-900 to-slate-900/60 border border-slate-800 hover:border-amber-500/50 transition-all duration-300 group">
            <div class="w-14 h-14 rounded-xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-400 font-extrabold text-2xl mb-6 group-hover:scale-110 transition-transform">
              03
            </div>
            <h3 class="text-xl font-bold mb-3 text-white">ISO & LEED Compliance</h3>
            <p class="text-slate-400 font-light leading-relaxed">
              Certified eco-friendly materials, strict safety compliance arrays, zero-compromise quality audits, and guaranteed long lifespans.
            </p>
          </div>
        </div>
      </div>
    </section>
  `
})
export class WhyChooseUsComponent {}
