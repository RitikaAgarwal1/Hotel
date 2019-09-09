import { NgModule } from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {LoginComponent} from './login/login.component';
import {HomepageComponent} from './homepage/homepage.component';
import {AuthGuard} from './service/auth/auth-guard.service';
import {AccommodationComponent} from './accommodation/accommodation.component';
import {ActivitiesComponent} from './activities/activities.component';
import {GuestComponent} from './guest/guest.component';
import {RestaurantComponent} from './restaurant/restaurant.component';

const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'home', component: HomepageComponent, canActivate: [AuthGuard] },
  { path: 'accommodation', component: AccommodationComponent },
  { path: 'activities', component: ActivitiesComponent },
  { path: 'guest', component: GuestComponent },
  { path: 'restaurant', component: RestaurantComponent },
  { path: '',
    redirectTo: '/home',
    pathMatch: 'full'
  }
];

@NgModule({
  exports: [ RouterModule ],
  imports: [ RouterModule.forRoot(routes) ],
  providers: [ AuthGuard ]
})
export class AppRoutingModule { }
