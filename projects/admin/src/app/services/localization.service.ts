import { Injectable } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

@Injectable({
  providedIn: 'root'
})
export class LocalizationService {

  constructor(private translateService: TranslateService) { }

  getCurrentLanguage() {
    return localStorage.getItem('language') || 'en';
  }

  changeLanguage(lang: string) {
    this.translateService.setDefaultLang(lang);
    this.translateService.use(lang);
    localStorage.setItem('language', lang);
    this.changeAppTheme(lang);
  }
  changeAppTheme(lang: string) {
    if (lang == 'ar') {
      document.dir = 'rtl';
      document.documentElement.lang = lang;
      document.body.classList.add('rtl');
      document.body.classList.remove('ltr');
    }
    else {
      document.dir = 'ltr';
      document.body.classList.remove('rtl');
      document.body.classList.add('ltr');
    }
    document.documentElement.lang = lang;
  }
}
