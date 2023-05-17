import { Component } from '@angular/core';
import { TranslateService } from '@ngx-translate/core/public_api';
import { LocalizationService } from './services/localization.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  constructor(private localizationService: LocalizationService) {
    // get current lang app
    var currentLanguage = this.localizationService.getCurrentLanguage();
    this.localizationService.changeLanguage(currentLanguage);
  }
  title = 'Admin';
}
