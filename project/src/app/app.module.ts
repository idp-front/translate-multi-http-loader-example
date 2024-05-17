import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ButtonComponent } from '@idp-front/translate-multi-http-loader-example-package';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import {
  PrizmButtonComponent,
  PrizmInputSelectModule,
} from '@prizm-ui/components';
import { BrowserModule } from '@angular/platform-browser';
import { MultiTranslateHttpLoader } from '@idp-front/translate-multi-http-loader';

import { AppComponent } from './app.component';

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
    PrizmInputSelectModule,
    FormsModule,
    ReactiveFormsModule,
    PrizmButtonComponent,
    ButtonComponent,
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
