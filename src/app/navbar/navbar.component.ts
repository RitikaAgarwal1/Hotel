import {Component, OnInit, Renderer} from '@angular/core';
import {MenuItem} from '../interfaces/menu';
import {AuthGuard} from '../service/auth/auth-guard.service';
import {ActivatedRoute, Router} from '@angular/router';

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
      iconName: 'perm_identity'
    },
    {
      displayName: 'Log Out',
      iconName: 'lock'
    }
  ];

  selectedItem;

  constructor( private auth: AuthGuard,
               private router: Router,
               private render: Renderer) { }

  ngOnInit() {
  }

  clickHandlerAction(menu) {
    switch (menu.displayName) {
      case 'Log Out':
        localStorage.removeItem('loginResponse');
        if (!this.auth.isLoggedIn()) {
          this.router.navigate(['login']);
        }
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
