// This sectin contains some game constants. It is not super interesting
let GAME_WIDTH;
let GAME_HEIGHT;

const ENEMY_BASE_RADIUS = 100;
const ENEMY_MIN_RADIUS = 50;
const MAX_ENEMIES = 6;

const PLAYER_WIDTH = 20;
const PLAYER_HEIGHT = 40;
const SHOOT_SPEED = 20;

// These two constants keep us from using "magic numbers" in our code
const LEFT_ARROW_CODE = 37;
const RIGHT_ARROW_CODE = 39;

// These two constants allow us to DRY
const MOVE_LEFT = 'left';
const MOVE_RIGHT = 'right';

// Global letiables
let gameEngine;
let canvas;
let ctx;
let keys = {'left':false,'right':false, 'space':false};
let bullets = Array(100).fill();
let sparks = Array(10).fill();
let powerUps = Array(3).fill();
let lastPowerUp = 0;

// Preload game images
// let images = {};
// ['enemy.png', 'stars.png', 'player.png'].forEach(imgName => {
//     let img = document.createElement('img');
//     img.src = 'images/' + imgName;
//     images[imgName] = img;
// });


/**
 * An entity is anything that will be rendered on screen
 * 
 * @class Entity
 */
class Entity {
    constructor(x, y, radius) {
        this.x = x;
        this.y = y;
        this.visible = false;
        this.radius = radius;
        this.speed = 0;
    }
    render(ctx) {
        ctx.save();
        ctx.translate(this.x,Math.floor(this.y))
        ctx.beginPath();
        ctx.arc(0,0,this.radius,0,2*Math.PI)
        ctx.stroke()
        ctx.restore();
    }
    add (x,y) {
        this.x = x;
        this.y = y;
        this.visible = true;
    }
    randomAdd () {
        this.add(Math.floor(Math.random()*GAME_WIDTH),-this.radius);
    }
    moveOffScreen () {
        this.x = -10;
        this.y = -10;
        this.visible = false;
    }
    update(timeDiff) {
        this.y+= this.speed*timeDiff;
        return this;
    }
    isNear(arr) {        
        return arr.some((element)=>{       
            return this.radius+element.radius > distanceBetween(element, this);
        });
    }
}

class Sparks extends Entity {
    constructor() {
        super(-10,-10)
        this.creationTime = 0;
        this.move = this.move.bind(this);
        this.update = this.update.bind(this);
        this.age = 0;
    }
    render (currentFrame) {
        ctx.save();
        ctx.translate(this.x,this.y);
        ctx.beginPath();
        for (let index = 0; index < 5; index++) {
            ctx.moveTo(0,3*this.age);
            ctx.lineTo(0,6*this.age);
            ctx.moveTo(0,-6*this.age)
            ctx.rotate(Math.PI*2/5+this.age)
        }
        ctx.stroke();
        ctx.restore();
        this.age++;
    }
    update (currentFrame) {
        if (currentFrame- this.creationTime>100) {
            this.x = -10;
            this.y = -10;
            this.age = 0;
            this.visible = false;
        };
    }
    move(x,y, time) {
        this.x = x;
        this.y = y;
        this.visible = true;
        this.creationTime = time;
    }
}

// This section is where you will be doing most of your coding
class Enemy extends Entity{
    constructor(xPos, radius) {
        super(xPos, -radius);
        this.radius= radius;
        // Each enemy should have a different speed
        this.speed = Math.random() / 10;
    }
    
    // update(timeDiff) {
    //     this.y = (this.y + timeDiff * this.speed);
    // }
    

    hit(hits) {
        this.radius-=hits;
    }
}

