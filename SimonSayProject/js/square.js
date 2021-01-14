class Square {
    constructor(color, number){
        this.color = color
        this.width = ((580*0.95)/number)-10
        this.margin = ((580-((number-1)*10))*0.05)/(number-1)
    }
    
    blinkColor(color,time){
         this.color= color
         setTimeout(() => {
             this.color='#65676A';
     }, time);
    }
}