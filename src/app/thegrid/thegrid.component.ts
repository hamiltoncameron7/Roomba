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

  //ideas for the boudnary in visual terms
  //div filled with x color, rotated to the proper angle, length and height have to be what tells it how long to be
  //I keep thinking there will be a GUI code or something already made for a line, but IDK
  //some js code would probably be able to grab the coordinates of each point on the page and input that somehow
  //how to input that when the lnehgt and hiehgt contreol the size and end points
  //could have start point - end point = width, then have to get one edge to sit on that first point
  //if position is based on center, could find halfway between the 2 points to place it at, and the width would be x, y - x, y
  //something like this

  lastXPoint : number | null;
  lastYPoint : number | null;

  calcAngleDegrees(x:number, y:number) : number{
    return Math.atan2(y, x) * 180 / Math.PI;
  }

  createBoudnaryDiv(theX : number, theY : number) {
    if(this.lastXPoint != null && this.lastYPoint != null){
      var firstButt = document.getElementById(['butts', this.lastYPoint + 4, ',' , this.lastXPoint + 4].join(''));
      var secondButt = document.getElementById(['butts', theY + 4, ',' , theX + 4].join(''));
      if(firstButt != null && secondButt != null){
        var xPos = theX - this.lastXPoint;
        var yPos = theY - this.lastYPoint;
        // get document coordinates of the element
        function getCoords(elem : Element) {
          let box = elem.getBoundingClientRect();

          return {
            top: box.top + window.pageYOffset,
            right: box.right + window.pageXOffset,
            bottom: box.bottom + window.pageYOffset,
            left: box.left + window.pageXOffset
          };
        }
        console.log("First butt x: " + getCoords(firstButt).left + " first butt top: " + getCoords(firstButt).top + " first butt y: " + getCoords(firstButt).top + " get coords second butt y: " + getCoords(secondButt).top + " second butt top: " + getCoords(secondButt).top);
        var rotateString = "rotate(" + parseInt((this.calcAngleDegrees(xPos, yPos)).toString()) + "deg)";
        console.log(this.calcAngleDegrees(xPos, yPos));
        var div = document.createElement('div');
        var divStyle = '';
        var xDist = Math.abs(getCoords(firstButt).left - getCoords(secondButt).left);
        var yDist = Math.abs(getCoords(firstButt).top - getCoords(secondButt).top);
        console.log(xDist, "," , yDist);
        var divWidth = Math.sqrt((xDist * xDist)+(yDist * yDist));
        var theTop = getCoords(firstButt).top;
        if(getCoords(firstButt).top < getCoords(secondButt).top){
          theTop = getCoords(firstButt).top;
        }
        else {
          theTop = getCoords(secondButt).top;
        }
        var theLeft = getCoords(firstButt).left;
        if(getCoords(firstButt).left < getCoords(secondButt).left){
          theLeft = getCoords(firstButt).left;
        }
        else {
          theLeft = getCoords(secondButt).left;
        }
        document.body.append(div);
        div.setAttribute("class", "bound");
        divStyle += (["width:", divWidth, 'px;'].join('').toString());
        divStyle += (["top:", theTop + Math.abs(yDist/2), 'px;'].join('').toString());
        divStyle += (["transform:", rotateString, ';'].join('').toString());
        divStyle += (['height:', '10px;'].join('').toString());
        divStyle += (['position:', 'absolute;'].join('').toString());
        divStyle += (['background-color:', 'black;'].join('').toString());
        console.log("Angle: " + this.calcAngleDegrees(xPos, yPos).toString() + " divWidth: " + divWidth + "theLeft: " + theLeft + " TheTop: " + theTop + "The cos: " + Math.cos((this.calcAngleDegrees(xPos, yPos) * (Math.PI/180))));
        divStyle += (['left:', theLeft - ((divWidth/2) - ((divWidth/2) * Math.abs(Math.cos((this.calcAngleDegrees(xPos, yPos) * (Math.PI/180)))))), 'px;'].join('').toString());
        div.setAttribute('style', divStyle.toString());
        this.lastXPoint = theX;
        this.lastYPoint = theY;
      }
    }
  }



  boudnary = new Array();

  addPoint(xPoint : number, yPoint : number){
    this.boudnary.push([xPoint, yPoint]);

    this.messageEvent.emit(null);

    if(this.lastXPoint == null && this.lastYPoint == null){
      this.lastXPoint = xPoint;
      this.lastYPoint = yPoint;
    }
    else{
      this.createBoudnaryDiv(xPoint, yPoint);
    }
  }

  constructor() {
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
