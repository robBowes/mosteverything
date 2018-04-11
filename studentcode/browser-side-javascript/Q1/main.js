window.onload = () =>{
    let gameWin = false;
    document.querySelector('body').addEventListener('click', ()=>{
        console.log('click');
        
        if (!gameWin) document.querySelector('.status').innerHTML = '<h1>You Win</h1>';
        gameWin = true;
    });
    setTimeout(()=>{
        if (!gameWin) document.querySelector('.status').innerHTML = '<h1>You Lose</h1>';
        gameWin = true;
    },1000);
}