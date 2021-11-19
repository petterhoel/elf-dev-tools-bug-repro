import { Component, ChangeDetectionStrategy } from '@angular/core';

@Component({
  template: `
    <img src="/assets/alf.png" alt="imahe of alf">
  `,
  styles: [`
  :host {
    display: grid;
    place-items: center;
  }
  `],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AlfComponent {}
