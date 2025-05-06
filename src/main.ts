// src/main.ts
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import './app/app.component';
import { AppModule } from './app/app.module';
import { environment } from './environments/environment';

platformBrowserDynamic()
    .bootstrapModule(AppModule)
    .catch(err => console.error(err));


/* ------------------------------------------
   🔑  Only register the SW in production
   ------------------------------------------ */
   if (environment.production && 'serviceWorker' in navigator) {
    // Wait until the app is stable or the browser finishes loading
    window.addEventListener('load', () => {
      navigator.serviceWorker.register('/service-worker.js')
        .then(reg => console.log('[SW] registered:', reg))
        .catch(err => console.error('[SW] registration failed:', err));
    });
  }