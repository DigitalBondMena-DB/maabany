import { inject, Injectable, NgZone, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

export interface ScrollObserverOptions {
  root?: Element | Document | null;
  rootMargin?: string;
  threshold?: number;
}

export type IntersectionCallback = (entry: IntersectionObserverEntry) => void;

interface ObserverEntry {
  observer: IntersectionObserver;
  targets: Map<Element, IntersectionCallback>;
}

@Injectable({
  providedIn: 'root',
})
export class ScrollRevealService {
  private readonly ngZone = inject(NgZone);
  private readonly platformId = inject(PLATFORM_ID);

  private readonly observers = new Map<string, ObserverEntry>();

  /**
   * Registers an element with a shared IntersectionObserver instance.
   * Returns an unregister cleanup function.
   */
  register(
    element: Element,
    options: ScrollObserverOptions,
    callback: IntersectionCallback
  ): () => void {
    if (!isPlatformBrowser(this.platformId)) {
      return () => {};
    }

    const key = this.getObserverKey(options);

    this.ngZone.runOutsideAngular(() => {
      let entry = this.observers.get(key);

      if (!entry) {
        const targets = new Map<Element, IntersectionCallback>();
        const observer = new IntersectionObserver(
          (entries) => {
            for (let i = 0; i < entries.length; i++) {
              const item = entries[i];
              const cb = targets.get(item.target);
              if (cb) {
                cb(item);
              }
            }
          },
          {
            root: options.root,
            rootMargin: options.rootMargin ?? '0px',
            threshold: options.threshold ?? 0.15,
          }
        );

        entry = { observer, targets };
        this.observers.set(key, entry);
      }

      entry.targets.set(element, callback);
      entry.observer.observe(element);
    });

    return () => this.unregister(element, options);
  }

  /**
   * Unregisters an element from its shared IntersectionObserver instance.
   */
  unregister(element: Element, options: ScrollObserverOptions): void {
    const key = this.getObserverKey(options);
    const entry = this.observers.get(key);
    if (!entry) return;

    entry.observer.unobserve(element);
    entry.targets.delete(element);

    if (entry.targets.size === 0) {
      entry.observer.disconnect();
      this.observers.delete(key);
    }
  }

  private getObserverKey(options: ScrollObserverOptions): string {
    const rootId = options.root
      ? (options.root as HTMLElement).id || 'custom-root'
      : 'null';
    return `${rootId}|${options.rootMargin ?? '0px'}|${options.threshold ?? 0.15}`;
  }
}
