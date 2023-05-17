import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS, HttpClient } from '@angular/common/http';
import { SharedMaterialModule } from './shared-material/shared-material.module';
import { NgxSpinnerModule } from 'ngx-spinner';
import { LayoutComponent } from './layout/layout.component';
import { HeaderComponent } from './themes/header/header.component';
import { LoginComponent } from './account/login/login.component';
import { ToastrModule } from 'ngx-toastr';
import { AuthGuard } from './guards/auth.guard';
import { CurrentUserCheckGuard } from './guards/current-user-check.guard';
import { Interceptor } from './interceptors/interceptor';
import { NgxPaginationModule } from 'ngx-pagination';
import { ErrorInterceptor } from './interceptors/error.interceptor';
import { SpinnerInterceptor } from './interceptors/spinner.interceptor';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { LocalizationService } from './services/localization.service';
// AoT requires an exported function for factories
export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http);

}
@NgModule({
  declarations: [
    AppComponent,
    LayoutComponent,
    HeaderComponent,
    LoginComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    RouterModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule,
    SharedMaterialModule,
    NgxSpinnerModule.forRoot(),
    ToastrModule.forRoot({
      progressBar: true,
      closeButton: true,
      timeOut: 3000
    }),
    NgxPaginationModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient]
      }
    }),

  ],
  providers: [
    AuthGuard,
    CurrentUserCheckGuard,
    { provide: HTTP_INTERCEPTORS, useClass: Interceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: SpinnerInterceptor, multi: true },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }


