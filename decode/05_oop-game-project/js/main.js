// This sectin contains some game constants. It is not super interesting
let GAME_WIDTH;
let GAME_HEIGHT;

const ENEMY_BASE_RADIUS = 50;
const ENEMY_MIN_RADIUS = 50;
const MAX_ENEMIES = 4;

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
let keys = { 'left': false, 'right': false, 'space': false };
let color = {
    'blue': '#4deeea',
    'green': '#74ee15',
    'yellow': '#ffe700',
    'pink': '#f000ff',
    'red': '#fe0000'

};
let bullets = Array(100).fill();
let sparks = Array(10).fill();
let powerUps = Array(3).fill();
let enemies = Array(10).fill();
let lastPowerUp = 0;
let background;
let lastFrame = 0;


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
        this.image = new Image();
        this.image.src = this.generateImage();
    }
    generateImage() {
        console.error(`${this.constructor.name} entities must have generateImage() function`)
    }
    add(x, y) {
        this.x = x;
        this.y = y;
        this.visible = true;
    }
    randomAdd() {
        this.add(Math.floor(Math.random() * GAME_WIDTH), -this.radius);
    }
    moveOffScreen() {
        this.x = -1000;
        this.y = -1000;
        this.visible = false;
    }
    moveToStaging() {
        this.x = Math.floor(Math.random() * GAME_WIDTH);
        this.y = -175;
        this.visible = true;
    }
    update(timeDiff) {
        this.y += this.speed * timeDiff;
        return this;
    }
    isNearArr(arr) {
        return arr.some((element) => {
            return this.radius + element.radius > distanceBetween(element, this);
        });
    }
    isNear(element) {
        return this.radius + element.radius > distanceBetween(element, this)
    }
    render() {
        ctx.drawImage(this.image, this.x - this.image.width / 2, this.y - this.image.height / 2)
    }
}

class Sparks extends Entity {
    constructor() {
        super(-10, -10)
        this.creationTime = 0;
        this.move = this.move.bind(this);
        this.update = this.update.bind(this);
        this.age = 0;
    }
    generateImage () {
        this.offScreenCanvas = document.createElement('canvas');
        this.offScreenCanvas.width = 240;
        this.offScreenCanvas.height = 80;
        this.offScreenContext = this.offScreenCanvas.getContext('2d');
        this.offScreenContext.lineWidth = 2;
        this.offScreenContext.strokeStyle = color.yellow;
        this.offScreenContext.shadowColor = color.yellow;
        this.offScreenContext.shadowBlur = 10;
        this.offScreenContext.beginPath();
        for (let j = 0; j <= 3; j++) {
            this.offScreenContext.save()
            this.offScreenContext.translate(40 + j*80,40);
            for (let index = 0; index < 10; index++) {
                this.offScreenContext.moveTo(0, 20 );
                this.offScreenContext.lineTo(0, 40 );
                this.offScreenContext.moveTo(0, -40 )
                this.offScreenContext.rotate(Math.PI * 2 / 10 + j)
            }
            this.offScreenContext.restore();
        }
        this.offScreenContext.stroke();
        return this.offScreenCanvas.toDataURL('spark/png')
    }
    render(currentFrame) {
        ctx.drawImage(this.image, 0+Math.floor((this.age/5)%3)*80,0,80,80,this.x -40,this.y-40,80,80)
        this.age++;
    }
    // render(currentFrame) {
    //     ctx.save();
    //     ctx.translate(this.x, this.y);
    //     ctx.beginPath();
    //     for (let index = 0; index < 5; index++) {
    //         ctx.moveTo(0, 3 * this.age);
    //         ctx.lineTo(0, 6 * this.age);
    //         ctx.moveTo(0, -6 * this.age)
    //         ctx.rotate(Math.PI * 2 / 5 * Math.random() + this.age)
    //     }
    //     ctx.stroke();
    //     ctx.restore();
    //     this.age++;
    // }
    update(currentFrame) {
        if (currentFrame - this.creationTime > 100) {
            this.age = 0;
            this.moveOffScreen();
        };
    }
    move(x, y, time) {
        this.x = x;
        this.y = y;
        this.visible = true;
        this.creationTime = time;
    }
}

