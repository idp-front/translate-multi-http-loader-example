import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';
import { PrizmButtonComponent } from '@prizm-ui/components';

@Component({
  selector: 'app-button',
  standalone: true,
  imports: [CommonModule, TranslateModule, PrizmButtonComponent],
  template: `<button prizmButton>
    {{ 'Application.ButtonComponent.Button' | translate }}
  </button>`,
})
export class ButtonComponent {}
