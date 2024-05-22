import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-root',
  template: `
    <app-language-selector />
    <app-button />
    <shared-button />
  `,
  styles: `
    :host {
      display: flex;
      padding: 16px;
      
      * {
        margin-right: 16px;
      }
    }
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppComponent {}
