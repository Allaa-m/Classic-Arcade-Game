// Declare the used variables 
    const modal = document.getElementById("popup"); //Div will appear on win
    const startsCounter = document.querySelector(".stars"); //Div for star rating
    let StarsHide = 3 ; // to count the star rating
    let showCongrats ;
//The enemy declaration and position
    var Enemy = function(x,y) {
    this.sprite = 'images/enemy-bug.png';
    this.x = x;
    this.y=y;
    this.width = 65;
    this.height = 95;
    };
// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
    Enemy.prototype.update = function(dt) {

        if(this.x > ctx.canvas.width + this.width){ //Set the x position and speed of enimes and make them loop on the screen
        this.x = - 50 * Math.floor(Math.random() * 8) +1;
        var objectSpeed = Math.floor(Math.random() * 4 )+1
        this.speed = 60 * objectSpeed;
    }
    else {this.x += 150 * dt;}
        //handle the collision with the enemies
    if( player.x >= this.x -70 && player.x <=this.x + 70 ){
    if (player.y >= this.y -50 && player.y <=  this.y+50){
        //when the collosion happens return the player to initial state and decrease the number of stars
            player.x = 203;
            player.y = 404;
            StarsHide --; 
     }               

    }

};

// Draw the enemy on the screen, required method for game
    Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
    };
//State the Player class
    var Player = function(x,y) {
        this.sprite = 'images/char-cat-girl.png';
        this.x = 203;
        this.y=404;
        this.width = 65;
        this.height = 75;
    };
    //Make actions on the player while playing the game
    Player.prototype.update = function(dt) {
    //show congrats div on win
        if ( player.y <= 30) {  showCongrats = setInterval ( function(){
             modal.style.display ="block";
            }
            ,400)}
        //hide it in other cases
    else { modal.style.display ="none"; }
    //Reset the game when the user clicks paly again button
    const playAgain = document.getElementById("play-again")
    playAgain.addEventListener("click",restart)
    function restart(){
    StarsHide = 3;
    modal.style.display ="none";  
    player.x = 203;
    player.y=404;

    }
 
 //Show the stars rating based on the number of collosion 
    if (StarsHide==3){startsCounter.innerHTML = `Your Rating:<li style="color: orange"><i class="fa fa-star"></i></li>
    <li style="color: orange"><i class="fa fa-star"></i></li> <li style="color: orange"><i class="fa fa-star"></i></li>`
    }
    if (StarsHide==2){startsCounter.innerHTML = `Your Rating:<li style="color: orange"><i class="fa fa-star"></i></li>
    <li style="color: orange"><i class="fa fa-star"></i></li>`
    }
    else if (StarsHide==1){startsCounter.innerHTML = `Your Rating:<li style="color: orange"><i class="fa fa-star"></i></li>`
    }
    else if (StarsHide <= 0){startsCounter.innerHTML = `You lost all the stars`
    }
  
    };
    Player.prototype.handleInput = function(movement) {
    if (movement === "left" && this.x- 101 >= 0 ) {
        this.x-= 101
    }
        else if (movement === "right" && this.x + 101 <ctx.canvas.width ) {
            this.x += 101
    }
        else if (movement === "up" && this.y- 83 > 0 - player.height ){
            this.y -= 83
   }
    else if (movement === "down"&& this.y + 83 <ctx.canvas.height-200) {
        this.y += 83
   }   
}


// Draw the player on the screen, required method for game
    Player.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
    };

// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
    document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
    });
//initiate a new player
const player = new Player();



//Set the Y position of the enemy
    const enemyPosition = [55,140,230]
    let allEnemies =enemyPosition.map((y,index) => 
    { return new Enemy ((-200 * (index + 1)), y)});

