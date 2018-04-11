window.onload = () => {
    
    setTimeout(game, Math.random()*2000+1000);
    
}
game = () =>{
    let gameFinished = false;
    let h1 = document.querySelector('h1');
    document.addEventListener('keypress', (e)=>{
        if (e.keyCode ===32) {
            if (!gameFinished) h1.innerText = 'You Win!!!'
            gameFinished = true;
        }
    })
    h1.innerText = 'GO!!!!'
    document.querySelector('.game_area').addEventListener('click', ()=>{
        if (!gameFinished) h1.innerText = 'You Win!!!'
        gameFinished = true;
    });
    setTimeout(()=>{
        if(!gameFinished) h1.innerText = 'You Lose!!!'
    }, 1000);
}