// This section is where you will be doing most of your coding
class Enemy extends Entity {
    constructor() {
        super(-1000, -1000, ENEMY_BASE_RADIUS);
        this.radius = ENEMY_BASE_RADIUS;
        // Each enemy should have a different speed
        this.speed = Math.random() / 10;
        this.hp = 10;
    }
    generateImage() {
        this.noCanvas = document.createElement('canvas');
        this.noCanvas.width = ENEMY_BASE_RADIUS * 2 + 10;
        this.noCanvas.height = ENEMY_BASE_RADIUS * 2 + 10;
        this.c = this.noCanvas.getContext('2d');
        this.c.lineWidth = 8;
        this.c.strokeStyle = color.red;
        this.c.shadowBlur = 10;
        this.c.shadowColor = color.red;
        this.c.fillStyle = color.red;
        this.c.translate(this.noCanvas.width / 2, this.noCanvas.width / 2);
        this.c.beginPath();
        this.c.arc(0, 0, this.radius, 0, 2 * Math.PI);
        this.c.stroke();
        // this.c.fill();
        return this.noCanvas.toDataURL('enemy/png');
    }
    hit(hits) {
        this.hp -= hits;
    }
}

class Player extends Entity {
    constructor() {
        super(GAME_WIDTH / 2, GAME_HEIGHT - 100, 30);
        this.power = 2000;
        this.sprite = ship;
        this.speed = 0;
        this.acc = 0;
        this.maxSpeed = 8;
        this.lastShot = 0;
        this.lastGun = 1;
    }
    generateImage() {
        this.noCanvas = document.createElement('canvas');
        this.noCanvas.width = 100;
        this.noCanvas.height = 100;
        this.c = this.noCanvas.getContext('2d');
        this.c.strokeStyle = '#FF00AD';
        this.c.shadowColor = '#FF00AD';
        this.c.shadowBlur = 10;
        this.c.lineWidth = 2;
        this.c.translate(50, 25)
        for (let i = -1; i < 2; i += 2) {
            this.c.moveTo(0, 0);
            this.c.lineTo(10 * i, 10)
            this.c.lineTo(15 * i, 30)
            this.c.lineTo(35 * i, 35)
            this.c.lineTo(35 * i, 20)
            this.c.lineTo(35 * i, 50)
            this.c.lineTo(35 * i, 45)
            this.c.lineTo(12 * i, 50)
            this.c.lineTo(12 * i, 53)
            this.c.lineTo(0 * i, 53)
        }
        this.c.stroke()
        return this.noCanvas.toDataURL('ship/png');
    }
    update(timeDiff) {
        if (keys.left) {
            this.speed -= 0.05;
        }
        if (keys.right) {
            this.speed += 0.05;
        }
        if (keys.space) {
        }
        if (Math.abs(this.speed) > this.maxSpeed) this.speed = this.maxSpeed * this.speed / Math.abs(this.speed);
        if (this.x > 40 && this.x < GAME_WIDTH - 40) {
            this.x += this.speed * timeDiff;
            this.speed *= 0.95;
        } else if (this.x < 40) {
            this.speed = 0;
            this.x = 41
        } else if (this.x > GAME_WIDTH - 40) {
            this.speed = 0;
            this.x = GAME_WIDTH - 41
        }
        if (this.power > 0) this.power -= timeDiff;
    }
    shoot(bullet, time) {
        if (!bullet || this.power < 1) return;
        if (time - this.lastShot < SHOOT_SPEED) return;
        this.lastShot = time
        bullet.visible = true;
        if (this.lastGun > 0) {
            bullet.x = this.x + 35;
            bullet.y = this.y - 5;
        } else {
            bullet.x = this.x - 35;
            bullet.y = this.y - 5;
        }
        this.lastGun *= -1;
    }
    render(ctx) {
        ctx.drawImage(this.image, this.x - this.image.width / 2, this.y - this.image.height / 2);
    }
}


