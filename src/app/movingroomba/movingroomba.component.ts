import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-movingroomba',
  templateUrl: './movingroomba.component.html',
  styleUrls: ['./movingroomba.component.css']
})

export class MovingroombaComponent implements OnInit {
  
  //x and y coordinates of the roomba
  x: number;
  y: number;
  
  //xchange and ychange as values on this class that go into the css formula
  xChange: number;
  yChange: number;

  //saving angle
  inpX: number;
  inpY: number;

  //string that saves rotate statement for transform CSS
  rotateString: string;

  //function to grab the HTML input
  getValue(event : Event) : number {
    return (parseInt((event.target as HTMLInputElement).value));
  }

  constructor() { 
    //start roomba at 0,0
    this.x = 0;
    this.y = 0;

    //test for angle
    this.inpX = 0;
    this.inpY = 0;

    //x and y change rate per second
    this.xChange = 0;
    this.yChange = 0;

    //function that runs every second to update the value of x and y to the user input for the angle
    this.rotateString = "rotate(0deg)";
  }

  //calculates degrees angle from 0, 0
  calcAngleDegrees(x:number, y:number) : number{
    return Math.atan2(y, x) * 180 / Math.PI;
  }

  //saves rotateString for transform statement
  rotateTheRoomba(xPos:number, yPos:number) {
    this.rotateString = "rotate(" + parseInt((this.calcAngleDegrees(xPos, yPos)+90).toString()) + "deg)";
  }

  startRoomba() { 
    //total distance for roomba to move x and y
    var xDist = this.inpX - this.x;
    var yDist = this.inpY - this.y;

    //set maximum iterations of the CSS update loop to maximum change between x and y
    if(this.inpX == this.x){
      var maxIts = Math.abs(yDist);
    } else if(this.inpY == this.y){
      var maxIts = Math.abs(xDist);
    } else {
      var maxIts = Math.max(Math.abs(xDist), Math.abs(yDist));
    }

    //get HTML input
    var pTextElem = document.getElementById("roombaImg");

    //amount for CSS to transform
    var xCSSChange = this.x;
    var yCSSChange = this.y;

    //set final location of roomba to input location
    this.x = this.inpX;
    this.y = this.inpY;
    
    //rotate to proper angle and set rotate string
    this.rotateTheRoomba(xDist, yDist);

    //function turned for loop to self iterate, set i to 0 initially
    var i = 0;
    var loopDeLoop = () => {
      //if statement to prevent dividing by 0
      if(maxIts != 0){
        //runs CSS update function every second to move roomba maxIts times
        setTimeout(() => {
          //add distance/maxIts to the CSS change to move across the screen
          xCSSChange += Math.round((xDist/maxIts) * 100) / 100;
          yCSSChange += Math.round((yDist/maxIts) * 100) / 100;
          //CSS update, assuming pTextElem(input from HTML) has been filled out
          if(pTextElem != null){
            pTextElem.style.transform = "translate(" + ((xCSSChange * 10).toString()) + "px, " + ((yCSSChange * 10).toString()) + "px)" + this.rotateString;
            pTextElem.style.transition = "1s";
          }
          //updated CSS, add one to the loop
          i++;
          //if run less than maxIts, run again
          if(i < maxIts){
            loopDeLoop();
          }

        }, 1000);
      }
    };

    //initially run loopDeLoop to move roomba
    loopDeLoop();
    
  }

  ngOnInit(): void {
  }

}
