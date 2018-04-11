let gameFinished = false;

window.onload = () => {
    document.querySelector('#start').addEventListener('click', startButton);
}
startButton = () => {
    let buttonsClicked = 0;
    document.querySelector('#start').remove();
    let h1 = createElement('h1', 'WAAAAIT');
    h1.style = `grid-area: 3/3`;
    setTimeout(() => {
        h1.remove();
        gameStart();
    }, Math.random()*2000+1000);
}
gameStart = () => {
    let buttons = Array(5).fill().map(createGameButton);
    buttons.forEach(el=>{
        el.style = `grid-area: ${Math.floor(Math.random()*5)}/${Math.floor(Math.random()*5)}`
    });
    document.querySelector('.game_area').addEventListener('click', loseGame);
    setTimeout(() => {
        if (!gameFinished) loseGame();
        gameFinished = true;
    }, 3000);
}
createGameButton = () => {
    return createElementWithclick('button', 'Click Me', (e)=>{
        e.stopPropagation();
        e.target.remove();
        checkWin();
    });
}
createElementWithclick = (type, str, eventListener) => {
    let el = createElement(type, str);
    el.addEventListener('click', eventListener)
    return el;
}
createElement = (type, str) => {
    let el = document.createElement(type);
    el.innerText = str;
    document.querySelector('.game_area').appendChild(el);
    return el;
}
loseGame = () => {
    document.querySelectorAll('button').forEach(el=>el.remove())
    createElement('h1', 'YOU LOSE').style = `grid-area: 3/3`;
    createElementWithclick('button', 'Play Again', ()=>window.location.reload()).style = `grid-area: 4/3`;
}
checkWin= () => {
    if (document.querySelectorAll('button').length === 0) {
        createElement('h1', 'YOU WIN!!!').style = `grid-area: 3/3`;
        createElementWithclick('button', 'Play Again', ()=>window.location.reload()).style = `grid-area: 4/3`;
        gameFinished = true;
    }
}
