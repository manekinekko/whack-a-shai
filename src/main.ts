import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { enableProdMode, provide } from '@angular/core';
import { AppModule, environment } from './app/';

if (environment.production) {
  enableProdMode();
}

let delayed = () => {
  return platformBrowserDynamic().bootstrapModule(AppModule);
}

window.setTimeout( delayed, 100);
