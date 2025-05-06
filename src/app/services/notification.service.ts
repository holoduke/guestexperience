import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class FirebaseNotificationService {
  private backendUrl = 'http://localhost:3000/send-notification';

  constructor(private http: HttpClient) {}

  sendNotification(token: string, title: string, body: string) {
    const payload = { token, title, body };
    return this.http.post(this.backendUrl, payload);
  }
}