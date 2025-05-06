import { Component, NgZone } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-notificationreminder',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './notificationreminder.component.html',
  styleUrls: ['./notificationreminder.component.scss']
})
export class NotificationReminderComponent {
  notificationSupported = 'Notification' in window;
  permissionGranted = Notification.permission === 'granted';

  constructor(private zone: NgZone) {}

  requestPermission(): void {
    if (this.notificationSupported) {
      Notification.requestPermission().then(permission => {
        this.zone.run(() => {
            this.permissionGranted = permission === 'granted';
          });
      });
    }
  }

  sendReminder(): void {
    if (this.permissionGranted) {
      new Notification('⏰ Reservation Reminder', {
        body: 'Don’t forget your check-in tomorrow at Guest Experience!',
        icon: './icon-192.png'
      });
    } else {
      alert('Permission not granted for notifications.');
    }
  }
}
