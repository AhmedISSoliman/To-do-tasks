import { Component, OnInit } from '@angular/core';
import { TranslateService, LangChangeEvent } from '@ngx-translate/core';
import { AuthService } from '../../services/auth.service';
import { LocalizationService } from './../../services/localization.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  userData: any;
  /** current language */
  currentLanguage: string = "en";
  isCollabpsed: boolean = false;
  constructor(private translateService: TranslateService,
    private localizationService: LocalizationService,
    public authService: AuthService
  ) { }

  ngOnInit(): void {
    this.currentLanguage = this.localizationService.getCurrentLanguage();
    this.translateService.onLangChange.subscribe((event: LangChangeEvent) => {
      this.currentLanguage = event.lang;
    })
    this.userData = this.authService.userData();
  }
  logout() {
    this.authService.logout();
  }
  changeLanguage(lang: string) {
    this.localizationService.changeAppLanguage(lang);
  }
  openMenu() {
    this.isCollabpsed = !this.isCollabpsed;
  }
}
