const bip = new Audio("ressource/bip.mp3");
const bipboup = new Audio("ressource/bipboup.mp3");
const badbeep = new Audio("ressource/badbeep.mp3");
const start = new Audio("ressource/start.mp3");

class Game{
    constructor(){
      this.acctualLevel = 0;
      this.plateau = [];
      this.userInput= [];   
      this.paternIsBlinking =true;
      this.patern = [];
      this.played = false;
      this.levels = new Levels()
    }
    

    initPlateau(){
      this.plateau = new Plateau(this.levels.level[this.acctualLevel][0],this.levels.level[this.acctualLevel][1]);
    }

    userOnClick(x, y){
      if(this.paternIsBlinking === false){
        const clickUser = { x : x, y : y }
        this.userInput.push(clickUser)
        this.blinkSquareAt(x,y,250);
        bip.play()
        if(!this.isGameGoing()){
           if(this.isPaternCorrect() === true){
             this.nextLevel();
             this.plateau.levelVisual('#344179',500);
             bipboup.play();
           }else{
             this.plateau.levelVisual('#CF472A',500);
             this.paternIsBlinking = true;
           }
         }
      }
    }
    
    initPatern(numberOfSquare){
    for(let i = 0 ; i<numberOfSquare; i++){
      const px = Math.floor(Math.random()*this.plateau.x);
      const py = Math.floor(Math.random()*this.plateau.y);
      const position = {
        x : px,
        y : py
      }
      this.patern.push(position)
      }
    }

    
    restartGame(){
      this.played = true;
      this.acctualLevel = 0;
      this.generateLevel();
      this.plateau.levelVisual('#344179',500)
      this.paternBlink();
    }
    
    generateLevel(){
      this.paternIsBlinking = true;
      this.userInput = []
      this.initPlateau();
      this.patern = [];
      this.initPatern(this.levels.level[this.acctualLevel][2]);
      this.plateau.initSquares();
    }
    
    isGameGoing(){
      const errorInPatern = !(this.userInput[this.userInput.length-1].x === this.patern[this.userInput.length-1].x &&
                              this.userInput[this.userInput.length-1].y === this.patern[this.userInput.length-1].y)
      if(this.userInput.length >= this.patern.length || errorInPatern){
        return false;
      }else return true;
    }
    
    isPaternCorrect(){
      if(this.userInput<this.patern)return false
      let i = 0;
      for(const position of this.patern){
        if(!(position.x === this.userInput[i].x && position.y === this.userInput[i].y)){
          return false;
        }
        i++
      }
      return true
    }
    
    paternBlink() {
      setTimeout(() => {
        this.blinkNextSquare(0)
      },900);
    }

    findInSquare(x,y){
      return this.plateau.squareGrid.find(squareAndPosition => squareAndPosition.position.x === x && squareAndPosition.position.y === y)
    }
    
    blinkSquareAt(x,y,time){
      this.findInSquare(x,y).square.blinkColor('#344179',time)
      bip.play()
    }
    
    blinkNextSquare(i){
      setTimeout(() => {this.blinkSquareAt(   this.patern[i].x,this.patern[i].y   ,    this.levels.level[this.acctualLevel][3]/2)
        if (i+1 < this.patern.length){
        this.blinkNextSquare(i+1);
        }else{
          setTimeout(() => {
            this.plateau.levelVisual("#0F9D58",250);
            setTimeout(this.paternIsBlinking = false,250)}
            ,530)
        }
      },this.levels.level[this.acctualLevel][3])
    }
    
    
    nextLevel(){
      this.acctualLevel++;
      this.generateLevel();
      this.paternBlink();
    }
    
}
