import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { LocalizationService } from './../../services/localization.service';
import { TranslateService, LangChangeEvent } from '@ngx-translate/core';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  /** current language */
  currentLanguage: string = "en";
  loginForm: FormGroup | any;
  isFormSubmitted: boolean = false;
  constructor(
    private formBuilder: FormBuilder,
    private toastr: ToastrService,
    private router: Router,
    private authService: AuthService,
    private translateService: TranslateService,
    private localizationService: LocalizationService
  ) { }

  ngOnInit(): void {
    this.currentLanguage = this.localizationService.getCurrentLanguage();
    this.translateService.onLangChange.subscribe((event: LangChangeEvent) => {
      this.currentLanguage = event.lang;
    })

    this.loginForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(5), Validators.maxLength(20)]],
      role: ['user'],
    })
  }
  changeLanguage(lang: string) {
    this.localizationService.changeAppLanguage(lang);
  }
  onSubmit() {
    this.isFormSubmitted = true;
    if (this.loginForm.invalid) return;
    this.authService.login(this.loginForm.value).subscribe(res => {
      this.toastr.info("register Success", 'Success');
      localStorage.setItem('userToken', res.token);
      localStorage.setItem('userId', res.userId);
      this.authService.saveCurrentUserToken();
      this.router.navigate(['/tasks']);
    }, err => {
      // this.toastr.error(err.error.message, 'Error')
    })

  }
}
