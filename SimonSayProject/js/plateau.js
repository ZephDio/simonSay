class Plateau{
  constructor(x,y){
    this.x = x;
    this.y = y;
    this.squareGrid = [];
  }

  initSquares(){
    for(let i = 0;i< this.x ;i++){
      for(let j = 0;j< this.y ;j++){
        const square = new Square('#65676A',this.x)
        const position = { 
            x : j,
            y : i
         }
        this.squareGrid.push(
          {
            position,
            square
          });

      }
    }
  }
  
  
  levelVisual(color,time){
      for(const positionAndSquare of this.squareGrid){
        positionAndSquare.square.blinkColor(color,time);
      }
      if(color === '#344179')bipboup.play();
      if(color === '#CF472A')badbeep.play();
      if(color === '#0F9D58')start.play();
    }



}