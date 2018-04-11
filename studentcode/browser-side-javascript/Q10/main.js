const PLAYER1 = 81, PLAYER2 = 80, PREGAME = 0, READY =1, GAMEOVER =2;
let gameState = PREGAME;
const score = {'player1': 0,
'player2': 0};
const WHIP = new Audio('whip.mp3');
const THEME = new Audio('theme.mp3');
const OUTRO = new Audio('outro.mp3');
const GUNSHOT = new Audio('gunshot.mp3');
const RICOCHET = new Audio('ricochet.mp3')
gameStart = () => {
    THEME.play();
    document.addEventListener('keydown', (e)=> {
        if (e.keyCode === PLAYER1 || e.keyCode === PLAYER2) playerKeyPress(e.keyCode)
    });
    clearByClass('.main');
    clearByClass('.image');
    jumbo('Ready...');
    p1Image('idle_cowboy.png')
    p2Image('idle_cowboy.png')
    setTimeout(() => {
        if (gameState == PREGAME) {
            gameState = READY;
            clearByClass('.main');
            THEME.pause();
            WHIP.play();
            clearByClass('.image');
            p1Image('gun_cowboy.png')
            p2Image('gun_cowboy.png')
            jumbo('SHOOT')
        }
    }, Math.random()*6000+2000);
}
playerKeyPress = (key) => {
    WHIP.pause();
    if (gameState === PREGAME) {
        THEME.pause();
        RICOCHET.play();
        playerWin(key===PLAYER1?PLAYER2:PLAYER1, 'Too Early! ')
    } else if (gameState == READY) {
        GUNSHOT.play();
        playerWin(key, 'Nice Shot! ');
    }
    OUTRO.play();
    if (gameState != GAMEOVER) {
        if (score.player1 <3 && score.player2<3) {
            createElement('button', 'Next Round', 'big container button', '3/2').addEventListener('click',()=>{
                RICOCHET.pause();
                GUNSHOT.pause();
                newRound()
            })
        } else {
            clearByClass('.main');
            jumbo(`GAME OVER! Player ${score.player1===3?'1':'2'} wins the game!`)
            createElement('button', 'Play Again', 'big container button', '3/2').addEventListener('click',()=>window.location.reload())
        }
        gameState = GAMEOVER;
    }
}
newRound = () => {
    OUTRO.pause();
    OUTRO.currentTime = 0;
    THEME.currentTime = 0;
    WHIP.currentTime = 0;
    RICOCHET.currentTime = 0;
    GUNSHOT.currentTime = 0;
    clearByClass('.button');
    gameStart();
    gameState = PREGAME;
}
playerWin = (player, msg) => {
    clearByClass('.main');
    clearByClass('.image');
    let playerN
    if (player === PLAYER1) {
        playerN = 'Player 1';
        p1Image('shoot_cowboy.png');
        p2Image('dead_cowboy.png');
        score.player1++;
        document.querySelector('.player1score').innerText = score.player1;
    } else {
        playerN = 'Player 2';
        p2Image('shoot_cowboy.png');
        p1Image('dead_cowboy.png');
        score.player2++;
        document.querySelector('.player2score').innerText = score.player2;
    }
    jumbo(`${msg} ${playerN} wins this round!`);
}
clearByClass = (tag) => {
    let arr = document.querySelectorAll(tag)
    if (arr.length>0) arr.forEach(el=>el.remove());
}
jumbo = (str) => {
    return createElement('div', str, 'main container', '2/2')
}
createElement = (type, str, classStr, gridArea) => {
    let el = document.createElement(type);    
    el.innerText = str;
    el.className += classStr;
    el.style.gridArea = gridArea;
    document.querySelector('.game_area').appendChild(el);
    return el;
};
playerImage = (src, gridArea) => {
    let el = createImage(src, gridArea  );
    el.src = src;
    el.style.width = '100%';
    return el;
}
p1Image = (src) => {
    let el = playerImage(src, '3/1');
    return el;
}
p2Image = (src) => {
    let el = playerImage(src, '3/3');
    el.style.transform = 'scaleX(-1)'
    return el;
}
createImage = (src, gridArea) => {
    let el = createElement('img', '', 'image', gridArea);
    el.src = src;
    return el;
}
window.onload = gameStart;