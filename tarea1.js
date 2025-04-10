//1.	Sumar elementos de un array:
//Escribe una función que reciba un array de números y devuelva la suma de todos los elementos.
function sumarArray(arr) {
    return arr.reduce((total, num) => total + num, 0);
}
console.log(sumarArray([1, 2, 3 ])); 