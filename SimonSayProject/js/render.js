import bouton from "./component/bouton.js"

const simonSays = new Vue({
    el : "#app",
    data(){
        return {
           game : new Game() ,
        }
    },

    component:{
        bouton,
    },

    methods :{
        input(text){
           this.game.userOnClick(text[0],text[1]);
        },
        
        
        initGame(){
            this.game.generateLevel();
        },
        
        startRestartButton(){
           this.game = new Game();
           this.initGame();
           this.game.restartGame();
        },
        
        
    },


})

simonSays.initGame()
