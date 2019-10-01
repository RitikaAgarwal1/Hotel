import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree} from '@angular/router';
import {Observable, of} from 'rxjs';

import * as firebase from 'firebase/app';
import {User} from '../../interfaces/user';
import {AngularFirestore, AngularFirestoreDocument} from '@angular/fire/firestore';
import {AngularFireAuth} from '@angular/fire/auth';
import { switchMap} from 'rxjs/operators';
import {auth} from 'firebase';


@Injectable()
export class AuthGuard implements CanActivate {
  user: Observable<User>;

  constructor(private router: Router,
              private afs: AngularFirestore,
              private afAuth: AngularFireAuth) {

    this.user = this.afAuth.authState.pipe(
      switchMap(user => {
        if (user) {
          return this.afs.doc<User>(`users/${user.uid}`).valueChanges();
        } else {
          return of(null);
        }
      })
    );
  }

  googleLogin() {
    const provider = new auth.GoogleAuthProvider();
    return this.oAuthLogin(provider);
  }

  private oAuthLogin(provider) {
    return this.afAuth.auth.signInWithPopup(provider)
      .then((credential) => {
        this.updateUserData(credential.user);
      });
  }

  private updateUserData(user) {
    // Sets user data to firestore on login

    const userRef: AngularFirestoreDocument<any> = this.afs.doc(`users/${user.uid}`);

    const data: User = {
      uid: user.uid,
      email: user.email,
      displayName: user.displayName,
      photoURL: user.photoURL
    };

    return userRef.set(data, { merge: true });

  }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot):
    Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    if (!this.isLoggedIn()) {
      this.router.navigate(['login'], { queryParams: { returnUrl: state.url }});
    }
    return true;
  }

  signOut() {
    this.afAuth.auth.signOut().then(() => {
    });
  }

  isLoggedIn() {
    const loginResponse = JSON.parse(localStorage.getItem('loginResponse'));
    if (loginResponse) {
      if (!!loginResponse.registered) {
        return true;
      } else {
        return false;
      }
    }
  }
}
