import { Component, OnInit } from '@angular/core';
import {Apollo, gql} from 'apollo-angular';

@Component({
  selector: 'app-booking',
  templateUrl: './booking.component.html',
  styleUrls: ['./booking.component.css']
})
export class BookingComponent implements OnInit {
  bookings: any[];
  loading = true;
  error: any;

  constructor(private apollo: Apollo) { }

  ngOnInit(): void {
    this.bookings = [];
    this.apollo
    .watchQuery({
      query: gql`
        {
          bookings {
            id
            user {
              id
              fullName
            }
            hotel {
              id
              name
              address
            }
            start
            end
          }
        }
      `,
    })
    .valueChanges.subscribe((result: any) => {
      console.log('Booking', result);
      this.bookings = result?.data?.bookings;
      this.loading = result.loading;
      this.error = result.error;
    });
  }

}
