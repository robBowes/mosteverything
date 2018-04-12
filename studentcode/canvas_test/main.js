window.onload = ()=>{
    const canvas = document.querySelector('canvas');
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    let width = canvas.width;
    let height = canvas.height;
    let c = canvas.getContext('2d');
    let ship = new Ship([width/2, height/2])
    ship.draw(c);
    
    // c.save();
    // c.translate(width/2, height/4);
    // c.beginPath();
    // c.moveTo(-10,0);
    // c.lineTo(10,0);
    // c.moveTo(0,-10);
    // c.lineTo(0,0);
    // c.stroke();
    // c.restore();    
    
    // for (let index = 0; index < 20; index++) {
    //     c.save();
    //     c.translate(width/2, height-index*20);
    //     c.fillRect(0,0,1,1)
    //     c.restore()
    // }
};
class Ship {
    constructor(center) {
        this.center = center;
    }
    draw (c) {
        c.save();
        c.translate(...this.center)
        c.beginPath();
        c.moveTo(0,-10);
        c.lineTo(5,0);
        c.lineTo(20,20);
        c.stroke();
        c.restore();
    }
}