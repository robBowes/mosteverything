let arr = [5,2,8,4,10,4,1,5];

volumeOfStormWater = (buildings, n, water, level) => {
    // console.log(buildings,n,water,level);
    n++
    if (!buildings[n]) {
        console.log('base case ' + n);
        
        return water
    };
    if (buildings[n-1]<=buildings[n] && buildings[n]>level) {
        console.log('dry building rise: ' + n);
        return volumeOfStormWater(buildings, n, water, buildings[n])
    } 
    let nextHighest = buildings.slice(n).reduce((acc,el)=>el>acc?el:acc,0);
    if (nextHighest>=level) {
        water += level - buildings[n]
        console.log('water: '+ water);
    }
    level = nextHighest;
    console.log('level '+ level);
    return volumeOfStormWater(buildings, n, water, level);
    return 'error 1'
}

console.log(volumeOfStormWater(arr, 0, 0, arr[0]));