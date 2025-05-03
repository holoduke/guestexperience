import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-hotelservices',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './hotelservices.component.html',
  styleUrls: ['./hotelservices.component.scss']
})
export class HotelServicesComponent {

  constructor(private router: Router) {}
  
  services = [
    {
      icon: '🛏️',
      title: 'Room Service',
      description: 'Order food, drinks, or amenities directly to your room.'
    },
    {
      icon: '💆‍♀️',
      title: 'Spa & Wellness',
      description: 'Book massages, facials, and relaxing treatments.'
    },
    {
      icon: '🍽️',
      title: 'Dining Reservations',
      description: 'Reserve a table at our gourmet restaurants.'
    },
    {
      icon: '🎉',
      title: 'Activities & Events',
      description: 'Explore activities, excursions, and entertainment.'
    },
    {
      icon: '🚗',
      title: 'Transportation',
      description: 'Request a taxi, shuttle, or airport pickup.'
    }
  ];
}