// src/app/components/install-button/install-button.component.ts
import { Component, HostListener } from '@angular/core';
import { CommonModule } from '@angular/common';

/**
 * Typed extension of the beforeinstallprompt event
 */
declare global {
  interface Window {
    deferredPrompt: BeforeInstallPromptEvent | null;
  }
}

interface BeforeInstallPromptEvent extends Event {
  prompt(): Promise<void>;
  userChoice: Promise<{
    outcome: 'accepted' | 'dismissed';
    platform: string;
  }>;
}

@Component({
  selector: 'app-install-button',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './install-button.component.html',
  styleUrls: ['./install-button.component.css']
})
export class InstallButtonComponent {
  private deferredPrompt: BeforeInstallPromptEvent | null = null;
  showButton = false;

  /**
   * Capture the browser's install prompt event
   */
  @HostListener('window:beforeinstallprompt', ['$event'])
  onBeforeInstallPrompt(event: BeforeInstallPromptEvent) {
    event.preventDefault(); // Prevent auto-show
    this.deferredPrompt = event;

    // Check if PWA is already installed or in standalone mode
    const isStandalone = window.matchMedia('(display-mode: standalone)').matches
      || (navigator as any).standalone === true;
    const isSupported = 'onbeforeinstallprompt' in window;

    // Only show button if supported and not installed
    this.showButton = isSupported && !isStandalone;
    console.log('Install button visibility:', this.showButton);
  }

  /**
   * Trigger the saved install prompt
   */
  async install(): Promise<void> {
    if (!this.deferredPrompt) {
      return;
    }

    // Show native install prompt
    await this.deferredPrompt.prompt();

    // Log user choice outcome
    const choice = await this.deferredPrompt.userChoice;
    console.log('User choice:', choice.outcome);

    // Clear and hide
    this.deferredPrompt = null;
    this.showButton = false;
  }

  /**
   * Manually dismiss the install banner
   */
  dismissBanner(): void {
    this.showButton = false;
  }
}
