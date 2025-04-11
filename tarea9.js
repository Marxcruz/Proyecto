//Obtener el primer múltiplo de 5:
//Usa find() para hallar el primer número múltiplo de 5 en un array.

const primerMultiploDeCinco = (numeros) => 
    numeros.find(n => n % 5 === 0);

console.log(primerMultiploDeCinco([1, 3, 7, 10, 15])); 

