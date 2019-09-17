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
               private render: Renderer) { }

  ngOnInit() {
  }

  logout() {
    localStorage.removeItem('loginResponse');
    if (!this.auth.isLoggedIn()) {
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
