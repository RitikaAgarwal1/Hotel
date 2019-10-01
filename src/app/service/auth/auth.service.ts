import { Injectable } from '@angular/core';
import {BaseService} from '../base/base.service';
import {AngularFireAuth} from '@angular/fire/auth';
import {AngularFirestore} from '@angular/fire/firestore';
import {Router} from '@angular/router';
import {BehaviorSubject} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private eventAuthError = new BehaviorSubject<string>('');
  eventAuthError$ = this.eventAuthError.asObservable();

  newUser: any;

  constructor( private baseService: BaseService,
               private afAuth: AngularFireAuth,
               private db: AngularFirestore,
               private router: Router) { }

  signupUrl: string = 'https://www.googleapis.com/identitytoolkit/v3/relyingparty/signupNewUser?key=AIzaSyCk05yx9hJWGLnAWg3w7EuqoYlOuYYAWBg';
  signinUrl: string = 'https://www.googleapis.com/identitytoolkit/v3/relyingparty/verifyPassword?key=AIzaSyCk05yx9hJWGLnAWg3w7EuqoYlOuYYAWBg';
  //signinUrl: string = 'https://identitytoolkit.googleapis.com/v1/accounts:signInWithIdp?key=AIzaSyCk05yx9hJWGLnAWg3w7EuqoYlOuYYAWBg';

  getUserState() {
    return this.afAuth.authState;
  }

  signup(user) {
    this.afAuth.auth.createUserWithEmailAndPassword(user.email, user.password)
      .then( userCredential => {
        this.newUser = user;

        userCredential.user.updateProfile( {
          displayName: user.displayName
        });

        this.insertUserData(userCredential)
          .then(() => {
            this.router.navigate(['/login']);
          });
      })
      .catch( error => {
        this.eventAuthError.next(error);
      });
    /*const payload = {
      displayName: displayName,
      email: email,
      password: password,
      returnSecureToken: true
    };

    return this.baseService.doPost(this.signupUrl, payload);*/
  }

  insertUserData(userCredential: firebase.auth.UserCredential) {
    return this.db.doc(`Users/${userCredential.user.uid}`).set({
      email: this.newUser.email,
      displayName: this.newUser.displayName
    });
  }

  login(email: string, password: string) {
    this.afAuth.auth.signInWithEmailAndPassword(email, password)
      .catch(error => {
        this.eventAuthError.next(error);
      })
      .then(userCredential => {
        if (userCredential) {
          this.router.navigate(['/home']);
          localStorage.setItem('user', JSON.stringify(userCredential));
        }
      });
    /*const payload = {
      email: email,
      password: password,
      returnSecureToken: true
    };

    return this.baseService.doPost(this.signinUrl, payload);*/
  }
}
