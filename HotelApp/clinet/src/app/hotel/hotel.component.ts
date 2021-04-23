import { Component, OnInit } from '@angular/core';
import {Apollo, gql} from 'apollo-angular';

@Component({
  selector: 'app-hotel',
  templateUrl: './hotel.component.html',
  styleUrls: ['./hotel.component.css']
})
export class HotelComponent implements OnInit {

  hotels: any[];
  loading = true;
  error: any;

  constructor(private apollo: Apollo) { }

  ngOnInit(): void {
    this.hotels = [];
    this.apollo
    .watchQuery({
      query: gql`
        {
          hotels {
            id
            name
            address
            price
            createdAt
          }
        }
      `,
    })
    .valueChanges.subscribe((result: any) => {
      this.hotels = result?.data?.hotels;
      this.loading = result.loading;
      this.error = result.error;
    });
  }

}
