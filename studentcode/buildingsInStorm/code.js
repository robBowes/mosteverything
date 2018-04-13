let arr = [5,2,8,4,10,4,1,5];

volumeOfStormWater = (arr) => {
    let slices = Array.from(arr);
    let water = 0;
    let count =0
    while (slices.some(el=>el>0)) {
        let tallest = slices.reduce((acc,el)=>el>acc?el:acc,0)
        let layer = slices.map(el=>el>=tallest);
        let firstTrue = layer.reduce((acc,el)=>{
            if (acc.found) {
                acc.arr.push(el)
                return acc;
            }
            if (!el) return acc;
            else {
                acc.found = true;
                return acc;
            }
        },{'found':false, 'arr':[]}).arr.reduceRight((acc,el)=>{
            if (acc.found) {
                acc.arr.push(el)
                return acc;
            }
            if (!el) return acc;
            else {
                acc.found = true;
                return acc;
            }
        },{'found':false, 'arr':[]})
        water += firstTrue.arr.reduce((acc,el)=>{
            if (!el) acc++;
            return acc
        },0)
        slices = slices.map(el=>el==tallest?el-1:el);
        count++;
        if (count>20) return;
    }
    return water;
}

console.log(volumeOfStormWater(arr))