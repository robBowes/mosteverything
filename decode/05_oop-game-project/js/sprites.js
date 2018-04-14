let ship = new Path2D();
ship.moveTo(0,-25);
ship.lineTo(9,-15);
ship.lineTo(12,5);
ship.lineTo(30,10);
ship.lineTo(30,0);
ship.lineTo(30,25);
ship.lineTo(10,25);
ship.lineTo(10,28);
ship.lineTo(0,28);
// let enemySprite = new Path2D();


let bulletSprite = new Path2D();
bulletSprite.moveTo(0,3)
bulletSprite.lineTo(0,-3)

// let sparkSprites = [];

// for (let index = 0; index < 5; index++) {
//     let obj = new Path2D();
//         for (let index = 0; index < 5; index++) {
//             obj.moveTo(0,3*index);
//             obj.lineTo(0,6*index);
//             obj.moveTo(0,-6*index)
//             obj.rotate(Math.PI*2/5+index)
//         }
//     sparkSprites.push(obj)
// }