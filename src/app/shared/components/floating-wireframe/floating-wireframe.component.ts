import {
  Component,
  input,
  OnInit,
  OnDestroy,
  inject,
  PLATFORM_ID,
  NgZone,
  viewChild,
  ElementRef,
  effect
} from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

interface Point3D {
  x: number;
  y: number;
  z: number;
}

interface Point2D {
  x: number;
  y: number;
}

interface Edge {
  from: number;
  to: number;
}

@Component({
  selector: 'app-floating-wireframe',
  template: `
    <div class="relative w-full h-full flex items-center justify-center pointer-events-none select-none">
      <svg #svgRef class="w-full h-full overflow-visible" viewBox="-1.8 -1.8 3.6 3.6">
        @for (edge of edges; track $index) {
          <line
            stroke-width="0.02"
            opacity="0.55"
            stroke-linecap="round"
            [attr.stroke]="color()"
          />
        }
        @for (node of nodes; track $index) {
          <circle
            r="0.035"
            opacity="0.8"
            [attr.fill]="color()"
          />
        }
      </svg>
    </div>
  `,
  host: {
    'class': 'block w-full h-full'
  }
})
export class FloatingWireframeComponent implements OnInit, OnDestroy {
  readonly shape = input<'dome' | 'tower' | 'icosahedron' | 'cube' | 'octahedron' | 'pyramid'>('icosahedron');
  readonly color = input<string>('#EA8A22');
  readonly speed = input<number>(1);

  private readonly platformId = inject(PLATFORM_ID);
  private readonly ngZone = inject(NgZone);

  readonly svgRef = viewChild<ElementRef<SVGSVGElement>>('svgRef');

  nodes: Point3D[] = [];
  edges: Edge[] = [];

  private angle = 0;
  private animId?: number;
  private lineEls: SVGLineElement[] = [];
  private circleEls: SVGCircleElement[] = [];

  constructor() {
    effect(() => {
      // Rebuild geometry when shape changes
      this.shape();
      this.buildGeometry();
      setTimeout(() => this.cacheDomElements(), 0);
    });
  }

  ngOnInit(): void {
    this.buildGeometry();
    if (isPlatformBrowser(this.platformId)) {
      this.ngZone.runOutsideAngular(() => {
        const update = () => {
          this.angle = (this.angle + 0.005 * this.speed()) % (Math.PI * 2);
          this.renderFrame();
          this.animId = requestAnimationFrame(update);
        };
        this.animId = requestAnimationFrame(update);
      });
    }
  }

  ngOnDestroy(): void {
    if (this.animId) cancelAnimationFrame(this.animId);
  }

  private cacheDomElements(): void {
    const svg = this.svgRef()?.nativeElement;
    if (!svg) return;
    this.lineEls = Array.from(svg.querySelectorAll('line'));
    this.circleEls = Array.from(svg.querySelectorAll('circle'));
    this.renderFrame();
  }

  private renderFrame(): void {
    if (this.lineEls.length === 0 && this.circleEls.length === 0) {
      this.cacheDomElements();
    }

    const a = this.angle;
    const cosA = Math.cos(a);
    const sinA = Math.sin(a);
    const cosA2 = Math.cos(a * 0.7);
    const sinA2 = Math.sin(a * 0.7);

    const projected: Point2D[] = new Array(this.nodes.length);
    for (let i = 0; i < this.nodes.length; i++) {
      const pt = this.nodes[i];
      const x1 = pt.x * cosA - pt.z * sinA;
      const z1 = pt.x * sinA + pt.z * cosA;
      const y1 = pt.y;

      const y2 = y1 * cosA2 - z1 * sinA2;
      const z2 = y1 * sinA2 + z1 * cosA2;

      const scale = 2.4 / (3 + z2);
      projected[i] = { x: x1 * scale, y: y2 * scale };
    }

    for (let i = 0; i < this.edges.length; i++) {
      const edge = this.edges[i];
      const line = this.lineEls[i];
      if (line) {
        const p1 = projected[edge.from];
        const p2 = projected[edge.to];
        if (p1 && p2) {
          line.setAttribute('x1', p1.x.toFixed(4));
          line.setAttribute('y1', p1.y.toFixed(4));
          line.setAttribute('x2', p2.x.toFixed(4));
          line.setAttribute('y2', p2.y.toFixed(4));
        }
      }
    }

    for (let i = 0; i < this.nodes.length; i++) {
      const circle = this.circleEls[i];
      if (circle) {
        const p = projected[i];
        if (p) {
          circle.setAttribute('cx', p.x.toFixed(4));
          circle.setAttribute('cy', p.y.toFixed(4));
        }
      }
    }
  }

