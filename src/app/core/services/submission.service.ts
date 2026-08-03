import { Injectable, signal } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SubmissionService {
  private readonly _hasSubmitted = signal<boolean>(false);
  readonly hasSubmitted = this._hasSubmitted.asReadonly();

  markSubmitted(): void {
    this._hasSubmitted.set(true);
  }

  reset(): void {
    this._hasSubmitted.set(false);
  }
}