class Bullet extends Entity {
    constructor() {
        super(-10, -10);
        this.speed = -0.25
    }
    render() {
        ctx.drawImage(this.image, this.x - this.image.width / 2, this.y - this.image.height / 2);
    }
    generateImage() {
        this.offScreenCanvas = document.createElement('canvas');
        this.offScreenCanvas.width = 20;
        this.offScreenCanvas.height = 20;
        this.offScreenContext = this.offScreenCanvas.getContext('2d');
        this.offScreenContext.lineWidth = 2;
        this.offScreenContext.strokeStyle = 'white';
        this.offScreenContext.shadowColor = 'white';
        this.offScreenContext.fillStyle = 'white';
        this.offScreenContext.shadowBlur = 3;
        this.offScreenContext.translate(10, 10);
        this.offScreenContext.beginPath();
        this.offScreenContext.lineTo(0, 0);
        this.offScreenContext.lineTo(-3, 5);
        this.offScreenContext.lineTo(3, 5);
        this.offScreenContext.lineTo(0, 0);
        this.offScreenContext.stroke();
        this.offScreenContext.fill();
        return this.offScreenCanvas.toDataURL('bullet/png')
    }
}

class PowerUp extends Entity {
    constructor(x, y) {
        super(x, y, 20);
        this.speed = 0.25;
    }
    generateImage() {
        this.noCanvas = document.createElement('canvas');
        this.noCanvas.width = 50;
        this.noCanvas.height = 50;
        this.c = this.noCanvas.getContext('2d');
        this.c.lineWidth = 4;
        this.c.strokeStyle = color.blue;
        this.c.shadowBlur = 10;
        this.c.shadowColor = color.blue;
        this.c.fillStyle = color.blue;
        this.c.translate(25, 25);
        this.c.beginPath();
        this.c.arc(0, 0, this.radius, 0, 2 * Math.PI);
        this.c.stroke();
        this.c.fill();
        return this.noCanvas.toDataURL('powerup/png');
    }
    render(ctx) {
        ctx.drawImage(this.image, this.x - this.image.width / 2, this.y - this.image.height / 2)
    }
}

class SpeedUp extends Entity {
    constructor(x, y) {
        super(x, y, 10);
        this.speed = 0.35;
    }
}


