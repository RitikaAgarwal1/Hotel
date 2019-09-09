import {Component, ElementRef, OnInit} from '@angular/core';
import {NgForm} from '@angular/forms';
import {AuthService} from '../service/auth/auth.service';
import {Router} from '@angular/router';
import {AuthGuard} from '../service/auth/auth-guard.service';

declare var $: any;

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  isLoginMode = true;
  icon = 'visibility_off';

  displayName: string;
  email: string;
  password: string;
  error: string;
  errormsg: boolean = false;
  isLoading: boolean = false;
  private nativeElement: Node;

  show: boolean = false;

  constructor( private authService: AuthService,
               private router: Router,
               private authguard: AuthGuard,
               private element: ElementRef) {

    if (this.authguard.isLoggedIn()) {
      this.router.navigate(['home']);
    } else {
      this.nativeElement = element.nativeElement;
    }
  }

  ngOnInit() {
  }

  onSwitchMode() {
    this.isLoginMode = !this.isLoginMode;
  }

  onSubmit(form: NgForm) {
    if (!form.valid) {
      return;
    }
    const email = form.value.email;
    const password = form.value.password;
    const displayName = form.value.displayName;

    this.isLoading = true;

    if (this.isLoginMode) {
      this.authService.login(email, password).subscribe(res => {
          this.router.navigate(['home']);
          console.log(res);
          localStorage.setItem('loginResponse', JSON.stringify(res));
          this.isLoading = false;
      },
        error => {
          this.error = error.error.error.message;
          this.errormsg = true;

          switch (this.error) {
            case 'EMAIL_NOT_FOUND':
              this.error = 'This Email Id does not exists';
              break;

            case 'INVALID_PASSWORD':
              this.error = 'Wrong password, Please try again!';
              break;

            case 'USER_DISABLED':
              this.error = 'The user account has been disabled by an administrator';
              break;

            default:
              this.error = 'Something went wrong! Please try again';
          }
          this.isLoading = false;
          });
    } else {
      this.authService.signup(displayName, email, password).subscribe(res => {
          this.isLoading = false;
        },
        error => {
          this.error = error.error.error.message;
          this.errormsg = true;

          switch (this.error) {
            case 'EMAIL_EXISTS':
              this.error = 'Email already exists';
              break;

            case 'TOO_MANY_ATTEMPTS_TRY_LATER':
              this.error = 'Password sign-in is disabled';
              break;

            case 'OPERATION_NOT_ALLOWED':
              this.error = 'We have blocked all requests from this device due to unusual activity. Try again later';
              break;

            default:
              this.error = 'Something went wrong! Please try again';
          }

          this.isLoading = false;

        });
    }
    form.reset();
  }

  showPassword() {
    this.show = !this.show;
    this.show ? this.icon = 'visibility' : this.icon = 'visibility_off';
  }

}
