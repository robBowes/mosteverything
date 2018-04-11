window.onload = () =>{
    document.querySelector('#start').addEventListener('click', buttonClick);
}
buttonClick = () =>{
    document.querySelector('#start').remove();
    createElement('h1', 'WAAAAIIIT');
    setTimeout(gameStart, Math.random()*2000 +1000);
}
gameStart = () => {
    let gameFinished = false;
    let h1 = document.querySelector('h1');
    console.log(h1);
    
    h1.innerText = 'GOGOGOGOGO';
    document.querySelector('.game_area').addEventListener('click',()=>{
        if (!gameFinished) h1.innerText = 'You WIN!!!'
        gameFinished = true;
    });
    setTimeout(()=>{
        if (!gameFinished) h1.innerText = 'You LOSE!!!'
        gameFinished = true;
        createElement('button', 'Play Again').addEventListener('click', ()=> window.location.reload())

    }, 1000);

}
createElement = (type, str) => {
    let el = document.createElement(type);
    el.innerText = str;
    document.querySelector('.game_area').appendChild(el);
    return el;
}