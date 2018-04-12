class Dog {
    constructor(n,fdf,b,a) {
        this.name = n;
        this.favouriteDogFood = fdf;
        this.breed = b;
        this.age = a;
    }
    sound() {
        if(this.breed === "labrador") {
            console.log("big woof");
        } else {
            console.log("small woof");
        }  
    }
}
class Cat {
    constructor(n, fcf, a) {
        this.name = n;
        this.favouriteCatFood = fcf;
        this.age = a;
    }
    sound(cat) {
        if(this.age < 2) {
            console.log("meow");
        } else {
            console.log("MEOW");
        }
    }
}
class Person {
    constructor(n, pi, ii) {
        this.name = n;
        this.purinaInventory = pi;
        this.iamsInventory = ii;
    }
    feedDog(dog) {
        if(dog.favouriteDogFood === 'iams') {
            if(this.iamsInventory > 0) {
                this.iamsInventory = this.iamsInventory - 1;
                console.log(dog.name + " has been fed");
            } else {
                console.log("no more iams!");
            }
        } else {
            console.log(this.name + " only has iams. Sorry " + dog.name + "!")
        }
    }
    feedCat(cat) {
        if(cat.favouriteCatFood === 'purina') {
            if(this.purinaInventory > 0) {
                this.purinaInventory = this.purinaInventory - 1;
                console.log(cat.name + " has been fed");
            } else {
                console.log("no more purina!");
            }
        } else {
            console.log(this.name + " only has purina. Sorry " + cat.name + "!")
        }
    }
}
let fido = new Dog("fido", "iams", "labrador", 4);
let mittens = new Cat("mittens", "purina", 3);
let bob = new Person("bob", 2, 1);

mittens.sound();
fido.sound();
bob.feedCat(mittens);
bob.feedDog(fido);
bob.feedCat(mittens);
bob.feedDog(fido);
bob.feedCat(mittens);



// function makeDog(n, fdf, b, a) {
//     return {name: n, favouriteDogFood: fdf, breed:n, age: a};
// }

// function makeCat(n, fcf, a) {
//     return {name: n, favouriteCatFood: fcf, age: a};
// }

// function makePerson(n, pi, ii) {
//     return {name: n, purinaInventory: pi, iamsInventory: ii};
// }

// function dogAnimalSound(dog) {
//     if(dog.breed === "labrador") {
//         console.log("big woof");
//     } else {
//         console.log("small woof");
//     }    
// }

// function catAnimalSound(cat) {
//     if(cat.age < 2) {
//         console.log("meow");
//     } else {
//         console.log("MEOW");
//     }
// }

// function feedDog(person, dog) {
//     if(dog.favouriteDogFood === 'iams') {
//         if(person.iamsInventory > 0) {
//             person.iamsInventory = person.iamsInventory - 1;
//             console.log(dog.name + " has been fed");
//         } else {
//             console.log("no more iams!");
//         }
//     } else {
//         console.log(person.name + " only has iams. Sorry " + dog.name + "!")
//     }
// }

// function feedCat(person, cat) {
//     if(cat.favouriteCatFood === 'purina') {
//         if(person.purinaInventory > 0) {
//             person.purinaInventory = person.purinaInventory - 1;
//             console.log(cat.name + " has been fed");
//         } else {
//             console.log("no more purina!");
//         }
//     } else {
//         console.log(person.name + " only has purina. Sorry " + cat.name + "!")
//     }
// }

// var fido = makeDog("fido", "iams", "labrador", 4);
// var mittens = makeCat("mittens", "purina", 3);
// var bob = makePerson("bob", 2, 1);

// catAnimalSound(mittens);
// dogAnimalSound(fido);

// feedCat(bob, mittens);
// feedDog(bob, fido);
// feedCat(bob, mittens);
// feedDog(bob, fido);
// feedCat(bob, mittens);
