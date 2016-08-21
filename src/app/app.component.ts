import { Component, OnInit, Inject } from '@angular/core';
import { FxService } from './shared';

@Component({
  moduleId: module.id,
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.css']
})
export class AppComponent implements OnInit {

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
    @Inject('TIMER') private _timer,
    @Inject('FxService') private _fx
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
      this._fx.flip();

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
      this._fx.hit();
      this.score++;
      item.v = 's1';
      window.clearTimeout(this._flipAnimation);
      this._missed = false;
    }
    else {
      this._missed = true;
      this._fx.miss();
    }
  }

  easter(index) {
    if(index === 4) {
      this._easter++;
      if(this._easter === 7) {
        this._fx.easter();
      }
    }
    else {
      this._easter = 0;
    }
  }

}
