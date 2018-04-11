window.onload = () =>{
    setTimeout(game, Math.random()*2000+1000)
}
game = () =>{
    let gameFinished = false;
    document.querySelector('h1').remove();
    let button = document.createElement('button')
    button.innerText = 'Click Me!!';
    button.style = `margin: ${Math.floor(Math.random()*100 )}%  0px 0px ${Math.floor(Math.random()*100 )}%`
    document.querySelector('.game_area').appendChild(button);
    button.addEventListener('click', (e)=>{
        e.stopPropagation();
        if (!gameFinished) {
            button.remove();
            createH1('You Win!!');
        }
        gameFinished = true;
    })

    document.querySelector('.game_area').addEventListener('click', ()=>{
        button.remove();
        createH1('You Lose!!');
        gameFinished = true;
    })
    setTimeout(()=>{
        if (!gameFinished) {
            button.remove();
            createH1('You Lose!!')
        }
        gameFinished = true;
    }, 1000)
}

createH1 = (str) => {
    let h1 = document.createElement('h1');
    h1.innerText = str;
    document.querySelector('.game_area').appendChild(h1);
}