  private buildGeometry(): void {
    const type = this.shape();
    this.nodes = [];
    this.edges = [];

    if (type === 'icosahedron') {
      const t = (1.0 + Math.sqrt(5.0)) / 2.0;
      this.nodes = [
        { x: -1, y: t, z: 0 }, { x: 1, y: t, z: 0 }, { x: -1, y: -t, z: 0 }, { x: 1, y: -t, z: 0 },
        { x: 0, y: -1, z: t }, { x: 0, y: 1, z: t }, { x: 0, y: -1, z: -t }, { x: 0, y: 1, z: -t },
        { x: t, y: 0, z: -1 }, { x: t, y: 0, z: 1 }, { x: -t, y: 0, z: -1 }, { x: -t, y: 0, z: 1 }
      ].map(p => ({ x: p.x * 0.5, y: p.y * 0.5, z: p.z * 0.5 }));

      this.edges = [
        { from: 0, to: 11 }, { from: 0, to: 5 }, { from: 0, to: 1 }, { from: 0, to: 7 }, { from: 0, to: 10 },
        { from: 1, to: 5 }, { from: 1, to: 9 }, { from: 1, to: 8 }, { from: 1, to: 7 },
        { from: 2, to: 11 }, { from: 2, to: 10 }, { from: 2, to: 6 }, { from: 2, to: 3 }, { from: 2, to: 4 },
        { from: 3, to: 9 }, { from: 3, to: 4 }, { from: 3, to: 8 }, { from: 3, to: 6 },
        { from: 4, to: 5 }, { from: 4, to: 9 }, { from: 4, to: 11 },
        { from: 5, to: 9 }, { from: 5, to: 11 },
        { from: 6, to: 7 }, { from: 6, to: 8 }, { from: 6, to: 10 },
        { from: 7, to: 8 }, { from: 7, to: 10 },
        { from: 8, to: 9 }, { from: 10, to: 11 }
      ];
    } else if (type === 'cube') {
      this.nodes = [
        { x: -0.6, y: -0.6, z: -0.6 }, { x: 0.6, y: -0.6, z: -0.6 },
        { x: 0.6, y: 0.6, z: -0.6 }, { x: -0.6, y: 0.6, z: -0.6 },
        { x: -0.6, y: -0.6, z: 0.6 }, { x: 0.6, y: -0.6, z: 0.6 },
        { x: 0.6, y: 0.6, z: 0.6 }, { x: -0.6, y: 0.6, z: 0.6 }
      ];
      this.edges = [
        { from: 0, to: 1 }, { from: 1, to: 2 }, { from: 2, to: 3 }, { from: 3, to: 0 },
        { from: 4, to: 5 }, { from: 5, to: 6 }, { from: 6, to: 7 }, { from: 7, to: 4 },
        { from: 0, to: 4 }, { from: 1, to: 5 }, { from: 2, to: 6 }, { from: 3, to: 7 }
      ];
    } else if (type === 'octahedron') {
      this.nodes = [
        { x: 0, y: 0.9, z: 0 }, { x: 0, y: -0.9, z: 0 },
        { x: 0.9, y: 0, z: 0 }, { x: -0.9, y: 0, z: 0 },
        { x: 0, y: 0, z: 0.9 }, { x: 0, y: 0, z: -0.9 }
      ];
      this.edges = [
        { from: 0, to: 2 }, { from: 0, to: 3 }, { from: 0, to: 4 }, { from: 0, to: 5 },
        { from: 1, to: 2 }, { from: 1, to: 3 }, { from: 1, to: 4 }, { from: 1, to: 5 },
        { from: 2, to: 4 }, { from: 4, to: 3 }, { from: 3, to: 5 }, { from: 5, to: 2 }
      ];
    } else {
      // Default dome/pyramid fallback
      this.nodes = [
        { x: 0, y: 0.9, z: 0 }, { x: -0.7, y: -0.7, z: -0.7 },
        { x: 0.7, y: -0.7, z: -0.7 }, { x: 0.7, y: -0.7, z: 0.7 },
        { x: -0.7, y: -0.7, z: 0.7 }
      ];
      this.edges = [
        { from: 0, to: 1 }, { from: 0, to: 2 }, { from: 0, to: 3 }, { from: 0, to: 4 },
        { from: 1, to: 2 }, { from: 2, to: 3 }, { from: 3, to: 4 }, { from: 4, to: 1 }
      ];
    }
  }
}
