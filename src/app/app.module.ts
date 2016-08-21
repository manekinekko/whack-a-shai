import { NgModule, provide } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent }  from './app.component';
import { AvatarComponent }  from './avatar';
import { PlayerComponent }  from './player';

@NgModule({
  imports:      [ BrowserModule ],
  declarations: [ AppComponent, PlayerComponent, AvatarComponent ],
  bootstrap:    [ AppComponent ],
  providers:    [
    provide('CELLS',    {useValue: Array(9).fill(0) }),
    provide('INTERVAL', {useValue: 1000 }),
    provide('TIMER',    {useValue: 1200 }),
    provide('AudioContext', {
      useFactory: () => {
        return new ((<any>window).AudioContext || (<any>window).webkitAudioContext)();
      }
    })
  ]
})
export class AppModule { }
