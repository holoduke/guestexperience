import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LandingPageComponent } from './pages/landingpage/landingpage.component';
import { HotelServicesComponent } from './pages/hotelservices/hotelservices.component';
import { RoomReservationComponent } from './pages/room-reservation/room-reservation.component';

const routes: Routes = [
  { path: '', component: LandingPageComponent },
  { path: 'services', component: HotelServicesComponent },
  { path: 'reservation/:id', component: RoomReservationComponent }, // ✅ with param
  { path: '**', redirectTo: '' }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, {
      scrollPositionRestoration: 'enabled' 
    })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
