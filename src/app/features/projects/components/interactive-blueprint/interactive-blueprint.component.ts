import { Component, signal, computed, inject, afterNextRender, NgZone, OnDestroy } from '@angular/core';

interface Point3D {
  x: number;
  y: number;
  z: number;
  type: 'node' | 'accent' | 'foundation';
}

interface Edge {
  from: number;
  to: number;
  type: 'beam' | 'column' | 'foundation';
}

interface ProjectedNode extends Point3D {
  xScreen: number;
  yScreen: number;
  originalIndex: number;
}

@Component({
  selector: 'app-interactive-blueprint',
  imports: [],
  template: `
    <div class="relative w-full max-w-[450px] overflow-hidden flex flex-col items-center justify-center select-none opacity-90 pointer-events-none" aria-hidden="true">
      <div class="relative w-full h-[240px] md:h-[260px] flex items-center justify-center z-10">
        <svg 
          width="100%" 
          height="100%" 
          [attr.viewBox]="'0 0 ' + viewWidth + ' ' + viewHeight"
          class="overflow-visible"
        >
          <!-- Ground Base Radial Shadow -->
          <ellipse 
            [attr.cx]="cx" 
            [attr.cy]="cy + 55" 
            rx="130" 
            ry="45" 
            fill="url(#blueprint-shadow)" 
            opacity="0.12" 
          />
          
          <defs>
            <radialGradient id="blueprint-shadow" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="#142b52" />
              <stop offset="100%" stopColor="transparent" stopOpacity="0" />
            </radialGradient>
          </defs>

          <!-- Foundational Ground Rings -->
          <g opacity="0.12">
            <ellipse [attr.cx]="cx" [attr.cy]="cy + 40" rx="140" ry="50" fill="none" stroke="#142b52" strokeWidth="1" strokeDasharray="5,5" />
            <ellipse [attr.cx]="cx" [attr.cy]="cy + 40" rx="100" ry="36" fill="none" stroke="#142b52" strokeWidth="1" />
          </g>

          <!-- Render Beams & Columns -->
          <g>
            @for (edge of edges; track $index) {
              @let nodeFrom = projectedNodes()[edge.from];
              @let nodeTo = projectedNodes()[edge.to];
              @if (nodeFrom && nodeTo) {
                <line
                  [attr.x1]="nodeFrom.xScreen"
                  [attr.y1]="nodeFrom.yScreen"
                  [attr.x2]="nodeTo.xScreen"
                  [attr.y2]="nodeTo.yScreen"
                  [attr.stroke]="edge.type === 'foundation' ? '#94a3b8' : edge.type === 'column' ? '#142b52' : '#475569'"
                  [attr.stroke-width]="edge.type === 'column' ? '1.8' : '1.5'"
                  [attr.stroke-dasharray]="edge.type === 'foundation' ? '3,3' : null"
                />
              }
            }
          </g>

          <!-- Render Joints / Vertices -->
          <g>
            @for (node of projectedNodes(); track node.originalIndex) {
              @let r = node.type === 'accent' ? 5 : 4;
              @let fillColor = node.type === 'accent' ? '#FFEEDB' : node.type === 'foundation' ? '#cbd5e1' : '#ffffff';
              @let strokeColor = node.type === 'accent' ? '#EA8A22' : node.type === 'foundation' ? '#64748b' : '#142b52';

              <g>
                @if (node.type === 'accent') {
                  <circle
                    [attr.cx]="node.xScreen"
                    [attr.cy]="node.yScreen"
                    r="12"
                    fill="none"
                    stroke="#EA8A22"
                    strokeWidth="1"
                    opacity="0.3"
                    class="animate-ping"
                    style="animation-duration: 3s;"
                  />
                }
                <circle
                  [attr.cx]="node.xScreen"
                  [attr.cy]="node.yScreen"
                  [attr.r]="r"
                  [attr.fill]="fillColor"
                  [attr.stroke]="strokeColor"
                  strokeWidth="1.5"
                />
              </g>
            }
          </g>
        </svg>
      </div>
    </div>
  `
})
export class InteractiveBlueprintComponent implements OnDestroy {
  private readonly ngZone = inject(NgZone);

  readonly angle = signal<number>(0.5);

