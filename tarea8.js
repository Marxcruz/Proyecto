//Sumar solo los números positivos:
//Filtra los negativos y suma los positivos.

const sumarPositivos = (numeros) => 
    numeros.filter(n => n > 0).reduce((sum, n) => sum + n, 0);

console.log(sumarPositivos([1, -2, 3, 4, -5])); 
