import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';


@Injectable({ providedIn: 'root' })
export class NotificationService {

  /** returns TRUE once permission is granted */
  async requestPermission(): Promise<boolean> {
    // Nothing to do on browsers that don’t support the API
    if (!('Notification' in window)) {
      console.warn('This browser has no Notification API');
      return false;
    }

    // Already granted?
    if (Notification.permission === 'granted') return true;

    // Ask the user
    const permission = await Notification.requestPermission();
    return permission === 'granted';
  }

  // src/app/notification.service.ts  (append)
async showLocalNotification(title: string, body: string) {
    // Make sure the SW is ready
    const reg = await navigator.serviceWorker.ready;
  
    console.log("show local notification");
    // Use postMessage so our SW’s “message” handler can call showNotification()
    reg.active?.postMessage({
      type: 'SHOW_NOTIFICATION',
      title,
      body,
      // you can also pass `icon`, `badge`, `tag`, etc.
    });
  }
}



@Injectable({ providedIn: 'root' })
export class FirebaseNotificationService {
  private backendUrl = 'http://localhost:3000/send-notification';

  constructor(private http: HttpClient) {}

  sendNotification(token: string, title: string, body: string) {
    const payload = { token, title, body };
    return this.http.post(this.backendUrl, payload);
  }
}