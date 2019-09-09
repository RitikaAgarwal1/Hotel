import {Component, EventEmitter, Inject, OnInit, Output} from '@angular/core';
import {MAT_DIALOG_DATA, MatDatepickerInputEvent, MatDialogRef} from '@angular/material';
import {RoomBooking} from '../../interfaces/room-booking';
import {UtilsService} from '../../service/utils/utils.service';
import {map} from 'rxjs/operators';
import {BookingService} from '../../service/booking/booking.service';

@Component({
  selector: 'app-room-booking-form',
  templateUrl: './room-booking-form.component.html',
  styleUrls: ['./room-booking-form.component.css']
})
export class RoomBookingFormComponent implements OnInit {

  fromMinDate = new Date();
  fromMaxDate = new Date(2020, 0, 1);

  toMinDate = new Date(Number(this.fromMinDate) + 1 * 24 * 60 * 60 * 1000);
  toMaxDate = new Date(2020, 0, 1);

  bookingList;
  roomNumber;
  bookingArray;
  startDate;
  endDate;
  to;
  from;
  dateMsg: boolean = true;
  paxMsg: boolean = true;
  validationError: boolean = true;
  dateLength;

  constructor(private utilsService: UtilsService,
              private bookingService: BookingService,
              public dialogRef: MatDialogRef<RoomBookingFormComponent>,
              @Inject(MAT_DIALOG_DATA) public data: RoomBooking) { }

  ngOnInit() {
    this.roomNumber = this.utilsService.roomList(this.data.room);
    this.getbookingData();
  }

  getbookingData() {
    this.bookingService.getBooking().snapshotChanges().pipe(
      map(changes =>
        changes.map(c =>
          ({ key: c.payload.key, ...c.payload.val() })
        )
      )
    ).subscribe(bookings => {
      this.bookingList = bookings;
      this.bookingArray = [];
      bookings.forEach((el) => {
        this.bookingArray.push(el);
      });
      //console.log(this.bookingArray);
    });
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  savedata() {
    this.validationError = false;
    this.data.bookingDays = [this.utilsService.dateConversion(this.from)];

    //difference between dates

    const diffTime = Math.abs((new Date(this.to)).getTime() - (new Date(this.from)).getTime());
    this.dateLength = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    //console.log(this.dateLength);

    let newDate = new Date(this.from);
    for (let i = 0; i < this.dateLength; i++) {
      newDate.setDate(newDate.getDate() + 1);
      this.data.bookingDays.push(this.utilsService.dateConversion(newDate));
      newDate = new Date(newDate);
    }

    this.roomAvailability();
  }

  roomAvailability() {
    let returnValue;
    this.from = this.utilsService.dateConversion(this.from);
    this.to = this.utilsService.dateConversion(this.to);
    this.bookingArray.forEach((el) => {
      el.bookingDays.forEach((date) => {
        if (el.roomNumber === this.data.roomNumber && (this.from === date || this.to === date)) {
          returnValue = false;
          this.dateMsg = false;
          this.startDate = el.bookingDays[0];
          this.endDate = el.bookingDays[el.bookingDays.length - 1];
        }
      });

      if (isNaN(this.data.pax) || this.data.pax < 1 || this.data.pax > 4) {
        returnValue = false;
        this.paxMsg = false;
      }

      if (returnValue !== false) {
        this.dialogRef.close(this.data);
      }
    });
  }

}
