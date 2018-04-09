let timer = {};

mySetInterval = (f,time, n) => {
    let rand
    if (!n) {
        rand = Math.floor(Math.random()*1000);
        timer[rand] = true;
    } else {
        rand = n
    }
    if (timer[rand]) {
        f();
        setTimeout(()=>mySetInterval(f,time, rand), time);
    }
    return rand;
}
let foo = () => console.log('hello');


myClearInterval = (n) => {
    timer[n] = false;
    return !timer[n];
}

mySetTimeout = (f, time) => {
    let n = setInterval(()=>{
        f();
        clearInterval(n);
    },time);
}

