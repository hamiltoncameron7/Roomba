import { Component, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-thegrid',
  templateUrl: './thegrid.component.html',
  styleUrls: ['./thegrid.component.css']
})
export class ThegridComponent implements OnInit {
  //enable a messageEvent function to be triggered with EventEmitter, so we can refresh on submit
  @Output() messageEvent = new EventEmitter();

  //array of arrays, first array is y 0-9, second is x 0-9
  xArrays = new Array();
  boudnary = new Array();

  addPoint(xPoint : number, yPoint : number){
    this.boudnary.push([xPoint, yPoint]);
    console.log(this.boudnary);

    this.messageEvent.emit(null);
  }

  constructor() {
    for (var i = 0; i < 9; i++) {
      this.xArrays[i] = new Array();
      this.xArrays[i].push(1, 2, 3, 4, 5, 6, 7, 8, 9);
    }
   }

  ngOnInit(): void {
  }

}
