import { NgModule, provide } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent }  from './app.component';
import { AvatarComponent }  from './avatar';
import { FxService }  from './shared';

@NgModule({
  imports:      [ BrowserModule ],
  declarations: [ AppComponent, AvatarComponent ],
  bootstrap:    [ AppComponent ],
  providers:    [
    provide('FxService', {useClass: FxService}),
    provide('CELLS',    {useValue: Array(9).fill(0) }),
    provide('INTERVAL', {useValue: 1000 }),
    provide('TIMER',    {useValue: 1500 }),
    provide('AudioContext', {
      useFactory: () => {
        return new ((<any>window).AudioContext || (<any>window).webkitAudioContext)();
      }
    })
  ]
})
export class AppModule { }
