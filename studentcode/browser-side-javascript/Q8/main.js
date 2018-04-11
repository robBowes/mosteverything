const PLAYER1 = 81, PLAYER2 = 80, PREGAME = 0, READY =1, GAMEOVER =2;
let gameState = PREGAME;
const WHIP = new Audio('whip.mp3');
window.onload = () => {
    document.addEventListener('keydown', (e)=> {
        if (e.keyCode === PLAYER1 || e.keyCode === PLAYER2) playerKeyPress(e.keyCode)
    });
    jumbo('Ready...')
    setTimeout(() => {
        if (gameState == PREGAME) {
            gameState = READY;
            clearByClass('.main');
            WHIP.play();
            jumbo('SHOOT')
        }
    }, Math.random()*6000+2000);
};
playerKeyPress = (key) => {
    if (gameState === PREGAME) {
        clearByClass('.main');
        jumbo(`Too Early! Player ${key===PLAYER1?2:1} wins!`)
        gameState = GAMEOVER;
    } else if (gameState == READY) {
        clearByClass('.main');
        jumbo(`Nice shot! Player ${key===PLAYER1?1:2} wins!`)
        gameState = GAMEOVER;
    }
    createElement('button', 'Play Again', 'big', '3/2').addEventListener('click',()=>window.location.reload())
}
clearByClass = (tag) => {
    let el = document.querySelector(tag)
    if (el) el.remove();
}
jumbo = (str) => {
    return createElement('div', str, 'main', '2/2')
}
createElement = (type, str, classStr, gridArea) => {
    let el = document.createElement(type);    
    el.innerText = str;
    el.className += classStr;
    el.style.gridArea = gridArea;
    document.querySelector('.game_area').appendChild(el);
    return el;
};
