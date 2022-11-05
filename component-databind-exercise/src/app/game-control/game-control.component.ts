import { Component, OnInit, Output,EventEmitter, ViewChild, ElementRef } from '@angular/core';

@Component({
  selector: 'app-game-control',
  templateUrl: './game-control.component.html',
  styleUrls: ['./game-control.component.css']
})
export class GameControlComponent implements OnInit {

  @Output('number') numberEvent = new EventEmitter<number>();
  @ViewChild('intervalinput',{static: false}) interval?: ElementRef;
  interValRef: any;
  number: number = 0;
  constructor() { }

  ngOnInit(): void {
  }

  startEmitting(){
    this.interValRef = setInterval(() => {
      this.emitNumbers();
    }, this.interval?.nativeElement.value);
  }

  stopEmitting(){
    clearInterval(this.interValRef);
  }

  emitNumbers(){
    this.numberEvent.emit(this.number);
    this.number++;
  }

}
