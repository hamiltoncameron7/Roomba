import { Component, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-thegrid',
  templateUrl: './thegrid.component.html',
  styleUrls: ['./thegrid.component.css']
})
export class ThegridComponent implements OnInit {
  //enable a messageEvent function to be triggered with EventEmitter, activates the movingroomba
  @Output() messageEvent = new EventEmitter();

  //array of arrays, first array is y 0-9, second is x 0-9, used to track button locations
  xArrays = new Array();

  //saving the previous buttons location
  lastXPoint : number | null;
  lastYPoint : number | null;

  //calculate angle from 0,0 to x,y, returns degrees
  calcAngleDegrees(x:number, y:number) : number{
    return Math.atan2(y, x) * 180 / Math.PI;
  }

  //gets coordinates of element by page instead of by viewport, from javascript.info
  getCoords(elem : Element) {
    let box = elem.getBoundingClientRect();

    return {
      top: box.top + window.pageYOffset,
      right: box.right + window.pageXOffset,
      bottom: box.bottom + window.pageYOffset,
      left: box.left + window.pageXOffset
    };
  }

  //create the divs which will create the boundary
  createBoudnaryDiv(theX : number, theY : number) {
    if(this.lastXPoint != null && this.lastYPoint != null){
      //get button elements that were clicked
      var firstButt = document.getElementById(['butts', this.lastYPoint + 4, ',' , this.lastXPoint + 4].join(''));
      var secondButt = document.getElementById(['butts', theY + 4, ',' , theX + 4].join(''));

      if(firstButt != null && secondButt != null){
        //get x and y to use in calcAngleDegrees
        var xPos = theX - this.lastXPoint;
        var yPos = theY - this.lastYPoint;

        //create rotate string to load in style for div
        var rotateString = "rotate(" + parseInt((this.calcAngleDegrees(xPos, yPos)).toString()) + "deg)";

        //create the div segment for the boundary
        var div = document.createElement('div');
        var divStyle = '';

        //calc total distance between first button and second button in px
        var xDist = Math.abs(this.getCoords(firstButt).left - this.getCoords(secondButt).left);
        var yDist = Math.abs(this.getCoords(firstButt).top - this.getCoords(secondButt).top);

        //div width calculated by pythagorean theorem
        var divWidth = Math.sqrt((xDist * xDist)+(yDist * yDist));

        //set the distance from the top of the page for the boundary based on which button is higher
        var theTop = this.getCoords(firstButt).top;
        if(this.getCoords(firstButt).top < this.getCoords(secondButt).top){
          theTop = this.getCoords(firstButt).top;
        }
        else {
          theTop = this.getCoords(secondButt).top;
        }

        //set the distance from the left of the page for the boundary based on which button is farther left
        var theLeft = this.getCoords(firstButt).left;
        if(this.getCoords(firstButt).left < this.getCoords(secondButt).left){
          theLeft = this.getCoords(firstButt).left;
        }
        else {
          theLeft = this.getCoords(secondButt).left;
        }

        //add the div to the document and define style
        document.body.append(div);
        div.setAttribute("class", "bound");
        divStyle += (["width:", divWidth, 'px;'].join('').toString());
        divStyle += (["top:", theTop + Math.abs(yDist/2), 'px;'].join('').toString());
        divStyle += (["transform:", rotateString, ';'].join('').toString());
        divStyle += (['height:', '10px;'].join('').toString());
        divStyle += (['position:', 'absolute;'].join('').toString());
        divStyle += (['background-color:', 'black;'].join('').toString());
        //used law of sines and trigonometry to calc distance from left after rotation from center
        divStyle += (['left:', theLeft - ((divWidth/2) - ((divWidth/2) * Math.abs(Math.cos((this.calcAngleDegrees(xPos, yPos) * (Math.PI/180)))))), 'px;'].join('').toString());
        div.setAttribute('style', divStyle.toString());

        //set the last button clicked to the new first button for the next boundary
        this.lastXPoint = theX;
        this.lastYPoint = theY;
      }
    }
  }

  //collecting buttons clicked to make boundary for roomba checks
  boudnary = new Array();

  //new button was clicked
  addPoint(xPoint : number, yPoint : number){
    this.boudnary.push([xPoint, yPoint]);

    this.messageEvent.emit(null);

    //if this is the first button clicked, save values, else make boundary div
    if(this.lastXPoint == null && this.lastYPoint == null){
      this.lastXPoint = xPoint;
      this.lastYPoint = yPoint;
    }
    else{
      this.createBoudnaryDiv(xPoint, yPoint);
    }
  }

  constructor() {
    //add x and y coords for buttons
    for (var i = 0; i < 9; i++) {
      this.xArrays[i] = new Array();
      this.xArrays[i].push(-4, -3, -2, -1, 0, 1, 2, 3, 4);
    }

    this.lastXPoint = null;
    this.lastYPoint = null;
   }

  ngOnInit(): void {
  }

}
