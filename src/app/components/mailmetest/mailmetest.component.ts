import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MailService } from '../../services/mail.service';

@Component({
  selector: 'app-mailmetest',
  imports: [CommonModule, FormsModule],
  templateUrl: './mailmetest.component.html',
  styleUrl: './mailmetest.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
})
export class MailmetestComponent {

  constructor(private mailService: MailService) {}

  email: string = '';

  sendMail() {
    this.mailService.sendReminderEmail(this.email).then(response => {
      console.log('✅ Email sent:', response);
      // show notification if needed
    }).catch(error => {
      console.error('❌ Failed to send email:', error);
    });
  }

}
