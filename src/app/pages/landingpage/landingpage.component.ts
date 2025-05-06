import { ChangeDetectionStrategy, Component } from '@angular/core';
import {InstallButtonComponent} from "../../components/install-button/install-button.component";
import {ReservationDetailsComponent} from "../../components/reservationdetails/reservationdetails.component";
import { OtherlinksComponent } from "../../components/otherlinks/otherlinks.component";
import { MailmetestComponent } from "../../components/mailmetest/mailmetest.component";
import { NotificationReminderComponent } from "../../components/notificationreminder/notificationreminder.component";
import { NotificationBannerComponent } from "../../components/notificationbanner/notification-banner.component";

@Component({
  selector: 'app-landingpage',
  imports: [InstallButtonComponent, NotificationBannerComponent, ReservationDetailsComponent, OtherlinksComponent, MailmetestComponent, NotificationReminderComponent, NotificationBannerComponent],
  templateUrl: './landingpage.component.html',
  styleUrl: './landingpage.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LandingPageComponent {

}
