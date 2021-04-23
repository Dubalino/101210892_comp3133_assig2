import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {LoginComponent} from './login/login.component';
import {HotelComponent} from './hotel/hotel.component';
import {SignupComponent} from './signup/signup.component';
import {BookingComponent} from './booking/booking.component';
import {CanActivateRouteService} from './CanActivateRoute.service';
import {SearchComponent} from './search/search.component';

const routes: Routes = [
  {
    path: '',
    component: LoginComponent,
    pathMatch: 'full'
  },
  {
    path: 'hotel',
    component: HotelComponent,
    pathMatch: 'full',
    canActivate: [CanActivateRouteService]
  },
  {
    path: 'search',
    component: SearchComponent,
    pathMatch: 'full',
    canActivate: [CanActivateRouteService]
  },
  {
    path: 'signup',
    component: SignupComponent,
    pathMatch: 'full'
  },
  {
    path: 'booking',
    component: BookingComponent,
    pathMatch: 'full',
    canActivate: [CanActivateRouteService]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
