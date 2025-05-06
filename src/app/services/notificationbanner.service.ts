import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class NotificationBannerService {
  private _notification$ = new Subject<string>();
  notification$ = this._notification$.asObservable();

  show(message: string): void {
    console.log("NotificationBannerService: show", message);
    this._notification$.next(message);
  }
}