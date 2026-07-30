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

interface Edge {
  from: number;
  to: number;
}

export type WireframeShape = 'dome' | 'tower' | 'icosahedron' | 'cube' | 'octahedron' | 'pyramid' | 'blueprint';

@Component({
  selector: 'app-floating-wireframe',
  template: `
    <div class="relative w-full h-full flex items-center justify-center pointer-events-none select-none will-change-transform">
      <svg #svgRef class="w-full h-full overflow-visible transform-gpu" viewBox="0 0 300 300">
        @for (edge of edges; track $index) {
          <line
            stroke-width="1.2"
            stroke-opacity="0.85"
            stroke-linecap="round"
            [attr.stroke]="color()"
          />
        }
        @for (node of nodes; track $index) {
          <circle
            r="3"
            fill="white"
            stroke-width="1.5"
            [attr.stroke]="color()"
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
  readonly shape = input<WireframeShape>('icosahedron');
  readonly color = input<string>('#EA8A22');
  readonly speed = input<number>(1);

  private readonly platformId = inject(PLATFORM_ID);
  private readonly ngZone = inject(NgZone);
  private readonly hostRef = inject(ElementRef<HTMLElement>);

  readonly svgRef = viewChild<ElementRef<SVGSVGElement>>('svgRef');

  nodes: Point3D[] = [];
  edges: Edge[] = [];

  private angle = 0;
  private animId?: number;
  private observer?: IntersectionObserver;
  private isVisible = false;
  private lineEls: SVGLineElement[] = [];
  private circleEls: SVGCircleElement[] = [];

  constructor() {
    effect(() => {
      this.shape();
      this.buildGeometry();
      setTimeout(() => this.cacheDomElements(), 0);
    });
  }

  ngOnInit(): void {
    this.buildGeometry();
    if (isPlatformBrowser(this.platformId)) {
      this.setupObserver();
    }
  }

  ngOnDestroy(): void {
    this.stopAnimation();
    if (this.observer) {
      this.observer.disconnect();
    }
  }

  private setupObserver(): void {
    this.observer = new IntersectionObserver(
      (entries) => {
        const entry = entries[0];
        if (entry.isIntersecting) {
          this.isVisible = true;
          this.startAnimation();
        } else {
          this.isVisible = false;
          this.stopAnimation();
        }
      },
      { threshold: 0.05 }
    );

    this.observer.observe(this.hostRef.nativeElement);
  }

  private startAnimation(): void {
    if (this.animId) return;
    this.ngZone.runOutsideAngular(() => {
      const update = () => {
        if (!this.isVisible) return;
        this.angle = (this.angle + 0.005 * this.speed()) % (Math.PI * 2);
        this.renderFrame();
        this.animId = requestAnimationFrame(update);
      };
      this.animId = requestAnimationFrame(update);
    });
  }

  private stopAnimation(): void {
    if (this.animId) {
      cancelAnimationFrame(this.animId);
      this.animId = undefined;
    }
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

    const viewWidth = 300;
    const viewHeight = 300;
    const cx = viewWidth / 2;
    const cy = viewHeight / 2;

    const spacingX = 64;
    const spacingY = 32;
    const spacingZ = 64;

    const cos = Math.cos(this.angle);
    const sin = Math.sin(this.angle);

    const projectedNodes = new Array<{ xScreen: number; yScreen: number }>(this.nodes.length);
    for (let i = 0; i < this.nodes.length; i++) {
      const node = this.nodes[i];
      const rx = node.x * cos - node.y * sin;
      const ry = node.x * sin + node.y * cos;

      const xScreen = cx + (rx - ry) * spacingX;
      const yScreen = cy + (rx + ry) * spacingY - node.z * spacingZ;

      projectedNodes[i] = { xScreen, yScreen };
    }

    for (let i = 0; i < this.edges.length; i++) {
      const edge = this.edges[i];
      const line = this.lineEls[i];
      if (line) {
        const fromNode = projectedNodes[edge.from];
        const toNode = projectedNodes[edge.to];
        if (fromNode && toNode) {
          line.setAttribute('x1', fromNode.xScreen.toFixed(1));
          line.setAttribute('y1', fromNode.yScreen.toFixed(1));
          line.setAttribute('x2', toNode.xScreen.toFixed(1));
          line.setAttribute('y2', toNode.yScreen.toFixed(1));
        }
      }
    }

    for (let i = 0; i < this.nodes.length; i++) {
      const circle = this.circleEls[i];
      const node = projectedNodes[i];
      if (circle && node) {
        circle.setAttribute('cx', node.xScreen.toFixed(1));
        circle.setAttribute('cy', node.yScreen.toFixed(1));
      }
    }
  }

  private buildGeometry(): void {
    const s = this.shape();
    this.nodes = [];
    this.edges = [];

    if (s === 'dome') {
      for (let i = 0; i < 8; i++) {
        const theta = (i * Math.PI * 2) / 8;
        this.nodes.push({ x: Math.cos(theta), y: Math.sin(theta), z: -0.4 });
      }
      for (let i = 0; i < 8; i++) {
        const theta = (i * Math.PI * 2) / 8 + Math.PI / 8;
        this.nodes.push({ x: 0.8 * Math.cos(theta), y: 0.8 * Math.sin(theta), z: 0.2 });
      }
      for (let i = 0; i < 4; i++) {
        const theta = (i * Math.PI * 2) / 4;
        this.nodes.push({ x: 0.4 * Math.cos(theta), y: 0.4 * Math.sin(theta), z: 0.8 });
      }
      this.nodes.push({ x: 0, y: 0, z: 1.3 });

      for (let i = 0; i < 8; i++) this.edges.push({ from: i, to: (i + 1) % 8 });
      for (let i = 0; i < 8; i++) this.edges.push({ from: 8 + i, to: 8 + ((i + 1) % 8) });
      for (let i = 0; i < 4; i++) this.edges.push({ from: 16 + i, to: 16 + ((i + 1) % 4) });

      for (let i = 0; i < 8; i++) {
        this.edges.push({ from: i, to: 8 + i });
        this.edges.push({ from: i, to: 8 + ((i - 1 + 8) % 8) });
      }
      for (let i = 0; i < 8; i++) {
        this.edges.push({ from: 8 + i, to: 16 + (i % 4) });
      }
      for (let i = 0; i < 4; i++) {
        this.edges.push({ from: 16 + i, to: 20 });
      }

    } else if (s === 'tower') {
      for (let i = 0; i < 8; i++) {
        const theta = (i * Math.PI * 2) / 8;
        this.nodes.push({ x: 1.2 * Math.cos(theta), y: 1.2 * Math.sin(theta), z: -0.8 });
      }
      for (let i = 0; i < 8; i++) {
        const theta = (i * Math.PI * 2) / 8;
        this.nodes.push({ x: 0.6 * Math.cos(theta), y: 0.6 * Math.sin(theta), z: 0.0 });
      }
      for (let i = 0; i < 8; i++) {
        const theta = (i * Math.PI * 2) / 8;
        this.nodes.push({ x: 0.9 * Math.cos(theta), y: 0.9 * Math.sin(theta), z: 0.8 });
      }

      for (let i = 0; i < 8; i++) {
        this.edges.push({ from: i, to: (i + 1) % 8 });
        this.edges.push({ from: 8 + i, to: 8 + ((i + 1) % 8) });
        this.edges.push({ from: 16 + i, to: 16 + ((i + 1) % 8) });
      }
      for (let i = 0; i < 8; i++) {
        this.edges.push({ from: i, to: 8 + ((i + 1) % 8) });
        this.edges.push({ from: i, to: 8 + ((i - 1 + 8) % 8) });
        this.edges.push({ from: 8 + i, to: 16 + ((i + 1) % 8) });
        this.edges.push({ from: 8 + i, to: 16 + ((i - 1 + 8) % 8) });
      }

    } else if (s === 'icosahedron') {
      const phi = 1.61803398875;
      const rawNodes = [
        { x: 0, y: 1, z: phi }, { x: 0, y: 1, z: -phi },
        { x: 0, y: -1, z: phi }, { x: 0, y: -1, z: -phi },
        { x: 1, y: phi, z: 0 }, { x: 1, y: -phi, z: 0 },
        { x: -1, y: phi, z: 0 }, { x: -1, y: -phi, z: 0 },
        { x: phi, y: 0, z: 1 }, { x: phi, y: 0, z: -1 },
        { x: -phi, y: 0, z: 1 }, { x: -phi, y: 0, z: -1 }
      ];
      this.nodes = rawNodes.map(n => ({ x: n.x * 0.6, y: n.y * 0.6, z: n.z * 0.6 }));
      this.edges = [
        { from: 0, to: 2 }, { from: 0, to: 8 }, { from: 0, to: 10 }, { from: 0, to: 4 }, { from: 0, to: 6 },
        { from: 1, to: 3 }, { from: 1, to: 9 }, { from: 1, to: 11 }, { from: 1, to: 4 }, { from: 1, to: 6 },
        { from: 2, to: 8 }, { from: 2, to: 10 }, { from: 2, to: 5 }, { from: 2, to: 7 },
        { from: 3, to: 9 }, { from: 3, to: 11 }, { from: 3, to: 5 }, { from: 3, to: 7 },
        { from: 4, to: 6 }, { from: 4, to: 8 }, { from: 4, to: 9 },
        { from: 5, to: 7 }, { from: 5, to: 8 }, { from: 5, to: 9 },
        { from: 6, to: 10 }, { from: 6, to: 11 },
        { from: 7, to: 10 }, { from: 7, to: 11 },
        { from: 8, to: 9 }, { from: 10, to: 11 }
      ];

    } else if (s === 'cube') {
      this.nodes = [
        { x: -0.7, y: -0.7, z: -0.7 }, { x: 0.7, y: -0.7, z: -0.7 },
        { x: 0.7, y: 0.7, z: -0.7 }, { x: -0.7, y: 0.7, z: -0.7 },
        { x: -0.7, y: -0.7, z: 0.7 }, { x: 0.7, y: -0.7, z: 0.7 },
        { x: 0.7, y: 0.7, z: 0.7 }, { x: -0.7, y: 0.7, z: 0.7 }
      ];
      this.edges = [
        { from: 0, to: 1 }, { from: 1, to: 2 }, { from: 2, to: 3 }, { from: 3, to: 0 },
        { from: 4, to: 5 }, { from: 5, to: 6 }, { from: 6, to: 7 }, { from: 7, to: 4 },
        { from: 0, to: 4 }, { from: 1, to: 5 }, { from: 2, to: 6 }, { from: 3, to: 7 }
      ];

    } else if (s === 'octahedron') {
      this.nodes = [
        { x: 0, y: 0, z: 1.1 }, { x: 0.9, y: 0, z: 0 },
        { x: 0, y: 0.9, z: 0 }, { x: -0.9, y: 0, z: 0 },
        { x: 0, y: -0.9, z: 0 }, { x: 0, y: 0, z: -1.1 }
      ];
      this.edges = [
        { from: 1, to: 2 }, { from: 2, to: 3 }, { from: 3, to: 4 }, { from: 4, to: 1 },
        { from: 0, to: 1 }, { from: 0, to: 2 }, { from: 0, to: 3 }, { from: 0, to: 4 },
        { from: 5, to: 1 }, { from: 5, to: 2 }, { from: 5, to: 3 }, { from: 5, to: 4 }
      ];

    } else if (s === 'blueprint') {
      this.nodes = [
        { x: -1, y: -1, z: -0.6 }, { x: 1, y: -1, z: -0.6 },
        { x: 1, y: 1, z: -0.6 }, { x: -1, y: 1, z: -0.6 },
        { x: -1, y: -1, z: 0.2 }, { x: 1, y: -1, z: 0.2 },
        { x: 1, y: 1, z: 0.2 }, { x: -1, y: 1, z: 0.2 },
        { x: 0, y: 0, z: 0.2 },
        { x: -1, y: -1, z: 1.0 }, { x: 1, y: -1, z: 1.0 },
        { x: 1, y: 1, z: 1.0 }, { x: -1, y: 1, z: 1.0 },
        { x: 0, y: 0, z: 1.0 },
        { x: -0.5, y: -0.5, z: 1.6 }, { x: 0.5, y: -0.5, z: 1.6 },
        { x: 0.5, y: 0.5, z: 1.6 }, { x: -0.5, y: 0.5, z: 1.6 }
      ];
      this.edges = [
        { from: 0, to: 1 }, { from: 1, to: 2 }, { from: 2, to: 3 }, { from: 3, to: 0 },
        { from: 0, to: 4 }, { from: 1, to: 5 }, { from: 2, to: 6 }, { from: 3, to: 7 },
        { from: 4, to: 5 }, { from: 5, to: 6 }, { from: 6, to: 7 }, { from: 7, to: 4 },
        { from: 4, to: 9 }, { from: 5, to: 10 }, { from: 6, to: 11 }, { from: 7, to: 12 }, { from: 8, to: 13 },
        { from: 9, to: 10 }, { from: 10, to: 11 }, { from: 11, to: 12 }, { from: 12, to: 9 },
        { from: 9, to: 14 }, { from: 10, to: 15 }, { from: 11, to: 16 }, { from: 12, to: 17 },
        { from: 14, to: 15 }, { from: 15, to: 16 }, { from: 16, to: 17 }, { from: 17, to: 14 }
      ];

    } else {
      this.nodes = [
        { x: -0.7, y: -0.7, z: -0.5 }, { x: 0.7, y: -0.7, z: -0.5 },
        { x: 0.7, y: 0.7, z: -0.5 }, { x: -0.7, y: 0.7, z: -0.5 },
        { x: 0, y: 0, z: 0.9 }
      ];
      this.edges = [
        { from: 0, to: 1 }, { from: 1, to: 2 }, { from: 2, to: 3 }, { from: 3, to: 0 },
        { from: 0, to: 4 }, { from: 1, to: 4 }, { from: 2, to: 4 }, { from: 3, to: 4 }
      ];
    }
  }
}
