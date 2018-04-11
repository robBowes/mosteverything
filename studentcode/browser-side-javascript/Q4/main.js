window.onload = () => {
    document.querySelector('#start').addEventListener('click', buttonClick);
}
buttonClick = () => {
    document.querySelector('#start').remove();
    let h1 = document.createElement('h1');
    h1.innerText = 'Wait.....';
    document.querySelector('.game_area').appendChild(h1)
    setTimeout(()=>{
        h1.innerText = 'GOOOO!!!!';
        gameStart();
    },Math.random()*2000+1000)
}
gameStart = () =>{
    let gameFinished = false;
    let h1 = document.querySelector('h1')
    document.querySelector('.game_area').addEventListener('click', () =>{
        if (!gameFinished) h1.innerText = 'You Win!!!'
        gameFinished = true;
    });
    document.addEventListener('keypress', (e)=>{
        if (e.keyCode ===32) {
            if (!gameFinished) {
                h1.innerText = 'You Win!!!'
            }
            gameFinished = true;
        }
    })
    setTimeout(()=>{
        if (!gameFinished) {
            h1.innerText = 'You Lose!!!'
        }
        gameFinished = true;    
    }, 1000)
}