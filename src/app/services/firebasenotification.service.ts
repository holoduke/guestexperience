// src/app/services/firebase-messaging.service.ts
import { Injectable } from '@angular/core';
import { initializeApp } from 'firebase/app';
import { getMessaging, getToken, onMessage, Messaging } from 'firebase/messaging';
import { BehaviorSubject } from 'rxjs';

// TODO: Replace with your Firebase project's config
const firebaseConfig = {
  apiKey: 'YOUR_API_KEY',
  authDomain: 'YOUR_PROJECT.firebaseapp.com',
  projectId: 'YOUR_PROJECT_ID',
  storageBucket: 'YOUR_PROJECT.appspot.com',
  messagingSenderId: 'YOUR_SENDER_ID',  
  appId: 'YOUR_APP_ID'
};

@Injectable({ providedIn: 'root' })
export class FirebaseMessagingService {
  private messaging: Messaging;
  /** Emits FCM token once retrieved */
  public fcmToken$ = new BehaviorSubject<string | null>(null);
  /** Emits incoming payloads when app is in foreground */
  public messagePayload$ = new BehaviorSubject<any>(null);

  constructor() {
    // Initialize Firebase app and messaging
    const app = initializeApp(firebaseConfig);
    this.messaging = getMessaging(app);

    // Listen to foreground messages
    onMessage(this.messaging, (payload) => {
      console.log('[FCM] Message received in foreground:', payload);
      this.messagePayload$.next(payload);
    });
  }

  /**
   * Request permission and get FCM registration token
   * @param vapidKey - Your Web push VAPID key
   */
  public async requestToken(vapidKey: string): Promise<string | null> {
    try {
      const token = await getToken(this.messaging, { vapidKey });
      console.log('[FCM] Token retrieved:', token);
      this.fcmToken$.next(token);
      return token;
    } catch (err) {
      console.error('[FCM] Unable to get token', err);
      return null;
    }
  }
}
