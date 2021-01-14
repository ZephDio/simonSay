export default Vue.component('bouton', {
   template:`
        <div style="border: 5px solid black" v-on:click="boutontrigger"></div>
    `,
    props : {
        x : Number,
        y : Number,
    },
    methods :{
        boutontrigger(){
            this.$emit('trigger', [this.x,this.y])
        }
    },
})