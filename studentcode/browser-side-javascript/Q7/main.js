let gameFinished = false;
window.onload = () => {
    document.querySelector('#start').addEventListener('click', (e)=>{
        e.target.remove();
        let h1 = elementWithPos('h1', 'WAAAIIT', window.innerHeight/3, window.innerWidth/3);
        setTimeout(()=>{
            h1.remove();
            startGame();
        }, Math.random()*2000+1000);
    });
};
startGame = () => {
    let n = Math.ceil(Math.random()*10);
    let buttons = Array(n).fill().map(randomGameButton);
    document.querySelector('.game_area').addEventListener('click', loseGame)    
    setTimeout(() => {
        if (!gameFinished) {
            loseGame();
        }
    }, 1000+n*400);
    
}
loseGame = () => {
    document.querySelectorAll('button').forEach(el=>el.remove());
    elementWithPos('h1', 'YOU LOSE',window.innerHeight/3, window.innerWidth/3 )
    elementWithPos('button', 'Play Again',window.innerHeight/2, window.innerWidth/3)
    .addEventListener('click', ()=>window.location.reload());
    gameFinished = true;
}
randomGameButton = () => {
    let el = elementWithPos('button', 'Click Me', Math.random()*window.innerHeight, Math.random()*window.innerWidth)
    el.addEventListener('click', (e)=>{
        e.stopPropagation();
        e.target.remove();
        checkWin();
    });
    return el;
}
elementWithPos = (type, str, posx, posy) => {
    let el = createElement(type,str);
    el.style.position = `absolute`
    el.style.top = posx+'px';
    el.style.left = posy+'px';
    return el;
}
createElement = (type, str) => {
    let el = document.createElement(type);
    el.innerText = str;
    document.querySelector('.game_area').appendChild(el);
    return el;
}
checkWin = () => {
    if (document.querySelectorAll('button').length === 0) {
        if (!gameFinished) {
            elementWithPos('h1', 'YOU WIN',window.innerHeight/3, window.innerWidth/3 )
            elementWithPos('button', 'Play Again',window.innerHeight/2, window.innerWidth/3)
            .addEventListener('click', ()=>window.location.reload());
            gameFinished = true;
        }
    }
}