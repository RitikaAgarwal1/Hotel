import { Injectable } from '@angular/core';
import {AngularFireDatabase, AngularFireList} from '@angular/fire/database';
import {BaseService} from '../base/base.service';
import {RoomBooking} from '../../interfaces/room-booking';

@Injectable({
  providedIn: 'root'
})
export class BookingService {

  private dbpath = '/booking';
  bookingRef: AngularFireList<RoomBooking> = null;

  constructor( private baseService: BaseService,
               private db: AngularFireDatabase) {
    this.bookingRef = db.list(this.dbpath);
  }

  getBooking(): AngularFireList<RoomBooking> {
    return this.bookingRef;
  }

  addBooking(booking: RoomBooking): void {
    this.bookingRef.push(booking);
  }

  deleteBooking(key: string): Promise<void> {
    return this.bookingRef.remove(key);
  }

  updateBooking(key: string, value: any): Promise<void> {
    return this.bookingRef.update(key, value);
  }

  deleteAllBooking(): Promise<void> {
    return this.bookingRef.remove();
  }
}
