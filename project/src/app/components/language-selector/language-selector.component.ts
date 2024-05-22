import {
  ChangeDetectionStrategy,
  Component,
  DestroyRef,
  OnInit,
  inject,
} from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

import {
  FormsModule,
  ReactiveFormsModule,
  UntypedFormControl,
} from '@angular/forms';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import {
  PrizmInputSelectModule,
  PrizmSelectIdentityMatcher,
} from '@prizm-ui/components';
import { get } from 'lodash-es';

import { Observable, of } from 'rxjs';

@Component({
  selector: 'app-language-selector',
  standalone: true,
  imports: [
    PrizmInputSelectModule,
    TranslateModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  template: `
    <prizm-input-layout
      [label]="'Application.LanguageSelectorComponent.LanguageItems.Header' | translate"
      [forceClear]="false"
    >
      <prizm-input-select
        [nullContent]="''"
        [items]="languageItems"
        [formControl]="languageControl"
        [identityMatcher]="identityMatcher"
        [stringify]="stringify"
      >
      </prizm-input-select>
    </prizm-input-layout>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LanguageSelectorComponent implements OnInit {
  public languageItems: Record<string, string>[] = [
    {
      id: 'ru_RU',
      name: 'Application.LanguageSelectorComponent.LanguageItems.Russian',
    },
    {
      id: 'en_US',
      name: 'Application.LanguageSelectorComponent.LanguageItems.English',
    },
  ];
  public languageControl = new UntypedFormControl(this.languageItems[0]);

  public identityMatcher: PrizmSelectIdentityMatcher<Record<string, string>> = (
    a: Record<string, string>,
    b: Record<string, string>
  ) => get(a, 'id') === get(b, 'id');

  public stringify = (item: Record<string, string>): Observable<string> =>
    item ? this.translateService.get(item['name']) : of('');

  private destroyRef = inject(DestroyRef);

  constructor(private translateService: TranslateService) {}

  ngOnInit(): void {
    this.languageControl.valueChanges
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe(({ id }: Record<string, string>) =>
        this.translateService.use(id)
      );
  }
}
