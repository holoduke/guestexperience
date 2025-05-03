import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-room-reservation',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './room-reservation.component.html',
  styleUrls: ['./room-reservation.component.scss']
})
export class RoomReservationComponent {
  reservation = {
    guestName: 'John Doe',
    reservationNumber: '87123456',
    checkIn: 'May 10, 2025',
    checkOut: 'May 14, 2025',
    nights: 4,
    adults: 2,
    children: 1,
    roomType: 'Executive Suite',
    bedType: 'King Bed',
    amenities: ['Free WiFi', 'Smart TV', 'Nespresso Machine', 'Mini Bar', 'Air Conditioning'],
    pricePerNight: 220,
    totalPrice: 880,
    notes: 'Late check-in requested. Allergy-friendly bedding.'
  };
}
