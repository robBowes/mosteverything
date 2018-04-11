const PLAYER1 = 'KeyQ', PLAYER2 = 'KeyP', PREGAME = 0, READY =1, GAMEOVER =2;
let gameState = PREGAME;
let timers = [];
const score = {'player1': 0,
'player2': 0};
const A = {
    'whip': new Audio('whip.mp3'),
    'theme' : new Audio('theme.mp3'),
    'outro' :new Audio('outro.mp3'), 
    'gunshot' : new Audio('gunshot.mp3'), 
    'ricochet' : new Audio('ricochet.mp3')
}
gameStart = () => {
    A.theme.play();
    clearByClass('.main');
    clearByClass('.image');
    jumbo('Ready...');
    p1Image('idle_cowboy.png')
    p2Image('idle_cowboy.png')
     let n = setTimeout(() => {
        if (gameState == PREGAME) {
            gameState = READY;
            clearByClass('.main');
            A.theme.pause();
            A.whip.play();
            clearByClass('.image');
            p1Image('gun_cowboy.png')
            p2Image('gun_cowboy.png')
            jumbo('SHOOT')
        }
    }, Math.random()*6000+2000);
    timers.push(n);
}
playerKeyPress = (key) => {
    A.theme.pause();
    A.whip.pause();
    if (gameState === PREGAME) {
        A.ricochet.play();
        setTimeout(() => A.gunshot.play(), 200);
        playerWin(key===PLAYER1?PLAYER2:PLAYER1, 'You flinched! ')
    } else if (gameState == READY) {
        let msgs = ['Nice Shot! ', 'You\'re a gunslinger! ', 'Gottem Cowboy! ', 'Bang bang! ', 'Paint the town red! ']
        A.gunshot.play();
        playerWin(key, msgs[Math.floor(Math.random()*msgs.length)]);
    }
    A.outro.play();
    if (gameState != GAMEOVER) {
        if (score.player1 <3 && score.player2<3) {
            createElement('button', 'Next Round', 'big container button', '3/2').addEventListener('click',()=>newRound())
        } else {
            clearByClass('.main');
            document.querySelector('body').style.backgroundImage= 'url(\'sunset2.png\')'
            jumbo(`GAME OVER! Player ${score.player1===3?'1':'2'} wins the game!`)
            createElement('button', 'Play Again', 'big container button', '3/2').addEventListener('click',()=>window.location.reload())
        }
        if (timers.length > 0) timers.forEach(el=>{
            clearInterval(el);
        });
        timers = [];
        gameState = GAMEOVER;
    }
}
newRound = () => {
    Object.values(A).forEach(el=>{
        el.pause();
        el.currentTime = 0;
    })
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
        createWounds(0.6);
    } else {
        playerN = 'Player 2';
        p2Image('shoot_cowboy.png');
        p1Image('dead_cowboy.png');
        score.player2++;
        document.querySelector('.player2score').innerText = score.player2;
        createWounds(0);
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
createWounds = (pos) => {
    let wounds = Array(5).fill().map(()=>createImage('wound.png', ''))
    wounds.map(el=>{
        el.style.position = 'absolute';
        el.style.top = Math.random()*document.querySelector('.game_area').clientHeight-200+'px';
        el.style.left = (Math.random()*document.querySelector('.game_area').clientWidth*0.3) +document.querySelector('.game_area').clientWidth*pos-100+'px';
        el.style.transform = 'scale(0.25)';
        el.style.zIndex = 100;
    })
}
window.onload = ()=>{
    document.addEventListener('keydown', (e)=> {
        if (e.code === PLAYER1 || e.code === PLAYER2) playerKeyPress(e.code);
        if (e.code ==='Space' && gameState ==GAMEOVER && score.player1<3 && score.player2<3) newRound();
        else if (e.code ==='Space' && gameState ==GAMEOVER) window.location.reload();
    });
    gameStart(); 
};