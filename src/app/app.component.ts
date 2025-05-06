import {Component, ViewEncapsulation} from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './components/header/header.component';
import { SwUpdate } from '@angular/service-worker';

@Component({
    selector: 'app-root',
    standalone: true,
    imports: [RouterOutlet, CommonModule, HeaderComponent],
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css'],
    encapsulation: ViewEncapsulation.None
})
export class AppComponent {

    constructor(private swUpdate: SwUpdate) {}


    showUpdateBanner = false;
    navOpen = false;
    toggleMenu(): void {
        this.navOpen = !this.navOpen;
    }

    ngOnInit(): void {
        if (this.swUpdate.isEnabled) {
            this.swUpdate.versionUpdates.subscribe(event => {
              if (event.type === 'VERSION_READY') {
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