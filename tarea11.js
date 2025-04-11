//Generar una secuencia de Fibonacci:
//Usa un for para generar los primeros 10 números de la serie de Fibonacci e imprímelos.

let fibonacci = [0, 1]; 

for (let i = 2; i < 10; i++) {
    fibonacci[i] = fibonacci[i - 1] + fibonacci[i - 2]; 
}

console.log(fibonacci); 