class Player extends Entity{
    constructor() {
        super(GAME_WIDTH/2, GAME_HEIGHT-100, 20);
        this.power = 2000;
        this.sprite = ship; 
        this.speed = 0;
        this.acc = 0;      
        this.maxSpeed = 8;
        this.lastShot = 0;
        this.lastGun = 1;
    }
    update(timeDiff) {
        if (keys.left) {
            this.speed-=0.05;
        }
        if (keys.right) {
            this.speed+=0.05;
        }
        if (keys.space) {
        }
        if (Math.abs(this.speed) > this.maxSpeed) this.speed = this.maxSpeed*this.speed/Math.abs(this.speed);
        if (this.x>40 && this.x<GAME_WIDTH-40) {
            this.x += this.speed*timeDiff;
            this.speed *=0.95;
        } else if (this.x<40) {
            this.speed = 0;
            this.x = 41
        } else if (this.x>GAME_WIDTH-40) {
            this.speed = 0;
            this.x = GAME_WIDTH - 41
        }
        if(this.power>0)this.power-=timeDiff;
    }
    shoot (bullet, time) {
        if (!bullet || this.power<1) return;
        if (time - this.lastShot<SHOOT_SPEED) return;
        this.lastShot = time
        bullet.visible = true;
        if (this.lastGun>0) {
            bullet.x = this.x +30;
            bullet.y = this.y +13;
        } else {
            bullet.x = this.x - 30 ;
            bullet.y = this.y + 13;
        }
        this.lastGun*=-1
    }
    render(ctx) {
        ctx.save();
        ctx.translate(Math.floor(this.x),Math.floor(this.y))
        ctx.strokeStyle = '#FF00AD'
        ctx.shadowColor = '#FF00AD';
        ctx.shadowBlur = 10;
        ctx.fillStyle = 'white'
        ctx.lineWidth = 2;
        ctx.stroke(this.sprite);
        // ctx.fill(this.sprite)
        ctx.scale(-1,1)
        ctx.stroke(this.sprite);
        // ctx.fill(this.sprite)
        ctx.restore();
    }
}


class Bullet extends Entity{
    constructor() {
        super(-10, -10);
        this.speed = -0.25
    }

    render() {
        ctx.save();
        ctx.translate(Math.floor(this.x),Math.floor(this.y))
        ctx.stroke(bulletSprite);
        ctx.restore();
        return this;
    }
}

class PowerUp extends Entity {
    constructor(x,y) {
        super(x,y, 20);
        this.speed = 0.25;
    }
}


/*
This section is a tiny game engine.
This engine will use your Enemy and Player classes to create the behavior of the game.
The engine will try to draw your game at 60 frames per second using the requestAnimationFrame function
*/
class Engine {
    constructor() {
        // Setup the player
        this.player = new Player();
        
        // Setup enemies, making sure there are always three
        this.setupEnemies();
        
        // Since gameLoop will be called out of context, bind it once here.
        this.gameLoop = this.gameLoop.bind(this);
    }
    
    /*
    The game allows for 5 horizontal slots where an enemy can be present.
    At any point in time there can be at most MAX_ENEMIES enemies otherwise the game would be impossible
    */
    setupEnemies() {
        if (!this.enemies) {
            this.enemies = [];
        }
        while (this.enemies.filter(e => !!e).length < MAX_ENEMIES) {
            this.addEnemy();
        }
    }
    
    // This method finds a random spot where there is no enemy, and puts one in there
    addEnemy() {
        let enemySpots = GAME_WIDTH / ENEMY_BASE_RADIUS;
        let enemySpot;
        // Keep looping until we find a free enemy spot at random
        while (!enemySpot && this.enemies[enemySpot]) {
            enemySpot = Math.floor(Math.random() * enemySpots);
        }
        
        this.enemies[enemySpot] = new Enemy(enemySpot * ENEMY_BASE_RADIUS, ENEMY_BASE_RADIUS);
    }
    
    // This method kicks off the game
    start() {
        this.score = 0;
        this.lastFrame = Date.now();
        
        // Listen for keyboard left/right and update the player
        document.addEventListener('keydown', e => {            
            if (e.keyCode === LEFT_ARROW_CODE) {
                keys.left = true;
            }
            else if (e.keyCode === RIGHT_ARROW_CODE) {
                keys.right = true;
            } else if (e.keyCode === 32) {
                keys.space = true;
            } else if (e.keyCode === 27) {
                keys.esc = true;
            }
        });
        document.addEventListener('keyup', e=>{
            if (e.keyCode === LEFT_ARROW_CODE) {
                keys.left = false;
            }
            else if (e.keyCode === RIGHT_ARROW_CODE) {
                keys.right = false;
            } else if (e.keyCode === 32) {
                keys.space = false;
            }
        });

        // Initialize global vars
        bullets = bullets.map(el=>new Bullet());
        sparks = sparks.map(s=>new Sparks())
        powerUps = powerUps.map(p=>new PowerUp());  
        this.gameLoop();
    }
    
