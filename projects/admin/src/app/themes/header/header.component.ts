import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { AuthService } from '../../services/auth.service';
import { LocalizationService } from './../../services/localization.service';
import { TranslateService, LangChangeEvent } from '@ngx-translate/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  isLoggedIn$!: Observable<boolean>;
  /** current language */
  currentLanguage: string = "en";
  isCollabpsed: boolean = false;
  constructor(public authService: AuthService,
    private localizationService: LocalizationService,
    private translate: TranslateService
  ) {
  }

  ngOnInit(): void {
    // set current language
    this.currentLanguage = this.localizationService.getCurrentLanguage();
    this.translate.onLangChange.subscribe((event: LangChangeEvent) => {
      this.currentLanguage = event.lang;
    });
  }
  logout() {
    this.authService.logout();
  }
  /**
 * used to change language app
 * @param lang string
 */
  changeLanguage(lang: string) {
    this.localizationService.changeLanguage(lang);
    this.currentLanguage = lang
  }
  openMenu() {
    this.isCollabpsed = !this.isCollabpsed;
  }
}
