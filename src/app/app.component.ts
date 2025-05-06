import {Component, ViewEncapsulation} from '@angular/core';
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
export class AppComponent {


    showUpdateBanner = false;
    navOpen = false;
    toggleMenu(): void {
        this.navOpen = !this.navOpen;
    }

    ngOnInit(): void {
        if ('serviceWorker' in navigator) {
            navigator.serviceWorker.addEventListener('message', (event) => {
              if (event.data?.type === 'UPDATE_AVAILABLE') {
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