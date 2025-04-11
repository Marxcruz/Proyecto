//Imprimir la serie de Fibonacci hasta que un número supere 100:
//Usa while para generar la serie de Fibonacci hasta que un número supere 100.

let a = 0; // Primer número de Fibonacci
let b = 1; // Segundo número de Fibonacci

console.log(a); // Imprime el primer número
console.log(b); // Imprime el segundo número

while (true) {
    let siguiente = a + b; // Siguiente número de Fibonacci
    if (siguiente > 100) {
        break; // Sale del bucle si el siguiente número supera 100
    }
    console.log(siguiente); // Imprime el siguiente número
    a = b; // El siguiente número de la serie es el actual 'b'
    b = siguiente; // El siguiente número de la serie es el actual 'siguiente'
}

