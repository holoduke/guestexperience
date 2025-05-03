// src/app/services/pwa.service.ts
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class PwaService {
    private deferredPrompt: any = null;
    public isInstallAvailable$ = new BehaviorSubject<boolean>(false);

    constructor() {
        this.listenToBeforeInstallPrompt();
    }

    private listenToBeforeInstallPrompt(): void {
        window.addEventListener('beforeinstallprompt', (event: Event) => {
            event.preventDefault();
            this.deferredPrompt = event;
            const isStandalone = window.matchMedia('(display-mode: standalone)').matches ||
                (window.navigator as any).standalone === true;
            const isSupported = 'onbeforeinstallprompt' in window;
            this.isInstallAvailable$.next(isSupported && !isStandalone);
        });
    }

    public promptInstall(): void {
        if (!this.deferredPrompt) return;

        this.deferredPrompt.prompt();
        this.deferredPrompt.userChoice.then(() => {
            this.deferredPrompt = null;
            this.isInstallAvailable$.next(false);
        });
    }
}
