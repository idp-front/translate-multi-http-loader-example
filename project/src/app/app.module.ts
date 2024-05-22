import { NgModule } from '@angular/core';
import { ButtonComponent as SharedButtonComponent } from '@idp-front/translate-multi-http-loader-example-package';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';

import { BrowserModule } from '@angular/platform-browser';
import { MultiTranslateHttpLoader } from '@idp-front/translate-multi-http-loader';

import { AppComponent } from './app.component';
import { ButtonComponent } from './components/button/button.component';
import { LanguageSelectorComponent } from './components/language-selector/language-selector.component';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    TranslateModule.forRoot({
      defaultLanguage: 'ru_RU',
      loader: {
        provide: TranslateLoader,
        useFactory: () =>
          new MultiTranslateHttpLoader([
            `/assets/i18n/`,
            `/assets/shared/i18n/`,
          ]),
      },
    }),
    SharedButtonComponent,
    ButtonComponent,
    LanguageSelectorComponent,
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
