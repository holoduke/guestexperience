// src/app/pages/reservation/reservation.component.ts
import { Component, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';

@Component({
    selector: 'app-reservation-details',
    imports: [RouterModule],
    templateUrl: './reservationdetails.component.html',
    styleUrls: ['./reservationdetails.component.css'],
    standalone: true
})
export class ReservationDetailsComponent implements OnInit {
    reservationNumber: string = '';
    guestName: string = 'John Doe';
    checkIn: string = 'May 2, 2025';
    checkOut: string = 'May 5, 2025';
    room: string = 'Deluxe Canal View Suite';

    ngOnInit(): void {
        const params = new URLSearchParams(window.location.search);
        this.reservationNumber =
            params.get('reservationNumber') ||
            (Math.floor(Math.random() * 90000000) + 10000000).toString();
    }
}