  readonly viewWidth = 440;
  readonly viewHeight = 310;
  readonly cx = 440 / 2;
  readonly cy = 185;

  readonly nodes: Point3D[] = [
    { x: -1, y: -1, z: -0.6, type: 'foundation' },
    { x: 1, y: -1, z: -0.6, type: 'foundation' },
    { x: 1, y: 1, z: -0.6, type: 'foundation' },
    { x: -1, y: 1, z: -0.6, type: 'foundation' },

    { x: -1, y: -1, z: 0.2, type: 'node' },
    { x: 1, y: -1, z: 0.2, type: 'node' },
    { x: 1, y: 1, z: 0.2, type: 'node' },
    { x: -1, y: 1, z: 0.2, type: 'node' },
    { x: 0, y: 0, z: 0.2, type: 'accent' },

    { x: -1, y: -1, z: 1.0, type: 'node' },
    { x: 1, y: -1, z: 1.0, type: 'node' },
    { x: 1, y: 1, z: 1.0, type: 'node' },
    { x: -1, y: 1, z: 1.0, type: 'node' },
    { x: 0, y: 0, z: 1.0, type: 'accent' },

    { x: -0.5, y: -0.5, z: 1.6, type: 'node' },
    { x: 0.5, y: -0.5, z: 1.6, type: 'node' },
    { x: 0.5, y: 0.5, z: 1.6, type: 'node' },
    { x: -0.5, y: 0.5, z: 1.6, type: 'node' },
  ];

  readonly edges: Edge[] = [
    { from: 0, to: 1, type: 'foundation' },
    { from: 1, to: 2, type: 'foundation' },
    { from: 2, to: 3, type: 'foundation' },
    { from: 3, to: 0, type: 'foundation' },

    { from: 0, to: 4, type: 'column' },
    { from: 1, to: 5, type: 'column' },
    { from: 2, to: 6, type: 'column' },
    { from: 3, to: 7, type: 'column' },

    { from: 4, to: 5, type: 'beam' },
    { from: 5, to: 6, type: 'beam' },
    { from: 6, to: 7, type: 'beam' },
    { from: 7, to: 4, type: 'beam' },

    { from: 4, to: 9, type: 'column' },
    { from: 5, to: 10, type: 'column' },
    { from: 6, to: 11, type: 'column' },
    { from: 7, to: 12, type: 'column' },
    { from: 8, to: 13, type: 'column' },

    { from: 9, to: 10, type: 'beam' },
    { from: 10, to: 11, type: 'beam' },
    { from: 11, to: 12, type: 'beam' },
    { from: 12, to: 9, type: 'beam' },

    { from: 9, to: 14, type: 'column' },
    { from: 10, to: 15, type: 'column' },
    { from: 11, to: 16, type: 'column' },
    { from: 12, to: 17, type: 'column' },

    { from: 14, to: 15, type: 'beam' },
    { from: 15, to: 16, type: 'beam' },
    { from: 16, to: 17, type: 'beam' },
    { from: 17, to: 14, type: 'beam' },
  ];

  readonly projectedNodes = computed<ProjectedNode[]>(() => {
    const currentAngle = this.angle();
    const cos = Math.cos(currentAngle);
    const sin = Math.sin(currentAngle);
    const spacingX = 64;
    const spacingY = 32;
    const spacingZ = 58;

    return this.nodes.map((node, index) => {
      const rx = node.x * cos - node.y * sin;
      const ry = node.x * sin + node.y * cos;
      const xScreen = this.cx + (rx - ry) * spacingX;
      const yScreen = this.cy + (rx + ry) * spacingY - node.z * spacingZ;

      return {
        ...node,
        xScreen,
        yScreen,
        originalIndex: index
      };
    });
  });

  private animFrameId?: number;

  constructor() {
    afterNextRender(() => {
      this.startRotationLoop();
    });
  }

  ngOnDestroy(): void {
    if (this.animFrameId) {
      cancelAnimationFrame(this.animFrameId);
    }
  }

  private startRotationLoop(): void {
    this.ngZone.runOutsideAngular(() => {
      const step = () => {
        this.angle.update(prev => (prev + 0.004) % (Math.PI * 2));
        this.animFrameId = requestAnimationFrame(step);
      };
      this.animFrameId = requestAnimationFrame(step);
    });
  }
}
