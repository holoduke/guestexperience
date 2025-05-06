import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './components/header/header.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, CommonModule, HeaderComponent],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class AppComponent implements OnInit {

  showUpdateBanner = false;
  navOpen = false;

  toggleMenu(): void {
    this.navOpen = !this.navOpen;
  }

  ngOnInit(): void {
    if ('serviceWorker' in navigator) {
      navigator.serviceWorker.addEventListener('message', (event: MessageEvent) => {
        if (event.data?.type === 'UPDATE_AVAILABLE') {
          console.log('🟡 Update available message received from service worker:', event);
          this.showUpdateBanner = true;
        }
      });

      // Optional: Detect if there's already a waiting service worker
      navigator.serviceWorker.getRegistration().then(reg => {
        if (reg?.waiting) {
          console.log('🟠 Service worker is already waiting.');
          this.showUpdateBanner = true;
        }
      });
    }
  }

  reloadPage(): void {
    document.location.reload();
  }

  dismissBanner(): void {
    this.showUpdateBanner = false;
  }
}
