import { bootstrap } from '@angular/platform-browser-dynamic';
import { enableProdMode, provide } from '@angular/core';
import { AppComponent, environment } from './app/';

if (environment.production) {
  enableProdMode();
}

let delayed = () => {
  return bootstrap(AppComponent, [
    provide('CELLS',    {useValue: Array(9).fill(0) }),
    provide('INTERVAL', {useValue: 1000 }),
    provide('TIMER',    {useValue: 1200 }),
    provide( (<any>window).AudioContext, {
      useFactory: () => {
        return new ((<any>window).AudioContext || (<any>window).webkitAudioContext)();
      }
    })
  ]);
}


window.setTimeout( delayed, 100);
