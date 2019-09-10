import { Component, OnInit } from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import {RoomBookingFormComponent} from './room-booking-form/room-booking-form.component';
import {RoomBooking} from '../interfaces/room-booking';
import {BookingService} from '../service/booking/booking.service';
import Swal from 'sweetalert2';
import 'sweetalert2/src/sweetalert2.scss';

declare var $: any;

@Component({
  selector: 'app-accommodation',
  templateUrl: './accommodation.component.html',
  styleUrls: ['./accommodation.component.css', '../../assets/Creating-3D-Perspective-Carousel-with-jQuery-CSS3-CSSSlider/main.css']
})
export class AccommodationComponent implements OnInit {

  rooms;
  roomBooking: RoomBooking;
  email: string;
  bookingDays;
  guestName: string;
  roomNumber: number;
  pax: any;
  selectedItem;

  roomGroup = [
    'Suites',
    'Ritz One',
    'The Towers'
  ];

  constructor(public dialog: MatDialog,
              private bookingService: BookingService) { }

  ngOnInit() {
    $.getScript('../../assets/Creating-3D-Perspective-Carousel-with-jQuery-CSS3-CSSSlider/main.js');
    this.getRoomList('Suites');
  }

  getRoomList(roomGroupName) {
    this.selectedItem = roomGroupName;
    switch (roomGroupName) {
      case 'Suites':
      default:
        this.rooms = {
          bu1: {
            source: '../../assets/grand_presidential_suite.jpeg',
            alt: 'grand_presidential_suite',
            title: 'Grand Presidential Suites & Villas',
            description: 'Synonymous with opulence, luxury, comfort and style, the Grand Presidential Floor is designed to play host to the extended entourage of luminaries with ease.'
          },
          bu2: {
            source: '../../assets/presidential_suites.jpg',
            alt: 'presidential_suite',
            title: 'Presidential Suites',
            description: 'Designed for the lavish and suitable accommodation of Heads-of-State, dignitaries and luminaries from all spheres of industry, the Presidential Suite comes with a set of particular privileges befitting to the stature of its guests. '
          },
          bu3: {
            source: '../../assets/deluxe_suites.jpg',
            alt: 'deluxe_suite',
            title: 'Deluxe Suites',
            description: 'Designed to maximise the sense of spaciousness, the Deluxe Suites are tastefully adorned in colours and with artefacts that are paired with a comprehensive set of indulgent services.'
          },
          bu4: {
            source: '../../assets/luxury_suites.jpg',
            alt: 'luxury_suite',
            title: 'Luxury Suites',
            description: 'Designed for the lavish & suitable accommodation of dignitaries & luminaries from all spheres of industry.'
          },
          bu5: {
            source: '../../assets/ocean_suites.jpg',
            alt: 'ocean_suite',
            title: 'Ocean Suites',
            description: 'Designed like a deluxe two storey townhouse offering guests with the best of both land and sea.'
          }
        };
        break;

      case 'Ritz One':
        this.rooms = {
          bu1: {
            source: '../../assets/ritz_queen.jpg',
            alt: 'ritz_queen',
            title: 'Ritz Queen',
            description: 'Synonymous with opulence, luxury, comfort and style, Ritz Queen Floor is designed to play host to the extended entourage of luminaries with ease.'
          },
          bu2: {
            source: '../../assets/ritz_princess.jpg',
            alt: 'ritz_princess',
            title: 'Ritz Princess',
            description: 'Spacious and lavishly appointed, the four exclusive Princess Suites at Ritz offer indulgent hospitality in an inspired ambience.'
          },
          bu3: {
            source: '../../assets/ritz_one.jpg',
            alt: 'ritz_one',
            title: 'Ritz One',
            description: 'Offering the ultimate in luxury, comfort and space, the Ritz One rooms  showcase a perfect synergy of grand living, '
          },
          bu4: {
            source: '../../assets/ritz_deluxe.jpg',
            alt: 'ritz_deluxe',
            title: 'Ritz Deluxe',
            description: 'Designed to maximise the sense of spaciousness, the Deluxe Suites are tastefully adorned in colours and with artefacts that are paired with a comprehensive set of indulgent services.'
          },
          bu5: {
            source: '../../assets/ritz_luxury.jpg',
            alt: 'ritz_luxury',
            title: 'Ritz Luxury',
            description: 'Designed for the lavish & suitable accommodation of dignitaries & luminaries from all spheres of industry.'
          }
        };
        break;

      case 'The Towers':
        this.rooms = {
          bu1: {
            source: '../../assets/eva.jpeg',
            alt: 'eva_room',
            title: 'Eva Room',
            description: 'Designed specially to pamper the lady-guests, the Eva rooms showcase a perfect blend of luxury accommodation with utmost security.'
          },
          bu2: {
            source: '../../assets/the_towers.jpg',
            alt: 'the_towers',
            title: 'The Towers',
            description: 'Experience the luxury of privacy & the privilege of personal space at The Towers - where service is what you want it to be.'
          },
          bu3: {
            source: '../../assets/executive_club.jpg',
            alt: 'executive_club',
            title: 'Executive Club',
            description: 'The Executive Club is an accommodation concept geared to meet the needs of the discerning business traveller. '
          },
          bu4: {
            source: '../../assets/just_doubles.jpg',
            alt: 'just_doubles',
            title: 'Just Doubles',
            description: 'These spacious rooms are furnished with a double bed and have an intimate seating arrangement.'
          },
          bu5: {
            source: '../../assets/room.jpg',
            alt: 'king_room',
            title: 'King Room',
            description: 'These spacious rooms are furnished with a king sized bed and have an intimate seating arrangement.'
          }
        };
        break;
    }
  }

  booking(roomName): void {
    const self = this;
    const dialogRef = this.dialog.open(RoomBookingFormComponent, {
      width: '45%',
      data: {room: roomName, email: this.email, bookingDays: this.bookingDays, guestName: this.guestName, roomNumber: this.roomNumber, pax: this.pax}
    });

    dialogRef.afterClosed().subscribe(result => {
      //console.log(result);
      this.roomBooking = new class implements RoomBooking {
        email: string = result.email;
        bookingDays = result.bookingDays;
        guestName: string = result.guestName;
        key: string;
        room: string = roomName;
        roomNumber: number = result.roomNumber;
        pax: string = result.pax;
      }();
      this.bookingService.addBooking(this.roomBooking);

      //sweet alert for successful submit

      Swal.fire(
        'Submitted!',
        'Your data has been successfully submitted.',
        'success'
      );
    });
  }

}
