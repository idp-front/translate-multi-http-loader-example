import {
  ChangeDetectionStrategy,
  Component,
  DestroyRef,
  OnInit,
  inject,
} from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

import { UntypedFormControl } from '@angular/forms';
import { TranslateService } from '@ngx-translate/core';
import { PrizmSelectIdentityMatcher } from '@prizm-ui/components';
import { get } from 'lodash-es';

import { Observable, of } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.less',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppComponent implements OnInit {
  public languageItems: Record<string, string>[] = [
    {
      id: 'ru_RU',
      name: 'Application.LanguageItems.Russian',
    },
    {
      id: 'en_US',
      name: 'Application.LanguageItems.English',
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
