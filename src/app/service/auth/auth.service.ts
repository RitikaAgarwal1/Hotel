import { Injectable } from '@angular/core';
import {BaseService} from '../base/base.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor( private baseService: BaseService ) { }

  signupUrl: string = 'https://www.googleapis.com/identitytoolkit/v3/relyingparty/signupNewUser?key=AIzaSyCk05yx9hJWGLnAWg3w7EuqoYlOuYYAWBg';
  signinUrl: string = 'https://www.googleapis.com/identitytoolkit/v3/relyingparty/verifyPassword?key=AIzaSyCk05yx9hJWGLnAWg3w7EuqoYlOuYYAWBg';

  signup(displayName: string, email: string, password: string) {
    const payload = {
      displayName: displayName,
      email: email,
      password: password,
      returnSecureToken: true
    };

    return this.baseService.doPost(this.signupUrl, payload);
  }

  login(email: string, password: string) {
    const payload = {
      email: email,
      password: password,
      returnSecureToken: true
    };

    return this.baseService.doPost(this.signinUrl, payload);
  }
}
