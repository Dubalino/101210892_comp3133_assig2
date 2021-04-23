import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BookingComponent } from './booking/booking.component';
import { BookingCardComponent } from './booking-card/booking-card.component';
import { HotelComponent } from './hotel/hotel.component';
import { HotelCardComponent } from './hotel-card/hotel-card.component';
import { LoginComponent } from './login/login.component';
import { NavbarComponent } from './navbar/navbar.component';
import { SignupComponent } from './signup/signup.component';

import { APOLLO_OPTIONS } from 'apollo-angular';
import { HttpLink } from 'apollo-angular/http';
import { InMemoryCache } from '@apollo/client/core';

import { CanActivateRouteService } from './CanActivateRoute.service';
import { ReactiveFormsModule } from '@angular/forms';
import { GraphQLModule } from './graphql.module';
import { HttpClientModule } from '@angular/common/http';
import { SearchComponent } from './search/search.component';

@NgModule({
  declarations: [
    AppComponent,
    BookingComponent,
    BookingCardComponent,
    HotelComponent,
    HotelCardComponent,
    LoginComponent,
    NavbarComponent,
    SignupComponent,
    SearchComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    GraphQLModule,
    HttpClientModule
  ],
  providers: [
    {
      provide: APOLLO_OPTIONS,
      useFactory: (httpLink: HttpLink) => {
        return {
          cache: new InMemoryCache(),
          link: httpLink.create({
            uri: 'http://localhost:4100/graphql',
            withCredentials: true,
          }),
        };
      },
      deps: [HttpLink],
    },
    CanActivateRouteService,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
