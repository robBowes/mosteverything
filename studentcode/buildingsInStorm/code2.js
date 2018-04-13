let arr = [5,2,8,4,10,4,1,5];

volumeOfStormWater = (buildings) => {
    /*
    * Create an array, length of tallest building
    */
    return Array(buildings.reduce((acc,el)=>el>acc?el:acc, 0))
    .fill()
    /*
    * Each element is a horizontal slice of the city. True is a building
    */
    .map((el,i,arr)=>buildings.map((el2)=>el2>i))
    /*
    * Water will be held between the outermost buildings of each slice
    */
    .map(el=>{
        let first = el.findIndex(e=>e)
        let last = buildings.length-el.reverse().findIndex(e=>e)
        return el.reverse().slice(first,last)
    })
    /*
    * Flatten the slices and return the total amout of water
    */
    .reduce((acc,el)=>acc.concat(el),[])   
    .filter(el=>!el).length
}

console.log(volumeOfStormWater(arr));