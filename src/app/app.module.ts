import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { AppRoutingModule } from './app-routing.module';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {FormsModule} from '@angular/forms';
import {
  MatCardModule,
  MatDatepickerModule,
  MatDialogModule,
  MatIconModule,
  MatInputModule,
  MatNativeDateModule, MatPaginatorModule,
  MatSelectModule, MatSortModule, MatTableModule
} from '@angular/material';
import { HomepageComponent } from './homepage/homepage.component';
import { NavbarComponent } from './navbar/navbar.component';
import { FooterComponent } from './footer/footer.component';
import {HttpClientModule} from '@angular/common/http';
import { TodoComponent } from './todo/todo.component';
import {environment} from '../environments/environment';
import {AngularFireModule} from '@angular/fire';
import {AngularFireAuthModule} from '@angular/fire/auth';
import {AngularFireDatabaseModule} from '@angular/fire/database';
import { AccommodationComponent } from './accommodation/accommodation.component';
import { ActivitiesComponent } from './activities/activities.component';
import { RestaurantComponent } from './restaurant/restaurant.component';
import { GuestComponent } from './guest/guest.component';
import {DragDropModule} from '@angular/cdk/drag-drop';
import { RoomBookingFormComponent } from './accommodation/room-booking-form/room-booking-form.component';
import { PersonnelComponent } from './personnel/personnel.component';
import {AngularFirestoreModule} from '@angular/fire/firestore';
import { UserProfileComponent } from './user-profile/user-profile.component';

declare var $: any;

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    HomepageComponent,
    NavbarComponent,
    FooterComponent,
    TodoComponent,
    AccommodationComponent,
    ActivitiesComponent,
    RestaurantComponent,
    GuestComponent,
    RoomBookingFormComponent,
    PersonnelComponent,
    UserProfileComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    FormsModule,
    MatInputModule,
    MatIconModule,
    HttpClientModule,
    MatCardModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireAuthModule,
    AngularFirestoreModule,
    AngularFireDatabaseModule,
    DragDropModule,
    MatDialogModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatSelectModule,
    MatTableModule,
    MatSortModule,
    MatPaginatorModule
  ],
  providers: [],
  bootstrap: [AppComponent],
  entryComponents: [RoomBookingFormComponent]
})
export class AppModule { }
