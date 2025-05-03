// src/app/services/mail.service.ts
import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root'
})
export class MailService {
    sendReminderEmail(guestEmail : string): Promise<string> {
        const params = new URLSearchParams({email : guestEmail} as any);

        return fetch('backend/requestemail.php', {
            method: 'POST',
            headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
            body: params.toString()
        })
            .then(res => res.json())
            .then(json => json.message || 'Email sent successfully')
            .catch(() => 'An error occurred while sending the email.');
    }
}
