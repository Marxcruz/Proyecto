//Número mayor y menor:
//Crea una función que reciba un array de números y retorne el mayor y el menor.

const encontrarMayorYMenor = (numeros) => ({ 
    mayor: Math.max(...numeros), 
    menor: Math.min(...numeros) 
});

console.log(encontrarMayorYMenor([10, 5, 20, 8, 3]));

