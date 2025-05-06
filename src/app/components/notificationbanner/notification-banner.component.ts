// src/app/components/notification-banner/notification-banner.component.ts
import { ChangeDetectorRef, Component, NgZone, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NotificationBannerService } from '../../services/notificationbanner.service';

@Component({
  selector: 'app-notification-banner',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './notification-banner.component.html',
  styleUrls: ['./notification-banner.component.scss']
})
export class NotificationBannerComponent implements OnInit {
  message = '';
  visible = false;
  private hideTimeout: any;

  constructor(private notificationService: NotificationBannerService,private zone: NgZone,private cdRef: ChangeDetectorRef) {}

  ngOnInit(): void {
    this.notificationService.notification$.subscribe(msg => {
      
        // clear previous timeout if any
        if (this.hideTimeout) {
          clearTimeout(this.hideTimeout);
        }

        this.message = msg;
        this.visible = true;
        this.cdRef.detectChanges();

        // set new timeout to hide after 3s
        this.hideTimeout = setTimeout(() => {
          this.visible = false;
          this.cdRef.detectChanges();
        }, 3000);
    });
  }
}
