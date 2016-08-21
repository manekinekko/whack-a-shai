import { Component, OnInit, Inject, ViewChild, ViewEncapsulation } from '@angular/core';
import { AvatarComponent } from './avatar';
import { PlayerComponent } from './player';

@Component({
  moduleId: module.id,
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.css'],
  directives: [AvatarComponent, PlayerComponent],
  encapsulation: ViewEncapsulation.None
})
export class AppComponent implements OnInit {

  @ViewChild(PlayerComponent) _player;

  list = [];
  counter = 0;
  score = 0;
  game = null;

  _flipAnimation = null;
  _missed = false;
  _easter = 0;

  constructor(
    @Inject('CELLS') private _cells,
    @Inject('INTERVAL') private _interval,
    @Inject('TIMER') private _timer
  ) {
    this.list = this._cells.map( () => {
      return { v: 's1' };
    });
  }

  ngOnInit() {
  }

  start() {
    this.game = window.setTimeout( this.flip.bind(this), this._interval );
  }

  pause() {
    window.clearTimeout(this.game);
    this.game = null;
  }

  private _computeInterval() {
    return this._interval - this.counter;
  }

  flip() {

    // flip
    let item = this.list[ (Math.random() * this.list.length) | 0 ];
    if(item.v !== 's2') {
      item.v = 's2';
      this.counter++;
      this._player.flip();

      this._flipAnimation = window.setTimeout( () => {
        item.v = 's1';
      }, this._timer );
    }

    // compute score
    if(this._missed === true) {
      this.score--;
    }

    // loop
    this.game = window.setTimeout( this.flip.bind(this), this._computeInterval() );

  }

  click(item) {
    if (item.v === 's2') {
      this._player.hit();
      this.score++;
      item.v = 's1';
      window.clearTimeout(this._flipAnimation);
      this._missed = false;
    }
    else {
      this._missed = true;
      this._player.miss();
    }
  }

  easter(index) {
    if(index === 4) {
      this._easter++;
      if(this._easter === 7) {
        this._player.easter();
      }
    }
    else {
      this._easter = 0;
    }
  }

}
