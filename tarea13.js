//Contar regresivamente desde un número:
//Usa while para imprimir una cuenta regresiva desde un número ingresado por el usuario hasta 0.

const readline = require('readline');

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

rl.question("Ingresa un número para iniciar la cuenta regresiva: ", (numero) => {
    numero = parseInt(numero); 

    while (numero >= 0) {
        console.log(numero);
        numero--; 
    }

    rl.close(); 
});

