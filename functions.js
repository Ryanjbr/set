/* function allSame(previousValue, element) {
    return previousValue === currentValue
} */
let array = [1, 2, 3]

function allUnique(array) {
    tmp = []
    for (let element of array) {
        if (tmp.includes(element) === false) {
            tmp.push(element)
        }
    }
    return array.length === tmp.length;
}

console.log(allUnique(array))