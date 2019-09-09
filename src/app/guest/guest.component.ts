import {Component, OnInit, ViewChild} from '@angular/core';
import {BookingService} from '../service/booking/booking.service';
import {map} from 'rxjs/operators';
import {MatPaginator, MatSort, MatTableDataSource} from '@angular/material';

@Component({
  selector: 'app-guest',
  templateUrl: './guest.component.html',
  styleUrls: ['./guest.component.css']
})
export class GuestComponent implements OnInit {

  displayedColumns: string[] = ['guestName', 'email', 'roomNumber', 'room', 'pax', 'days', 'from', 'to'];
  dataSource = new MatTableDataSource;

  days: number;

  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  @ViewChild(MatSort, {static: true}) sort: MatSort;

  constructor(private bookingService: BookingService) { }

  ngOnInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
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
      this.dataSource.data = bookings;
      console.log(bookings);
      bookings.forEach((el) => {
        console.log(el.bookingDays);
        this.days = el.bookingDays.length;
      });
    });
  }

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

}
