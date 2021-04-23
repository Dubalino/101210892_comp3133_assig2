import { Component, OnInit } from '@angular/core';
import {Apollo, gql} from 'apollo-angular';
import {FetchResult} from '@apollo/client';
import {Router} from '@angular/router';

const LOGOUT = gql`
  mutation logout {
    logout
  }
`;

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  constructor(
    private router: Router,
    private apollo: Apollo,
  ) { }

  ngOnInit(): void {
  }

  logout($event: MouseEvent): void {
    $event.preventDefault();

    this.apollo.mutate({
      mutation: LOGOUT,
    }).subscribe((res: FetchResult) => {
      this.router.navigate(['/']);
    }, (error) => {
      console.log('there was an error:', error);
    });
  }

}
