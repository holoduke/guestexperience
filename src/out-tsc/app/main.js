// src/main.ts
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import './app/app.component';
import { AppModule } from './app/app.module';
platformBrowserDynamic()
    .bootstrapModule(AppModule)
    .catch(err => console.error(err));
