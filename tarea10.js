//Tabla de multiplicar:
//Pide al usuario un número y usa un for para imprimir su tabla de multiplicar del 1 al 10.

const readline = require('readline');

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

rl.question("Ingresa un número para ver su tabla de multiplicar: ", (numero) => {
    numero = parseInt(numero); // Convertimos el número a entero
    for (let i = 1; i <= 10; i++) {
        console.log(`${numero} x ${i} = ${numero * i}`);
    }
    rl.close(); // Cerramos la interfaz después de imprimir la tabla
});

