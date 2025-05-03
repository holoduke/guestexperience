// src/main.ts
import { provideServiceWorker } from '@angular/service-worker';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { AppModule } from './app/app.module';

provideServiceWorker('ngsw-worker.js', {
    enabled: environment.production,
    registrationStrategy: 'registerWhenStable:3000'
  });

platformBrowserDynamic()
    .bootstrapModule(AppModule)
    .catch(err => console.error(err));