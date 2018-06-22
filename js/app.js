'use strict';

// Enemies our player must avoid
var Enemy = function() {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started
    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.sprite = 'images/enemy-bug.png';
    this.x = 0; //x axis starting point is the same 
    this.y = Math.floor(Math.random() * 250);
    this.speed = Math.floor(Math.random() * 200);
    // this.width = 101;
    // this.height = 171;
    // return this 
};


// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.
    this.x += this.speed * dt;
     if(this.x > 505) {
        this.x = 0;
    }
};

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.
var Player = function() {
    this.sprite = 'images/char-cat-girl.png';
    this.x = 200;
    this.y = 400;
    this.width = 101;
    this.height = 171;
}

Player.prototype.update = function(dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.
};

Player.prototype.handleCollision = function() {
    // Player.bind(Enemy);
    if((this.y === Enemy.y) && (this.x = Enemy.x )){
        //send player to the start position
        console.log("hit dectected!");
    }      
}


Player.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);

};
//handleInput method recieves the event (e) detected by listener
Player.prototype.handleInput = function(e) {
     switch(e) {
            case "up":
                this.y -= 50;
                break;
            case "down":
                 this.y += 50;
                break;
            case "left":
                this.x -= 50;
                break;  
            case "right":
                this.x += 50;
                break;
            default:
                return; // do nothing
        }

    //prevents character from moving outside of gameboard
    if (this.x > 500 || this.x < 0) {
        this.x = 200;
    }

    if (this.y > 500 || this.y < 0) {
        this.y = 400;
    }
     
};

// Now instantiate your objects.
var enemyBug1 = new Enemy(); 
var enemyBug2 = new Enemy();
var enemyBug3 = new Enemy();

 
// Place all enemy objects in an array called allEnemies
var allEnemies = [enemyBug1, enemyBug2, enemyBug3];

// Place the player object in a variable called player
var player = new Player();
player.handleCollision();

    

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



