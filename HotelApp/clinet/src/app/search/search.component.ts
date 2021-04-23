import { Component, OnInit } from '@angular/core';
import {Apollo, gql} from 'apollo-angular';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {
  searchBox: FormGroup;

  hotels: any[];
  loading = true;
  error: any;

  constructor(
    private apollo: Apollo,
    private fb: FormBuilder
  ) {
    this.hotels = [];
    this.searchBox = this.fb.group({
      filter: ['', [
        Validators.required,
      ]],
    });
  }

  getByName(): void {
    this.apollo
    .watchQuery({
      query: gql`
        query($name: String!) {
          hotelByName(name: $name) {
            id
            name
            address
            price
            createdAt
          }
        }
      `,
      variables: {
        name: this.searchBox.value.filter
      }
    })
    .valueChanges.subscribe((result: any) => {
      console.log(result);
      this.hotels = result?.data?.hotelByName;
      this.loading = result.loading;
      this.error = result.error;
    });
  }

  getByCity(): void {
    this.apollo
    .watchQuery({
      query: gql`
        query($city: String!) {
          hotelByCity(city: $city) {
            id
            name
            address
            price
            createdAt
          }
        }
      `,
      variables: {
        city: this.searchBox.value.filter
      }
    })
    .valueChanges.subscribe((result: any) => {
      console.log(result);
      this.hotels = result?.data?.hotelByCity;
      this.loading = result.loading;
      this.error = result.error;
    });
  }


  ngOnInit(): void {
  }

}
