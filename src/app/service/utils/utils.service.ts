import { Injectable } from '@angular/core';

declare const moment: any;

@Injectable({
  providedIn: 'root'
})
export class UtilsService {
  roomNumber;

  constructor() { }

  //date conversion to dd/mm/yyyy

  dateConversion(date) {
    let dd = date.getDate();
    let mm = date.getMonth() + 1; //January is 0!

    const yyyy = date.getFullYear();
      if (dd < 10) {
        dd = '0' + dd;
      }
      if (mm < 10) {
        mm = '0' + mm;
      }
    date = mm + '/' + dd + '/' + yyyy;
    return date;
  }

  roomList(roomtype) {
    switch (roomtype) {
      case 'Grand Presidential Suites & Villas':
        this.roomNumber = [
          '100',
          '101',
          '102',
          '103',
          '105'
        ];
        break;
      case 'Presidential Suites':
        this.roomNumber = [
          '200',
          '201',
          '202',
          '203',
          '205'
        ];
        break;
      case 'Deluxe Suites':
        this.roomNumber = [
          '300',
          '301',
          '302',
          '303',
          '305'
        ];
        break;
      case 'Luxury Suites':
        this.roomNumber = [
          '400',
          '401',
          '402',
          '403',
          '405'
        ];
        break;
      case 'Ocean Suites':
        this.roomNumber = [
          '500',
          '501',
          '502',
          '503',
          '505'
        ];
        break;
      case 'Ritz Queen':
        this.roomNumber = [
          '600',
          '601',
          '602',
          '603',
          '605'
        ];
        break;
      case 'Ritz Princess':
        this.roomNumber = [
          '700',
          '701',
          '702',
          '703',
          '705'
        ];
        break;
      case 'Ritz One':
        this.roomNumber = [
          '800',
          '801',
          '802',
          '803',
          '805'
        ];
        break;
      case 'Ritz Deluxe':
        this.roomNumber = [
          '900',
          '901',
          '902',
          '903',
          '905'
        ];
        break;
      case 'Ritz Luxury':
        this.roomNumber = [
          '1000',
          '1001',
          '1002',
          '1003',
          '1005'
        ];
        break;
      case 'Eva Room':
        this.roomNumber = [
          '1100',
          '1101',
          '1102',
          '1103',
          '1105'
        ];
        break;
      case 'The Towers':
        this.roomNumber = [
          '1200',
          '1201',
          '1202',
          '1203',
          '1205'
        ];
        break;
      case 'Executive Club':
        this.roomNumber = [
          '1300',
          '1301',
          '1302',
          '1303',
          '1305'
        ];
        break;
      case 'Just Doubles':
        this.roomNumber = [
          '1400',
          '1401',
          '1402',
          '1403',
          '1405'
        ];
        break;
      case 'King Room':
        this.roomNumber = [
          '1500',
          '1501',
          '1502',
          '1503',
          '1505'
        ];
        break;
    }
    return this.roomNumber;
  }
}
