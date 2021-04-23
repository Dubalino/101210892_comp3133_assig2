import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Router} from '@angular/router';
import {Apollo, gql} from 'apollo-angular';
import {FetchResult} from '@apollo/client';

const SIGNUP = gql`
  mutation signup($signupInput: SignupInput!) {
    signup(signupInput: $signupInput) {
      id
    }
  }
`;

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  signupForm: FormGroup;

  constructor(
    private router: Router,
    private apollo: Apollo,
    private fb: FormBuilder,
  ) {
    this.signupForm = this.fb.group({
      email: ['', [
        Validators.required,
      ]],
      password: ['', [
        Validators.required,
      ]],
      firstName: ['', [
        Validators.required,
      ]],
      lastName: ['', [
        Validators.required,
      ]],
    });
  }

  ngOnInit(): void {}

  submit($event: MouseEvent): void {
    $event.preventDefault();

    this.apollo.mutate({
      mutation: SIGNUP,
      variables: {
        signupInput: this.signupForm.value
      }
    }).subscribe((res: FetchResult) => {

      this.router.navigate([`/`]);
    }, (error) => {
    });
  }

}
