window.onload = ()=>{
    const canvas = document.querySelector('canvas');
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    let width = canvas.width;
    let height = canvas.height;
    let c = canvas.getContext('2d');
    let ships = [
        new Ship([width/2+0.5, height/2+0.5]),
        new Ship([width/2+100, height/2]),
        new Ship([width/2-100, height/2]),
    ]
    console.log(ships);
    
    ships.forEach(el=>el.draw(c))    
    
};
class Ship {
    constructor(center) {
        this.center = center;
    }
    draw (c) {
        c.save();
        c.translate(...this.center)
        c.beginPath();
        this.shipLines(c,1)
        this.shipLines(c,-1)
        // c.fillStyle = '#530060'
        c.strokeStyle = '#530060'
        c.lineWidth = 2;
        c.shadowColor = '#530060';
        c.shadowBlur = 10;
        c.stroke();
        // c.fill();
        c.restore();
    }
    shipLines(c, n) {
        c.scale(n,1);
        c.moveTo(0,-10);
        c.lineTo(9,0);
        c.lineTo(12,20);
        c.lineTo(30,25);
        c.lineTo(30,15);
        c.lineTo(30,35);
        c.lineTo(10,40);
        c.lineTo(10,43);
        c.lineTo(0,43);
    }
}