import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from './../../services/auth.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { UserLogin } from '../../models/user-login.model';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { TranslateService } from '@ngx-translate/core';
import { LocalizationService } from './../../services/localization.service';
import { LangChangeEvent } from '@ngx-translate/core/public_api';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup | any;
  isFormSubmitted: boolean = false;
  currentLanguage: string = 'en';
  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private spinner: NgxSpinnerService,
    private router: Router,
    private toastr: ToastrService,
    private translateService: TranslateService,
    private localizationService: LocalizationService
  ) { }

  ngOnInit(): void {
    this.loginForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(5), Validators.maxLength(20)]],
      role: ['admin']
    });
    this.currentLanguage = this.localizationService.getCurrentLanguage();
    this.translateService.onLangChange.subscribe((event: LangChangeEvent) => {
      this.currentLanguage = event.lang;
    })
  }
  onSubmit() {
    this.isFormSubmitted = true;
    if (this.loginForm.invalid) {
      return;
    }
    this.authService.login(this.loginForm.value).subscribe(res => {
      this.toastr.info(this.translateService.instant("LoginSuccess"), this.translateService.instant('Success'));
      localStorage.setItem('userToken', res.token);
      this.authService.saveCurrentUserToken();
      this.router.navigate(['/tasks']);
    }, err => {
      // this.toastr.error(err.error.message, 'Error')
    })

  }
  changeLanguage(lang: string) {
    this.localizationService.changeLanguage(lang);
    location.reload();
  }
}
