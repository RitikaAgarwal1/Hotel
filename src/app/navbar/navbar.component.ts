import {Component, OnInit, Renderer} from '@angular/core';
import {MenuItem} from '../interfaces/menu';
import {AuthGuard} from '../service/auth/auth-guard.service';
import {ActivatedRoute, Router} from '@angular/router';
import {AngularFireAuth} from '@angular/fire/auth';
import {User} from 'firebase';

declare var $: any;

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  menuItems: MenuItem[] = [
    {
      displayName: 'Accommodation',
      iconName: 'hotel'
    },
    {
      displayName: 'Activities',
      iconName: 'directions_bike'
    },
    {
      displayName: 'Restaurant',
      iconName: 'restaurant_menu'
    },
    {
      displayName: 'Guests',
      iconName: 'person'
    },
    {
      displayName: 'Personnel Details',
      iconName: 'import_contacts'
    }
  ];

  selectedItem;

  constructor( private auth: AuthGuard,
               private router: Router,
               private render: Renderer,
               private afAuth: AngularFireAuth) { }

  ngOnInit() {
  }

  logout() {
    localStorage.removeItem('user');
    if (!this.auth.isLoggedIn()) {
      this.afAuth.auth.signOut();
      this.router.navigate(['login']);
    }
  }

  clickHandlerAction(menu) {
    switch (menu.displayName) {

      case 'Personnel Details':
        this.router.navigate(['personnel']);
        break;

      case 'Accommodation':
        this.router.navigate(['accommodation']);
        break;

      case 'Activities':
        this.router.navigate(['activities']);
        break;

      case 'Restaurant':
        this.router.navigate(['restaurant']);
        break;

      case 'Guests':
        this.router.navigate(['guest']);
        break;

      default:
        this.gotohomepage();
    }
    this.selectedItem = menu;
  }

  gotohomepage() {
    this.router.navigate(['home']);
  }

}
