import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MailService } from '../../services/mail.service';
import { NotificationBannerService } from '../../services/notificationbanner.service';

@Component({
  selector: 'app-mailmetest',
  imports: [CommonModule, FormsModule],
  templateUrl: './mailmetest.component.html',
  styleUrl: './mailmetest.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
})
export class MailmetestComponent {

  constructor(private mailService: MailService,private notifyBanner: NotificationBannerService) {}

  email: string = '';

  sendMail() {
    this.mailService.sendReminderEmail(this.email).then(response => {
      console.log('✅ Email sent:', response);
        this.notifyBanner.show('✅ Email reminder sent successfully!');
    }).catch(error => {
      console.error('❌ Failed to send email:', error);
        this.notifyBanner.show('❌ Failed to send email.');
    });
  }

}
