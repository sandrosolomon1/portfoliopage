const typewriter = function(txtel,names,freezetime) {
    this.Txtel = txtel;
    this.Names = names;
    this.Freezetime = freezetime;

    this.curr_char_idx = 0;
    this.curr_names_idx = -1;
    this.currtxt = "null";

    this.deleting = false;
}

typewriter.prototype.pause = function(milliseconds) {
    let dt = new Date();

	while ((new Date()) - dt <= milliseconds) {}
}

typewriter.prototype.start = function(){

    this.curr_char_idx = this.curr_char_idx % this.currtxt.length;

    if(!this.curr_char_idx && (this.curr_names_idx < this.Names.length-1) ) {

        this.currtxt = this.Names[++this.curr_names_idx];

    } else if(!this.curr_char_idx){

        this.curr_names_idx = 0;
        this.currtxt = this.Names[this.curr_names_idx];

    }
    
    if(!this.deleting) {
        this.Txtel.textContent = this.currtxt.substring(0,this.curr_char_idx+1);

        console.log(this.curr_char_idx,this.currtxt.substring(0,this.curr_char_idx+1));

        this.curr_char_idx++;

        if(this.curr_char_idx == this.currtxt.length) {
            this.deleting = true;
            this.curr_char_idx--;
        }

        setTimeout(() => {this.start()},  this.Freezetime);
    } else {
        this.Txtel.textContent = this.currtxt.substring(0,this.curr_char_idx);

        if(this.curr_char_idx == this.currtxt.length-1) {
            this.pause(3000);
        };

        this.curr_char_idx--;

        if(!this.curr_char_idx) this.deleting = false;

        setTimeout(() => {this.start()},  this.Freezetime/2);
    }
}

const app = (function(Typewriter) {
    return {
        init : () => {

            const txtel = document.querySelector('#typewriter'); 

            const arr = ["Full Stack Dev","Youtube Blogger","With Small PP"];
            
            const freezetime = 500;

            cooltextfunc = new typewriter(txtel,arr,freezetime);
            cooltextfunc.start();

        }
    }
})(typewriter);

app.init();