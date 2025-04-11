//Revertir un array:
//Implementa una función que invierta el orden de un array sin usar .reverse().

const invertirArray = (arr) => {
    let invertido = [];
    for (let i = arr.length - 1; i >= 0; i--) {
        invertido.push(arr[i]);
    }
    return invertido;
};

console.log(invertirArray([1, 2, 3, 4, 5])); 

