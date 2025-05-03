// src/app/components/install-button/install-button.component.ts
import {
    Component,
    OnInit,
    ViewEncapsulation,
    NgZone
  } from '@angular/core';
  import { CommonModule } from '@angular/common';
  
  @Component({
    selector: 'app-install-button',
    standalone: true,
    imports: [CommonModule],
    templateUrl: './install-button.component.html',
    styleUrls: ['./install-button.component.css'],
    encapsulation: ViewEncapsulation.None
  })
  export class InstallButtonComponent implements OnInit {
    deferredPrompt: any = null;
    showButton = true;
  
    constructor(private zone: NgZone) {}
  
    ngOnInit(): void {
      window.addEventListener('beforeinstallprompt', (e: Event) => {
        e.preventDefault();
        this.deferredPrompt = e;
  
        const isStandalone =
          window.matchMedia('(display-mode: standalone)').matches ||
          (window.navigator as any).standalone === true;
        const isSupported = 'onbeforeinstallprompt' in window;
  
        this.zone.run(() => {
          this.showButton = isSupported && !isStandalone;
          console.log('Install button visibility:', this.showButton);
        });
      });
    }
  
    install(): void {
      if (!this.deferredPrompt) return;
  
      this.deferredPrompt.prompt();
      this.deferredPrompt.userChoice.then(() => {
        this.deferredPrompt = null;
        this.showButton = false;
      });
    }
  
    dismissBanner(): void {
      this.showButton = false;
    }
  }
  