    /*
    This is the core of the game engine. The `gameLoop` function gets called ~60 times per second
    During each execution of the function, we will update the positions of all game entities
    It's also at this point that we will check for any collisions between the game entities
    Collisions will often indicate either a player death or an enemy kill
    
    In order to allow the game objects to self-determine their behaviors, gameLoop will call the `update` method of each entity
    To account for the fact that we don't always have 60 frames per second, gameLoop will send a time delta argument to `update`
    You should use this parameter to scale your update appropriately
    */
    gameLoop() {
        // Check how long it's been since last frame
        let currentFrame = Date.now();
        let timeDiff = currentFrame - this.lastFrame;
        
        // Increase the score!
        this.score += timeDiff;
        
        // Call update on all enemies


        this.enemies.forEach(enemy => enemy.update(timeDiff));
        
        this.player.update(timeDiff);
        
        // Draw everything!
        // ctx.drawImage(images['stars.png'], 0, 0); // draw the star bg
        
        // Draw a black background
        ctx.save();
        ctx.fillStyle = 'black'
        ctx.fillRect(0,0,GAME_WIDTH,GAME_HEIGHT);
        ctx.restore();
        
        // determine onscreenBullets bullets
        bullets.forEach(setIsVisible);
        let onscreenBullets = bullets.filter(isVisible);

        // Update and render bullets
        ctx.save()
        ctx.shadowColor = 'white';
        ctx.shadowBlur = 10;
        onscreenBullets.forEach(bullet=>{
           if (!bullet) return;
            bullet.update(timeDiff);
            bullet.render();
        });
        ctx.restore()

        // Add Power Ups
        if (currentFrame - lastPowerUp > 3000){
            let x =powerUps.find(notVisible);
            if (x) x.randomAdd();
            lastPowerUp = currentFrame;
        }

        //determine onscreen powerups
        powerUps.forEach(setIsVisible)

        // Update and render powerups
        ctx.save()
        ctx.strokeStyle = '#51CFEE'
        ctx.shadowColor = '#51CFEE';
        ctx.shadowBlur = 10;
        powerUps.filter(isVisible).forEach(powerUp=>{
            powerUp.update(timeDiff)
            powerUp.render(ctx);
        });
        ctx.restore()
        
        // If player intersects with powerup, give power to player
        if (this.player.isNear(powerUps)) {
            this.player.power += 2000;
            powerUps[0].moveOffScreen();
            console.log('powerup');
            

        }
        
        
        // draw the enemies
        ctx.strokeStyle = 'white'
        ctx.lineWidth = 2;
        this.enemies.forEach(enemy => enemy.render(ctx)); 
        
        
        this.player.render(ctx); // draw the player
        
        // Check if any enemies should die
        this.enemies.forEach((enemy, enemyIdx) => {
            if (enemy.y > GAME_HEIGHT || enemy.radius < ENEMY_MIN_RADIUS) {
                delete this.enemies[enemyIdx];
            } else if( onscreenBullets.length>0) {
                let hits = onscreenBullets.filter(bullet=>distanceBetween(bullet, enemy)<enemy.radius);
                if (hits.length>0) {
                    enemy.hit(hits.length);
                    hits.forEach(hit=>{
                        let available = sparks.find(notVisible);
                        if (available) available.move(hit.x,hit.y,currentFrame);
                    })
                    hits.forEach(bullet=>{
                        bullet.moveOffScreen()
                    })
                }
            }
        });
        this.setupEnemies();
        
        // Update and render sparks
        if (sparks.length>0) {
            sparks.filter(s=>s.visible).forEach((spark, i)=>{
                spark.render(currentFrame);
                spark.update(currentFrame);
            })
        }
        /*
        *
        *
        * 
        */

        // if space is down shoot bullet
        if (keys.space) this.player.shoot(bullets.find(b=>!b.visible), currentFrame)
        
        // If escape is pressed abort game
        if (keys.esc) throw new Error('manual abort');
        
        // Check if player is dead
        if (this.player.isNear(this.enemies)) {
            // If they are dead, then it's game over!
            ctx.font = 'bold 30px Impact';
            ctx.fillRect(0,0,GAME_WIDTH,GAME_HEIGHT)
            ctx.fillStyle = '#ffffff';
            ctx.fillText(this.score + ' GAME OVER', 5, 30);
        }
        else {
            // If player is not dead, then draw the score
            // ctx.font = 'bold 30px Impact';
            // ctx.fillStyle = '#ffffff';
            // ctx.fillText(this.score, 5, 30);
            
            // Set the time marker and redraw
            this.lastFrame = Date.now();
            requestAnimationFrame(this.gameLoop);
        }
    }
    
}


// This section will start the game
window.onload = () => {    
    GAME_WIDTH = Math.floor(window.innerWidth *0.9);
    GAME_HEIGHT = Math.floor(window.innerHeight * 0.9);
    canvas = document.querySelector('canvas');
    canvas.width = GAME_WIDTH;
    canvas.height = GAME_HEIGHT;
    ctx = canvas.getContext('2d');
    gameEngine = new Engine();
    gameEngine.start();
}