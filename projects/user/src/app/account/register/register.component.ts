import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { LocalizationService } from './../../services/localization.service';
import { TranslateService, LangChangeEvent } from '@ngx-translate/core';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  /** current language */
  currentLanguage: string = "en";
  registerForm: FormGroup | any;
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

    this.registerForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(5), Validators.maxLength(20)]],
      confrimPassword: ['', [Validators.required, Validators.minLength(5), Validators.maxLength(20)]],
      username: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(50)]],
    }, {
      validator: [
        this.mustMatch('password', 'confrimPassword')
      ]
    }
    )
  }
  changeLanguage(lang: string) {
    this.localizationService.changeAppLanguage(lang);
  }
  onSubmit() {
    this.isFormSubmitted = true;
    if (this.registerForm.invalid) return;
    let fromModel = {
      email: this.registerForm.value.email,
      password: this.registerForm.value.password,
      username: this.registerForm.value.username,
      role: 'admin',
    }
    this.authService.register(fromModel).subscribe(res => {
      this.toastr.info("register Success", 'Success');
      localStorage.setItem('userToken', res.token);
      localStorage.setItem('userId', res.userId);
      this.authService.saveCurrentUserToken();
      this.router.navigate(['/tasks']);
    }, err => {
      // this.toastr.error(err.error.message, 'Error')
    })
  }
  mustMatch(controlName: string, matchingControlName: string) {
    return (formGroup: FormGroup) => {
      const control = formGroup.controls[controlName];
      const matchingControl = formGroup.controls[matchingControlName];
      if (matchingControl.errors && !matchingControl.errors.mustMatch) {
        return;
      }
      if (control.value !== matchingControl.value) {
        matchingControl.setErrors({ mustMatch: true })
      }
      else {
        matchingControl.setErrors(null);
      }
    }
  }
}