class Background {
    constructor() {
        this.gridSize = 50;
        this.offScreenCanvas = document.createElement('canvas');
        this.offScreenCanvas.width = GAME_WIDTH;
        this.offScreenCanvas.height = GAME_HEIGHT * 2;
        this.offScreenContext = this.offScreenCanvas.getContext('2d');
        this.offScreenContext.fillStyle = 'black';
        this.offScreenContext.fillRect(0, 0, GAME_WIDTH, GAME_HEIGHT);
        this.offScreenContext.strokeStyle = 'purple';
        this.offScreenContext.shadowColor = 'purple';
        this.offScreenContext.shadowBlur = 8;
        this.offScreenContext.lineWidth = 2;
        for (let i = 0; i < GAME_WIDTH / this.gridSize; i++) {
            for (let j = 0; j < GAME_HEIGHT / this.gridSize; j++) {
                this.offScreenContext.rect(i * this.gridSize, j * this.gridSize, this.gridSize, this.gridSize)
            }
        }
        this.offScreenContext.stroke();
        this.image = this.offScreenContext.getImageData(0, 0, GAME_WIDTH, GAME_HEIGHT * 2);
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
        document.addEventListener('keyup', e => {
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
        bullets = bullets.map(el => new Bullet());
        sparks = sparks.map(s => new Sparks())
        powerUps = powerUps.map(p => new PowerUp());
        enemies = enemies.map(e => new Enemy());
        background = new Background()
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

        // Draw everything!

        // Draw the generated background
        ctx.lineWidth = 4;
        ctx.save();
        let xoff = Math.floor(currentFrame * 0.10 % GAME_HEIGHT)
        ctx.putImageData(background.image, 0, xoff, 0, 0, GAME_WIDTH, GAME_HEIGHT)
        ctx.putImageData(background.image, 0, xoff - GAME_HEIGHT + 5, 0, 0, GAME_WIDTH, GAME_HEIGHT)
        ctx.restore();


        // Call update on all enemies

        // this.enemies.forEach(enemy => enemy.update(timeDiff));
        let onscreenEnemies = enemies.filter(isVisible);
        if (onscreenEnemies.length < MAX_ENEMIES) {
            let newEnemy = enemies.find(notVisible);
            if (newEnemy) {
                newEnemy.moveToStaging();
            }
        }

        onscreenEnemies.forEach(enemy => {
            if (!enemy) return;
            enemy.update(timeDiff);
            enemy.render();
        })


        // update the player
        this.player.update(timeDiff);

        // determine onscreenBullets bullets
        bullets.forEach(setIsVisible);
        let onscreenBullets = bullets.filter(isVisible);

        // Update and render bullets
        onscreenBullets.forEach(bullet => {
            if (!bullet) return;
            bullet.update(timeDiff);
            bullet.render();
        });

        // Add Power Ups
        if (currentFrame - lastPowerUp > 5000) {
            let x = powerUps.find(notVisible);
            if (x) x.randomAdd();
            lastPowerUp = currentFrame;
        }

        // Check if any enemies should die
        enemies.forEach((enemy, enemyIdx) => {
            if (enemy.y > GAME_HEIGHT || enemy.hp < 0) {
                enemy.moveOffScreen();
                enemy.hp = 10;
            } else if (onscreenBullets.length > 0) {
                let hits = onscreenBullets.filter(bullet => distanceBetween(bullet, enemy) < enemy.radius);
                if (hits.length > 0) {
                    enemy.hit(hits.length);
                    hits.forEach(hit => {
                        let available = sparks.find(notVisible);
                        if (available) available.move(hit.x, hit.y, currentFrame);
                        hit.moveOffScreen();
                    })
                }
            }
        });
        //determine onscreen powerups
        powerUps.forEach(setIsVisible)

        // Update and render powerups
        powerUps.filter(isVisible).forEach(powerUp => {
            powerUp.update(timeDiff)
            powerUp.render(ctx);
        });

        // If player intersects with powerup, give power to player
        powerUps.forEach((powerUp, i) => {
            if (this.player.isNear(powerUp)) {
                this.player.power += 2000;
                powerUps[i].moveOffScreen()
            }
        })

        this.player.render(ctx); // draw the player


        // Update and render sparks
        // ctx.save()
        // ctx.strokeStyle = 'white';
        // ctx.lineWidth = 2;
        if (sparks.length > 0) {
            sparks.filter(s => s.visible).forEach((spark, i) => {
                spark.render(currentFrame);
                spark.update(currentFrame);
            })
        }
        // ctx.restore();

        // if space is down shoot bullet
        if (keys.space) this.player.shoot(bullets.find(b => !b.visible), currentFrame)


        // Check if player is dead
        if (this.player.isNearArr(enemies)) {
            // If they are dead, then it's game over!
            ctx.font = 'bold 30px Impact';
            ctx.fillRect(0, 0, GAME_WIDTH, GAME_HEIGHT)
            ctx.fillStyle = '#ffffff';
            ctx.fillText(this.score + ' GAME OVER', 5, 30);
        }
        else {
            // If player is not dead, then draw the score
            // ctx.font = 'bold 30px Impact';
            // ctx.fillStyle = '#ffffff';
            // ctx.fillText(this.score, 5, 30);

            // If escape is pressed abort game
            if (keys.esc) throw new Error('manual abort');

            // Set the time marker and redraw
            this.lastFrame = Date.now();
            requestAnimationFrame(this.gameLoop);
        }
    }
}


// This section will start the game
window.onload = () => {
    GAME_WIDTH = Math.floor(window.innerWidth * 0.5);
    GAME_HEIGHT = Math.floor(window.innerHeight * 0.9);
    canvas = document.querySelector('canvas');
    canvas.width = GAME_WIDTH;
    canvas.height = GAME_HEIGHT;
    ctx = canvas.getContext('2d');
    gameEngine = new Engine();
    gameEngine.start();
}