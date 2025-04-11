//Ordenar un array:
//Implementa un algoritmo que ordene un array de números de menor a mayor sin usar .sort().

const ordenarArray = (numeros) => {
    for (let i = 0; i < numeros.length - 1; i++) {
        for (let j = 0; j < numeros.length - 1 - i; j++) {
            if (numeros[j] > numeros[j + 1]) {
                [numeros[j], numeros[j + 1]] = [numeros[j + 1], numeros[j]]; 
            }
        }
    }
    return numeros;
};
console.log(ordenarArray([5, 2, 9, 1, 5, 6])); 
