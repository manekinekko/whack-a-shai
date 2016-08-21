import { Component, OnInit } from '@angular/core';

@Component({
  moduleId: module.id,
  selector: 'app-player',
  templateUrl: 'player.component.html',
  styleUrls: ['player.component.css']
})
export class PlayerComponent implements OnInit {

  _audioFX1;
  _audioFX2;
  _audioFX3;
  _audioES;
  _audioBG;

  constructor(
    private _audioContext: AudioContext
  ) {
    let context = this._audioContext;

    let source1 = this._initializeFX1([context, 0.3,'audio/fx1.mp3',0,0,0]);
    let source2 = this._initializeFX2([context, 0.1,'audio/fx2.wav',0,0,0]);
    let source3 = this._initializeFX3([context, 0.2,'audio/fx3.wav',0,0,0]);
    let source4 = this._initializeES([context, 0.5,'audio/ng-show.mp3',0,0,0]);
    let source5 = this._initializeBG([context, 0.2,'audio/preview-happy-place.mp3',0,1,1]);

    source1.connect(context.destination);
    source2.connect(context.destination);
    source3.connect(context.destination);
    source4.connect(context.destination);
    source5.connect(context.destination);
  }

  ngOnInit() {
  }

  private _initializeFX1(args) {
    let {source, audio} = this.__initializeFX(args);
    this._audioFX1 = audio;
    return source;
  }

  private _initializeFX2(args) {
    let {source, audio} = this.__initializeFX(args);
    this._audioFX2 = audio;
    return source;
  }

  private _initializeFX3(args) {
    let {source, audio} = this.__initializeFX(args);
    this._audioFX3 = audio;
    return source;
  }

  private _initializeES(args) {
    let {source, audio} = this.__initializeFX(args);
    this._audioES = audio;
    return source;
  }

  private _initializeBG(args) {
    let {source, audio} = this.__initializeFX(args);
    this._audioBG = audio;
    return source;
  }

  private __initializeFX([context, gain=1, src, controls=0, autoplay=0, loop=0]) {
    let volume = context.createGain();
    volume.gain.value = gain;
    let audio = this._createAudio(src, controls, autoplay, loop);
    let source = context.createMediaElementSource(audio);
    source.connect(volume);
    return {source:volume,audio};
  }

  private _createAudio(src, controls=0, autoplay=0, loop=0) {
    let audio = new Audio();
    audio.src = src;
    audio.controls = !!controls;
    audio.autoplay = !!autoplay;
    audio.loop = !!loop;
    return audio;
  }

  hit() {
    this._play(this._audioFX1);
    this._vibrate();
  }

  easter() {
    this._play(this._audioES);
  }

  flip() {
    this._play(this._audioFX2);
  }

  miss() {
    this._play(this._audioFX3);
  }

  private _play(audio) {
    audio.pause();
    audio.currentTime = 0;
    audio.play();
  }

  private _vibrate(){
    if(window.navigator.vibrate) {
      window.navigator.vibrate([50, 50]);
    }
  }

}
