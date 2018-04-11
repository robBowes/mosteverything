const PLAYER1 = 81, PLAYER2 = 80, PREGAME = 0, READY =1, GAMEOVER =2;
let gameState = PREGAME;
const WHIP = new Audio('whip.mp3');
const THEME = new Audio('theme.mp3');
const OUTRO = new Audio('outro.mp3');
const GUNSHOT = new Audio('gunshot.mp3');
const RICOCHET = new Audio('ricochet.mp3')
window.onload = () => {
    THEME.play();
    document.addEventListener('keydown', (e)=> {
        if (e.keyCode === PLAYER1 || e.keyCode === PLAYER2) playerKeyPress(e.keyCode)
    });
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
};
playerKeyPress = (key) => {
    if (gameState === PREGAME) {
        THEME.pause();
        RICOCHET.play();
        playerWin(key===PLAYER1?PLAYER2:PLAYER1, 'Too Early! ')
        gameState = GAMEOVER;
    } else if (gameState == READY) {
        GUNSHOT.play();
        playerWin(key, 'Nice Shot! ');
        gameState = GAMEOVER;
    }
    OUTRO.play();
    createElement('button', 'Play Again', 'big container', '3/2').addEventListener('click',()=>window.location.reload())
}
playerWin = (player, msg) => {
    clearByClass('.main');
    clearByClass('.image');
    let playerN
    if (player === PLAYER1) {
        playerN = 'player 1';
        p1Image('shoot_cowboy.png')
        p2Image('dead_cowboy.png')
    } else {
        playerN = 'player 2';
        p2Image('shoot_cowboy.png')
        p1Image('dead_cowboy.png')
    }
    jumbo(`${msg} ${playerN} wins!`)
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