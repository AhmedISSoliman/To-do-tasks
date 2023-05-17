import { Component } from '@angular/core';
import { LocalizationService } from './services/localization.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  constructor(private localizationService: LocalizationService) {
    var currentLanguage = this.localizationService.getCurrentLanguage();
    this.localizationService.changeAppLanguage(currentLanguage)
  }
  title = 'user';
}
