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
    this.width = 101;
    this.height = 171;
    return this 
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
   
// get x1, y1,(top left) x2, y2 (bottom right)
// for each enemy 
// pointInRect();
    // the player collides with enemy
    //game resets
    
}
// var enemy = {"x":5,"y":5,"width":50,"height":50};

// function rectangleInsideRectangle(rectangles){
// check if any corners are inside the rectangle
//}
function pointInRect(point, rect){
    var x = point.x;
    var y = point.y;
  
    var x1 = rect.x;
    var y1 = rect.y;
    var x2 = rect.x + rect.width;
    var y2 = rect.y + rect.height;
    console.log(x1 < x && x < x2 && y1 < y && y < y2);
    if (x1 < x && x < x2 && y1 < y && y < y2){
        console.log('collision detected!');
    }
    
    return x1 < x && x < x2 && y1 < y && y < y2 ;

  }

function rectOverlap(rect1,rect2){
    var c1 = {"x": rect1.x,               "y": rect1.y};      // top left
    var c2 = {"x": rect1.x + rect1.width, "y": rect1.y};      // top right
    var c3 = {"x": rect1.x ,              "y": rect1.y + rect1.height}; // bottom left
    var c4 = {"x": rect1.x + rect1.width, "y": rect1.y + rect1.height}; // bottom right
  
    return (pointInRect(c1, rect2) ||
    pointInRect(c2, rect2) ||
    pointInRect(c3, rect2) ||
    pointInRect(c4, rect2));
  
  }
//   console.log(rectOverlap(enemy,player));

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

/*

x,y

    x1=5,y1=5
    +-----------+
    |           |
    |  x=10,y=20|      x=55,y=20
    |           |
    +-----------+ x2=50,y2=50

    5 < 10 < 50  =>  inside x coord
    5 < 20 < 50  =>  inside y coord


        c1
        +---------------------+ c2
        |                     |
        |                     |
        |                     |
        |        +------------+--------+
        |        |            |        |
        +--------+------------+ c4     |
        c3       |                     |
                 |                     |
                 +---------------------+ <-rect2

        if c4 inside to rect2
        or
        if c3 inside to rect2
        or
        if c2 inside to rect2
        or
        if c1 inside to rect2



    inside x coord, and inside y coord, => point is inside rect.


*/



