import { ChangeDetectionStrategy, Component } from '@angular/core';
import {InstallButtonComponent} from "../../components/install-button/install-button.component";
import {ReservationDetailsComponent} from "../../components/reservationdetails/reservationdetails.component";
import { OtherlinksComponent } from "../../components/otherlinks/otherlinks.component";
import { MailmetestComponent } from "../../components/mailmetest/mailmetest.component";

@Component({
  selector: 'app-landingpage',
  imports: [InstallButtonComponent, ReservationDetailsComponent, OtherlinksComponent, MailmetestComponent],
  templateUrl: './landingpage.component.html',
  styleUrl: './landingpage.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LandingPageComponent {

}
