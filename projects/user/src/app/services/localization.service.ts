import { Injectable } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

@Injectable({
  providedIn: 'root'
})
export class LocalizationService {

  constructor(private translateService: TranslateService) { }
  getCurrentLanguage() {
    return localStorage.getItem('language') || 'en'
  }
  changeAppLanguage(lang: string) {
    this.translateService.setDefaultLang(lang);
    this.translateService.use(lang);
    localStorage.setItem('language', lang);
  }
}
