import { Component, OnInit } from '@angular/core';

@Component({
  moduleId: module.id,
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.css']
})
export class AppComponent implements OnInit {
  list = [];

  constructor() {
    this.list = Array(12).fill(0).map( () => {
      return { v: false };
    });
  }

  ngOnInit() {
    setInterval( this.show.bind(this), 1000 );
  }

  show() {
    let item = this.list[ (Math.random() * this.list.length) | 0 ];
    item.v = true;

    setTimeout( () => {
      item.v = false;
    }, 300);

  }
}
