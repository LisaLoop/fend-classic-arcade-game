'use strict';

// Enemies our player must avoid
var Enemy = function(x, y, speed, name) {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started
    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.sprite = 'images/enemy-bug.png';
    this.x = x;
    this.y = y;
    this.width = 99;
    this.height = 77;
    this.speed = speed;
    this.name = name;
    return this 
};


// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    if (pause) {
        return
    }
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
    ctx.strokeStyle = 'green';
    ctx.strokeRect(this.x, this.y, this.width ,this.height);
};

// GEM 
// var Gem = function(x, y, name) {
//     this.sprite = 'images/gem-blue.png',
//     this.x = x,
//     this.y = y,
//     this.name = name,
//     this.width = 90,
//     this.height = 77
// }
// Gem.prototype.render = function() {
//     ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
//     // ctx.strokeStyle = 'purple';
//     // ctx.strokeRect(this.x, this.y, this.width ,this.height);
// };

// Gem.prototype.update = function() {
//     this.checkCollision();
// }

// Gem.prototype.checkCollision = function() {
//     var gem = {x: this.x, y: this.y};
//     // var player = {x: player.x, y: player.y};
//     // console.log("player is ", player);

//     if (gem.x < player.x + player.width &&
//         gem.x + gem.width > player.x &&
//         gem.y < player.y + player.height &&
//         gem.height + gem.y > player.y) {
//             // this.collisionDetected();
//         console.log("collision detected");
//     }
// };
// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.
var Player = function() {
    this.sprite = 'images/char-cat-girl.png';
    this.x = 200;
    this.y = 400;
    this.width = 70;
    this.height = 94;
    this.health = 100;
    // this.points = 0;
    this.damaged = false;
}

Player.prototype.update = function(dt) {
    if (pause) {
        this.isTakingDamage = false;
        return
    }
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.
    // console.log("function called");
    for(let i = 0; i < allEnemies.length; i += 1) {
        player.handleCollision(allEnemies[i]);
        //console.log(allEnemies[i].name);
        if (player.damaged) {
            return;
        }
            
    }
};

Player.prototype.handleCollision = function(enemy) {
    // var point = {"x":55,"y":20};
    // var enemy = {"x":5,"y":5,"width":50,"height":50};
    // var player = {"x":1,"y":1,"width":20,"height":20};
    function pointInRect(point, rect){
        var x = point.x;
        var y = point.y;
        var x1 = rect.x;
        var y1 = rect.y;
        var x2 = rect.x + rect.width;
        var y2 = rect.y + rect.height;
        
        return x1 <= x && x <= x2 && y1 <= y && y <= y2 ;
      
      }
    // console.log("false?: ", pointInRect(point, enemy));
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
      //if there is an overlap of player and enemy the player takes damage
      let isTakingDamage = rectOverlap(player, enemy) || rectOverlap(enemy, player); 
      if (isTakingDamage){
        //   console.log(enemy.name);
          player.sprite = 'images/char-cat-girl-damage.png';
          player.damaged = true;
          player.health -= 1;
        //   console.log(player.health);
          if (player.health < 0) {
            //   console.log("game over");
              reset();
          }
          
      } else {
          player.sprite = 'images/char-cat-girl.png';
          player.damaged = false;
      }
      
}

Player.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
    ctx.strokeStyle = 'red';
    ctx.strokeRect(this.x, this.y, this.width ,this.height);
    ctx.font = '30px monospace';
    ctx.fontStyle = "rgb(24, 24, 104)";
    ctx.linewidth = 2;
    ctx.fillStyle = "rgb(0, 0 ,0)";
    // ctx.fillText("Points: " + this.points, 300, 80); // text written to screen
    // Draws player current lives, score and level while play game
    let maximumHealth = 100; //player starts with 100 health points
    ctx.fillText("Health: " + this.health, 20, 80); // text written to screen
    let healthBarWidth = 400 * this.health/maximumHealth; 
    let g = Math.round(255 * this.health/maximumHealth); //green
    let r = 255 - g; //red
    let b = 54; //blue
    //concatenates the variables to create rgb values
    let color =  "rgb("+ r +","+ g +"," + b + ")";
    ctx.fillStyle = color;
    ctx.fillRect(20, 20, healthBarWidth, 20);
    ctx.save();
     //detects victory condition
     if (this.y === 50) {
        ctx.font = '50px monospace';
        ctx.fontStyle = "rgb(24, 24, 104)";
        ctx.fillStyle = "rgb(0, 0 ,0)";
        ctx.fillText("You won", 150, 150); // text written to screen
        setTimeout( function(){reset();}, 1000);
    }

};
//handleInput method recieves the event (e) detected by listener
Player.prototype.handleInput = function(e){
 if (pause) {
    switch(e){
        case "pause":
        pause = !pause;  //toggles between pause and resume
        console.log( (pause ? "pause" : "resume") );               
        break;
    default:
        return; // do nothing 
    }
 } else {
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
        case "pause":
            pause = !pause;  //toggles between pause and resume
            console.log( (pause ? "pause" : "resume") );               
            break;
        default:
            return; // do nothing
    }
 }
    //prevents character from moving outside of gameboard
    if (this.x > 500 || this.x < 0) {
        this.x = 200;
    }

    if (this.y > 500 || this.y < 0) {
        this.y = 400;
    }

    //detects victory condition
    if (this.y === 50) {
        console.log("you reached the water");
    }
     
};

// Now instantiate your objects. 
//arguments are x, y, speed, name
var enemyBug1 = new Enemy(0, 150, 100, "E1"); 
var enemyBug2 = new Enemy(0, 250, 150, "E2");
var enemyBug3 = new Enemy(0, 305, 75, "E3");

 
// Place all enemy objects in an array called allEnemies
var allEnemies = [enemyBug1, enemyBug2, enemyBug3];
var player = new Player(); // global var

// var blueGem = new Gem(200, 200, 'blue');
// var blueGem2 = new Gem(150, 400, 'blue2');
// var allGems = [blueGem, blueGem2];
// pause set to false on game start in reset in function
let pause; 


// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        32: 'pause', //spacebar
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };
    player.handleInput(allowedKeys[e.keyCode]);
});



