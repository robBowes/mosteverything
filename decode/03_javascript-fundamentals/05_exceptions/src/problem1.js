function first(arr) {
    // Throw an exception if the array has no elements
    // Otherwise return the first element
    if (arr.length==0)throw new Error('array has no elements');
    return arr[0];
}

function detective(i) {
    function suspect(i) {
        if(i * 7 % 3 == 0) throw new Error("Bad i!");
    }
    // detective checks to see if the suspect throws an exception on input i.
    // Returns "everything ok" if the suspect doesn't. 
    // Returns "something fishy" if the suspect does.
    try {
        suspect(i);
        return 'everything ok'
    } catch (error) {
        return 'something fishy'
    }
}

function assignFlight(name) {
    var flightNumber = ((name.length * 7) % 20) + "0";
    var terrorSuspects = ["bob", "eric", "susie"];
    // if the name is a terror suspect, throw an exception
    // Otherwise, return the flight number
    if (terrorSuspects.every(el=>el!==name)) return flightNumber
    else throw new Error('Terror suspect found!');
}

module.exports = {first, detective, assignFlight}