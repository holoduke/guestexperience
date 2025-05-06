import { Component, NgZone } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NotificationService } from '../../services/notification.service';
import { NotificationBannerService } from '../../services/notificationbanner.service';

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

  constructor(private zone: NgZone, private notify: NotificationService,private notifyBanner: NotificationBannerService) {}

  requestPermission(): void {
    if (this.notificationSupported) {
      Notification.requestPermission().then(permission => {
        this.zone.run(() => {
            this.permissionGranted = permission === 'granted';
          });
      });
    }
  }

  async remind() {
    const ok = await this.notify.requestPermission();
    if (ok) {
        this.notifyBanner.show('✅ Send reminder notification successfully!');  
      await this.notify.showLocalNotification(
        '⏰ Reservation Reminder',
        'Don’t forget your check‑in tomorrow at Guest Experience!'
      );
    } else {
      alert('Please enable notifications in your browser settings.');
    }
  }
}
